/**
 * Local Node host for development/testing.
 * The same core runs on Supabase Edge Functions for Lovable — see
 * docs/LOVABLE_TRANSFER.md.
 */

import { serve } from "@hono/node-server";
import { createApp } from "./app.ts";
import { loadEnvFile } from "./env.ts";

loadEnvFile();

const port = Number(process.env.PORT ?? 8787);

serve({ fetch: createApp().fetch, port }, (info) => {
  console.log(`tamil-speech-backend listening on http://localhost:${info.port}`);
  console.log(`  GET  /health`);
  console.log(`  POST /stt/turn       (multipart: file, difficulty, expected_text)`);
  console.log(`  POST /tts/npc        (json: text, npc, mood)`);
  console.log(`  POST /tts/word       (json: word)`);
  console.log(`  POST /tts/reference  (json: text)`);
});
