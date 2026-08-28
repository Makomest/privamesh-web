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

say "Web server"
# Caddy serves this box; an Nginx install exists in the docs for other hosts.
# Find out which rather than assume, then edit in place - never replace. The
# Caddyfile also carries the n8n block and the Nginx site has been rewritten by
# certbot, so a clobber would take down more than analytics.
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

CADDYFILE=""
for f in /etc/caddy/Caddyfile "$HOME/Caddyfile"; do
  if [ -f "$f" ] && grep -q "privamesh.org" "$f" 2>/dev/null; then CADDYFILE="$f"; break; fi
done

NGINX_FILE=""
if [ -d /etc/nginx/sites-available ]; then
  NGINX_FILE=$(sudo grep -rls "server_name.*privamesh" /etc/nginx/sites-available 2>/dev/null | head -1 || true)
fi

if [ -n "$CADDYFILE" ]; then
  echo "Caddy, at $CADDYFILE"
  sudo cp "$CADDYFILE" "${CADDYFILE}.bak.$(date +%s)"
  sudo python3 "$HERE/patch-caddy.py" "$CADDYFILE" "$PORT" || die "could not patch $CADDYFILE"
  sudo caddy validate --config "$CADDYFILE" --adapter caddyfile \
    || die "Caddy rejected the edited file. Restore the newest .bak next to $CADDYFILE"
  sudo systemctl reload caddy
elif [ -n "$NGINX_FILE" ]; then
  echo "Nginx, at $NGINX_FILE"
  sudo cp "$NGINX_FILE" "${NGINX_FILE}.bak.$(date +%s)"
  sudo python3 "$HERE/patch-nginx.py" "$NGINX_FILE" "$PORT" || die "could not patch $NGINX_FILE"
  sudo nginx -t || die "nginx rejected the edited file. Restore the newest .bak next to $NGINX_FILE"
  sudo systemctl reload nginx
else
  die "could not find what serves privamesh.org - checked /etc/caddy/Caddyfile and /etc/nginx/sites-available"
fi

say "Site configuration"
# Asked for rather than passed in. A placeholder like <id> on a command line is
# read by the shell as a redirect from a file named id, and a password on a
# command line lands in shell history; a prompt avoids both.
WEBSITE_ID="${UMAMI_WEBSITE_ID:-}"
UMAMI_PW="${UMAMI_PASSWORD:-}"

# Already registered on a previous run? Then just ask for the ID.
if [ -z "$WEBSITE_ID" ] && [ -f "$ENV_FILE" ]; then
  WEBSITE_ID=$(sed -n 's/^UMAMI_WEBSITE_ID=//p' "$ENV_FILE" | head -1)
fi
if [ -z "$WEBSITE_ID" ] && [ -t 0 ]; then
  read -r -p "Umami Website ID (blank if you have not registered the site yet): " WEBSITE_ID
fi

if [ -z "$WEBSITE_ID" ]; then
  cat <<'MSG'

Umami is up on 127.0.0.1:3001, but no website is registered yet and only you can
do that. Its dashboard is deliberately not on the internet, so reach it through
a tunnel.

  1. On YOUR LAPTOP - a new terminal window, NOT this server - run:

       ssh -L 3001:127.0.0.1:3001 ubuntu@18.197.243.40

     Leave that window open. Running it here would only try to ssh from the
     server back to itself.

  2. In your browser, open http://127.0.0.1:3001 and log in: admin / umami
  3. Change that password immediately - it is a published default.
  4. Add a website: name PrivaMesh, domain privamesh.org
  5. Settings shows its Website ID. Copy it.

Then run this script again - it will ask for the ID and the password.

MSG
  exit 0
fi

if [ -z "$UMAMI_PW" ]; then
  read -r -s -p "Umami password for user ${UMAMI_USERNAME:-admin}: " UMAMI_PW
  echo
  [ -n "$UMAMI_PW" ] || die "no password given"
fi

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
set_var UMAMI_PASSWORD "$UMAMI_PW"
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
