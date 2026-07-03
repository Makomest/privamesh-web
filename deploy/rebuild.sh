#!/usr/bin/env bash
# Rebuild + reload the site after content changes (e.g. a new blog post).
# Because the site is statically generated, new posts need a rebuild.
#
# Run manually, from cron, or as the final step of the n8n publish workflow
# (n8n "Execute Command" node: bash /home/ubuntu/privamesh/deploy/rebuild.sh).
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"

# If you track the repo with git, pull the latest first (optional):
# git pull --ff-only

npm run build
pm2 reload privamesh --update-env
echo "privamesh rebuilt and reloaded at $(date -u +%FT%TZ)"
