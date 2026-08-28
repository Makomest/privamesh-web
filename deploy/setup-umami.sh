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

# Resolved before anything changes directory - later steps cd into ~/umami and
# ~/privamesh, so a relative path worked out down there points nowhere.
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

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
swapfree=$(awk '/SwapFree/ {print int($2/1024)}' /proc/meminfo)
headroom=$(( avail + swapfree ))
echo "available: ${avail} MB + ${swapfree} MB free swap = ${headroom} MB"
# SwapTotal is the wrong number to look at: swap that is already full helps
# nobody. `next build` is the hungriest thing that runs here and it is what gets
# killed - or worse, it takes a neighbouring container with it.
if [ "$headroom" -lt 600 ]; then
  die "only ${headroom} MB of headroom. A Next.js build needs more, and the OOM killer does not stop at this process. Free something up or add swap (DEPLOY.md step 2)."
fi
if [ "$headroom" -lt 1000 ]; then
  echo "WARNING: ${headroom} MB is tight for a Next.js build. Watch for an OOM kill."
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

say "Registering the site in Umami"
# Done over the API from here rather than by hand in the dashboard. That
# dashboard is deliberately not on the internet, and this box does not answer on
# port 22 either, so the "open an SSH tunnel and click around" step is not
# available at all. Everything the wizard does is an API call over localhost.
UMAMI_PW="${UMAMI_PASSWORD:-}"
if [ -z "$UMAMI_PW" ]; then
  if [ -f "$ENV_FILE" ]; then
    UMAMI_PW=$(sed -n 's/^UMAMI_PASSWORD=//p' "$ENV_FILE" | head -1)
  fi
fi
if [ -z "$UMAMI_PW" ]; then
  [ -t 0 ] || die "no password: set UMAMI_PASSWORD, or run this from a terminal so it can ask"
  # Read rather than take on the command line, so it stays out of shell history.
  read -r -s -p "Password to set for Umami user ${UMAMI_USERNAME:-admin}: " UMAMI_PW
  echo
  [ -n "$UMAMI_PW" ] || die "no password given"
fi

WEBSITE_ID=$(python3 "$HERE/umami-register.py" \
  "http://127.0.0.1:${PORT}" "${UMAMI_USERNAME:-admin}" "$UMAMI_PW" "PrivaMesh" "privamesh.org") \
  || die "could not register the site in Umami"
[ -n "$WEBSITE_ID" ] || die "Umami returned no website ID"
echo "website ID: $WEBSITE_ID"

say "Site configuration"
touch "$ENV_FILE"
set_var() {
  local k="$1" v="$2"
  # Delete then append. Putting the value into a sed replacement would break on
  # any password containing & or the delimiter, which is not a limit worth having.
  sed -i "/^${k}=/d" "$ENV_FILE"
  printf '%s=%s\n' "$k" "$v" >> "$ENV_FILE"
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
