#!/usr/bin/env python3
"""
Write messages/<locale>/<page>.json from an ordered list of translated strings.

The English catalog fixes the shape: its string leaves, walked in file order,
are the slots. A translation is the same number of strings in the same order,
so the structure, the keys and every href can never drift from English.
Hrefs ("href" keys) are copied from English rather than translated.

Usage: fill.py <page> <translations.json>
where translations.json is {"<locale>": ["string", ...], ...}.
"""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / 'messages'


def slots(node, path=()):
    if isinstance(node, dict):
        for k, v in node.items():
            yield from slots(v, path + (k,))
    elif isinstance(node, list):
        for i, v in enumerate(node):
            yield from slots(v, path + (i,))
    elif isinstance(node, str):
        if path[-1] != 'href':
            yield path


def put(node, path, value):
    for p in path[:-1]:
        node = node[p]
    node[path[-1]] = value


def main():
    page, src = sys.argv[1], sys.argv[2]
    en = json.loads((ROOT / 'en' / f'{page}.json').read_text())
    paths = list(slots(en))
    data = json.loads(Path(src).read_text())
    for locale, values in data.items():
        if len(values) != len(paths):
            sys.exit(f'{locale}/{page}: {len(values)} strings for {len(paths)} slots')
        out = json.loads(json.dumps(en))
        for p, v in zip(paths, values):
            put(out, p, v)
        dest = ROOT / locale / f'{page}.json'
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(json.dumps(out, ensure_ascii=False, indent=2) + '\n')
        print(f'wrote {dest.relative_to(ROOT.parent)}')


if __name__ == '__main__':
    main()
