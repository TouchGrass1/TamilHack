# TamilHack — Speech Backend (STT + TTS) for the Tamil RPG

Repo layout:

- `lovable-export/` — **the Lovable web app** (TanStack Start + React 19).
  Run locally: `cd lovable-export && bun install && set -a && source .env …`
  — see `lovable-export/README.md` / `docs/LOVABLE_TRANSFER.md`.
  Routes: `/` = realtime Echo (Scribe v2 realtime via `@elevenlabs/react`),
  `/debug` = batch pipeline console (Scribe v3 + rubric scoring + Eleven v3 TTS
  + backup-audio fallbacks in `lovable-export/public/audio/`).
- `src/`, `supabase/`, `scripts/` — standalone runtime-agnostic speech core
  (Node/Hono dev server + Supabase Edge Function host), kept as the canonical
  copy that is ported into the Lovable app (`src/lib/speech/` there).
- `public-audio/` — original backup MP3 assets (app copies live in
  `lovable-export/public/audio/`).

Requires the `ELEVENLABS_API_KEY` (and optionally `VOICE_*`) secrets — locally
via `.env` (copy `.env.example`), in Lovable via Secrets. Never commit them.

---

Backend for the 2D pixel-art Tamil-learning RPG (blueprint Section 10,
speech & AI pipeline steps 1, 2, and 4). Built to transfer into a
**Lovable**-managed project with Supabase Edge Functions — see
[docs/LOVABLE_TRANSFER.md](docs/LOVABLE_TRANSFER.md).

## Architecture

```
src/core/                 ← THE BACKEND. Zero deps, Web APIs only, runs on
  types.ts                  Node, Deno (Supabase), and Bun unchanged.
  turn.ts                     One speaking turn → blueprint TurnEvalDraft JSON
  http.ts                     Entire HTTP surface (Request→Response, CORS incl.)
  packs/tamil.ts              Language pack: models, voices, loanwords, lexicons
  stt/
    scribe.ts                 ElevenLabs Scribe v3 (Tamil + Tanglish code-switch)
    grading.ts                Pronunciation Green/Yellow/Red (logprob + alignment)
    fluency.ts                Pacing, pauses >1.5s, fillers, false starts
    tanglish.ts               Tanglish↔Tamil ratio vs difficulty threshold
    langid.ts                 ta / romanized_ta / en / proper_noun / loanword
    romanize.ts               Tamil script → Tanglish transliteration (dual UI)
  tts/
    elevenlabs.ts             Eleven v3 TTS + NPC mood [audio tags] + caching
  vendor/hash.ts              Web Crypto SHA-1 (runtime-agnostic)

src/app.ts, src/index.ts  ← Node host (local dev only)
supabase/functions/speech ← Deno host (Lovable production)
scripts/                  ← sync-core, smoke tests, sample WAV generator
```

## Quickstart (local)

```bash
npm install
cp .env.example .env        # add ELEVENLABS_API_KEY
npm run dev                 # http://localhost:8787
npm run smoke               # health + STT turn + TTS sanity
```

## Endpoints

| Method | Path | Body | Returns |
|---|---|---|---|
| GET | `/health` | — | config status, missing voices |
| GET | `/voices` | — | NPC voice + mood map |
| POST | `/stt/turn` | multipart: `file`, `difficulty` (easy/medium/hard), `expected_text` (Easy mode reference line), `keyterms` ("true"), `vad_pause_seconds` | blueprint `TurnEvalDraft` JSON |
| POST | `/tts/npc` | JSON `{text, npc, mood}` | audio/mpeg (cached) |
| POST | `/tts/reference` | JSON `{text}` | audio/mpeg — Inspect Line [Play Native Tamil] |
| POST | `/tts/word` | JSON `{word}` | audio/mpeg — Mistake Deck drill clip |

### Example turn request (Easy mode)

```bash
curl -X POST http://localhost:8787/stt/turn \
  -F "file=@turn.webm" \
  -F "difficulty=easy" \
  -F "expected_text=Anna, Indiranagar porathukku evvalavu aagum"
```

### Example turn response (abridged)

```json
{
  "transcript_tamil_script": "அண்ணா, இந்திராநகர்...",
  "transcript_transliterated": "aṇṇā, indiranagar...",
  "scores": { "tanglish_ratio": 25, "pronunciation": 21,
              "politeness_register": null, "fluency_pacing": 22, "total": 68 },
  "word_analysis": [
    { "word": "porathukku", "lang": "romanized_ta", "status": "yellow", "score": 74,
      "logprob": -0.62, "tip": "..." },
    { "word": "like", "lang": "en", "status": "english", "score": null }
  ],
  "fluency": { "speech_rate": 2.1, "long_pauses": 1, "fillers": ["um"] },
  "mistakes": [{ "type": "pronunciation_miss", "word": "...", "score": 52 }],
  "llm_pending": { "english_translation": null, "politeness_register": null,
                   "next_dialogue_node_id": null }
}
```

`politeness_register`, `english_translation`, `next_dialogue_node_id`,
`npc_register_reaction`, `try_in_tamil`, and `register_mismatch` mistake
cards are **your teammate's LLM grader's job** — it merges those fields over
this draft (see docs/LOVABLE_TRANSFER.md).

## ElevenLabs configuration notes

- **STT:** `scribe_v3`, `language_code=ta`, `secondary_language_codes=en`
  (official mixed-language mode — the Tanglish enabler), word-level
  timestamps, **verbatim** (no `no_verbatim` — the Fluency pillar needs
  fillers/false starts).
- **TTS:** `eleven_v3` (Tamil + inline `[sighs]`/`[laughs]`/`[serious]`
  audio tags → NPC moods). Pick voices from the Voice Library with the
  **Tamil** language filter, then set them in `packs/tamil.ts` or as
  `VOICE_*` env/secrets. `/health` lists missing ones.
- **Caching:** all TTS responses are content-hashed; menu/sign/prop audio
  should be pre-generated at content-build time (immutable).
- **Slow drills:** one normal-speed clip per word; the client plays at
  `playbackRate 0.6`.

## Calibration knobs (tune against real recordings)

- `stt/grading.ts → GRADING_CALIBRATION` — logprob bands for Green/Yellow/Red
- `stt/fluency.ts → FLUENCY_CALIBRATION` — pause threshold & penalties
- `packs/tamil.ts → DIFFICULTY_CONFIG` — English share per difficulty

## Status

- ✅ Phase 1 scope: batch turn STT + rubric pillars 1, 2, 4 + TTS (NPC,
  reference, drills) + caching + dual-script romanization
- ✅ **Live-verified** with a real key: TTS→STT loop (Tamil line → Scribe →
  graded words → scores), Tanglish line (mixed speech → Tamil script,
  Yellow/Red grading), NPC mood tags, cache miss→hit
- ⏳ Phase 2: `scribe_v3_live` realtime streaming (`multilang_mode=true`)
- ⏳ LLM grader merge (teammate), player-audio persistence, forced alignment

### Known MVP limitations (LLM grader reconciles these)

- Scribe Tamil-scriptifies spoken English loanwords (`bill` → `பில்`), so the
  script-based Tanglish ratio reads optimistic; the LLM should re-classify
  tokens against the loanword whitelist.
- Multi-word proper nouns spoken as two words (`indiranagar` → `இந்திரா நகர்`)
  don't align to a single expected token (shows as a Red miss).
- Romanizer is letter-level Tanglish (no intervocalic voicing: `க` mid-word
  gives `k`, Tanglish writes `g`).
