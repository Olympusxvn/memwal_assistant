# Mainnet blob log — Session 5 (completed)

**Date run:** 2026-06-30  
**Namespace:** `session5-architect`  
**MemWal account ID:** `0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6`  
**Runner:** `node scripts/run-demo-session5.mjs` (legacy `@memwalpp/mcp`)

> **Note:** The 12-blob run below used the **previous** account with community MCP. Current Session wallet (Edge login) is the account ID above — re-run captures with `@mysten-incubation/memwal-mcp` + `memwal_remember` for fresh Mainnet proof.

---

## Sync summary

| Metric | Value |
|--------|-------|
| `durableLive` | true |
| `metrics.pushed` | **12** |
| `metrics.skipped` | 0 |
| `metrics.failed` | 0 |

**Submission requirement:** ≥ 10 Mainnet blobs — **PASS**

---

## Record IDs (local + promoted)

| # | Label | memoryId |
|---|-------|----------|
| 1 | storage-walrus | `bc8d64e7-e587-464b-8764-a6e719398344` |
| 2 | namespace | `6f6e3dda-308c-4a1a-9f5e-6c9f7bdfeb30` |
| 3 | microservices-map | `8e93f035-12e7-4c8f-8c93-10064f49a1ca` |
| 4 | cursor-npx | `853fe149-3a86-47d0-b782-a1006b6bec20` |
| 5 | repository-pattern | `d2493a52-fadb-495b-86e7-aa59f3b57f52` |
| 6 | hybrid-recall | `6a220129-7749-4429-8e73-0e5d6e846ea8` |
| 7 | mcp-performance | `60e56305-f11c-4847-8f7f-d14eab8d8843` |
| 8 | redact-upstream | `db4718c5-4524-45ba-81af-07d1ff6a8689` |
| 9 | saveartifact-adr | `370d16fc-d23a-49ec-a63e-ddbcc9cdf9d8` |
| 10 | verify-schema | `89849a25-b830-44c1-8165-693fb37038dc` |
| 11 | single-prompt | `bb083e50-6557-4ff4-b464-69e7081a56bc` |
| 12 | agent-trace | `df4c0dc5-93d1-4b6f-828f-689bb4585459` |

Machine-readable log: [blob-log.session5.json](./blob-log.session5.json) (gitignored).

---

## DeepSurge form

- **Project name:** MemWal Architect Assistant  
- **Agent ID:** `0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6`  
- **Blob count:** 12  
- **GitHub:** https://github.com/Olympusxvn/memwal_assistant (private)

---

## Note

First run used `promote: local` → sync skipped all rows. Fixed: use `promote: walrus` (or `auto` + sync). See updated [PROMPT.md](../PROMPT.md).

Walrus blob IDs may appear asynchronously on the relayer; re-run `verify` on a `memoryId` after ~15s if `no_walrus_blob_to_check`.
