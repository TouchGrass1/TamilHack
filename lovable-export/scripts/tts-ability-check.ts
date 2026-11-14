/**
 * TTS ability check — Tamil AND English.
 *
 * Method: synthesize with Eleven v3 → transcribe back with Scribe v3 →
 * token match against the source text. High match = intelligible audio.
 * Also probes the language_code footgun (English text forced through
 * language_code=ta) to justify the backend's auto-detect override.
 *
 * Run: bun scripts/tts-ability-check.ts   (with ELEVENLABS_API_KEY set)
 */
import { tamilPack } from "../src/lib/speech/packs/tamil";

const KEY = process.env.ELEVENLABS_API_KEY!;
const VOICE = process.env.VOICE_NARRATOR || tamilPack.narratorVoiceId || "EXAVITQu4vr4xnSDxMaL";
const MODEL = tamilPack.tts.model; // eleven_v3
const DIR = "/tmp/opencode/tts-check";
import { mkdirSync, writeFileSync } from "node:fs";
mkdirSync(DIR, { recursive: true });

interface Sample {
  id: string;
  text: string;
  lang: "ta" | "en";
  /** optional explicit language_code override test */
  forceLang?: "ta" | "en";
  note?: string;
}

const SAMPLES: Sample[] = [
  { id: "TA1-formal", text: "வணக்கம், எப்படி இருக்கீங்க? உங்க காலேஜ் எப்படி போறது?", lang: "ta" },
  { id: "TA2-casual", text: "அண்ணா, ஒரு தோசை வேணும். காசு எவ்வளவு?", lang: "ta" },
  { id: "TA3-numbers", text: "நாளை பத்து மணிக்கு வந்துடுங்க. நான்கு நூறு ரூபாய்.", lang: "ta" },
  { id: "TA4-mood", text: "[sighs] வாங்க தம்பி, என்ன வேணும்?", lang: "ta", note: "mood [sighs] tag" },
  { id: "EN1-greeting", text: "Hello, how much is this shirt?", lang: "en" },
  { id: "EN2-scenario", text: "Welcome to Chennai, your taxi is waiting outside the airport.", lang: "en" },
  { id: "EN3-force-ta", text: "Hello, how much is this shirt?", lang: "en", forceLang: "ta", note: "footgun probe: en text + language_code=ta" },
  { id: "MIX-tanglish", text: "Anna, enakku oru dosa venum, illa idli venum. Bill evlo?", lang: "ta", note: "romanized Tanglish read as Tamil" },
];

interface Turn { text: string; start: number; end: number; type?: string }

async function synthesize(text: string, languageCode: "ta" | "en"): Promise<Uint8Array> {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}`, {
    method: "POST",
    headers: { "xi-api-key": KEY, "content-type": "application/json", accept: "audio/mpeg" },
    body: JSON.stringify({
      text,
      model_id: MODEL,
      language_code: languageCode,
      voice_settings: { stability: tamilPack.tts.stability, similarity_boost: tamilPack.tts.similarityBoost },
    }),
  });
  if (!res.ok) throw new Error(`TTS ${res.status}: ${await res.text()}`);
  return new Uint8Array(await res.arrayBuffer());
}

async function transcribe(bytes: Uint8Array, filename: string): Promise<{ text: string; language: string | null }> {
  const form = new FormData();
  form.append("file", new Blob([bytes as BlobPart], { type: "audio/mpeg" }), filename);
  form.append("model_id", "scribe_v3");
  form.append("timestamps_granularity", "word");
  const res = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
    method: "POST",
    headers: { "xi-api-key": KEY },
    body: form,
  });
  if (!res.ok) throw new Error(`Scribe ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { text?: string; language_code?: string };
  return { text: (data.text ?? "").trim(), language: data.language_code ?? null };
}

const tokens = (s: string) =>
  s.toLowerCase().replace(/[.,!?、。'"()]/g, " ").split(/\s+/).filter(Boolean);

function matchPct(source: string, heard: string): number {
  const src = tokens(source);
  if (src.length === 0) return 0;
  const heardSet = new Set(tokens(heard));
  const hit = src.filter((t) => heardSet.has(t)).length;
  return Math.round((hit / src.length) * 100);
}

console.log(`model=${MODEL} voice=${VOICE}\n`);
const results: Array<{ id: string; lang: string; bytes: number; secs: number; heard: string; match: number; heard_lang: string | null; note?: string }> = [];

for (const s of SAMPLES) {
  const langCode = s.forceLang ?? s.lang;
  try {
    const bytes = await synthesize(s.text, langCode);
    const secs = Math.round(((bytes.length * 8) / 128000) * 10) / 10;
    writeFileSync(`${DIR}/${s.id}.mp3`, bytes);
    const heard = await transcribe(bytes, `${s.id}.mp3`);
    const match = matchPct(s.text, heard.text);
    results.push({ id: s.id, lang: langCode, bytes: bytes.length, secs, heard: heard.text, match, heard_lang: heard.language, note: s.note });
    console.log(
      `${s.id.padEnd(14)} lang=${langCode} ${String(bytes.length).padStart(6)}B ${String(secs).padStart(4)}s ` +
      `match=${String(match).padStart(3)}%  heard(${heard.language}): ${heard.text}`,
    );
    if (s.note) console.log(" ".repeat(16) + `↳ ${s.note}`);
  } catch (e) {
    console.log(`${s.id.padEnd(14)} FAILED: ${e instanceof Error ? e.message : String(e)}`);
  }
}

console.log("\n=== SUMMARY ===");
for (const r of results) {
  const verdict = r.match >= 80 ? "PASS" : r.match >= 50 ? "PARTIAL" : "FAIL";
  console.log(`${verdict.padEnd(8)} ${r.id.padEnd(14)} ${r.match}% word match`);
}
console.log(`\naudio saved in ${DIR} for listening`);
