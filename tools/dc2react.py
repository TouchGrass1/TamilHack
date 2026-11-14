"""Convert Design-canvas .dc.html boards into React (TSX) components, keeping logic verbatim."""
import re, json, sys, html
from html.parser import HTMLParser

ATTR_MAP = {'class': 'className', 'for': 'htmlFor', 'onclick': 'onClick', 'onchange': 'onChange', 'onkeydown': 'onKeyDown',
            'viewbox': 'viewBox', 'autocomplete': 'autoComplete', 'tabindex': 'tabIndex', 'readonly': 'readOnly',
            'shape-rendering': 'shapeRendering', 'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap',
            'stroke-linejoin': 'strokeLinejoin', 'fill-rule': 'fillRule', 'clip-rule': 'clipRule', 'text-anchor': 'textAnchor'}
VOID = {'input', 'br', 'img', 'hr', 'meta', 'link'}
HOLE = re.compile(r'\{\{\s*([^}]+?)\s*\}\}')

class Node:
    def __init__(self, tag, attrs, parent=None):
        self.tag, self.attrs, self.children, self.parent = tag, attrs, [], parent

class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node('#root', [])
        self.cur = self.root
    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs, self.cur); self.cur.children.append(n)
        if tag not in VOID: self.cur = n
    def handle_startendtag(self, tag, attrs):
        self.cur.children.append(Node(tag, attrs, self.cur))
    def handle_endtag(self, tag):
        if tag in VOID: return
        n = self.cur
        while n is not None and n.tag != tag: n = n.parent
        if n is not None and n.parent is not None: self.cur = n.parent
    def handle_data(self, data):
        self.cur.children.append(data)

def camel(prop):
    prop = prop.strip()
    if prop.startswith('--'): return json.dumps(prop)
    if prop.startswith('-webkit-'): prop = 'Webkit-' + prop[len('-webkit-'):]
    parts = prop.split('-')
    return parts[0] + ''.join(p[:1].upper() + p[1:] for p in parts[1:])

