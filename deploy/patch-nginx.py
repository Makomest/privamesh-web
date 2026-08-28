#!/usr/bin/env python3
"""
Insert the two Umami locations into the Nginx site that serves privamesh.org.

Edits in place: certbot has already rewritten this file to add the HTTPS server
block, and replacing it would take HTTPS with it. Run by setup-umami.sh, which
backs the file up first and runs `nginx -t` before reloading.
"""
import re
import sys

path, port = sys.argv[1], sys.argv[2]
src = open(path).read()

if 'location = /api/send' in src:
    print('already patched')
    sys.exit(0)

block = f'''    # Umami analytics, proxied through this origin so the beacon is same-origin.
    location = /script.js {{
        proxy_pass http://127.0.0.1:{port}/script.js;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }}
    location = /api/send {{
        proxy_pass http://127.0.0.1:{port}/api/send;
        proxy_set_header Host $host;
        # Umami reads the country off the client address, so the real one has to
        # survive the proxy or every visit lands as "unknown".
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }}

'''
out, n = re.subn(r'(?m)^[ \t]*location / \{', lambda m: block + m.group(0), src)
if n == 0:
    sys.exit('no "location / {" found to insert before')
open(path, 'w').write(out)
print(f'inserted into {n} server block(s)')
