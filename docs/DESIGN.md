# Design — MemWal Architect Assistant

**Date:** 2026-06-13  
**Status:** Approved  
**Event:** Walrus Session 5 Prompt Jam  

---

## Goal

Ship a **submit-ready** thin repo: one well-crafted system prompt + setup + Mainnet demo script using `@memwalpp/mcp@0.1.1`.

## Approved decisions

| Item | Choice |
|------|--------|
| Positioning | **A** — Architect's Memory Assistant |
| Name | MemWal Architect Assistant |
| Namespace | `session5-architect` |
| MemWal account (Mainnet) | `0x73b07979a6712f54283c02ddf70e2bdfb3ec729627c9ef0e0d8a214015066a99` |
| Repo shape | Prompt Kit (no MCP fork) |
| MCP version | `@memwalpp/mcp@0.1.1` |

## Problem (canonical)

When working on a large codebase, important architectural decisions are forgotten or never recorded systematically, causing repeated debates and contradictory choices across sessions. MemWal Architect Assistant instructs the agent to capture structured decisions and ADRs via `@memwalpp/mcp`, recall them by topic, and sync to Walrus Mainnet for verification and cross-session continuity.

## Architecture

```
User (decision:/artifact:) → Cursor Agent + PROMPT.md
         → MCP @memwalpp/mcp (10 tools)
         → Local SQLite (session5-architect)
         → sync → MemWal relayer → Walrus Mainnet
         → verify / recall / search
```

## Out of scope

- MemoryPack NFT mint via MCP (not in v1 tool surface)
- Per-row quality score in getStats
- Monorepo agent-swarm / Move marketplace in this repo

## Deliverables

- [x] README, PROMPT, SETUP, DEMO_SCRIPT, DEMO_VIDEO, SUBMISSION
- [x] `.cursor/mcp.json` + rule
- [ ] Operator: run DEMO_SCRIPT on Mainnet
- [ ] Operator: screenshots + 3 min video on Walrus
- [ ] Operator: DeepSurge + walform + GitHub push

## References

- [memwal-agent-memory](https://github.com/Olympusxvn/memwal-agent-memory)
- [Prompt Jam rules](https://thewalrussessions.wal.app/prompt-jam/index.html)
