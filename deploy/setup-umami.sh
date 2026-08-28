#!/usr/bin/env bash
#
# Install Umami next to the site and wire it in. Run ON THE SERVER:
#
#   bash ~/privamesh/deploy/setup-umami.sh
#
# Safe to run twice: every step checks before it acts, nginx is patched in place
# with a backup rather than overwritten (certbot has edited that file and a
# clobber would take HTTPS with it), and nothing is reloaded until `nginx -t`
# passes.
#
# Umami itself is bound to 127.0.0.1 and never exposed. Its dashboard is reached
# over an SSH tunnel; the numbers you actually look at come through /admin.
set -euo pipefail

APP_DIR="${APP_DIR:-$HOME/privamesh}"
UMAMI_DIR="${UMAMI_DIR:-$HOME/umami}"
PORT=3001
NGINX_SITE=/etc/nginx/sites-available/privamesh
ENV_FILE="$APP_DIR/.env.local"

say() { printf '\n\033[1m==> %s\033[0m\n' "$*"; }
die() { printf '\n\033[31mstopped: %s\033[0m\n' "$*" >&2; exit 1; }

[ -d "$APP_DIR" ] || die "no site at $APP_DIR - set APP_DIR"

say "Checking there is room"
free -m || true
avail=$(awk '/MemAvailable/ {print int($2/1024)}' /proc/meminfo)
swap=$(awk '/SwapTotal/ {print int($2/1024)}' /proc/meminfo)
echo "available: ${avail} MB, swap: ${swap} MB"
if [ "$avail" -lt 400 ] && [ "$swap" -lt 1024 ]; then
  die "under 400 MB free and less than 1 GB of swap. Add swap first (DEPLOY.md step 2) - the site's own build is what gets killed when this runs out."
fi

say "Docker"
if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sudo sh
  sudo usermod -aG docker "$USER"
  echo "Docker installed. Your group membership needs a new login:"
  echo "  log out, log back in, and run this script again."
  exit 0
fi
docker compose version >/dev/null 2>&1 || die "docker compose plugin missing"

say "Umami container"
mkdir -p "$UMAMI_DIR"
cd "$UMAMI_DIR"
if [ ! -f docker-compose.yml ]; then
  curl -fsSL https://raw.githubusercontent.com/umami-software/umami/master/docker-compose.yml -o docker-compose.yml
  # Bind to loopback only. The published compose file exposes 3000 to the world,
  # which would put a dashboard with a documented default password on the internet.
  sed -i "s#\"3000:3000\"#\"127.0.0.1:${PORT}:3000\"#" docker-compose.yml
  grep -q "127.0.0.1:${PORT}:3000" docker-compose.yml || die "could not bind Umami to loopback - check docker-compose.yml by hand"
fi
docker compose up -d
echo "waiting for Umami to answer..."
for i in $(seq 1 60); do
  if curl -sf -o /dev/null "http://127.0.0.1:${PORT}/api/heartbeat"; then echo "up"; break; fi
  [ "$i" = 60 ] && die "Umami did not come up - check: cd $UMAMI_DIR && docker compose logs --tail=50"
  sleep 2
done

say "Nginx"
if [ ! -f "$NGINX_SITE" ]; then
  die "no $NGINX_SITE - the site is served some other way; add the two location blocks from deploy/nginx-privamesh.conf by hand"
fi
if grep -q "location = /api/send" "$NGINX_SITE"; then
  echo "already patched, leaving it alone"
else
  sudo cp "$NGINX_SITE" "${NGINX_SITE}.bak.$(date +%s)"
  # Insert before the FIRST "location / {" in each server block that has one.
  sudo python3 - "$NGINX_SITE" "$PORT" <<'PY'
import re, sys
path, port = sys.argv[1], sys.argv[2]
block = """    # Umami analytics, proxied through this origin so the beacon is same-origin.
    location = /script.js {
        proxy_pass http://127.0.0.1:%s/script.js;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    location = /api/send {
        proxy_pass http://127.0.0.1:%s/api/send;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

""" % (port, port)
src = open(path).read()
out, n = re.subn(r'(?m)^([ \t]*)location / \{', lambda m: block + m.group(0), src, count=0)
if n == 0:
    sys.exit("no `location / {` found to insert before")
open(path, 'w').write(out)
print(f"inserted into {n} server block(s)")
PY
  sudo nginx -t || die "nginx config test failed - restore the .bak file next to $NGINX_SITE"
  sudo systemctl reload nginx
fi

say "Site configuration"
WEBSITE_ID="${UMAMI_WEBSITE_ID:-}"
if [ -z "$WEBSITE_ID" ]; then
  cat <<'MSG'

Umami is running but has no website registered yet, and only you can do that:

  1. From your laptop, open a tunnel:
       ssh -L 3001:127.0.0.1:3001 ubuntu@18.197.243.40
  2. Visit http://127.0.0.1:3001 and log in with admin / umami.
  3. CHANGE THAT PASSWORD FIRST - it is a published default.
  4. Add a website: name PrivaMesh, domain privamesh.org.
  5. Copy its Website ID from Settings.

Then finish with:

  UMAMI_WEBSITE_ID=<id> UMAMI_PASSWORD=<new password> bash ~/privamesh/deploy/setup-umami.sh

MSG
  exit 0
fi
: "${UMAMI_PASSWORD:?set UMAMI_PASSWORD to the password you chose in the Umami dashboard}"

touch "$ENV_FILE"
set_var() {
  local k="$1" v="$2"
  if grep -q "^${k}=" "$ENV_FILE"; then
    sed -i "s|^${k}=.*|${k}=${v}|" "$ENV_FILE"
  else
    printf '%s=%s\n' "$k" "$v" >> "$ENV_FILE"
  fi
}
# No NEXT_PUBLIC_UMAMI_URL: the beacon is served from this origin.
set_var NEXT_PUBLIC_UMAMI_WEBSITE_ID "$WEBSITE_ID"
set_var UMAMI_URL "http://127.0.0.1:${PORT}"
set_var UMAMI_WEBSITE_ID "$WEBSITE_ID"
set_var UMAMI_USERNAME "${UMAMI_USERNAME:-admin}"
set_var UMAMI_PASSWORD "$UMAMI_PASSWORD"
chmod 600 "$ENV_FILE"

say "Rebuilding the site"
# NEXT_PUBLIC_* is read at build time, so the beacon only ships after this.
cd "$APP_DIR"
npm run build
pm2 reload privamesh --update-env

say "Checking"
curl -sI https://privamesh.org/script.js | head -1
curl -s https://privamesh.org/ | grep -o 'data-website-id="[^"]*"' | head -1 || echo "beacon NOT in the page"
echo
echo "Done. Traffic appears in /admin within a minute of the first visit."
