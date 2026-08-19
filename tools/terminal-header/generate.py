#!/usr/bin/env python3
"""
Gera o header animado em SVG (estilo terminal) do README.

Saida: assets/terminal-dark.svg e assets/terminal-light.svg

Uso:  python3 tools/terminal-header/generate.py [dir_saida]
Dep:  pip install pyfiglet
"""
import html
import pathlib
import sys

import pyfiglet

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "assets"
OUT.mkdir(parents=True, exist_ok=True)

PROMPT = "raphaelokuyama@github ~ $ whoami"

INFO = [
    ("OS",      "Full-Stack Developer (React / Next.js / NestJS)"),
    ("HOST",    "FACENS \u2014 Eng. de Computa\u00e7\u00e3o, 10\u00ba semestre"),
    ("KERNEL",  "TypeScript 5.x on Node.js"),
    ("UPTIME",  "IMACARDIOS \u2014 em produ\u00e7\u00e3o desde 2026"),
    ("PACKAGES","42 cl\u00ednicas \u00b7 2.000+ laudos assinados/m\u00eas"),
    ("SHELL",   "Clean Architecture \u00b7 SOLID \u00b7 LGPD"),
    ("MEMORY",  "Python / Pandas / Power BI  [aprendendo]"),
    ("STATUS",  "open to work \u2014 est\u00e1gio & freelance"),
]

THEMES = {
    "dark": dict(
        win="#010409", bar="#161b22", border="#30363d",
        fg="#c9d1d9", dim="#8b949e", green="#3fb950", blue="#58a6ff",
        purple="#bc8cff", yellow="#d29922", art_a="#79c0ff", art_b="#56d364",
        bartext="#8b949e",
    ),
    "light": dict(
        win="#ffffff", bar="#f6f8fa", border="#d0d7de",
        fg="#1f2328", dim="#636c76", green="#1a7f37", blue="#0969da",
        purple="#8250df", yellow="#9a6700", art_a="#0969da", art_b="#1a7f37",
        bartext="#636c76",
    ),
}

# ---------------------------------------------------------------- layout ----
ART = (pathlib.Path(__file__).parent / "portrait.txt").read_text().rstrip("\n").split("\n")
ART_COLS = max(len(l) for l in ART)
ART = [l.ljust(ART_COLS) for l in ART]

BANNER = []
for word in ("RAPHAEL", "OKUYAMA"):
    rows = pyfiglet.figlet_format(word, font="ansi_shadow").split("\n")
    while rows and not rows[-1].strip():
        rows.pop()
    BANNER.append(rows)
BAN_COLS = max(len(l) for w in BANNER for l in w)
BANNER = [[l.ljust(BAN_COLS) for l in w] for w in BANNER]

ART_FS, ART_LH = 9.0, 9.3
BAN_FS, BAN_LH = 10.0, 10.6
INF_FS, INF_LH = 12.5, 21.0
PAD, BAR_H = 16.0, 30.0

def adv(fs):            # avanco monoespacado assumido
    return fs * 0.6

ART_W = ART_COLS * adv(ART_FS)
BAN_W = BAN_COLS * adv(BAN_FS)
INFO_TXT = [f"{k.ljust(9,'.')}. {v}" for k, v in INFO]
INF_W = max(len(l) for l in INFO_TXT) * adv(INF_FS)

L_W = ART_W + 2 * PAD
L_H = BAR_H + PAD + len(ART) * ART_LH + PAD
R_INNER = max(BAN_W, INF_W)
R_W = R_INNER + 2 * PAD
R_BODY = (len(BANNER[0]) + len(BANNER[1])) * BAN_LH + 14 + len(INFO_TXT) * INF_LH
R_H = BAR_H + PAD + R_BODY + PAD

GAP, MARGIN, HEAD_H = 18.0, 12.0, 54.0
BODY_H = max(L_H, R_H)
W = MARGIN * 2 + L_W + GAP + R_W
H = MARGIN + HEAD_H + BODY_H + MARGIN

