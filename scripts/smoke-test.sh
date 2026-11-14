#!/usr/bin/env bash
# Quick smoke test against a locally running server (npm run dev).
# Usage: bash scripts/smoke-test.sh [path/to/audio.mp3|wav|webm]
set -euo pipefail
cd "$(dirname "$0")/.."

BASE="${BASE:-http://localhost:8787}"

echo "== GET /health =="
curl -sf "$BASE/health" | head -20
echo

AUDIO="${1:-}"
if [ -z "$AUDIO" ]; then
  echo "== Generating 1s silence sample (tests/silence.wav) =="
  mkdir -p tests
  node scripts/make-sample-wav.mjs tests/silence.wav
  AUDIO="tests/silence.wav"
fi

echo "== POST /stt/turn with $AUDIO =="
curl -s -X POST "$BASE/stt/turn" \
  -F "file=@$AUDIO" \
  -F "difficulty=easy" \
  -F "expected_text=vanakkam anna eppadi irukku" \
  | head -80
echo

if [ -n "${ELEVENLABS_API_KEY:-}" ]; then
  echo "== POST /tts/word (needs configured narrator voice) =="
  curl -s -o /tmp/drill.mp3 -w "status=%{http_code} size=%{size_download}\n" \
    -X POST "$BASE/tts/word" -H "content-type: application/json" \
    -d '{"word":"vanakkam"}'
else
  echo "ELEVENLABS_API_KEY not exported — skipping TTS call"
fi
