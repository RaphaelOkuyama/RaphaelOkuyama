/**
 * Card de estatisticas do GitHub, gerado no proprio repo (sem servico de terceiro).
 *
 * Uso:
 *   GITHUB_TOKEN=xxx node tools/stats-card/generate.mjs <user> <outDir>
 *   MOCK=1 node tools/stats-card/generate.mjs <user> <outDir>
 *
 * Gera: <outDir>/stats.svg (light) e <outDir>/stats-dark.svg
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const USER = process.argv[2] || "RaphaelOkuyama";
const OUTDIR = process.argv[3] || "dist";

const QUERY = `query($login:String!){
  user(login:$login){
    contributionsCollection{
      totalCommitContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      totalIssueContributions
      restrictedContributionsCount
      contributionCalendar{ totalContributions }
    }
    repositories(first:100, ownerAffiliations:OWNER, isFork:false, orderBy:{field:STARGAZERS,direction:DESC}){
      totalCount
      nodes{
        stargazerCount
        languages(first:8, orderBy:{field:SIZE,direction:DESC}){ edges{ size node{ name color } } }
      }
    }
  }
}`;

async function fetchData(user) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN nao definido");
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: QUERY, variables: { login: user } }),
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data.user;
}

function mock() {
  const langs = [["TypeScript","#3178c6",520000],["JavaScript","#f1e05a",180000],["Python","#3572A5",95000],["CSS","#563d7c",42000],["HTML","#e34c26",30000],["Shell","#89e051",8000]];
  return {
    contributionsCollection: {
      totalCommitContributions: 912, totalPullRequestContributions: 34,
      totalPullRequestReviewContributions: 11, totalIssueContributions: 18,
      restrictedContributionsCount: 120, contributionCalendar: { totalContributions: 1080 },
    },
    repositories: {
      totalCount: 41,
      nodes: langs.map(([name, color, size], i) => ({
        stargazerCount: i, languages: { edges: [{ size, node: { name, color } }] },
      })),
    },
  };
}

const THEMES = {
  light: { bg:"#ffffff", border:"#d0d7de", bar:"#f6f8fa", title:"#1f2328", label:"#57606a", value:"#1f2328", accent:"#0969da", track:"#eaeef2", bartext:"#57606a" },
  dark:  { bg:"#010409", border:"#30363d", bar:"#161b22", title:"#e6edf3", label:"#8b949e", value:"#e6edf3", accent:"#58a6ff", track:"#21262d", bartext:"#8b949e" },
};

const fmt = (n) => n.toLocaleString("pt-BR");

function build(u, theme, user) {
  const t = THEMES[theme];
  const c = u.contributionsCollection;
  const stars = u.repositories.nodes.reduce((a, r) => a + r.stargazerCount, 0);

  const rows = [
    ["Contribuições (últ. ano)", fmt(c.contributionCalendar.totalContributions)],
    ["Commits (últ. ano)", fmt(c.totalCommitContributions)],
    ["Pull requests", fmt(c.totalPullRequestContributions)],
    ["Code reviews", fmt(c.totalPullRequestReviewContributions)],
    ["Issues abertas", fmt(c.totalIssueContributions)],
    ["Repositórios próprios", fmt(u.repositories.totalCount)],
    ["Estrelas recebidas", fmt(stars)],
  ];

  // top linguagens por bytes
  const totals = new Map();
  for (const repo of u.repositories.nodes) {
    for (const e of repo.languages?.edges ?? []) {
      const k = e.node.name;
      const cur = totals.get(k) || { size: 0, color: e.node.color || t.accent };
      cur.size += e.size;
      totals.set(k, cur);
    }
  }
  const all = [...totals.entries()].sort((a, b) => b[1].size - a[1].size);
  const sum = all.reduce((a, [, v]) => a + v.size, 0) || 1;
  const top = all.slice(0, 6);
  const rest = all.slice(6).reduce((a, [, v]) => a + v.size, 0);
  const langs = top.map(([name, v]) => ({ name, color: v.color, pct: (v.size / sum) * 100 }));
  if (rest > 0) langs.push({ name: "Outras", color: t.label, pct: (rest / sum) * 100 });

  // ---- layout
  const PAD = 18, BAR_H = 30, GAP = 16, MARGIN = 10;
  const L_W = 372, R_W = 424;
  const ROW_H = 24;
  const bodyH = Math.max(rows.length * ROW_H + 14, langs.length * 22 + 46);
  const H = MARGIN * 2 + BAR_H + PAD + bodyH + PAD;
  const W = MARGIN * 2 + L_W + GAP + R_W;

  const panel = (x, w, title, body) => `
  <rect x="${x}" y="${MARGIN}" width="${w}" height="${H - MARGIN * 2}" rx="10" fill="${t.bg}" stroke="${t.border}"/>
  <path d="M${x} ${MARGIN + 10}a10 10 0 0 1 10-10h${w - 20}a10 10 0 0 1 10 10v${BAR_H - 10}H${x}z" fill="${t.bar}"/>
  <line x1="${x}" y1="${MARGIN + BAR_H}" x2="${x + w}" y2="${MARGIN + BAR_H}" stroke="${t.border}"/>
  <circle cx="${x + 16}" cy="${MARGIN + 15}" r="4.5" fill="#ff5f56"/>
  <circle cx="${x + 32}" cy="${MARGIN + 15}" r="4.5" fill="#ffbd2e"/>
  <circle cx="${x + 48}" cy="${MARGIN + 15}" r="4.5" fill="#27c93f"/>
  <text x="${x + w / 2}" y="${MARGIN + 19}" font-size="11" fill="${t.bartext}" text-anchor="middle">${title}</text>
  ${body}`;

  // painel esquerdo
  const lx = MARGIN;
  let y = MARGIN + BAR_H + PAD + 6;
  const left = rows.map(([k, v], i) => {
    const yy = y + i * ROW_H;
    return `<text x="${lx + PAD}" y="${yy}" font-size="12.5" fill="${t.label}">${k}</text>`
      + `<text x="${lx + L_W - PAD}" y="${yy}" font-size="13" font-weight="bold" text-anchor="end" fill="${t.value}">${v}</text>`;
  }).join("");

  // painel direito
  const rx = MARGIN + L_W + GAP;
  const rightH = 10 + 34 + Math.ceil(langs.length / 2) * 22;
  const barX = rx + PAD, barW = R_W - PAD * 2;
  const barY = MARGIN + BAR_H + PAD + Math.max(0, (bodyH - rightH) / 2);
  let acc = 0;
  const segs = langs.map((l) => {
    const w = (l.pct / 100) * barW;
    const s = `<rect x="${(barX + acc).toFixed(2)}" y="${barY}" width="${Math.max(0, w - 1).toFixed(2)}" height="10" rx="2" fill="${l.color}"><title>${l.name} ${l.pct.toFixed(1)}%</title></rect>`;
    acc += w;
    return s;
  }).join("");
  const legend = langs.map((l, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = barX + col * (barW / 2);
    const yy = barY + 34 + row * 22;
    return `<circle cx="${x + 5}" cy="${yy - 4}" r="5" fill="${l.color}"/>`
      + `<text x="${x + 16}" y="${yy}" font-size="12" fill="${t.value}">${l.name}</text>`
      + `<text x="${x + barW / 2 - 14}" y="${yy}" font-size="12" text-anchor="end" fill="${t.label}">${l.pct.toFixed(1)}%</text>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Estatisticas do GitHub de ${user}">
<title>Estatisticas do GitHub de ${user}</title>
<style>text{font-family:'JetBrains Mono','SFMono-Regular',ui-monospace,Consolas,'Liberation Mono',Menlo,monospace}</style>
${panel(lx, L_W, "~/stats.sh", left)}
${panel(rx, R_W, "~/langs.sh --top", `<rect x="${barX}" y="${barY}" width="${barW}" height="10" rx="5" fill="${t.track}"/>${segs}${legend}`)}
</svg>
`;
}

const data = process.env.MOCK ? mock() : await fetchData(USER);
mkdirSync(OUTDIR, { recursive: true });
for (const theme of ["light", "dark"]) {
  const p = join(OUTDIR, theme === "light" ? "stats.svg" : "stats-dark.svg");
  writeFileSync(p, build(data, theme, USER));
  console.log("ok ->", p);
}