PROMPT_FS = 17.0
PROMPT_W = len(PROMPT) * adv(PROMPT_FS)

# --------------------------------------------------------------- timeline ---
DUR = 16.0            # duracao total do loop, em segundos
def pct(t):           # segundos -> % do keyframe
    return round(t / DUR * 100, 3)

TYPE_END   = 2.0
WIN_IN     = 2.2
ART_START  = 2.6
ART_STEP   = 0.045
BAN_START  = 2.9
BAN_STEP   = 0.09
INF_START  = 4.4
INF_STEP   = 0.16
FADE_OUT   = 14.6

def esc(s):
    return html.escape(s, quote=False)

def line(x, y, txt, cols, fs, cls="", fill=None, extra=""):
    tl = cols * adv(fs)
    f = f' fill="{fill}"' if fill else ""
    c = f' class="{cls}"' if cls else ""
    return (f'<text{c} x="{x:.2f}" y="{y:.2f}" font-size="{fs}" textLength="{tl:.2f}" '
            f'lengthAdjust="spacingAndGlyphs" xml:space="preserve"{f}{extra}>{esc(txt)}</text>')

def window(x, y, w, h, title, t, body):
    return f'''<g class="win">
  <rect x="{x:.2f}" y="{y:.2f}" width="{w:.2f}" height="{h:.2f}" rx="10" fill="{t['win']}" stroke="{t['border']}"/>
  <path d="M{x:.2f} {y+10:.2f}a10 10 0 0 1 10-10h{w-20:.2f}a10 10 0 0 1 10 10v{BAR_H-10:.2f}H{x:.2f}z" fill="{t['bar']}"/>
  <line x1="{x:.2f}" y1="{y+BAR_H:.2f}" x2="{x+w:.2f}" y2="{y+BAR_H:.2f}" stroke="{t['border']}"/>
  <circle cx="{x+18:.2f}" cy="{y+15:.2f}" r="5" fill="#ff5f56"/>
  <circle cx="{x+36:.2f}" cy="{y+15:.2f}" r="5" fill="#ffbd2e"/>
  <circle cx="{x+54:.2f}" cy="{y+15:.2f}" r="5" fill="#27c93f"/>
  <text x="{x+w/2:.2f}" y="{y+19:.2f}" font-size="11" fill="{t['bartext']}" text-anchor="middle">{esc(title)}</text>
  {body}
</g>'''

