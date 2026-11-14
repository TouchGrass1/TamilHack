import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { useScribe, CommitStrategy } from "@elevenlabs/react";
import { Mic, Square, Volume2, Loader2 } from "lucide-react";
import { getScribeToken, translateText, speak } from "@/lib/voice.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Echo — Tamil & English Voice" },
      { name: "description", content: "Speak or type in Tamil or English, translate, and hear it spoken back." },
      { property: "og:title", content: "Echo — Tamil & English Voice" },
      { property: "og:description", content: "Speak or type in Tamil or English, translate, and hear it spoken back." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Lang = "en" | "ta";
const PAIRS: { label: string; from: Lang; to: Lang }[] = [
  { label: "English → English", from: "en", to: "en" },
  { label: "Tamil → English", from: "ta", to: "en" },
  { label: "English → Tamil", from: "en", to: "ta" },
  { label: "Tamil → Tamil", from: "ta", to: "ta" },
];
const ISO3 = { en: "eng", ta: "tam" } as const;

function Index() {
  const [pair, setPair] = useState(1);
  const { from, to } = PAIRS[pair]!;
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const tokenFn = useServerFn(getScribeToken);
  const translateFn = useServerFn(translateText);
  const speakFn = useServerFn(speak);

  const scribe = useScribe({
    modelId: "scribe_v2_realtime",
    commitStrategy: CommitStrategy.VAD,
    languageCode: ISO3[from],
    onCommittedTranscript: (d) => {
      if (d.text.trim()) setText((t) => (t ? t + " " : "") + d.text.trim());
    },
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [text, scribe.partialTranscript]);

  const toggleMic = async () => {
    setError(null);
    if (scribe.isConnected) {
      scribe.disconnect();
      return;
    }
    try {
      setBusy("Connecting…");
      const { token } = await tokenFn();
      await scribe.connect({ token, microphone: { echoCancellation: true, noiseSuppression: true } });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start the microphone.");
    } finally {
      setBusy(null);
    }
  };

  const translateAndSpeak = async () => {
    if (!text.trim()) return;
    setError(null);
    try {
      setBusy("Translating…");
      const { text: out } = await translateFn({ data: { text, from, to } });
      setTranslated(out);
      setBusy("Speaking…");
      const { audio } = await speakFn({ data: { text: out } });
      await new Audio(`data:audio/mpeg;base64,${audio}`).play();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(null);
    }
  };

  const btn =
    "flex h-28 w-28 items-center justify-center rounded-full shadow-xl transition-transform active:scale-95 disabled:opacity-30";

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Echo</h1>
        <div className="flex flex-wrap justify-center gap-2">
          {PAIRS.map((p, i) => (
            <button
              key={p.label}
              onClick={() => setPair(i)}
              disabled={scribe.isConnected}
              className={`rounded-full border px-4 py-1.5 text-sm ${i === pair ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground"}`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex gap-10">
          <button
            onClick={toggleMic}
            aria-label={scribe.isConnected ? "Stop listening" : "Start listening"}
            className={`${btn} ${scribe.isConnected ? "animate-pulse bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"}`}
          >
            {scribe.isConnected ? <Square className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
          </button>
          <button
            onClick={translateAndSpeak}
            disabled={!text.trim() || !!busy || scribe.isConnected}
            aria-label="Translate and speak"
            className={`${btn} bg-secondary text-secondary-foreground`}
          >
            {busy && busy !== "Connecting…" ? <Loader2 className="h-10 w-10 animate-spin" /> : <Volume2 className="h-10 w-10" />}
          </button>
        </div>
        <p className="text-sm text-muted-foreground">
          {error ?? busy ?? (scribe.isConnected ? "Listening… tap to stop" : "Tap the mic to speak, or type below. Tap the speaker to hear it.")}
        </p>
        {translated && (
          <div className="w-full max-w-2xl rounded-xl bg-muted p-4 text-foreground">
            <div className="mb-1 text-xs uppercase text-muted-foreground">Spoken ({to === "en" ? "English" : "Tamil"})</div>
            {translated}
          </div>
        )}
      </div>
      <div className="sticky bottom-0 border-t border-border bg-card p-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Live transcript ({from === "en" ? "English" : "Tamil"})</span>
            <button onClick={() => { setText(""); setTranslated(""); }} className="underline">Clear</button>
          </div>
          <div ref={scrollRef} className="max-h-48 overflow-y-auto">
            <textarea
              value={scribe.isConnected && scribe.partialTranscript ? `${text} ${scribe.partialTranscript}`.trim() : text}
              onChange={(e) => setText(e.target.value)}
              readOnly={scribe.isConnected}
              rows={4}
              placeholder="Your words appear here as you speak — or type text to have it spoken."
              className="w-full resize-none rounded-lg border border-input bg-background p-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
