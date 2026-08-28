# Self-hosting PrivaMesh on Ubuntu (Lightsail)

Deploys the Next.js site to your existing Lightsail Ubuntu box (alongside n8n),
served on **privamesh.org** with HTTPS. Static site + `next start` behind Nginx.

Server in this guide: `18.197.243.40` (Frankfurt), user `ubuntu`, app dir
`/home/ubuntu/privamesh`.

---

## 0. DNS (do this first — propagation takes time)

At your domain registrar, point the domain at the server:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `18.197.243.40` |
| A | `www` | `18.197.243.40` |

(Tip: attach a **Static IP** in Lightsail → Networking so the IP never changes.)

In Lightsail → Networking → Firewall on the instance, allow **HTTP (80)** and
**HTTPS (443)** if not already open.

---

## 1. Get the code onto the server

**Option A — GitHub (recommended, easy updates):**

On your Mac (one-time):
```bash
cd /Users/roni/Documents/privamesh.org
git init && git add -A && git commit -m "PrivaMesh site"
# create an EMPTY private repo on github.com first, then:
git remote add origin git@github.com:<you>/privamesh-web.git
git branch -M main && git push -u origin main
```
On the server:
```bash
cd ~ && git clone https://github.com/<you>/privamesh-web.git privamesh
```

**Option B — direct copy (no GitHub):**
```bash
# from your Mac (excludes node_modules/.next):
rsync -av --exclude node_modules --exclude .next --exclude .git \
  /Users/roni/Documents/privamesh.org/  ubuntu@18.197.243.40:/home/ubuntu/privamesh/
```

---

## 2. Install Node 20 + PM2 (skip what you already have)

```bash
# Node 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v          # expect v20.x
sudo npm i -g pm2
```

Recommended on a 2 GB box (build + n8n): add swap so the build doesn't OOM.
```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 3. Build + run the site

```bash
cd ~/privamesh
npm ci
npm run build

# runtime secrets (optional): create .env.local
printf 'BLOG_INGEST_TOKEN=mnPEqzdf3T6k3XVyKDoOeaLNcgRAYzT_jjGVt-IOgmo\n' > .env.local
# (add GOOGLE_SITE_VERIFICATION=... later from Search Console)

pm2 start ecosystem.config.js
pm2 save
pm2 startup      # run the command it prints (enables boot start)
curl -I localhost:3000   # should return HTTP 200
```

---

## 4. Nginx reverse proxy

```bash
sudo apt-get install -y nginx
sudo cp deploy/nginx-privamesh.conf /etc/nginx/sites-available/privamesh
sudo ln -s /etc/nginx/sites-available/privamesh /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```
Your existing n8n Nginx config is untouched — this is a separate server block
matched by `server_name privamesh.org`.

Visit `http://privamesh.org` — the site should load (once DNS has propagated).

---

## 5. HTTPS (Let's Encrypt, free, auto-renew)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d privamesh.org -d www.privamesh.org
```
Choose "redirect HTTP to HTTPS". Certbot edits the Nginx block and sets up
auto-renewal. Done — `https://privamesh.org` is live.

---

## 6. Blog auto-publish (n8n → live post)

The site is statically generated, so a new post needs a rebuild. Since n8n runs
on the same box, wire it up like this:

1. n8n workflow posts the article to `http://localhost:3000/api/blog`
   (leave `GITHUB_*` env unset → the API writes the file to `content/blog/<locale>/`).
2. Add a final **Execute Command** node in n8n:
   ```
   bash /home/ubuntu/privamesh/deploy/rebuild.sh
   ```
   It runs `npm run build && pm2 reload privamesh` — the post goes live in ~1 min.

`deploy/rebuild.sh` is included and executable. Only rebuilds when you publish.

---

## Analytics: downloads and traffic in /admin

The admin panel shows two things it did not before: how many times each build
was downloaded, and who is on the site.

### Downloads need no setup

They come from the GitHub releases API, which counts every fetch of an asset -
including downloads that never touched this site, which a click handler on our
own button would miss. Nothing to install and nothing to configure.

iPhone installs are absent on purpose: Apple reports those in App Store Connect
and does not expose them to us. A number that quietly counted only two of three
platforms would be worse than an empty slot.

