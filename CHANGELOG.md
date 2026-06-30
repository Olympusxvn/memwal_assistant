# Changelog

All notable changes to **MemWal Architect Assistant** are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- **`official-memwal/`** — setup kit for Mysten Labs MCP [`@mysten-incubation/memwal-mcp@0.0.5`](https://www.npmjs.com/package/@mysten-incubation/memwal-mcp):
  - [official-memwal/README.md](./official-memwal/README.md) — install, login, tool overview
  - [official-memwal/TOOLS.md](./official-memwal/TOOLS.md) — live tool schemas + Architect trigger mapping
  - [official-memwal/PROMPT-OFFICIAL.md](./official-memwal/PROMPT-OFFICIAL.md) — pointer to [PROMPT.md](./PROMPT.md)
  - [official-memwal/mcp.example.json](./official-memwal/mcp.example.json) — Cursor config template
  - [official-memwal/scripts/smoke-test.mjs](./official-memwal/scripts/smoke-test.mjs) — `npm run tools` / `npm run smoke`
  - [official-memwal/scripts/login-chrome.mjs](./official-memwal/scripts/login-chrome.mjs) — optional `npm run login:chrome` (Chrome instead of Edge)
- **[FEEDBACK.md](./FEEDBACK.md)** — Session 5 bugs fixed, Walrus success checklist, MemWal GitHub issue links ([#339](https://github.com/MystenLabs/MemWal/issues/339)–[#342](https://github.com/MystenLabs/MemWal/issues/342))

### Changed

- **[PROMPT.md](./PROMPT.md)** — rewritten for official `@mysten-incubation/memwal-mcp` (5 tools); **submit this file**
- **[DEMO_SCRIPT.md](./DEMO_SCRIPT.md)**, **[DEMO_VIDEO.md](./DEMO_VIDEO.md)** — official `memwal_*` workflow (no sync/verify)
- **[SUBMISSION.md](./SUBMISSION.md)**, **[docs/DESIGN.md](./docs/DESIGN.md)**, **[README.md](./README.md)** — aligned with official MCP
- **[scripts/blob-log.template.md](./scripts/blob-log.template.md)** — official capture/recall fields
- **MemWal Mainnet account ID** → `0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6`
- **[SETUP.md](./SETUP.md)**, **[`.cursor/rules/architect-memory.mdc`](./.cursor/rules/architect-memory.mdc)** — point to PROMPT.md

### Deprecated

- **`scripts/run-demo-session5.mjs`** — community `@memwalpp/mcp` runner; use `official-memwal` smoke/demo scripts

### Removed (from active docs)

- Legacy `@memwalpp/mcp` as primary path in PROMPT, DEMO, SUBMISSION

### Notes

- Official MCP tools: `memwal_remember`, `memwal_recall`, `memwal_analyze`, `memwal_restore`, `memwal_login` — Walrus promote is async on remember (no separate `sync` tool)
- MemWal team closed feedback issues #339–#342; submission must use official MCP package

---

## [0.1.1] — 2026-06-30

### Fixed

- Demo sync skipped all rows when capture used `promote: local` — runner and docs now use `promote: walrus` / `auto`
- **[PROMPT.md](./PROMPT.md)** — warn against `promote: local` on remember; quality gate guidance

### Added

- **[scripts/run-demo-session5.mjs](./scripts/run-demo-session5.mjs)** — automated 12× remember/artifact + sync runner
- **[scripts/blob-log.session5.md](./scripts/blob-log.session5.md)** — Mainnet proof log (`metrics.pushed: 12`, `failed: 0`)

### Changed

- **[DEMO_SCRIPT.md](./DEMO_SCRIPT.md)** — troubleshooting for zero-push sync; optional rows #11–12

---

## [0.1.0] — 2026-06-13

### Added

- Initial **Walrus Session 5 Prompt Jam** kit — MemWal Architect Assistant
- **[PROMPT.md](./PROMPT.md)** — full system prompt (`decision:`, `artifact:`, `sync decisions`, `verify`)
- **[SETUP.md](./SETUP.md)** — Cursor MCP + Mainnet `MEMWAL_*` env
- **[DEMO_SCRIPT.md](./DEMO_SCRIPT.md)** — 10+ Mainnet blob walkthrough
- **[DEMO_VIDEO.md](./DEMO_VIDEO.md)** — 3-minute demo storyboard
- **[SUBMISSION.md](./SUBMISSION.md)** — DeepSurge / Walform checklist
- **[docs/DESIGN.md](./docs/DESIGN.md)** — architecture notes
- **[scripts/blob-log.template.md](./scripts/blob-log.template.md)** — proof log template
- **`.cursor/mcp.json`** (gitignored) — `@memwalpp/mcp@0.1.1` profile, namespace `session5-architect`
- **`.cursor/rules/architect-memory.mdc`** — Cursor rule wiring triggers to MCP tools

### Context

- Target MCP: `@memwalpp/mcp@0.1.1` (community, 10 tools)
- Namespace: `session5-architect`
- MemWal Mainnet account: `0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6`

[Unreleased]: https://github.com/Olympusxvn/memwal_assistant/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/Olympusxvn/memwal_assistant/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/Olympusxvn/memwal_assistant/releases/tag/v0.1.0
