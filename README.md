<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/RaphaelOkuyama/RaphaelOkuyama/output/terminal-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/RaphaelOkuyama/RaphaelOkuyama/output/terminal-light.svg" />
  <img alt="raphaelokuyama@github ~ $ whoami — Raphael Okuyama, Desenvolvedor Full-Stack" src="https://raw.githubusercontent.com/RaphaelOkuyama/RaphaelOkuyama/output/terminal-light.svg" width="100%" />
</picture>

**Português** · [English](./README-EN.md)

<a href="https://portfolio-raphael-okuyama.vercel.app/"><img src="https://img.shields.io/badge/Portf%C3%B3lio-000000?style=for-the-badge&logo=vercel&logoColor=white" height="28" alt="Portfólio" /></a>
<a href="https://portifolio-freelance.vercel.app/"><img src="https://img.shields.io/badge/Cases_Freelance-7C3AED?style=for-the-badge&logo=briefcase&logoColor=white" height="28" alt="Portfólio Freelance" /></a>
<a href="https://www.linkedin.com/in/raphael-okuyama/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" height="28" alt="LinkedIn" /></a>
<a href="mailto:raphaelokuyama123@gmail.com"><img src="https://img.shields.io/badge/Email-333333?style=for-the-badge&logo=gmail&logoColor=white" height="28" alt="E-mail" /></a>
<a href="https://wa.me/5511992117230"><img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" height="28" alt="WhatsApp" /></a>

</div>

---

## Raphael Okuyama — Desenvolvedor Full-Stack (TypeScript · Next.js · NestJS)

Construo e mantenho **software em produção com usuário real pagando**: hoje sou o desenvolvedor full-stack
da **IMACARDIOS**, plataforma B2B de telecardiologia que roda em 38 clínicas e assina mais de 1.000 laudos
por mês. Formando em Engenharia de Computação pela FACENS (Dez/2026), com foco em Clean Architecture,
testes automatizados e segurança sob LGPD.

