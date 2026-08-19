/**
 * Space Shooter — grafo de contribuicoes do GitHub como um jogo de nave.
 *
 * Uso:
 *   GITHUB_TOKEN=xxx node tools/space-shooter/generate.mjs <user> <outDir>
 *   MOCK=1 node tools/space-shooter/generate.mjs <user> <outDir>   # dados falsos p/ testar
 *
 * Gera: <outDir>/space-shooter.svg (light) e <outDir>/space-shooter-dark.svg
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const USER = process.argv[2] || "RaphaelOkuyama";
const OUTDIR = process.argv[3] || "dist";

// ------------------------------------------------------------- dados -------
async function fetchCalendar(user) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN nao definido");
  const query = `query($login:String!){
    user(login:$login){
      contributionsCollection{
        contributionCalendar{
          totalContributions
          weeks{ contributionDays{ date weekday contributionCount contributionLevel } }
        }
      }
    }
  }`;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { login: user } }),
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data.user.contributionsCollection.contributionCalendar;
}

function mockCalendar() {
  const weeks = [];
  let total = 0;
  const start = new Date(Date.UTC(2025, 7, 17));
  for (let w = 0; w < 53; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start.getTime() + (w * 7 + d) * 86400000);
      const burst = Math.sin(w / 4) * 0.5 + 0.5;
      const r = Math.random() * burst * (d === 0 || d === 6 ? 0.5 : 1.3);
      const count = r < 0.28 ? 0 : Math.ceil(r * 9);
      total += count;
      const level = count === 0 ? "NONE" : count < 3 ? "FIRST_QUARTILE"
        : count < 6 ? "SECOND_QUARTILE" : count < 9 ? "THIRD_QUARTILE" : "FOURTH_QUARTILE";
      days.push({ date: date.toISOString().slice(0, 10), weekday: d, contributionCount: count, contributionLevel: level });
    }
    weeks.push({ contributionDays: days });
  }
  return { totalContributions: total, weeks };
}

// ------------------------------------------------------------ geometria ----
const CELL = 11, GAP = 3, PITCH = CELL + GAP;
const PAD_L = 34, PAD_R = 16, PAD_T = 30, MONTH_H = 16;
const SHIP_GAP = 26, SHIP_H = 22, PAD_B = 14;

// ------------------------------------------------------------- timeline ----
const MAX_SWEEP = 42;                // teto de duracao da fase de tiro (s)
const SHOT_MIN = 0.18, SHOT_MAX = 0.62;  // limites de tempo por alvo
const TAIL = 3.6;                    // pausa + respawn no fim
const MONTHS = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const DAYS = ["", "Seg", "", "Qua", "", "Sex", ""];

const THEMES = {
  light: {
    levels: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    text: "#57606a", hud: "#1f2328", ship: "#0969da", shipDark: "#0a3069",
    bullet: "#d1242f", flash: "#fb8500", star: "#d0d7de", accent: "#0969da",
  },
  dark: {
    levels: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
    text: "#8b949e", hud: "#e6edf3", ship: "#58a6ff", shipDark: "#1f6feb",
    bullet: "#ff7b72", flash: "#ffa657", star: "#30363d", accent: "#58a6ff",
  },
};
const LEVEL_IDX = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };

function build(cal, theme, user) {
  const t = THEMES[theme];
  const weeks = cal.weeks;
  const NCOL = weeks.length;

  const gridX = PAD_L, gridY = PAD_T + MONTH_H;
  const gridW = NCOL * PITCH - GAP, gridH = 7 * PITCH - GAP;
  const W = gridX + gridW + PAD_R;
  const shipY = gridY + gridH + SHIP_GAP;
  const H = shipY + SHIP_H + PAD_B;

  // ---- celulas + lista de alvos
  const cellData = [];
  weeks.forEach((week, c) => {
    week.contributionDays.forEach((day) => {
      const r = day.weekday;
      cellData.push({
        c, r,
        lvl: LEVEL_IDX[day.contributionLevel] ?? 0,
        x: gridX + c * PITCH,
        y: gridY + r * PITCH,
        date: day.date,
        count: day.contributionCount,
      });
    });
  });

  // PRNG deterministico (mesma arte todo dia para o mesmo grafo)
  let seed = 20260819;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;

  // ordem ALEATORIA dos alvos (Fisher-Yates)
  const order = cellData.map((d, i) => (d.lvl > 0 ? i : -1)).filter((i) => i >= 0);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  const N = Math.max(1, order.length);
  const SHOT_T = Math.min(SHOT_MAX, Math.max(SHOT_MIN, MAX_SWEEP / N));
  const SWEEP = N * SHOT_T;
  const DUR = SWEEP + TAIL;
  const pc = (s) => +(s / DUR * 100).toFixed(3);

  const yStart = shipY + 2;                 // origem do tiro

  // fatias de cada turno de tiro
  const MOVE_END = 0.55, FIRE = 0.58, HIT = 0.97;

  // ---- keyframes
  const kf = [], shipKf = [], bulletKf = [];
  const hitAt = new Map();                  // indice da celula -> instante do impacto

  order.forEach((idx, i) => {
    const d = cellData[idx];
    const t0 = i * SHOT_T;
    const tMove = t0 + MOVE_END * SHOT_T;
    const tFire = t0 + FIRE * SHOT_T;
    const tHit = t0 + HIT * SHOT_T;
    const shipX = gridX + CELL / 2 + d.c * PITCH;
    const dist = yStart - (d.y + CELL / 2);

    hitAt.set(idx, tHit);
    shipKf.push(`${pc(tMove)}%{transform:translateX(${shipX}px)}${pc(t0 + SHOT_T)}%{transform:translateX(${shipX}px)}`);
    bulletKf.push(
      `${pc(tFire - 0.001)}%{opacity:0;transform:translateY(0)}` +
      `${pc(tFire)}%{opacity:1;transform:translateY(0)}` +
      `${pc(tHit)}%{opacity:1;transform:translateY(${-dist}px)}` +
      `${pc(tHit + 0.001)}%{opacity:0;transform:translateY(${-dist}px)}`
    );
  });

  const seen = new Set();
  const cells = cellData.map((d, idx) => {
    if (d.lvl === 0) {
      return `<rect x="${d.x}" y="${d.y}" width="${CELL}" height="${CELL}" rx="2.5" fill="${t.levels[0]}"/>`;
    }
    const hit = hitAt.get(idx);
    const id = Math.round(hit * 1000);
    if (!seen.has(id)) {
      seen.add(id);
      const a = pc(hit), b = pc(hit + 0.09), e = pc(hit + 0.26);
      kf.push(
        `@keyframes h${id}{0%,${a}%{opacity:1;transform:scale(1);filter:brightness(1)}` +
        `${b}%{opacity:1;transform:scale(1.9);filter:brightness(3.2) saturate(1.6)}` +
        `${e}%,${pc(SWEEP + 2.9)}%{opacity:0;transform:scale(.15);filter:brightness(3.2)}` +
        `${pc(SWEEP + 3.4)}%,100%{opacity:1;transform:scale(1);filter:brightness(1)}}`,
        `.h${id}{animation:h${id} ${DUR}s infinite both}`
      );
    }
    return `<rect class="c h${id}" x="${d.x}" y="${d.y}" width="${CELL}" height="${CELL}" rx="2.5" fill="${t.levels[d.lvl]}"><title>${d.date}: ${d.count}</title></rect>`;
  });

  // ---- rotulos
  const months = [];
  let last = -1;
  weeks.forEach((week, c) => {
    const dd = new Date(week.contributionDays[0].date + "T00:00:00Z");
    const m = dd.getUTCMonth();
    if (m !== last && dd.getUTCDate() <= 7) {
      last = m;
      months.push(`<text x="${gridX + c * PITCH}" y="${gridY - 6}" font-size="9" fill="${t.text}">${MONTHS[m]}</text>`);
    }
  });
  const daysLbl = DAYS.map((d, i) =>
    d ? `<text x="${gridX - 6}" y="${gridY + i * PITCH + 9}" font-size="9" text-anchor="end" fill="${t.text}">${d}</text>` : ""
  ).join("");

  const stars = Array.from({ length: 46 }, () => {
    const x = (rnd() * W).toFixed(1), y = (rnd() * H).toFixed(1), rr = (0.5 + rnd() * 1.1).toFixed(2);
    return `<circle class="st" cx="${x}" cy="${y}" r="${rr}" fill="${t.star}" style="animation-delay:${(rnd() * 3).toFixed(2)}s"/>`;
  }).join("");

  const ship = `<path d="M0,-11 L6.5,4 L3,2.5 L3,9 L-3,9 L-3,2.5 L-6.5,4 Z" fill="${t.ship}"/>
      <path d="M0,-11 L2.6,-3 L-2.6,-3 Z" fill="${t.shipDark}"/>
      <rect x="-8.5" y="4" width="3.2" height="7" rx="1.2" fill="${t.shipDark}"/>
      <rect x="5.3" y="4" width="3.2" height="7" rx="1.2" fill="${t.shipDark}"/>
      <ellipse class="thrust" cx="0" cy="12" rx="2.6" ry="4.6" fill="${t.flash}"/>`;

  const homeX = gridX + CELL / 2 + cellData[order[0]].c * PITCH;
  const css = `
  text{font-family:'JetBrains Mono','SFMono-Regular',ui-monospace,Consolas,'Liberation Mono',Menlo,monospace}
  .c{transform-box:fill-box;transform-origin:center}
  .fleet{animation:sweep ${DUR}s linear infinite both}
  @keyframes sweep{0%{transform:translateX(${homeX}px)}${shipKf.join("")}
    ${pc(SWEEP + 3.4)}%,100%{transform:translateX(${homeX}px)}}
  .bullet{animation:fly ${DUR}s linear infinite both}
  @keyframes fly{0%{opacity:0;transform:translateY(0)}${bulletKf.join("")}
    ${pc(SWEEP + 0.02)}%,100%{opacity:0;transform:translateY(0)}}
  .thrust{transform-box:fill-box;transform-origin:center top;animation:thrust .16s steps(2,end) infinite}
  @keyframes thrust{0%{transform:scaleY(1)}100%{transform:scaleY(.45)}}
  .st{animation:tw 3s ease-in-out infinite alternate}
  @keyframes tw{0%{opacity:.25}100%{opacity:1}}
  .clear{opacity:0;animation:clear ${DUR}s infinite both}
  @keyframes clear{0%,${pc(SWEEP + 0.3)}%{opacity:0}${pc(SWEEP + 0.7)}%,${pc(SWEEP + 2.4)}%{opacity:1}${pc(SWEEP + 2.8)}%,100%{opacity:0}}
  ${kf.join("")}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Space shooter destruindo o grafo de contribuicoes de ${user}">
<title>${user} — contribution space shooter (${cal.totalContributions} contribuicoes)</title>
<style>${css}</style>
<g>${stars}</g>
<text x="${gridX}" y="${PAD_T - 12}" font-size="11" font-weight="bold" fill="${t.hud}">SCORE ${String(cal.totalContributions).padStart(5, "0")}</text>
<text x="${W - PAD_R}" y="${PAD_T - 12}" font-size="11" text-anchor="end" fill="${t.accent}">TARGETS ${order.length}</text>
${months.join("")}
${daysLbl}
<g>${cells.join("")}</g>
<g class="fleet">
  <g transform="translate(0,${shipY})">${ship}</g>
  <g transform="translate(0,${yStart})">
    <g class="bullet">
      <rect x="-1.7" y="-10" width="3.4" height="12" rx="1.7" fill="${t.bullet}"/>
      <rect x="-1" y="-14" width="2" height="5" rx="1" fill="${t.flash}"/>
      <rect x="-3.2" y="-6" width="6.4" height="4" rx="2" fill="${t.flash}" opacity=".55"/>
    </g>
  </g>
</g>
<text class="clear" x="${W / 2}" y="${gridY + gridH / 2 + 4}" font-size="18" font-weight="bold" text-anchor="middle" fill="${t.accent}">STAGE CLEAR</text>
</svg>
`;
}

const cal = process.env.MOCK ? mockCalendar() : await fetchCalendar(USER);
mkdirSync(OUTDIR, { recursive: true });
for (const theme of ["light", "dark"]) {
  const name = theme === "light" ? "space-shooter.svg" : "space-shooter-dark.svg";
  const p = join(OUTDIR, name);
  writeFileSync(p, build(cal, theme, USER));
  console.log("ok ->", p);
}
