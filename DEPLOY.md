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
