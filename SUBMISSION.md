# Walrus Session 5 — Submission checklist

**Project name:** MemWal Architect Assistant  
**Event:** [Walrus Memory Prompt Jam](https://thewalrussessions.wal.app/prompt-jam/index.html)  
**Hackathon window:** 26 Jun 2026 09:00 UTC → 13 Jul 2026 14:00 UTC  

---

## Problem statement (submit — 2 sentences)

When working on a large codebase, important architectural decisions are forgotten or never recorded systematically, causing repeated debates and contradictory choices across sessions. MemWal Architect Assistant instructs the agent to capture structured decisions and ADRs via `@memwalpp/mcp`, recall them by topic, and sync to Walrus Mainnet for verification and cross-session continuity.

---

## How it uses Walrus Memory (submit — 2–5 sentences)

The system prompt binds user triggers (`decision:`, `artifact:`, `sync decisions`) to MCP tools: `remember` and `saveArtifact` write structured memories locally, then `sync` promotes redacted rows through the MemWal relayer to **Walrus Mainnet** blobs. `recall` and `search` retrieve decisions in new sessions; `verify` confirms integrity via `memoryId` and optional Walrus checks. Namespace **`session5-architect`** isolates Session 5 blobs. Full prompt text: [PROMPT.md](./PROMPT.md).

---

## Mainnet proof

| Field | Value |
|-------|--------|
| **MemWal account ID** | `0x73b07979a6712f54283c02ddf70e2bdfb3ec729627c9ef0e0d8a214015066a99` |
| **Suiscan** | https://suiscan.xyz/mainnet/object/0x73b07979a6712f54283c02ddf70e2bdfb3ec729627c9ef0e0d8a214015066a99 |
| **Namespace** | `session5-architect` |
| **Target blob count** | ≥ 10 (see [DEMO_SCRIPT.md](./DEMO_SCRIPT.md)) |
| **Blob log** | [scripts/blob-log.template.md](./scripts/blob-log.template.md) |

---

## Submission checklist

### Required content

- [ ] **GitHub repo** — `memwal_assistant` public
- [ ] **Full prompt** — [PROMPT.md](./PROMPT.md) copy-pasteable
- [ ] **DeepSurge** — register + submit project
- [ ] **Walform** — https://walform.wal.app/f?formId=0x308876d0… (from event rules)
- [ ] **Mainnet** — ≥10 blobs; agent ID + blob count on form
- [ ] **Dedicated Session wallet** — documented (address in SETUP, not private key)
- [ ] **Demo video** — ≤3 min, uploaded to Walrus ([DEMO_VIDEO.md](./DEMO_VIDEO.md))
- [ ] **MemWal feedback** — GitHub issue(s) at [MystenLabs/MemWal](https://github.com/MystenLabs/MemWal)
- [ ] **Discord** — [Walrus Discord](https://discord.com/invite/walrusprotocol)
- [ ] **X post** — `#Walrus` with demo link or screenshot

### Screenshots (attach to DeepSurge / video)

- [ ] Cursor Settings → MCP connected (10 tools)
- [ ] `decision:` → remember success
- [ ] `sync decisions` → pushed ≥ 10
- [ ] `verify` → valid + walrusBlobId

### Prompt quality self-check (judge criteria)

- [ ] Solves **real** recurring problem (architecture amnesia)
- [ ] Clear rules: **when** to remember, **structure**, **when** to sync/verify
- [ ] Uses Walrus **meaningfully** (durable backup, not one-off remember)
- [ ] **Works** — demo script completed on Mainnet

---

## Prizes (reference)

| Category | Pool |
|----------|------|
| Team Choice | 5 × $200 WAL |
| Best Feedback | $300 WAL pool |
| Special Prize | $200 WAL |
| Community Choice | 3 × $100 WAL |

---

## Links

- MCP package: https://www.npmjs.com/package/@memwalpp/mcp
- Platform monorepo: https://github.com/Olympusxvn/memwal-agent-memory
- Session 5 Notion: https://mystenlabs.notion.site/Walrus-Session-5-3756d9dcb4e9808ca16fc8c22562e3c6
