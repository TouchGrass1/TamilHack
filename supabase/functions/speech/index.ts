/**
 * Supabase Edge Function host — the Lovable-native deployment target.
 *
 * The ENTIRE backend lives in _shared/core (synced from src/core via
 * `npm run sync-core`); this file is just a 1-line host.
 *
 * Deploy:
 *   supabase secrets set ELEVENLABS_API_KEY=sk_...
 *   supabase functions deploy speech
 */

import { handleHttpRequest } from "../_shared/core/http.ts";

Deno.serve(handleHttpRequest);
