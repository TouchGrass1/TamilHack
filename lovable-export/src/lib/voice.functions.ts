import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateResponse } from "@lovable.dev/ai-gateway";

const Lang = z.enum(["en", "ta"]);
const NAMES = { en: "English", ta: "Tamil" } as const;

function elevenKey() {
  const k = process.env['ELEVENLABS_API_KEY'];
  if (!k) throw new Error("ElevenLabs is not connected");
  return k;
}

export const getScribeToken = createServerFn({ method: "POST" }).handler(async () => {
  const r = await fetch("https://api.elevenlabs.io/v1/single-use-token/realtime_scribe", {
    method: "POST",
    headers: { "xi-api-key": elevenKey() },
  });
  if (!r.ok) throw new Error(`Token failed [${r.status}]: ${await r.text()}`);
  return { token: (await r.json()).token as string };
});

export const translateText = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ text: z.string().min(1).max(5000), from: Lang, to: Lang }).parse(d))
  .handler(async ({ data }) => {
    if (data.from === data.to) return { text: data.text };
    const res = await generateResponse({
      model: "openai/gpt-6-astra",
      instructions: `Translate the user's ${NAMES[data.from]} text into natural ${NAMES[data.to]}. Reply with only the translation.`,
      input: data.text,
    });
    const out = (res as { output?: Array<{ content?: Array<{ type: string; text?: string }> }> }).output ?? [];
    const text = out.flatMap((o) => o.content ?? []).filter((c) => c.type === "output_text").map((c) => c.text).join("").trim();
    return { text };
  });

export const speak = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ text: z.string().min(1).max(5000) }).parse(d))
  .handler(async ({ data }) => {
    const r = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL?output_format=mp3_44100_128",
      {
        method: "POST",
        headers: { "xi-api-key": elevenKey(), "Content-Type": "application/json" },
        body: JSON.stringify({ text: data.text, model_id: "eleven_multilingual_v2" }),
      },
    );
    if (!r.ok) throw new Error(`Speech failed [${r.status}]: ${await r.text()}`);
    return { audio: Buffer.from(await r.arrayBuffer()).toString("base64") };
  });
