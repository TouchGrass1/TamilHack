import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { Mic, Square, Play, Download, Loader2, Volume2, Trash2 } from "lucide-react";
import {
  transcribeTurn,
  npcSpeak,
  speakWord,
  listVoices,
} from "@/lib/speech.functions";
import { translateText } from "@/lib/voice.functions";
import type { TurnEvalDraft } from "@/lib/speech/types";

export const Route = createFileRoute("/debug")({
  head: () => ({
    meta: [
      { title: "Speech Debug Console — Tamil RPG" },
      { name: "description", content: "Record, transcribe, score, translate and speak — pipeline debugger." },
    ],
  }),
  component: DebugConsole,
});

type LogLine = { t: string; msg: string; cls: "info" | "ok" | "err" | "warn" };
type VoiceMap = Record<string, { voiceId: string | null; moods: Record<string, string>; register: string }>;

/** Backup audio (public/audio) — played when the ElevenLabs TTS call fails. */
const BACKUP_AUDIO = {
  speak: "/audio/backup-paatri-entrance.mp3",
  drill: "/audio/backup-correct-option.mp3",
};

function playBackup(url: string): Promise<void> {
  return new Audio(url).play().then(() => undefined);
}

const VOICE_LABELS: Record<string, string> = {
  narrator: "Narrator",
  customs_officer: "Customs Officer",
  taxi_driver: "Taxi Driver",
  elder_host: "Elder Host",
  cousin: "Cousin",
  waiter: "Waiter",
  shopkeeper: "Shopkeeper",
};

async function blobToBase64(blob: Blob): Promise<string> {
  const buf = new Uint8Array(await blob.arrayBuffer());
  let bin = "";
  const CHUNK = 0x8000;
  for (let i = 0; i < buf.length; i += CHUNK) {
    bin += String.fromCharCode(...buf.subarray(i, i + CHUNK));
  }
  return btoa(bin);
}

function stamp() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

