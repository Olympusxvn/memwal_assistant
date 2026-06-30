# Design notes — MemWal Architect Assistant

Session 5 Prompt Jam · Walrus Memory · official MCP.

---

## Goal

Ship a **submit-ready** thin repo: one well-crafted system prompt + setup + Mainnet demo using **`@mysten-incubation/memwal-mcp@0.0.5`**.

---

## Stack

| Layer | Choice |
|-------|--------|
| IDE | Cursor + MCP stdio |
| MCP server (Cursor UI: **`memwal`**) | `@mysten-incubation/memwal-mcp@0.0.5` |
| Tools | 5 — `memwal_remember`, `memwal_recall`, `memwal_analyze`, `memwal_restore`, `memwal_login` |
| Durable store | Walrus Mainnet via MemWal relayer |
| Namespace | `session5-architect` |
| Auth | Browser wallet → `~/.memwal/credentials.json` |
| MemWal account | `0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6` |

---

## Problem / solution (submission text)

When working on a large codebase, important architectural decisions are forgotten or never recorded systematically, causing repeated debates and contradictory choices across sessions. MemWal Architect Assistant instructs the agent to capture structured decisions via **`memwal_remember`**, recall them with **`memwal_recall`**, and rely on **Walrus Mainnet** durability for cross-session continuity.

---

## Data flow

```
User: decision: / artifact:
    → memwal_remember (structured markdown in text)
    → MemWal relayer (async job)
    → Walrus Mainnet blob

User: recall decisions about …
    → memwal_recall (semantic search)

Index stale / empty recall
    → memwal_restore (re-index from Walrus blobs)
    → memwal_recall (retry)

Long doc paste
    → memwal_analyze → multiple memwal_remember jobs
```

---

## Prompt design choices

- **Triggers** — natural language prefixes (`decision:`, `artifact:`) map 1:1 to tools.
- **Structured markdown** — `## Decision`, `## Context`, `## Rationale` for readable ADRs and better recall.
- **No sync verb** — official MCP promotes on remember; prompt explains legacy `sync decisions` requests.
- **Cross-session** — `resume architecture` → `memwal_recall` in new chat.

---

## Out of scope

- Community `@memwalpp/mcp` (10-tool sync/verify stack) — replaced by official MCP for Session 5.
- NFT / marketplace / on-chain lineage tools not in official 5-tool surface.

---

## Repo map

| Path | Role |
|------|------|
| [PROMPT.md](../PROMPT.md) | Submit-ready system prompt |
| [DEMO_SCRIPT.md](../DEMO_SCRIPT.md) | ≥10 blob walkthrough |
| [official-memwal/](../official-memwal/) | MCP config, smoke tests, tool reference |
| [.cursor/rules/architect-memory.mdc](../.cursor/rules/architect-memory.mdc) | Cursor rule wiring triggers |
