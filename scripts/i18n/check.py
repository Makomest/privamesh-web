#!/usr/bin/env python3
"""
Check every translated catalog against its English source.

For each string slot: the same {placeholders}, the same markdown link targets,
and not empty. A slot that drifts from English here would render a raw
{placeholder}, a dead link or a blank line on the live page.

Usage: check.py            (all pages)
       check.py <page>...  (just these)
Exits non-zero when anything is wrong.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / 'messages'
PH = re.compile(r'\{(\w+)\}')
LINK = re.compile(r'\]\(([^)]+)\)')


def leaves(node, path=()):
    if isinstance(node, dict):
        for k, v in node.items():
            yield from leaves(v, path + (k,))
    elif isinstance(node, list):
        for i, v in enumerate(node):
            yield from leaves(v, path + (i,))
    else:
        yield path, node


def main():
    pages = sys.argv[1:] or sorted(p.stem for p in (ROOT / 'en').glob('*.json'))
    problems = 0
    for page in pages:
        en = dict(leaves(json.loads((ROOT / 'en' / f'{page}.json').read_text())))
        for loc_dir in sorted(ROOT.iterdir()):
            f = loc_dir / f'{page}.json'
            if loc_dir.name == 'en' or not f.exists():
                continue
            tr = dict(leaves(json.loads(f.read_text())))
            for path, src in en.items():
                where = f'{loc_dir.name}/{page}:{".".join(map(str, path))}'
                if path not in tr:
                    print(f'missing  {where}'); problems += 1; continue
                val = tr[path]
                if not isinstance(src, str):
                    continue
                if not isinstance(val, str) or not val.strip():
                    print(f'empty    {where}'); problems += 1; continue
                if sorted(PH.findall(src)) != sorted(PH.findall(val)):
                    print(f'holders  {where}: {PH.findall(val)} != {PH.findall(src)}'); problems += 1
                if sorted(LINK.findall(src)) != sorted(LINK.findall(val)):
                    print(f'links    {where}: {LINK.findall(val)} != {LINK.findall(src)}'); problems += 1
            for path in tr:
                if path not in en:
                    print(f'extra    {loc_dir.name}/{page}:{".".join(map(str, path))}'); problems += 1
    print(f'{problems} problem(s)')
    sys.exit(1 if problems else 0)


if __name__ == '__main__':
    main()
