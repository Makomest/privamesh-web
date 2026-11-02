#!/usr/bin/env python3
"""
Full-width punctuation for Chinese and Japanese catalogs.

ASCII , : ; ? ! ( ) next to a CJK character become their full-width forms.
Punctuation between Latin letters or digits ("6,000", "X-Wing (ML-KEM)") is
left alone, as are markdown links. Usage: cjk_punct.py <page> [<page>...]
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / 'messages'
CJK = r'[　-ヿ㐀-鿿豈-﫿＀-￯]'
MAP = {',': '，', ':': '：', ';': '；', '?': '？', '!': '！', '(': '（', ')': '）'}
JA_MAP = {**MAP, ',': '、'}


def fix(s, table):
    # Protect markdown links: [text](/path)
    links = []
    def keep(m):
        links.append(m.group(0))
        return f'\x00{len(links) - 1}\x00'
    s = re.sub(r'\[[^\]]+\]\([^)]+\)', keep, s)
    for a, b in table.items():
        s = re.sub(rf'(?<={CJK})\s*{re.escape(a)}\s*', b, s)
        s = re.sub(rf'\s*{re.escape(a)}(?={CJK})', b, s)
    s = re.sub(r'\x00(\d+)\x00', lambda m: links[int(m.group(1))], s)
    return s


def walk(node, table):
    if isinstance(node, dict):
        return {k: (v if k == 'href' else walk(v, table)) for k, v in node.items()}
    if isinstance(node, list):
        return [walk(v, table) for v in node]
    if isinstance(node, str):
        return fix(node, table)
    return node


for page in sys.argv[1:]:
    for loc, table in (('zh-hans', MAP), ('zh-hant', MAP), ('ja', JA_MAP)):
        f = ROOT / loc / f'{page}.json'
        if f.exists():
            data = json.loads(f.read_text())
            f.write_text(json.dumps(walk(data, table), ensure_ascii=False, indent=2) + '\n')
