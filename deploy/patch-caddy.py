#!/usr/bin/env python3
"""
Insert the two Umami routes into the Caddyfile that serves privamesh.org.

Edits in place rather than replacing the file: the same Caddyfile carries the
n8n block, and overwriting it would take that down too. Run by setup-umami.sh,
which backs the file up first and runs `caddy validate` before reloading.
"""
import re
import sys

path, port = sys.argv[1], sys.argv[2]
src = open(path).read()

# Look for our own route, not just the port. This Caddyfile serves several
# sites and one of the others already mentioned 3001, so a port-anywhere check
# reported "already patched" on a file that had never been touched.
if 'reverse_proxy /script.js' in src:
    print('already patched')
    sys.exit(0)

# Anchor on the line that proxies the site itself and go in directly above it.
# Caddy evaluates these in the order written and a bare path matcher is exact,
# so the two specific paths win while everything else still reaches the site.
m = re.search(r'(?m)^([ \t]*)reverse_proxy\s+127\.0\.0\.1:3000\s*$', src)
if not m:
    sys.exit('could not find "reverse_proxy 127.0.0.1:3000" - add the routes by hand')

pad = m.group(1)
block = (
    f'{pad}# Umami analytics, proxied through this origin so the beacon is same-origin.\n'
    f'{pad}reverse_proxy /script.js 127.0.0.1:{port}\n'
    f'{pad}reverse_proxy /api/send 127.0.0.1:{port}\n'
)
open(path, 'w').write(src[:m.start()] + block + src[m.start():])
print('inserted 2 routes')
