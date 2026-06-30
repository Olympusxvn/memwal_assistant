# Demo script — 10+ Mainnet blobs

**Goal:** Walrus Session 5 requires **≥10 blobs on Mainnet** under your agent.  
**Namespace:** `session5-architect`  
**Account ID (proof):** `0x73b07979a6712f54283c02ddf70e2bdfb3ec729627c9ef0e0d8a214015066a99`

Complete [SETUP.md](./SETUP.md) first. Log results in [scripts/blob-log.template.md](./scripts/blob-log.template.md).

---

## Phase 1 — Local captures (10 writes)

Paste each block into Cursor chat **one at a time**. Wait for MCP `remember` / `saveArtifact` success before the next.

| # | User message | Tool | Done |
|---|--------------|------|------|
| 1 | `decision: Walrus is the durable layer for all Session 5 architecture artifacts. Context: infrastructure/storage. Rationale: Verifiable blobs, low cost, aligns with MemWal hybrid model.` | remember | ☐ |
| 2 | `decision: Use namespace session5-architect for all Session 5 memories. Context: mcp/env. Rationale: Isolates demo blobs from other projects.` | remember | ☐ |
| 3 | `artifact: Microservices map for AI agent platform`<br><br>Body: Gateway, Memory (MCP), Orchestrator, Verifier, Storage (Walrus). Five services; MCP exposes remember/recall/sync to IDE. | saveArtifact | ☐ |
| 4 | `decision: Cursor-first delivery via npx @memwalpp/mcp before monorepo clone. Context: developer-onboarding. Rationale: Prompt Jam submitters need ≤5 minute install.` | remember | ☐ |
| 5 | `decision: Repository Pattern for all data access in backend services. Context: backend/. Rationale: Testability and separation from business logic.` | remember | ☐ |
| 6 | `decision: Hybrid recall — local SQLite first, durable hydrate on forceDurable or thin local index. Context: packages/core sync. Rationale: Sub-10ms local path; Walrus for portability.` | remember | ☐ |
| 7 | `artifact: June MCP performance notes`<br><br>Metrics: demo session; track remember/sync/verify latencies; target &lt;200ms local recall. | saveArtifact | ☐ |
| 8 | `decision: redactForUpstream runs before every Walrus promote. Context: privacy. Rationale: PII must not reach MemWal relayer even after local store.` | remember | ☐ |
| 9 | `decision: saveArtifact for ADRs; remember for short decisions. Context: prompt-design. Rationale: Keeps recall precise and artifacts structured.` | remember | ☐ |
| 10 | `decision: verify uses memoryId or proof JSON, not raw blob id alone. Context: mcp/tools. Rationale: Matches @memwalpp/mcp v1 verify schema.` | remember | ☐ |

**Optional extras (if sync skips low-quality rows):**

| 11 | `decision: Session 5 submission uses single system prompt Architect Assistant not twelve separate products. Context: prompt-jam. Rationale: Judges score one well-crafted prompt.` | remember | ☐ |
| 12 | `artifact: Agent trace — demo session`<br><br>Steps: receive decision → remember → sync → verify → recall in new chat. | saveArtifact | ☐ |

---

## Phase 2 — Sync to Mainnet

In chat:

```
sync decisions
```

**Pass criteria:**

- `durableLive: true`
- `metrics.pushed >= 10` (or run sync twice after adding optional rows)
- Note any `metrics.skipped` — expand content length if quality gate rejects rows

Optional full pull:

```
sync decisions with forceDurable true
```

(Agent should call `sync` with `"forceDurable": true`.)

---

## Phase 3 — Verify & read-back

| Step | User message | Expected |
|------|--------------|----------|
| V1 | `verify last decision` | `valid: true`, `walrusBlobId` present |
| V2 | `recall decisions about Walrus durable layer` | Hit from row #1 |
| V3 | `recall decisions about Repository Pattern` | Hit from row #5 |
| V4 | `search hybrid recall local SQLite` | Semantic hit row #6 |
| V5 | Pick one `memoryId` from recall → `show version history for <memoryId>` | getVersionHistory returns timeline |
| V6 | Same id → `show lineage for <memoryId>` | getLineage metadata graph |

---

## Automated runner (optional)

From `memwal-agent-memory` root (after setting `MEMWAL_PRIVATE_KEY` in env):

```bash
node scripts/run-demo-session5.mjs
```

Log written to `scripts/blob-log.session5.json` and [blob-log.session5.md](./scripts/blob-log.session5.md).

---

## Phase 4 — Log proof for DeepSurge

Fill [scripts/blob-log.template.md](./scripts/blob-log.template.md) or use completed [blob-log.session5.md](./scripts/blob-log.session5.md):

- Agent / account ID
- Namespace
- Blob count (from sync + verify outputs)
- 3 sample `walrusBlobId` values
- Date run

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| MCP not connected | Restart Cursor; check `npx @memwalpp/mcp` in mcp.json |
| `durableLive: false` | Set `MEMWAL_*` env in mcp.json |
| `metrics.pushed: 0`, all skipped | Remove `promote: local` on remember; use `promote: auto` or `walrus`, or clear data dir and re-run |
| Recall empty after remember | Normal 5–15s async on relayer; retry recall or use local query first |
| verify fails | Use `memoryId` from same session’s remember output |