> 🟢 **Disponível para estágio full-stack e projetos freelance.**
> Melhor caminho de contato: [LinkedIn](https://www.linkedin.com/in/raphael-okuyama/) ou [e-mail](mailto:raphaelokuyama123@gmail.com).

---

## Projetos em destaque

### 🏥 IMACARDIOS — Telecardiologia B2B &nbsp;`Freelance` `Em produção`

Plataforma de telemedicina e telelaudos para redes de saúde no Brasil e LATAM.

- Sustento **1.000+ laudos assinados/mês para 38 clínicas e 10+ cardiologistas** sem vazamento de dados
  entre contas, projetando uma arquitetura **multi-tenant** com isolamento por clínica e **RBAC** por perfil.
- Encurtei o ciclo *upload → revisão → assinatura* a um único fluxo operacional, entregando um painel com
  **fila priorizada por urgência e SLA em tempo real** para a equipe de operação.
- Mantenho o back-end estável em produção com **NestJS + Prisma/PostgreSQL**, documentado em Swagger e
  coberto por testes de unidade, integração e E2E (**Jest, Supertest, Playwright**).
- Adequei a plataforma à **LGPD** para dados sensíveis de saúde, implementando Argon2, 2FA/OTP, Helmet e
  rate limiting.

`Next.js` `NestJS` `TypeScript` `PostgreSQL` `Prisma` `Docker`

[**Acessar a plataforma →**](https://app.imacardios.com/) · [Case completo](https://portifolio-freelance.vercel.app/)
<br><sub>🔒 Repositório privado — produto comercial de cliente.</sub>

---

### 🏋️ Gestão de Treinos com IA

App full-stack que gera planos de treino personalizados com IA generativa.

- Eliminei a montagem manual de treinos, gerando planos personalizados **sob demanda em segundos**,
  ao integrar a **API Gemini** com prompts estruturados a partir do perfil do usuário.
- Fechei a superfície de ataque da API deixando **100% das rotas autenticadas e 100% dos endpoints
  validados**, com **Better Auth** (Google OAuth/JWT) e **Zod** em toda entrada.
- Reduzi o deploy a *push → produção* configurando **CI/CD na Vercel** sobre uma arquitetura REST em
  camadas.

`TypeScript` `Next.js` `Node.js` `PostgreSQL` `Prisma` `Gemini API`

[Front](https://github.com/RaphaelOkuyama/gestao-de-treino-frontend) · [API](https://github.com/RaphaelOkuyama/gestao-de-treino-api)

---

### 🎓 DevFlix — Plataforma EAD

Plataforma de ensino no estilo Netflix, com trilhas de estudo e player integrado.

- Fiz o aluno retomar o curso exatamente de onde parou, **persistindo o progresso por trilha e por
  usuário** em PostgreSQL com autenticação própria.
- Suportei **múltiplos usuários simultâneos** sem degradação, estruturando o back-end em
  **Node.js + REST + MVC** com separação clara de camadas.

`React` `Node.js` `REST APIs` `PostgreSQL`

[Front](https://github.com/RaphaelOkuyama/devflix-frontend) · [API](https://github.com/RaphaelOkuyama/devflix-backend)

---

## Experiência

**Desenvolvedor Full-Stack Freelance** — IMACARDIOS · `2024 – atual`
- Entreguei e opero um produto comercial em produção usado por **38 clínicas**, conduzindo sozinho o ciclo
  completo: levantamento de requisitos com o cliente, arquitetura, implementação, deploy e evolução.

**Prefeitura de Mairinque** — Estagiário de Desenvolvimento de Software e TI · `Fev/2025 – atual`
- Reduzi em **~70%** o tempo de geração de contratos administrativos, automatizando o processo com um
  script em **Python**.
- Derrubei o volume de chamados no GLPI de **60+ para menos de 10 por mês (−83%)**, atacando as causas
  recorrentes e padronizando uma imagem customizada do Windows.
- Mantive servidores e infraestrutura de rede da prefeitura em operação contínua.

**Supermercado Mairinque** — Técnico de TI e Analista de Dados · `Abr/2022 – Fev/2025`
- Mantive **40+ PDVs**, self-checkouts, scanners e balanças disponíveis por **3 anos sem interrupção
  crítica**, com rotina própria de manutenção preventiva.
- Expus inconsistências de cadastro no ERP VR Software construindo relatórios e dashboards em
  **Power BI/Excel**.

---

## Stack

<details open>
<summary><b>Principal — o que eu uso todo dia</b></summary>
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
<summary><b>Ferramentas completas</b> — frontend, backend, dados, DevOps, segurança</summary>
<br>

**Linguagens** · TypeScript · JavaScript · Python · SQL

**Frontend** · React · Next.js · Tailwind CSS · shadcn/ui · Framer Motion · Sass · Bootstrap · HTML5 · CSS3

**Backend** · Node.js · NestJS · Express · Fastify · Prisma · Zod · Swagger/OpenAPI · REST

**Segurança & Auth** · JWT · OAuth 2.0 · Better Auth · Argon2 · 2FA/OTP · Helmet · rate limiting · RBAC · LGPD

**Bancos de dados** · PostgreSQL · MySQL · MongoDB

**DevOps & Deploy** · Git · GitHub Actions · Docker · Vercel · CI/CD

**Testes & Qualidade** · Jest · Supertest · Playwright · ESLint · Prettier

**Arquitetura** · Clean Architecture · SOLID · MVC · multi-tenancy · Scrum · Kanban

**Dados & BI** · Power BI · Excel · Pandas

**Ferramentas** · VS Code · Insomnia · Postman · Vite · Beekeeper Studio · Figma · Gemini API

</details>

---

## Formação

- **Engenharia de Computação** — Centro Universitário FACENS · conclusão **Dez/2026**
- **OneBitCode — Formação Full-Stack** · React, TypeScript, Next.js, Node.js, REST/MVC, SQL + Prisma, Git
- **Fundação Bradesco** — Inteligência Artificial: Fundamentos
- **Idiomas** — Português (nativo) · Inglês (B1)

---

## GitHub

<div align="center">

<img height="165" alt="Estatísticas do GitHub de Raphael Okuyama" src="https://github-readme-stats.vercel.app/api?username=RaphaelOkuyama&theme=github_dark&hide_border=true&include_all_commits=true&count_private=true&card_width=420" />
<img height="165" alt="Linguagens mais usadas" src="https://github-readme-stats.vercel.app/api/top-langs/?username=RaphaelOkuyama&theme=github_dark&hide_border=true&include_all_commits=true&count_private=true&layout=compact&card_width=330" />

</div>

### Contribution Space Shooter

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/RaphaelOkuyama/RaphaelOkuyama/output/space-shooter-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/RaphaelOkuyama/RaphaelOkuyama/output/space-shooter.svg" />
  <img alt="Nave destruindo o grafo de contribuições do GitHub" src="https://raw.githubusercontent.com/RaphaelOkuyama/RaphaelOkuyama/output/space-shooter.svg" width="100%" />
</picture>

<sub>Gerado diariamente por <a href="./.github/workflows/space-shooter.yml">GitHub Actions</a> · código em <a href="./tools/space-shooter/generate.mjs"><code>tools/space-shooter</code></a></sub>

</div>

<!--
  TODO — números que eu ainda preciso preencher para deixar o XYZ 100%:
  - IMACARDIOS: tempo médio do laudo antes x depois; cobertura de testes (%); uptime.
  - Gestão de Treinos: nº de usuários/planos gerados; tempo médio de resposta da geração.
  - DevFlix: nº de alunos/trilhas; tempo de carga do player.
  Substitua os trechos genéricos ("em segundos", "sem degradação") por números reais assim que tiver.
-->
