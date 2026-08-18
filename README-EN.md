<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/RaphaelOkuyama/RaphaelOkuyama/output/terminal-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/RaphaelOkuyama/RaphaelOkuyama/output/terminal-light.svg" />
  <img alt="raphaelokuyama@github ~ $ whoami — Raphael Okuyama, Full-Stack Developer" src="https://raw.githubusercontent.com/RaphaelOkuyama/RaphaelOkuyama/output/terminal-light.svg" width="100%" />
</picture>

[Português](./README.md) · **English**

<a href="https://portfolio-raphael-okuyama.vercel.app/"><img src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white" height="28" alt="Portfolio" /></a>
<a href="https://portifolio-freelance.vercel.app/"><img src="https://img.shields.io/badge/Freelance_Cases-7C3AED?style=for-the-badge&logo=briefcase&logoColor=white" height="28" alt="Freelance portfolio" /></a>
<a href="https://www.linkedin.com/in/raphael-okuyama/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" height="28" alt="LinkedIn" /></a>
<a href="mailto:raphaelokuyama123@gmail.com"><img src="https://img.shields.io/badge/Email-333333?style=for-the-badge&logo=gmail&logoColor=white" height="28" alt="Email" /></a>
<a href="https://wa.me/5511992117230"><img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" height="28" alt="WhatsApp" /></a>

</div>

---

## Raphael Okuyama — Full-Stack Developer (TypeScript · Next.js · NestJS)

I build and run **production software with real paying users**: I'm the full-stack developer behind
**IMACARDIOS**, a B2B tele-cardiology platform running in 38 clinics and signing 1,000+ medical reports
a month. Computer Engineering senior at FACENS, Brazil (graduating Dec/2026), focused on Clean
Architecture, automated testing and healthcare-grade data protection (Brazilian LGPD).

