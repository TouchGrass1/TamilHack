#!/usr/bin/env bash
# Sync the runtime-agnostic core into the Supabase Edge Functions folder.
# Run this after editing src/core/**.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p supabase/functions/_shared
rsync -a --delete src/core/ supabase/functions/_shared/core/
echo "synced src/core → supabase/functions/_shared/core"
