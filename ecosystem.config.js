// PM2 process config for self-hosting the Next.js site (e.g. on Lightsail).
// Start:   pm2 start ecosystem.config.js
// Reload:  pm2 reload privamesh
module.exports = {
  apps: [
    {
      name: 'privamesh',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      max_memory_restart: '450M',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
        // Runtime secrets (or put them in .env.local on the server):
        // BLOG_INGEST_TOKEN: '...',
        // GOOGLE_SITE_VERIFICATION: '...',
      },
    },
  ],
}