### Traffic needs Umami

[Umami](https://github.com/umami-software/umami) — self-hosted, cookieless,
stores no IP address, MIT licensed. Chosen over Plausible mainly for what this
box can carry: Plausible needs ClickHouse and about 4 GB, Umami runs in roughly
200 MB against Postgres. On a privacy product, analytics that ship a third
party a record of every visitor would be arguing against our own pages, so
self-hosted was the only option worth considering. It also means no consent
banner is owed.

Run the script. It is idempotent, so a second run is safe, and it does the whole
thing in one pass:

```bash
bash ~/privamesh/deploy/setup-umami.sh
```

It refuses to start if memory is short, installs Docker if missing, brings Umami
up **bound to 127.0.0.1:3001**, works out whether Caddy or Nginx serves the site
and patches that config in place — backup first, `caddy validate` or `nginx -t`
before any reload. Neither file is ever replaced: the Caddyfile also carries the
n8n block and an Nginx site has been rewritten by certbot.

It then asks for a password (silently, so it stays out of shell history) and
**registers the site over Umami's own API**: changes the default `umami`
password to the one you give, creates the website, reads back its ID, writes
`.env.local`, rebuilds and reloads.

**There is no dashboard step and no SSH tunnel**, which is deliberate. Umami's
dashboard is not exposed to the internet, and this box does not answer on port
22 from every network either — so "open a tunnel and click through the wizard"
is not a step that can be relied on. Everything that wizard does is an API call,
and the script makes them over localhost.

If you do want the dashboard later and can reach port 22, forward it **from your
laptop, not from the server**:

```bash
ssh -L 3001:127.0.0.1:3001 ubuntu@18.197.243.40   # then open http://127.0.0.1:3001
```

**Why there is no analytics subdomain.** Nginx proxies `/script.js` and
`/api/send` from privamesh.org straight to Umami, so the beacon is same-origin.
No DNS record, no second certificate, nothing added to the CSP, and no hostname
for a blocklist to match the way it would match `analytics.privamesh.org`.
`/api/send` cannot be renamed: the tracker script has that path compiled into
it at image build time, so `COLLECT_API_ENDPOINT` changes only where the server
listens, not where the browser posts.

**Umami's own dashboard is not on the internet**, which is why its default
`admin` / `umami` login is survivable. Reach it over a tunnel when you want the
full view:

```bash
ssh -L 3001:127.0.0.1:3001 ubuntu@18.197.243.40   # then open http://127.0.0.1:3001
```

Change that password on first login anyway.

The site reads Umami server-side: the admin browser calls our API, our API calls
Umami over localhost, so the password never reaches a browser. Only the website
ID is public. It is read at **build time**, which is why the script rebuilds —
set it without rebuilding and no beacon ships. With it unset, none ships at all
and the panel says Umami is not connected rather than showing zeroes that would
read as a traffic collapse.

## Publishing a news update

`/news` reads `data/updates.json`, and `/data` is in `.gitignore` on purpose:
the `/admin` UI writes that file at runtime on the server, so a `git pull` must
never overwrite it. That also means **news entries do not ship in a commit** —
pushing one changes nothing on the live site.

Two ways to publish:

- **The intended one.** Log in at `https://privamesh.org/admin` and add the
  entry there. The API behind it (`/api/admin/updates`) is cookie-protected, so
  there is no token to curl with.
- **By hand**, when the text was drafted locally:
  ```bash
  scp data/updates.json ubuntu@18.197.243.40:/home/ubuntu/privamesh/data/updates.json
  ```
  The news page is `force-dynamic`, so it picks the file up on the next request
  with no rebuild and no `pm2 reload`.

The page carries `robots: noindex` while the file is empty or missing, and adds
itself to the sitemap once it is not — both automatic, neither needs an edit.

## Updating the site later

```bash
cd ~/privamesh
git pull            # (Option A) or rsync again (Option B)
npm ci
npm run build
pm2 reload privamesh
```

## Handy commands
```bash
pm2 logs privamesh      # app logs
pm2 restart privamesh   # restart
sudo tail -f /var/log/nginx/error.log
```
