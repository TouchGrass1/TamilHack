import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";

import { transcribeTurn, npcSpeak } from "@/lib/speech.functions";
import { Stage } from "@/dc/Stage";
import EntranceBoard from "@/boards/EntranceBoard";
import "@/dc/dc.css";

export const Route = createFileRoute("/entrance")({
  head: () => ({
    meta: [
      { title: "வாசல் · Paati's Entrance — Tamil RPG" },
      { name: "description", content: "Room 1: greet Paati, answer her five questions by voice or text." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;600&family=Noto+Sans+Tamil:wght@500;700&display=swap",
      },
    ],
  }),
  component: EntranceRoom,
});

/**
 * Speech bridge for the EntranceBoard:
 *  - tts(text, mood): ElevenLabs TTS (Paati = elder_host voice), resolves with an
 *    Audio element even on failure — it falls back to the uploaded backup MP3.
 *  - stt(blob, expectedText): Scribe v3 batch transcription + rubric draft.
 */
function useSpeechBridge() {
  const npcSpeakFn = useServerFn(npcSpeak);
  const transcribeFn = useServerFn(transcribeTurn);

  return useMemo(
    () => ({
      async tts(text: string, mood: string | null) {
        try {
          const res = await npcSpeakFn({
            data: { text, npc: "elder_host", mood: mood ?? undefined, language: "ta" },
          });
          return new Audio(`data:audio/mpeg;base64,${res.audio}`);
        } catch {
          // TTS unavailable — play the user's backup recording instead of silence
          return new Audio("/audio/backup-paatri-entrance.mp3");
        }
      },
      async stt(blob: Blob, expectedText: string) {
        const audioBase64 = await blobToBase64(blob);
        // Firefox records ogg/opus, Chrome/Safari record webm or mp4
        const ext = blob.type.includes("mp4") ? "m4a" : blob.type.includes("ogg") ? "ogg" : "webm";
        return transcribeFn({
          data: {
            audioBase64,
            mime: blob.type || "audio/ogg",
            filename: `turn.${ext}`,
            difficulty: "easy",
            language: "auto",
            expectedText: expectedText || undefined,
            keyterms: false,
          },
        });
      },
    }),
    [npcSpeakFn, transcribeFn],
  );
}

async function blobToBase64(blob: Blob): Promise<string> {
  const buf = new Uint8Array(await blob.arrayBuffer());
  let bin = "";
  const CHUNK = 0x8000;
  for (let i = 0; i < buf.length; i += CHUNK) {
    bin += String.fromCharCode(...buf.subarray(i, i + CHUNK));
  }
  return btoa(bin);
}

function EntranceRoom() {
  const bridge = useSpeechBridge();
  // The generated board is client-only (mic, audio, localStorage) — render after mount
  // so SSR never fights the browser-only code during hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-[#120d18]">
      <Stage>
        {mounted ? <EntranceBoard {...bridge} /> : null}
      </Stage>
      <div className="pointer-events-none fixed bottom-2 right-3 z-50 text-[11px] text-white/25">
        room 1 of 6 · speech: Scribe v3 + Eleven v3 ·{" "}
        <a href="/debug" className="pointer-events-auto underline hover:text-white/50">
          debug console
        </a>
      </div>
    </div>
  );
}
