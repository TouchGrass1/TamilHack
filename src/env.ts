/**
 * Minimal .env loader for the local Node host (no dotenv dependency).
 * Supabase Edge Functions use `supabase secrets set` instead.
 * Real env vars always win over .env values.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

export function loadEnvFile(paths: string[] = [".env", "../.env"]): void {
  for (const p of paths) {
    let content: string;
    try {
      content = readFileSync(join(process.cwd(), p), "utf8");
    } catch {
      continue;
    }
    for (const line of content.split(/\r?\n/)) {
      const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      const [, key, raw] = match;
      if (process.env[key] !== undefined) continue;
      process.env[key] = raw.replace(/^["']|["']$/g, "").trim();
    }
  }
}
