#!/usr/bin/env python3
"""
Register the site in Umami over its API, from the server, over localhost.

This exists because the dashboard is deliberately not on the internet and this
box cannot be reached on port 22 either, so the usual "open an SSH tunnel and
click around" step is not available. Everything the first-run wizard does -
change the default password, add the website, read back its ID - is an API call.

Prints the website ID on stdout and nothing else, so the caller can capture it.
Safe to re-run: an existing password is detected and an existing website reused.

Usage: umami-register.py <base-url> <username> <new-password> <site-name> <domain>
"""
import json
import sys
import urllib.error
import urllib.request

BASE, USER, NEW_PW, SITE, DOMAIN = sys.argv[1:6]
DEFAULT_PW = 'umami'


def call(method, path, token=None, body=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(f'{BASE}{path}', data=data, method=method)
    req.add_header('Accept', 'application/json')
    if data is not None:
        req.add_header('Content-Type', 'application/json')
    if token:
        req.add_header('Authorization', f'Bearer {token}')
    with urllib.request.urlopen(req, timeout=20) as r:
        raw = r.read()
        return json.loads(raw) if raw else {}


def login(password):
    try:
        return call('POST', '/api/auth/login', body={'username': USER, 'password': password})
    except urllib.error.HTTPError as e:
        if e.code in (401, 400):
            return None
        raise


def note(msg):
    print(msg, file=sys.stderr)


# Prefer the password we are meant to end up with: on a second run it is already
# set, and trying the default first would be a pointless failed login.
session = login(NEW_PW)
if session:
    note('logged in with the configured password')
else:
    session = login(DEFAULT_PW)
    if not session:
        sys.exit('could not log in with either the configured password or the default')
    note('logged in with the default password - changing it')
    user_id = (session.get('user') or {}).get('id')
    if not user_id:
        sys.exit('login response carried no user id, cannot change the password')
    call('POST', f'/api/users/{user_id}', token=session['token'], body={'password': NEW_PW})
    session = login(NEW_PW)
    if not session:
        sys.exit('password was changed but logging back in with it failed')
    note('password changed')

token = session['token']

existing = call('GET', '/api/websites', token=token)
rows = existing.get('data', existing if isinstance(existing, list) else [])
for w in rows:
    if w.get('domain') == DOMAIN:
        note(f'website already registered: {w["name"]}')
        print(w['id'])
        sys.exit(0)

created = call('POST', '/api/websites', token=token, body={'name': SITE, 'domain': DOMAIN})
if not created.get('id'):
    sys.exit(f'website creation returned no id: {created}')
note('website registered')
print(created['id'])