> 🟢 **Open to full-stack internships and freelance work.**
> Best way to reach me: [LinkedIn](https://www.linkedin.com/in/raphael-okuyama/) or [email](mailto:raphaelokuyama123@gmail.com).

---

## Featured projects

### 🏥 IMACARDIOS — B2B tele-cardiology &nbsp;`Freelance` `In production`

Telemedicine and remote-reporting platform for healthcare networks in Brazil and LATAM.

- Sustain **1,000+ signed reports/month across 38 clinics and 10+ cardiologists** with zero cross-tenant
  data leakage, by designing a **multi-tenant** architecture with per-clinic isolation and role-based
  access control.
- Collapsed the *upload → review → signature* cycle into a single operational flow, by shipping an ops
  dashboard with an **urgency-prioritised queue and real-time SLA tracking**.
- Keep the backend stable in production on **NestJS + Prisma/PostgreSQL**, documented with Swagger and
  covered by unit, integration and E2E tests (**Jest, Supertest, Playwright**).
- Brought the platform into **LGPD compliance** for sensitive health data, by implementing Argon2, 2FA/OTP,
  Helmet and rate limiting.

`Next.js` `NestJS` `TypeScript` `PostgreSQL` `Prisma` `Docker`

[**Open the platform →**](https://app.imacardios.com/) · [Full case study](https://portifolio-freelance.vercel.app/)
<br><sub>🔒 Private repository — commercial client product.</sub>

---

### 🏋️ AI Workout Planner

Full-stack app that generates personalised training plans with generative AI.

- Removed manual workout planning by generating personalised plans **on demand in seconds**, integrating
  the **Gemini API** with structured prompts built from the user profile.
- Closed the API attack surface with **100% of routes authenticated and 100% of endpoints validated**,
  using **Better Auth** (Google OAuth/JWT) and **Zod** on every input.
- Reduced deployment to *push → production* by setting up **CI/CD on Vercel** over a layered REST
  architecture.

`TypeScript` `Next.js` `Node.js` `PostgreSQL` `Prisma` `Gemini API`

[Frontend](https://github.com/RaphaelOkuyama/gestao-de-treino-frontend) · [API](https://github.com/RaphaelOkuyama/gestao-de-treino-api)

---

### 🎓 DevFlix — e-learning platform

Netflix-style learning platform with study tracks and an integrated video player.

- Let students resume exactly where they stopped, by **persisting per-track, per-user progress** in
  PostgreSQL behind custom authentication.
- Supported **multiple concurrent users** without degradation, by structuring the backend in
  **Node.js + REST + MVC** with clear layer separation.

`React` `Node.js` `REST APIs` `PostgreSQL`

[Frontend](https://github.com/RaphaelOkuyama/devflix-frontend) · [API](https://github.com/RaphaelOkuyama/devflix-backend)

---

## Experience

**Freelance Full-Stack Developer** — IMACARDIOS · `2024 – present`
- Delivered and now operate a commercial production product used by **38 clinics**, owning the whole
  cycle alone: requirements with the client, architecture, implementation, deployment and iteration.

**Mairinque City Hall** — Software Development & IT Intern · `Feb/2025 – present`
- Cut administrative contract generation time by **~70%**, by automating the process with a **Python**
  script.
- Dropped GLPI ticket volume from **60+ to fewer than 10 per month (−83%)**, by fixing recurring root
  causes and standardising a custom Windows image.
- Kept municipal servers and network infrastructure continuously available.

**Supermercado Mairinque** — IT Technician & Data Analyst · `Apr/2022 – Feb/2025`
- Kept **40+ POS terminals**, self-checkouts, scanners and scales available for **3 years with no critical
  outage**, through a preventive maintenance routine I designed.
- Surfaced master-data inconsistencies in the VR Software ERP, by building Power BI/Excel reports and
  dashboards.

---

## Stack

<details open>
<summary><b>Core — what I use daily</b></summary>
<br>

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)

</details>

<details>
<summary><b>Full toolbox</b> — frontend, backend, data, DevOps, security</summary>
<br>

**Languages** · TypeScript · JavaScript · Python · SQL

**Frontend** · React · Next.js · Tailwind CSS · shadcn/ui · Framer Motion · Sass · Bootstrap · HTML5 · CSS3

**Backend** · Node.js · NestJS · Express · Fastify · Prisma · Zod · Swagger/OpenAPI · REST

**Security & Auth** · JWT · OAuth 2.0 · Better Auth · Argon2 · 2FA/OTP · Helmet · rate limiting · RBAC · LGPD

**Databases** · PostgreSQL · MySQL · MongoDB

**DevOps & Deploy** · Git · GitHub Actions · Docker · Vercel · CI/CD

**Testing & Quality** · Jest · Supertest · Playwright · ESLint · Prettier

**Architecture** · Clean Architecture · SOLID · MVC · multi-tenancy · Scrum · Kanban

**Data & BI** · Power BI · Excel · Pandas

**Tools** · VS Code · Insomnia · Postman · Vite · Beekeeper Studio · Figma · Gemini API

</details>

---

## Education

- **BSc Computer Engineering** — Centro Universitário FACENS · graduating **Dec/2026**
- **OneBitCode — Full-Stack Program** · React, TypeScript, Next.js, Node.js, REST/MVC, SQL + Prisma, Git
- **Fundação Bradesco** — Artificial Intelligence: Fundamentals
- **Languages** — Portuguese (native) · English (B1)

---

## GitHub

<div align="center">

<img height="165" alt="Raphael Okuyama's GitHub stats" src="https://github-readme-stats.vercel.app/api?username=RaphaelOkuyama&theme=github_dark&hide_border=true&include_all_commits=true&count_private=true&card_width=420" />
<img height="165" alt="Most used languages" src="https://github-readme-stats.vercel.app/api/top-langs/?username=RaphaelOkuyama&theme=github_dark&hide_border=true&include_all_commits=true&count_private=true&layout=compact&card_width=330" />

</div>

### Contribution Space Shooter

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/RaphaelOkuyama/RaphaelOkuyama/output/space-shooter-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/RaphaelOkuyama/RaphaelOkuyama/output/space-shooter.svg" />
  <img alt="Spaceship destroying the GitHub contribution graph" src="https://raw.githubusercontent.com/RaphaelOkuyama/RaphaelOkuyama/output/space-shooter.svg" width="100%" />
</picture>

<sub>Rebuilt daily by <a href="./.github/workflows/space-shooter.yml">GitHub Actions</a> · source in <a href="./tools/space-shooter/generate.mjs"><code>tools/space-shooter</code></a></sub>

</div>