class Conv:
    def __init__(self, routes):
        self.routes = routes
    def expr(self, path, scope):
        path = path.strip()
        if path in ('true', 'false', 'null') or re.fullmatch(r'-?\d+(\.\d+)?', path): return path
        if re.fullmatch(r"'[^']*'|\"[^\"]*\"", path): return path
        segs = path.split('.')
        if segs[0] in scope or segs[0] == '$index':
            return segs[0] + ''.join('?.' + s for s in segs[1:])
        return 'v' + ''.join('?.' + s for s in segs)
    def interp(self, s, scope):
        """Return a JS expression for a string that may contain holes."""
        m = HOLE.fullmatch(s.strip()) if s.strip() == s else None
        if HOLE.fullmatch(s):
            return self.expr(HOLE.fullmatch(s).group(1), scope), True
        if not HOLE.search(s): return json.dumps(s), False
        out = '`'
        pos = 0
        for mm in HOLE.finditer(s):
            out += s[pos:mm.start()].replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
            out += '${' + self.expr(mm.group(1), scope) + ' ?? ""}'
            pos = mm.end()
        out += s[pos:].replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${') + '`'
        return out, True
    def style(self, s, scope):
        items = []
        for decl in s.split(';'):
            if not decl.strip() or ':' not in decl: continue
            k, val = decl.split(':', 1)
            e, _ = self.interp(val.strip(), scope)
            items.append(f'{camel(k)}: {e}')
        return '{{ ' + ', '.join(items) + ' }}'
    def is_flexlike(self, node):
        st = dict(node.attrs).get('style', '') if isinstance(node, Node) else ''
        return bool(re.search(r'display:\s*(flex|grid|inline-flex)', st or ''))
    def children(self, node, scope, ind):
        out = []
        kids = node.children
        flex = self.is_flexlike(node)
        for i, c in enumerate(kids):
            if isinstance(c, str):
                if not c.strip():
                    # whitespace between elements: HTML renders one space in inline layout, none in flex/grid
                    if flex or node.tag in ('#root', 'sc-for', 'sc-if', 'svg', 'x-dc') or '\n' in c and self._block_neighbours(kids, i):
                        continue
                    out.append(ind + '{" "}')
                    continue
                text = re.sub(r'\s+', ' ', c)
                if '\n' in c:
                    if i == 0: text = text.lstrip()
                    if i == len(kids) - 1: text = text.rstrip()
                parts = []
                pos = 0
                for mm in HOLE.finditer(text):
                    if text[pos:mm.start()]: parts.append('{' + json.dumps(text[pos:mm.start()]) + '}')
                    parts.append('{' + self.expr(mm.group(1), scope) + '}')
                    pos = mm.end()
                if text[pos:]: parts.append('{' + json.dumps(text[pos:]) + '}')
                if parts: out.append(ind + ''.join(parts))
            else:
                r = self.node(c, scope, ind)
                if r: out.append(r)
        return out
    def _block_neighbours(self, kids, i):
        # treat newline-whitespace next to block-level divs as insignificant
        def blockish(n):
            return isinstance(n, Node) and (n.tag in ('div', 'sc-if', 'sc-for', 'svg', 'button') or 'position: absolute' in (dict(n.attrs).get('style') or ''))
        prev = kids[i - 1] if i > 0 else None
        nxt = kids[i + 1] if i + 1 < len(kids) else None
        return blockish(prev) or blockish(nxt) or prev is None or nxt is None
    def node(self, n, scope, ind):
        a = dict(n.attrs)
        if n.tag == 'sc-for':
            lst = HOLE.fullmatch(a['list']).group(1)
            var = a.get('as', 'item')
            inner = self.children(n, scope | {var}, ind + '    ')
            return (f'{ind}{{({self.expr(lst, scope)} || []).map(({var}, $index) => (\n'
                    f'{ind}  <React.Fragment key={{$index}}>\n' + '\n'.join(inner) + f'\n{ind}  </React.Fragment>\n{ind}))}}')
        if n.tag == 'sc-if':
            cond = HOLE.fullmatch(a['value']).group(1)
            inner = self.children(n, scope, ind + '    ')
            return f'{ind}{{{self.expr(cond, scope)} ? (\n{ind}  <>\n' + '\n'.join(inner) + f'\n{ind}  </>\n{ind}) : null}}'
        tag = n.tag
        attrs = []
        is_link = tag == 'a' and (a.get('href') or '').endswith('.dc.html')
        for k, val in n.attrs:
            if k.startswith('hint-'): continue
            if val is None: val = ''
            if k == 'style':
                attrs.append('style=' + self.style(val, scope)); continue
            if is_link and k == 'href':
                attrs.append('to=' + json.dumps(self.routes.get(val, '/'))); continue
            name = ATTR_MAP.get(k, k)
            e, dyn = self.interp(val, scope)
            if not dyn and name not in ('onClick', 'onChange', 'onKeyDown'):
                attrs.append(f'{name}={e}')
            else:
                attrs.append(f'{name}={{{e}}}')
        jtag = 'Link' if is_link else tag
        open_ = f'{ind}<{jtag}' + ('' if not attrs else ' ' + ' '.join(attrs))
        if tag in VOID: return open_ + ' />'
        kids = self.children(n, scope, ind + '  ')
        if not kids: return open_ + f'></{jtag}>'
        return open_ + '>\n' + '\n'.join(kids) + f'\n{ind}</{jtag}>'

# ---------- CSS scoping ----------
def scope_css(css, root_cls, prefix):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    names = re.findall(r'@keyframes\s+([A-Za-z0-9_-]+)', css)
    def fix_decls(body):
        def repl(m):
            prop, val = m.group(1), m.group(2)
            for nm in sorted(set(names), key=len, reverse=True):
                val = re.sub(r'(?<![A-Za-z0-9_-])' + re.escape(nm) + r'(?![A-Za-z0-9_-])', prefix + nm, val)
            return f'{prop}:{val}'
        return re.sub(r'(animation(?:-name)?)\s*:\s*([^;}]+)', repl, body)
    out = []
    i = 0
    def parse_block(s, i):
        depth = 0; j = i
        while j < len(s):
            if s[j] == '{': depth += 1
            elif s[j] == '}':
                depth -= 1
                if depth == 0: return j
            j += 1
        return j
    def process(s):
        res = []; i = 0
        while i < len(s):
            if s[i].isspace(): i += 1; continue
            k = s.find('{', i)
            if k < 0: break
            sel = s[i:k].strip()
            end = parse_block(s, k)
            body = s[k + 1:end]
            if sel.startswith('@keyframes'):
                nm = sel.split()[1]
                res.append(f'@keyframes {prefix}{nm}{{{body}}}')
            elif sel.startswith('@media'):
                res.append(f'{sel}{{{process(body)}}}')
            else:
                sels = []
                for one in sel.split(','):
                    one = one.strip()
                    if one in ('body', 'html'): continue
                    sels.append(f'.{root_cls} {one}')
                if sels: res.append(','.join(sels) + '{' + fix_decls(body) + '}')
            i = end + 1
        return '\n'.join(res)
    return process(css)

def convert(path, comp_name, slug, routes):
    src = open(path, encoding='utf-8').read()
    xdc = re.search(r'<x-dc>(.*)</x-dc>', src, re.S).group(1)
    helmet = re.search(r'<helmet>(.*?)</helmet>', xdc, re.S)
    css = ''
    if helmet:
        css = '\n'.join(re.findall(r'<style>(.*?)</style>', helmet.group(1), re.S))
        xdc = xdc[:helmet.start()] + xdc[helmet.end():]
    script = re.search(r"<script type=\"text/x-dc\" data-dc-script data-props='(.*?)'>(.*?)</script>", src, re.S)
    props = json.loads(html.unescape(script.group(1)))
    defaults = {k: v.get('default') for k, v in props.items() if not k.startswith('$') and isinstance(v, dict) and 'default' in v}
    logic = script.group(2).strip()
    logic = logic.replace('const AUDIO_URLS = {};', 'const AUDIO_URLS = AUDIO;')
    p = P(); p.feed(xdc)
    conv = Conv(routes)
    roots = [c for c in p.root.children if isinstance(c, Node)]
    assert len(roots) == 1, (path, len(roots))
    jsx = conv.node(roots[0], frozenset(), '      ')
    root_cls = f'dc-{slug}'
    tsx = f'''// @ts-nocheck
/* Generated from the design canvas board "{path.split('/')[-1]}". Logic below is copied verbatim from the board. */
import React from "react";
import {{ Link }} from "react-router-dom";
import {{ DCLogic, useDCLogic }} from "@/dc/runtime";
import {{ AUDIO }} from "@/dc/audio";
import "./{slug}.css";

{logic}

const DEFAULT_PROPS = {json.dumps(defaults, ensure_ascii=False)};

export default function {comp_name}() {{
  const v = useDCLogic(Component, DEFAULT_PROPS);
  return (
    <div className="dc-root {root_cls}">
{jsx}
    </div>
  );
}}
'''
    return tsx, scope_css(css, root_cls, slug + '-')

if __name__ == '__main__':
    # Regenerate src/boards from design-canvas/*.dc.html. Run from the project root: python3 tools/dc2react.py
    import os
    here = os.path.dirname(os.path.abspath(__file__))
    rootdir = os.path.dirname(here)
    boards = json.load(open(os.path.join(here, 'boards.json')))
    routes = {b['file']: b['route'] for b in boards}
    out = os.path.join(rootdir, 'src', 'boards')
    for b in boards:
        tsx, css = convert(os.path.join(rootdir, 'design-canvas', b['file']), b['comp'], b['slug'], routes)
        open(os.path.join(out, b['comp'] + '.tsx'), 'w', encoding='utf-8').write(tsx)
        open(os.path.join(out, b['slug'] + '.css'), 'w', encoding='utf-8').write(css)
        print('converted', b['file'], '->', 'src/boards/' + b['comp'] + '.tsx')
    imports = '\n'.join(f'import {b["comp"]} from "@/boards/{b["comp"]}";' for b in boards)
    entries = ',\n'.join(f'  {{ path: {json.dumps(b["route"])}, title: {json.dumps(b["title"], ensure_ascii=False)}, Component: {b["comp"]} }}' for b in boards)
    open(os.path.join(out, 'index.ts'), 'w', encoding='utf-8').write(f"{imports}\n\n/** Every board from the design canvas, in tour order first. */\nexport const BOARDS = [\n{entries},\n];\n")
