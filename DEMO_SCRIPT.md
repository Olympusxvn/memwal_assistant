# Demo script — 10+ Mainnet blobs (official MCP)

**Goal:** Walrus Session 5 requires **≥10 blobs on Mainnet** under your agent.  
**MCP:** `@mysten-incubation/memwal-mcp@0.0.5` — server **`memwal`**, **5 tools**  
**Namespace:** `session5-architect`  
**Account ID:** `0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6`

Complete [SETUP.md](./SETUP.md) first (MCP green + login). Log results in [scripts/blob-log.template.md](./scripts/blob-log.template.md).

---

## Phase 1 — Capture (≥10 `memwal_remember`)

Paste each block into Cursor chat **one at a time**. Wait for `memwal_remember` success before the next.

| # | User message | Tool | Done |
|---|--------------|------|------|
| 1 | `decision: Walrus is the durable layer for all Session 5 architecture artifacts. Context: infrastructure/storage. Rationale: Verifiable Mainnet blobs, low cost, aligns with MemWal hybrid model.` | memwal_remember | ☐ |
| 2 | `decision: Use namespace session5-architect for all Session 5 memories. Context: mcp/env. Rationale: Isolates demo blobs from other projects.` | memwal_remember | ☐ |
| 3 | `artifact: Microservices map for AI agent platform`<br><br>Body: Gateway, Memory (MCP), Orchestrator, Verifier, Storage (Walrus). Five services; MCP exposes memwal_remember/recall to IDE. | memwal_remember | ☐ |
| 4 | `decision: Cursor-first delivery via official @mysten-incubation/memwal-mcp. Context: developer-onboarding. Rationale: Session 5 requires Mysten official MCP package.` | memwal_remember | ☐ |
| 5 | `decision: Repository Pattern for all data access in backend services. Context: backend/. Rationale: Testability and separation from business logic.` | memwal_remember | ☐ |
| 6 | `decision: memwal_recall for topic search; memwal_restore when Walrus index is stale. Context: packages/core. Rationale: Durable source of truth with relayer index.` | memwal_remember | ☐ |
| 7 | `artifact: June MCP performance notes`<br><br>Metrics: demo session; track memwal_remember/recall latencies; target fast local recall after index warm-up. | memwal_remember | ☐ |
| 8 | `decision: Structured markdown ADR template for every memwal_remember call. Context: prompt-design. Rationale: Consistent recall and readable history.` | memwal_remember | ☐ |
| 9 | `decision: Browser login via Edge for MemWal delegate key. Context: setup. Rationale: No private keys in repo; credentials in ~/.memwal/credentials.json.` | memwal_remember | ☐ |
| 10 | `decision: Session 5 submission uses single system prompt Architect Assistant. Context: prompt-jam. Rationale: Judges score one well-crafted prompt.` | memwal_remember | ☐ |

**Optional extras:**

| 11 | `decision: memwal_analyze for bulk ADR extraction from long design docs. Context: prompt-design. Rationale: Multiple Walrus blobs from one paste.` | memwal_remember | ☐ |
| 12 | `artifact: Agent trace — demo session`<br><br>Steps: decision → memwal_remember → memwal_recall → new chat recall. | memwal_remember | ☐ |

**Optional — bulk via analyze (counts as multiple blobs):**

```
Phân tích và lưu architecture decisions từ đoạn sau:

Gateway routes to MCP memwal. Orchestrator runs agents. Storage is Walrus Mainnet.
Namespace session5-architect. Auth is browser wallet delegate. Recall is memwal_recall.
```

→ `memwal_analyze`

---

## Phase 2 — Walrus confirmation (no sync tool)

Wait **~5–15 seconds** after last remember (relayer async job).

In chat:

```
recall decisions about Walrus durable layer
```

**Pass criteria:**

- At least one hit from row #1
- Repeat recall for rows #5, #6 if time permits

If empty:

```
restore architecture memory
```

Then retry recall.

---

## Phase 3 — Cross-session recall

**Open new Cursor chat** (proves Walrus continuity):

```
recall decisions about Walrus durable layer
```

| Step | User message | Expected |
|------|--------------|----------|
| V1 | `recall decisions about Walrus durable layer` | Hit from row #1 |
| V2 | `recall decisions about Repository Pattern` | Hit from row #5 |
| V3 | `recall decisions about official memwal-mcp` | Hit from row #4 |
| V4 | New chat → `resume architecture` | Up to 3 recent hits |

---

## Phase 4 — Automated runner (optional)

```bash
cd official-memwal
npm install
npm run smoke          # remember + recall + analyze
npm run demo           # 10× memwal_remember + recall samples
```

---

## Phase 5 — Log proof for DeepSurge

Fill [scripts/blob-log.template.md](./scripts/blob-log.template.md):

- Agent / account ID
- Namespace `session5-architect`
- Blob count (successful remember + analyze calls)
- Date run
- MCP: `@mysten-incubation/memwal-mcp@0.0.5`

Suiscan: https://suiscan.xyz/mainnet/object/0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| MCP not connected | Copy `.cursor/mcp.json.example` → `.cursor/mcp.json`; restart Cursor; look for **`memwal`** (5 tools) |
| Auth error | `npx -y @mysten-incubation/memwal-mcp login` or `memwal_login` in chat |
| Recall empty after remember | Wait 15s; `memwal_restore`; retry recall |
| Old plugin visible | Disable **`memwal-agent-memory`** plugin (community 10-tool MCP) |
