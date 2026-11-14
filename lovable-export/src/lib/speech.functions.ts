import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { processPlayerTurn } from "@/lib/speech/turn";
import { tamilPack } from "@/lib/speech/packs/tamil";
import { detectScriptLang } from "@/lib/speech/translate";
import {
  synthesizeSpeech,
  synthesizeWordClip,
  memoryCache,
  type AudioCache,
} from "@/lib/speech/tts/elevenlabs";

/**
 * Game-pipeline server functions (batch STT + rubric scoring + TTS).
 *
 * Realtime STT (useScribe token) and gateway-LLM translation live in
 * voice.functions.ts. This file exercises the batch scribe_v3 pipeline:
 * Tanglish transcript, 4-pillar rubric draft, word coloring, mistake deck.
 */

const audioCache: AudioCache = memoryCache();

function elevenKey() {
  const k = process.env["ELEVENLABS_API_KEY"];
  if (!k) throw new Error("ElevenLabs is not connected (ELEVENLABS_API_KEY secret missing)");
  return k;
}

const Difficulty = z.enum(["easy", "medium", "hard"]);

export const transcribeTurn = createServerFn({ method: "POST" })
  .validator((d) =>
    z
      .object({
        audioBase64: z.string().min(1),
        mime: z.string().default("audio/webm"),
        filename: z.string().default("turn.webm"),
        difficulty: Difficulty.default("easy"),
        language: z.enum(["auto", "en", "ta"]).default("auto"),
        expectedText: z.string().max(500).optional(),
        keyterms: z.boolean().default(false),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const audio = new Uint8Array(Buffer.from(data.audioBase64, "base64"));
    return processPlayerTurn(
      {
        audio,
        mime: data.mime,
        filename: data.filename,
        difficulty: data.difficulty,
        ...(data.expectedText ? { expectedText: data.expectedText } : {}),
        ...(data.language !== "auto" ? { languageOverride: data.language } : {}),
        keyterms: data.keyterms,
        pack: tamilPack,
      },
      elevenKey(),
    );
  });

export const npcSpeak = createServerFn({ method: "POST" })
  .validator((d) =>
    z
      .object({
        text: z.string().min(1).max(2000),
        npc: z.string().default("narrator"),
        mood: z.string().max(30).optional(),
        language: z.enum(["auto", "en", "ta"]).optional(),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const languageCode =
      data.language === "auto" ? detectScriptLang(data.text) : data.language;
    const out = await synthesizeSpeech(
      {
        text: data.text,
        npc: data.npc,
        ...(data.mood ? { mood: data.mood } : {}),
        ...(languageCode ? { languageCode } : {}),
        pack: tamilPack,
      },
      audioCache,
      elevenKey(),
    );
    return { audio: Buffer.from(out.bytes).toString("base64"), fromCache: out.fromCache };
  });

export const speakWord = createServerFn({ method: "POST" })
  .validator((d) => z.object({ word: z.string().min(1).max(60) }).parse(d))
  .handler(async ({ data }) => {
    const out = await synthesizeWordClip(data.word, audioCache, elevenKey(), tamilPack);
    return { audio: Buffer.from(out.bytes).toString("base64"), fromCache: out.fromCache };
  });

export const listVoices = createServerFn({ method: "POST" }).handler(async () => {
  const voices = Object.fromEntries(
    Object.entries(tamilPack.voices).map(([k, v]) => {
      const env = process.env[`VOICE_${k.toUpperCase()}`];
      return [k, { voiceId: env || v.voiceId || null, moods: v.moods, register: v.register }];
    }),
  );
  const narrator = process.env["VOICE_NARRATOR"] || tamilPack.narratorVoiceId || null;
  return { narrator, voices };
});
