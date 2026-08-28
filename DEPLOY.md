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
stores no IP address, MIT licensed. It was chosen over Plausible mainly for
what this box can carry: Plausible needs ClickHouse and about 4 GB, Umami runs
in roughly 200 MB against Postgres. On a privacy product, analytics that ship a
third party a record of every visitor would be arguing against our own page, so
self-hosted was the only option worth considering. It also means no consent
banner is owed.

**Check there is room first.** This instance already runs n8n and the site, and
`npm run build` is the thing most likely to be killed if memory runs out:

```bash
free -m          # want a few hundred MB free, plus the 2 GB swap from step 2
```

Install it alongside, on its own port:

```bash
mkdir -p ~/umami && cd ~/umami
curl -fsSL https://raw.githubusercontent.com/umami-software/umami/master/docker-compose.yml -o docker-compose.yml
# bind the app to localhost only - Nginx will be the way in
sed -i 's/"3000:3000"/"127.0.0.1:3001:3000"/' docker-compose.yml
docker compose up -d
```

Log in at `http://127.0.0.1:3001` (default `admin` / `umami`) — **change that
password immediately**, it is a published default. Add the website, and copy
the website ID from Settings.

Serve it from a subdomain so the tracking script is not blocked as third-party.
Add an Nginx server block for `analytics.privamesh.org` proxying to
`127.0.0.1:3001`, point an A record at this box, then:

```bash
sudo certbot --nginx -d analytics.privamesh.org
```

Then tell the site about it, in `~/privamesh/.env.local`:

```bash
NEXT_PUBLIC_UMAMI_URL=https://analytics.privamesh.org
NEXT_PUBLIC_UMAMI_WEBSITE_ID=<the website ID>
UMAMI_URL=http://127.0.0.1:3001
UMAMI_USERNAME=admin
UMAMI_PASSWORD=<the password you just set>
```

The two `NEXT_PUBLIC_` values are read **at build time** - they go into the
page source and into the Content-Security-Policy host allowlist - so the build
must run after they are set, or the beacon ships and our own policy blocks it:

```bash
cd ~/privamesh && npm run build && pm2 reload privamesh --update-env
```

The other three are read at request time and never leave the server: the admin
browser talks to our API, our API talks to Umami. With any of them missing the
panel says Umami is not connected rather than showing zeroes, which would read
as a traffic collapse.

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
