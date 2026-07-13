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
| Tools (core) | **5** — `memwal_remember`, `memwal_recall`, `memwal_analyze`, `memwal_restore`, `memwal_login` (prompt scope; package may expose more) |
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
User: decision: / debug: / artifact:
    → memwal_remember (typed ADR markdown: ## Type + Decision + Context + …)
    → MemWal relayer (embed + encrypt + async Walrus upload)
    → Walrus Mainnet blob

User: recall decisions about …
    → memwal_recall (semantic / vector search over embeddings)

Index stale / empty recall
    → memwal_restore (re-index from Walrus blobs)
    → memwal_recall (retry)

Long doc paste (explicit request)
    → memwal_analyze → multiple Walrus-backed memories
```

---

## Phase A — Typed · Semantic · Human-gated

Prompt Jam stays **MCP + one system prompt**. No client embedding pipeline, no wallet-sign UI.

| Pillar | Implementation | Honest boundary |
|--------|----------------|-----------------|
| **Typed memory** | Required `## Type` enum in ADR markdown; `decision:` → `architecture_decision` (default); `debug:` → `debug_trace` | Convention in text — not a new on-chain schema |
| **Semantic recall** | Document + instruct: `memwal_recall` = MemWal relayer embeddings / vector search | Do not reimplement OpenAI embeddings in this repo |
| **Human-gated durability** | Remember only on explicit triggers; confirm “queued for Walrus” (async) | No integrity-verify tool; no claim of wallet-signed ADRs |

### Memory type enum

- `architecture_decision`
- `tech_stack_convention`
- `resolved_bottleneck`
- `debug_trace`

---

## Prompt design choices

- **Triggers** — `decision:`, `debug:`, `artifact:` map to `memwal_remember`; recall/restore/analyze/login unchanged.
- **Structured typed markdown** — `## Type`, `## Decision`, `## Context`, `## Rationale` for readable ADRs and better semantic hits.
- **No sync verb** — official MCP promotes on remember; prompt explains `sync decisions` without inventing a tool.
- **Cross-session** — `resume architecture` → `memwal_recall` in new chat.
- **5 core of ≤8 tools** — extras optional; no invented triggers.

---

## Local Markdown vs Walrus (MemWal)

| Benefit criteria | Local Markdown (`.md`) | Walrus Mainnet (`memwal_assistant`) |
|------------------|------------------------|-------------------------------------|
| **Context retention (AI memory)** | Short-term & siloed. Closing the chat drops context; you re-upload or re-paste ADRs each session. | Cross-session living memory. Agent recalls prior decisions in new chats via `memwal_recall`. |
| **Data durability & recovery** | Vulnerable to disk failure, accidental delete, or machine migration unless Git-backed. | Durable by default — immutable Walrus Mainnet blobs; re-index with `memwal_restore` on a new machine after login. |
| **Workflow friction** | Manual: structure, format, and save ADR files during/after coding. | Fluid: one `decision:` / `artifact:` prompt → structured markdown → `memwal_remember` → Walrus. |
| **Team / multi-agent availability** | Sync via Git commit / PR / merge before others (or other agents) see it. | After write, any session under the **same MemWal account + namespace** can `memwal_recall` (relayer search). Not a public “anyone with a blob ID” API without auth. |
| **Privacy & control** | 100% local — best for confidential enterprise ADRs. | Account-scoped through MemWal; content lives as Walrus blobs. Fit for OSS / Web3 / non-secret architecture notes. **Never store secrets.** |
| **Context window** | Feeding a whole ADR folder bloats the prompt. | Pinpoint retrieval — only the decisions matching the current topic. |

**Framing:** Traditional ADRs are for **humans**. MemWal ADRs are for **AI agents** — a programmable memory layer the agent writes and queries.

**Caveats (honest):**

- Local Git ADRs remain valuable for human review and PR history; MemWal complements them, it does not replace a design-doc culture.
- “Instant global access” means **same account/namespace after index warm-up** (~5–15s), not anonymous public read of every blob.
- Privacy is weaker than pure local files — keep proprietary secrets out of `memwal_remember`.

---

## Out of scope

- Community `@memwalpp/mcp` (10-tool sync/verify stack) — replaced by official MCP for Session 5.
- Optional MCP extras (`memwal_remember_bulk`, `memwal_health`, `memwal_logout`) — not part of the Architect Assistant **5-tool core**.
- Client-side embedding SDKs, wallet-sign ADR UI, NFT / marketplace / on-chain lineage tools.

---

## Repo map

| Path | Role |
|------|------|
| [PROMPT.md](../PROMPT.md) | Submit-ready system prompt |
| [DEMO_SCRIPT.md](../DEMO_SCRIPT.md) | ≥10 blob walkthrough |
| [official-memwal/](../official-memwal/) | MCP config, smoke tests, tool reference |
| [.cursor/rules/architect-memory.mdc](../.cursor/rules/architect-memory.mdc) | Cursor rule wiring triggers |
