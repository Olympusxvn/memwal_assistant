# Official MCP tool reference

Generated from live `tools/list` against `@mysten-incubation/memwal-mcp@0.0.5` + Mainnet relayer.

---

## `memwal_remember`

Save a fact to Walrus Memory. **Call only when user explicitly asks to remember.**

```json
{
  "text": "## Decision\n…\n\n## Context\n…\n\n## Rationale\n…",
  "namespace": "session5-architect"
}
```

| Field | Required | Notes |
|-------|----------|-------|
| `text` | yes | Full content — do not summarize |
| `namespace` | no | Defaults from MCP config (`session5-architect`) |

**Walrus:** Relayer queues async job → blob on Mainnet. No separate `sync` step.

**Architect trigger:** `decision: …` or `artifact: …` → format as markdown → `memwal_remember`.

---

## `memwal_recall`

Semantic search over Walrus-backed memories.

```json
{
  "query": "Walrus durable layer",
  "limit": 8,
  "namespace": "session5-architect"
}
```

| Field | Required | Default |
|-------|----------|---------|
| `query` | yes | — |
| `limit` | no | 10 (max 100) |
| `namespace` | no | from MCP config |

**Architect trigger:** `recall decisions about <topic>` → `memwal_recall` with topic query.

**Latency:** First recall after remember may lag ~5–15s (async Walrus index). Retry or call `memwal_restore`.

---

## `memwal_analyze`

Extract multiple facts from a passage and save each as separate memories.

```json
{
  "text": "<long design doc or meeting notes>",
  "namespace": "session5-architect"
}
```

**Use case:** Bulk ADR ingestion from pasted architecture docs — each extracted fact becomes its own Walrus blob.

---

## `memwal_restore`

Re-index a namespace from **Walrus blobs** into relayer search index.

```json
{
  "namespace": "session5-architect",
  "limit": 10
}
```

| Field | Required | Default |
|-------|----------|---------|
| `namespace` | yes | — |
| `limit` | no | 10 (max 500) |

**Walrus-first recovery:** Use when memories exist on Mainnet but `memwal_recall` returns empty (index drift / cold start).

**Architect trigger (proposed):** `restore architecture memory` → `memwal_restore`.

---

## `memwal_login`

Browser wallet login. Writes `~/.memwal/credentials.json`.

```json
{}
```

Call when other tools fail with auth errors. User must approve in browser.

**Windows:** Edge (default browser) works for login. Use `npm run login:chrome` only if you prefer Chrome.

CLI equivalent:

```bash
npx -y @mysten-incubation/memwal-mcp login
```

---

## Mapping: legacy triggers → official tools

| User says | Official tool | Notes |
|-----------|---------------|-------|
| `decision: …` | `memwal_remember` | Structured markdown in `text` |
| `artifact: …` | `memwal_remember` | Full ADR body in `text` (no separate artifact API) |
| `recall decisions about …` | `memwal_recall` | Single tool (no separate `search`) |
| `sync decisions` | *(none)* | Remember already queues Walrus promote |
| `verify last decision` | *(none)* | Check Suiscan / Walrus dashboard; optional `memwal_restore` + recall |
| `resume architecture` | `memwal_recall` | Query `recent architecture decisions` |

---

## Smoke test results

Run: `npm run smoke` in this directory.

| Step | Pass criteria |
|------|---------------|
| `npm run tools` | 5 tools listed |
| `memwal_remember` | Returns job / memory id (after login) |
| `memwal_recall` | Hit on smoke-test topic (~3s delay) |
| `memwal_analyze` | Extracts facts from sample passage |

Log path: `test-output/smoke-log.json`