def build(theme_name):
    t = THEMES[theme_name]
    delays = set()
    body = []

    # ---- janela esquerda: retrato ASCII
    lx, ly = MARGIN, MARGIN + HEAD_H
    art = []
    for i, l in enumerate(ART):
        d = ART_START + i * ART_STEP
        delays.add(round(d, 3))
        art.append(line(lx + PAD, ly + BAR_H + PAD + (i + 1) * ART_LH - 1.5,
                        l, ART_COLS, ART_FS, cls=f"r r{int(round(d*1000))}",
                        fill="url(#artgrad)"))
    left = window(lx, ly, L_W, BODY_H, "~/whoami -- avatar.ascii", t, "\n  ".join(art))

    # ---- janela direita: banner + neofetch
    rx = MARGIN + L_W + GAP
    ry = ly
    right_parts = []
    yy = ry + BAR_H + PAD
    k = 0
    for wi, word in enumerate(BANNER):
        color = t["blue"] if wi == 0 else t["purple"]
        for l in word:
            d = BAN_START + k * BAN_STEP
            delays.add(round(d, 3))
            yy += BAN_LH
            right_parts.append(line(rx + PAD, yy - 2, l, BAN_COLS, BAN_FS,
                                    cls=f"r r{int(round(d*1000))}", fill=color))
            k += 1
    yy += 14
    for i, (kk, vv) in enumerate(INFO):
        d = INF_START + i * INF_STEP
        delays.add(round(d, 3))
        yy += INF_LH
        key = kk.ljust(9, ".") + "."
        right_parts.append(
            f'<g class="r r{int(round(d*1000))}">'
            + line(rx + PAD, yy - 4, key, len(key), INF_FS, fill=t["green"])
            + line(rx + PAD + len(key) * adv(INF_FS) + adv(INF_FS), yy - 4, vv, len(vv),
                   INF_FS, fill=t["fg"])
            + "</g>")
    right = window(rx, ry, R_W, BODY_H, "~/whoami -- profile.sh", t, "\n  ".join(right_parts))

    # ---- prompt com efeito de digitacao
    px = (W - PROMPT_W) / 2
    py = MARGIN + 34
    user, rest = "raphaelokuyama@github", " ~ $ whoami"
    prompt_svg = f'''<clipPath id="typeclip" clipPathUnits="userSpaceOnUse">
    <rect id="typerect" x="{px:.2f}" y="{py-18:.2f}" width="{PROMPT_W+14:.2f}" height="26"/>
  </clipPath>
  <g clip-path="url(#typeclip)" font-size="{PROMPT_FS}">
    {line(px, py, user, len(user), PROMPT_FS, fill=t["green"])}
    {line(px + len(user)*adv(PROMPT_FS), py, rest, len(rest), PROMPT_FS, fill=t["fg"])}
    <rect class="cursor" x="{px + PROMPT_W + 3:.2f}" y="{py-13:.2f}" width="{adv(PROMPT_FS):.2f}" height="17" fill="{t['blue']}"/>
  </g>'''

    # ---- CSS
    kf = []
    for d in sorted(delays):
        a, b = pct(d), pct(d + 0.35)
        kf.append(f".r{int(round(d*1000))}{{animation:k{int(round(d*1000))} {DUR}s infinite both}}"
                  f"@keyframes k{int(round(d*1000))}{{0%,{a}%{{opacity:0}}{b}%,{pct(FADE_OUT)}%{{opacity:1}}"
                  f"{pct(FADE_OUT+0.6)}%,100%{{opacity:0}}}}")
    css = f'''
  text{{font-family:'JetBrains Mono','Fira Code','SFMono-Regular',ui-monospace,Consolas,'Liberation Mono',Menlo,'Courier New',monospace;dominant-baseline:auto}}
  #typerect{{transform-box:view-box;transform-origin:{px:.2f}px {py:.2f}px;animation:type {DUR}s infinite both}}
  @keyframes type{{0%{{transform:scaleX(0);animation-timing-function:steps({len(PROMPT)+1},end)}}
    {pct(TYPE_END)}%,{pct(FADE_OUT+0.6)}%{{transform:scaleX(1)}}100%{{transform:scaleX(1)}}}}
  .cursor{{animation:blink 1.06s steps(1,end) infinite}}
  @keyframes blink{{0%,50%{{opacity:1}}50.01%,100%{{opacity:0}}}}
  .win{{animation:winin {DUR}s infinite both}}
  @keyframes winin{{0%,{pct(WIN_IN)}%{{opacity:0}}{pct(WIN_IN+0.45)}%,{pct(FADE_OUT+0.6)}%{{opacity:1}}
    {pct(FADE_OUT+1.1)}%,100%{{opacity:0}}}}
  {" ".join(kf)}
'''

    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W:.0f}" height="{H:.0f}" viewBox="0 0 {W:.2f} {H:.2f}" role="img" aria-label="{esc(PROMPT)} - Raphael Okuyama, Desenvolvedor Full-Stack">
<title>{esc(PROMPT)}</title>
<defs>
  <linearGradient id="artgrad" x1="0" y1="0" x2="0.6" y2="1">
    <stop offset="0%" stop-color="{t['art_a']}"/>
    <stop offset="100%" stop-color="{t['art_b']}"/>
  </linearGradient>
  <style>{css}</style>
  {prompt_svg.split('<g clip-path')[0]}
</defs>
{prompt_svg.split('</clipPath>')[1]}
{left}
{right}
</svg>
'''

for name in THEMES:
    p = OUT / f"terminal-{name}.svg"
    p.write_text(build(name), encoding="utf-8")
    print("ok ->", p, p.stat().st_size, "bytes")