function DebugConsole() {
  const transcribeFn = useServerFn(transcribeTurn);
  const npcSpeakFn = useServerFn(npcSpeak);
  const speakWordFn = useServerFn(speakWord);
  const listVoicesFn = useServerFn(listVoices);
  const translateFn = useServerFn(translateText);

  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [language, setLanguage] = useState<"auto" | "en" | "ta">("auto");
  const [expectedText, setExpectedText] = useState("");
  const [verbose, setVerbose] = useState(true);

  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [recorded, setRecorded] = useState<Blob | null>(null);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);

  const [draft, setDraft] = useState<TurnEvalDraft | null>(null);
  const [translation, setTranslation] = useState<string | null>(null);
  const [voices, setVoices] = useState<{ narrator: string | null; voices: VoiceMap } | null>(null);
  const [ttsText, setTtsText] = useState("");
  const [ttsVoice, setTtsVoice] = useState("narrator");
  const [ttsMood, setTtsMood] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  const [logs, setLogs] = useState<LogLine[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<number | null>(null);

  const log = (msg: string, cls: LogLine["cls"] = "info") => {
    setLogs((l) => [...l.slice(-300), { t: stamp(), msg, cls }]);
  };
  const vlog = (msg: string, cls: LogLine["cls"] = "info") => {
    if (verbose) log(msg, cls);
  };

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [logs]);

  useEffect(() => {
    listVoicesFn()
      .then((v) => {
        setVoices(v);
        log(
          `voices loaded: ${Object.entries(v.voices).filter(([, x]) => x.voiceId).length}/6 configured` +
            (v.narrator ? ", narrator ✓" : ", narrator ✗"),
          v.narrator ? "ok" : "warn",
        );
      })
      .catch((e: unknown) => log(`voice list failed: ${e instanceof Error ? e.message : String(e)}`, "err"));
    log("debug console ready — record a turn, or type text and speak", "ok");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMic = async () => {
    if (recorderRef.current && recorderRef.current.state === "recording") {
      recorderRef.current.stop();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : undefined;
      const rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        if (timerRef.current) window.clearInterval(timerRef.current);
        setRecording(false);
        const blob = new Blob(chunks, { type: rec.mimeType || "audio/webm" });
        setRecorded(blob);
        setRecordedUrl(URL.createObjectURL(blob));
        log(`recording saved — ${(blob.size / 1024).toFixed(1)} KB, ${elapsed.toFixed(0)}s`, "ok");
        await runTranscribe(blob);
      };
      recorderRef.current = rec;
      rec.start();
      setRecording(true);
      setElapsed(0);
      timerRef.current = window.setInterval(() => setElapsed((s) => s + 1), 1000);
      log("recording started — click stop when done");
    } catch (e) {
      log(`mic error: ${e instanceof Error ? e.message : String(e)}`, "err");
    }
  };

  const runTranscribe = async (blob: Blob) => {
    setBusy("Transcribing…");
    const ext = blob.type.includes("mp4") ? "m4a" : "webm";
    try {
      const audioBase64 = await blobToBase64(blob);
      vlog(`stt/turn → (${language}, ${difficulty}${expectedText ? ", expected phrase" : ""})`);
      const d = await transcribeFn({
        data: {
          audioBase64,
          mime: blob.type || "audio/webm",
          filename: `turn.${ext}`,
          difficulty,
          language,
          expectedText: expectedText.trim() || undefined,
          keyterms: false,
        },
      });
      setDraft(d);
      vlog(`stt/turn ✓ scores=${JSON.stringify(d.scores)}`, "ok");
      log(
        `transcript: ${d.transcript_tamil_script || "(empty)"} — detected ${(d.language.code ?? "?").toUpperCase()}`,
        "ok",
      );
      await runTranslate(d);
    } catch (e) {
      log(`stt/turn error: ${e instanceof Error ? e.message : String(e)}`, "err");
    } finally {
      setBusy(null);
    }
  };

  const runTranslate = async (d: TurnEvalDraft) => {
    const text = d.transcript_tamil_script;
    if (!text.trim()) return;
    const from = d.language.code === "tam" ? "ta" : "en";
    const to = from === "ta" ? "en" : "ta";
    setBusy("Translating…");
    try {
      const { text: out } = await translateFn({ data: { text, from, to } });
      setTranslation(out);
      log(`translation (${from}→${to}): ${out}`, "ok");
      setTtsText(out);
    } catch (e) {
      log(`translation error: ${e instanceof Error ? e.message : String(e)}`, "err");
    } finally {
      setBusy(null);
    }
  };

  const speak = async (text: string, npc: string, mood?: string, lang?: "auto" | "en" | "ta") => {
    if (!text.trim()) return;
    setBusy("Speaking…");
    try {
      const { audio, fromCache } = await npcSpeakFn({
        data: { text, npc, mood: mood || undefined, language: lang ?? "auto" },
      });
      vlog(`tts ✓ (${npc}${mood ? ", " + mood : ""}) cache=${fromCache ? "hit" : "miss"}`, "ok");
      await new Audio(`data:audio/mpeg;base64,${audio}`).play();
      log(`speaking via ${npc} — audio ready (${(audio.length * 0.75 / 1024).toFixed(0)} KB)`, "ok");
    } catch (e) {
      log(`tts error: ${e instanceof Error ? e.message : String(e)} — playing backup audio`, "warn");
      await playBackup(BACKUP_AUDIO.speak).catch(() => {});
    } finally {
      setBusy(null);
    }
  };

  const drillWord = async (word: string) => {
    setBusy(`Drilling "${word}"…`);
    try {
      const { audio } = await speakWordFn({ data: { word } });
      const a = new Audio(`data:audio/mpeg;base64,${audio}`);
      a.playbackRate = 0.7; // slow syllable drill
      await a.play();
      log(`drill: "${word}" at 0.7x`, "ok");
    } catch (e) {
      log(`drill error: ${e instanceof Error ? e.message : String(e)} — playing backup audio`, "warn");
      await playBackup(BACKUP_AUDIO.drill).catch(() => {});
    } finally {
      setBusy(null);
    }
  };

  const saveRecording = () => {
    if (!recorded) return;
    const ext = recorded.type.includes("mp4") ? "m4a" : "webm";
    const a = document.createElement("a");
    a.href = URL.createObjectURL(recorded);
    a.download = `turn-${Date.now()}.${ext}`;
    a.click();
    log("recording saved to downloads", "ok");
  };

  const chipClass = (status: string) =>
    status === "green"
      ? "bg-emerald-950 text-emerald-300 border-emerald-800"
      : status === "yellow"
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : status === "red"
          ? "bg-rose-950 text-rose-300 border-rose-800"
          : "bg-sky-950 text-sky-300 border-sky-800";

  const scoreRows: Array<[string, number | null | undefined]> = draft
    ? [
        ["Tanglish ratio /25", draft.scores.tanglish_ratio],
        ["Pronunciation /25", draft.scores.pronunciation],
        ["Politeness (LLM pending)", draft.scores.politeness_register],
        ["Fluency & pacing /25", draft.scores.fluency_pacing],
        ["Partial total /75", draft.scores.total],
      ]
    : [];

  return (
    <main className="mx-auto min-h-screen max-w-3xl bg-background p-4 text-foreground">
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">Speech Debug Console</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Batch pipeline debugger — Scribe v3 + rubric scoring + Eleven v3 TTS.{" "}
        <a href="/echo" className="underline">
          ← realtime Echo home
        </a>
      </p>

      {/* Record */}
      <section className="mb-4 rounded-xl border border-border bg-card p-4">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <button
            onClick={toggleMic}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-medium transition-transform active:scale-95 ${
              recording
                ? "animate-pulse bg-destructive text-destructive-foreground"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {recording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {recording ? `Stop (${elapsed}s)` : "Record Turn"}
          </button>
          <button
            onClick={saveRecording}
            disabled={!recorded}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5 disabled:opacity-30"
          >
            <Download className="h-4 w-4" /> Save
          </button>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">difficulty</span>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}
              className="rounded-md border border-input bg-background px-2 py-1"
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
            <span className="text-muted-foreground">stt</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as typeof language)}
              className="rounded-md border border-input bg-background px-2 py-1"
            >
              <option value="auto">auto (ta+en)</option>
              <option value="en">english</option>
              <option value="ta">tamil</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={expectedText}
            onChange={(e) => setExpectedText(e.target.value)}
            placeholder="Easy-mode expected phrase (e.g. vanakkam anna eppadi irukku)"
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        {recordedUrl && (
          <div className="mt-3 flex items-center gap-3">
            <audio src={recordedUrl} controls className="h-9 flex-1" />
            <button
              onClick={() => recorded && runTranscribe(recorded)}
              disabled={!!busy}
              className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm disabled:opacity-30"
            >
              {busy === "Transcribing…" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
              re-run STT
            </button>
          </div>
        )}
      </section>

      {/* Result */}
      {draft && (
        <section className="mb-4 rounded-xl border border-border bg-card p-4">
          <div className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
            detected: {(draft.language.code ?? "?").toUpperCase()}
            {draft.language.probability ? ` (${Math.round(draft.language.probability * 100)}%)` : ""}
          </div>
          <div className="tamil mb-1 text-lg leading-relaxed" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>
            {draft.transcript_tamil_script || "(empty)"}
          </div>
          <div className="mb-3 text-xs text-muted-foreground">{draft.transcript_transliterated}</div>

          <div className="mb-3 space-y-1">
            {scoreRows.map(([label, v]) => (
              <div key={label} className="flex items-center gap-2 text-xs">
                <span className="w-44 text-muted-foreground">{label}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <span
                    className="block h-full rounded-full bg-primary"
                    style={{ width: `${v == null ? 0 : Math.min(100, (v / 25) * 100)}%` }}
                  />
                </span>
                <span className="w-8 text-right">{v == null ? "—" : v}</span>
              </div>
            ))}
          </div>

          <div className="mb-2 flex flex-wrap gap-1">
            {draft.word_analysis.map((w, i) => (
              <button
                key={`${w.word}-${i}`}
                onClick={() => w.status !== "english" && drillWord(w.word)}
                title={`${w.lang}${w.logprob !== undefined ? ` · logprob ${w.logprob.toFixed(3)}` : ""}${w.tip ? ` · ${w.tip}` : ""}`}
                className={`rounded-md border px-2 py-0.5 text-xs ${chipClass(w.status)} ${
                  w.status !== "english" ? "cursor-pointer hover:opacity-80" : "cursor-default"
                }`}
              >
                {w.word}
                {w.score != null ? ` ${w.score}` : ""}
                {w.missing ? " (miss)" : ""}
              </button>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">
            {draft.mistakes.length
              ? `mistake deck (${draft.mistakes.length}): ${draft.mistakes.map((m) => `${m.word} [${m.type}]`).join(", ")} — click a colored word to drill it slowly`
              : "no mistakes flagged this turn"}
          </div>

          {translation && (
            <div className="mt-3 rounded-lg bg-muted p-3 text-sm">
              <span className="mr-2 text-xs uppercase text-muted-foreground">translation</span>
              {translation}
              <button
                onClick={() => speak(translation, "narrator", undefined, "auto")}
                className="ml-2 inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-xs"
              >
                <Volume2 className="h-3 w-3" /> speak
              </button>
            </div>
          )}
        </section>
      )}

      {/* TTS playground */}
      <section className="mb-4 rounded-xl border border-border bg-card p-4">
        <div className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">text → speech</div>
        <textarea
          value={ttsText}
          onChange={(e) => setTtsText(e.target.value)}
          rows={2}
          placeholder="Type English or Tamil (தமிழ்) text…"
          className="mb-2 w-full resize-y rounded-md border border-input bg-background p-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">voice</span>
          <select
            value={ttsVoice}
            onChange={(e) => setTtsVoice(e.target.value)}
            className="rounded-md border border-input bg-background px-2 py-1"
          >
            <option value="narrator">narrator{voices && !voices.narrator ? " (not set)" : ""}</option>
            {voices &&
              Object.entries(voices.voices).map(([k, v]) => (
                <option key={k} value={k}>
                  {VOICE_LABELS[k] ?? k}
                  {v.voiceId ? "" : " (not set)"}
                </option>
              ))}
          </select>
          <span className="text-muted-foreground">mood</span>
          <input
            type="text"
            value={ttsMood}
            onChange={(e) => setTtsMood(e.target.value)}
            placeholder="e.g. tired, chatty"
            size={10}
            className="rounded-md border border-input bg-background px-2 py-1"
          />
          <button
            onClick={() => speak(ttsText, ttsVoice, ttsMood.trim() || undefined, "auto")}
            disabled={!!busy || !ttsText.trim()}
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 font-medium disabled:opacity-30"
          >
            {busy === "Speaking…" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Volume2 className="h-4 w-4" />}
            Speak
          </button>
          <button
            onClick={() => {
              setTtsText("");
              setDraft(null);
              setTranslation(null);
            }}
            className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-muted-foreground"
          >
            <Trash2 className="h-3 w-3" /> clear
          </button>
        </div>
      </section>

      {/* Running log */}
      <section className="rounded-xl border border-border bg-card p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">running log</span>
          <label className="flex items-center gap-1 text-xs text-muted-foreground">
            <input type="checkbox" checked={verbose} onChange={(e) => setVerbose(e.target.checked)} /> verbose
          </label>
        </div>
        <div ref={logRef} className="h-56 overflow-y-auto rounded-lg bg-background p-3 font-mono text-xs leading-relaxed">
          {logs.map((l, i) => (
            <div key={i}>
              <span className="text-muted-foreground/60">[{l.t}] </span>
              <span
                className={
                  l.cls === "ok"
                    ? "text-emerald-300"
                    : l.cls === "err"
                      ? "text-rose-300"
                      : l.cls === "warn"
                        ? "text-amber-300"
                        : "text-sky-300"
                }
              >
                {l.msg}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
