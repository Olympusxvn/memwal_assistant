# MemWal feedback — Session 5 Prompt Jam

**Project:** MemWal Architect Assistant  
**Namespace:** `session5-architect`  
**MemWal account:** `[0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6](https://suiscan.xyz/mainnet/object/0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6)`  
**MCP package:** `@mysten-incubation/memwal-mcp@0.0.5` (official — [official-memwal/](./official-memwal/))  
**Legacy:** `@memwalpp/mcp@0.1.1` — early feedback issues #339–342 targeted community MCP (closed by Mysten).

## GitHub issues (MystenLabs/MemWal)


| Track              | Issue                                                   | Status                    |
| ------------------ | ------------------------------------------------------- | ------------------------- |
| **Index**          | [#339](https://github.com/MystenLabs/MemWal/issues/339) | Closed — use official MCP |
| **Documentation**  | [#340](https://github.com/MystenLabs/MemWal/issues/340) | Closed                    |
| **Observability**  | [#341](https://github.com/MystenLabs/MemWal/issues/341) | Closed                    |
| **Durable recall** | [#342](https://github.com/MystenLabs/MemWal/issues/342) | Closed                    |
| **Slush zkLogin UX** | [#27109](https://github.com/MystenLabs/sui/issues/27109) (MystenLabs/sui) | Open — Unlock vs Google sign-in |


---



## Bugs encountered & fixes (this project)


| #   | Bug / symptom                                      | Root cause                                                                                                        | Fix applied                                                                                                                                             | Status                                                                   |
| --- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 1   | `sync` → `metrics.pushed: 0`, all rows **skipped** | Capture used `promote: "local"` — rows never entered Walrus queue                                                 | Use `promote: "walrus"` or `"auto"` + explicit `sync`. Updated [PROMPT.md](./PROMPT.md), demo runner                                                    | **Fixed** → [#340](https://github.com/MystenLabs/MemWal/issues/340)      |
| 2   | Quality gate rejects rows on sync                  | Content too short for pre-Walrus gate                                                                             | Structured ADR markdown template in PROMPT                                                                                                              | **Fixed** → [#340](https://github.com/MystenLabs/MemWal/issues/340)      |
| 3   | `verify` fails with raw Walrus blob id             | API expects `memoryId` or `proof`, not blob id alone                                                              | Documented in PROMPT; recall before verify                                                                                                              | **Fixed** → [#340](https://github.com/MystenLabs/MemWal/issues/340)      |
| 4   | Empty recall right after Walrus promote            | Relayer/index lag (~5–15 s) after blob lands on Mainnet                                                           | Retry recall; topic + semantic search                                                                                                                   | **Workaround** → [#342](https://github.com/MystenLabs/MemWal/issues/342) |
| 5   | Generic “recent decisions” → 0 hits on cold start  | Durable index not hydrated yet in new session                                                                     | Topic recall + search; propose durable-first recall                                                                                                     | **Workaround** → [#342](https://github.com/MystenLabs/MemWal/issues/342) |
| 6   | `verify` → `walrus_index_unavailable`              | Walrus index unreachable; local hash still valid                                                                  | Retry after ~15 s; clarify verify states                                                                                                                | **Open** → [#340](https://github.com/MystenLabs/MemWal/issues/340)       |
| 7   | Duplicate `dur-*` vs UUID ids                      | Hybrid merge after Walrus hydrate                                                                                 | Use UUID with metadata for verify when available                                                                                                        | **Documented** → [#340](https://github.com/MystenLabs/MemWal/issues/340) |
| 8   | Slush **Unlock wallet** always says wrong password | Wallet created with **zkLogin (Google)** — no local Slush password; Unlock screen is for seed-phrase wallets only | Use **Sign in with Google** (same email as wallet creation); skip Unlock. Then MemWal: Connect Sui Wallet → Slush → Google → approve `add_delegate_key` | **Filed** → [MystenLabs/sui#27109](https://github.com/MystenLabs/sui/issues/27109) |




### Repro (Walrus promote blocked)

```text
1. remember / saveArtifact with promote: "local"
2. sync → metrics.pushed: 0 (no Walrus blobs created)
3. promote: "walrus" → sync → metrics.pushed: 12 on Mainnet
```

---



## Setup feedback — Slush zkLogin vs Unlock wallet

**Observed (2026-06-30):** During MemWal browser login, user repeatedly entered the same password on Slush **Unlock wallet** and always got “wrong password.” Screen recording showed a single unlock field (not confirm-password).

**Root cause:** Session wallet was created with **zkLogin (Google)**, not a 12-word seed phrase. zkLogin wallets **do not set a local Slush password** — there is nothing to unlock with a password field.

**What works:**


| Wallet type                           | Open Slush                                         | Do not use                          |
| ------------------------------------- | -------------------------------------------------- | ----------------------------------- |
| **zkLogin (Google / Apple / Twitch)** | **Sign in with Google** (same account as creation) | Unlock wallet + password            |
| **Seed phrase import**                | Password set at import time                        | Google sign-in (unless also linked) |


**MemWal login flow (official MCP):**

1. `memwal_login` or `npx -y @mysten-incubation/memwal-mcp login`
2. Browser → **Connect Sui Wallet** → **Slush**
3. Slush → **Sign in with Google** (if not already connected)
4. Approve `add_delegate_key` on Sui Mainnet → page shows **Connected**
5. Credentials at `~/.memwal/credentials.json` → **fully quit and reopen Cursor**

**Doc gap:** [SETUP.md](./SETUP.md) now documents zkLogin vs seed-phrase unlock. Slush UX tracked in [MystenLabs/sui#27109](https://github.com/MystenLabs/sui/issues/27109).

---



## Walrus usage pattern (smart / deliberate)


| Phase            | Walrus role                                     | Local role                |
| ---------------- | ----------------------------------------------- | ------------------------- |
| Capture          | Off-Walrus until reviewed                       | Fast write buffer         |
| `sync decisions` | **Batch promote to Mainnet** after team review  | Cached index + hash proof |
| `verify`         | Confirm blob integrity (`checkWalrus`)          | Local hash match          |
| New session      | **Authoritative ADR store** (durable namespace) | Sub-10ms cache when warm  |


Design choices:

- Batch sync instead of auto-push — fewer blobs, meaningful durability
- Redaction before Walrus promote — enterprise-safe ADRs
- Namespace `session5-architect` — isolated Mainnet blobs per project
- Structured markdown + metadata — passes pre-Walrus quality gate

---



## Checklist thành công (demo Mainnet)

### Official MCP run (2026-06-30)

- [x] Slush zkLogin (Google) + `memwal_login` → `~/.memwal/credentials.json`
- [x] **11×** `memwal_remember` → Walrus Mainnet blobs ([blob-log.official-mcp.md](./scripts/blob-log.official-mcp.md))
- [x] `memwal_recall` — Walrus durable layer (score ~0.64)
- [x] `memwal_recall` — Repository Pattern (score ~0.62)
- [ ] New chat → `resume architecture` (Phase 2 demo)

### Walrus & MCP (legacy community MCP)

- [x] `getStats` → `durableLive: true`
- [x] `sync` → **12 blobs** pushed to Mainnet (`failed: 0`)
- [x] Re-sync → 20/20 rows synced, `pendingSync: 0`
- [x] `verify last decision` → `valid: true`, `walrusBlobId` present
- [x] Cross-session recall from Walrus-backed namespace



### Capture & workflow

- [x] 10× `decision:` + 2× `artifact:` captured
- [x] Explicit `sync decisions` after review (not auto-push)
- [x] Topic recall + semantic search merge



### Submission

- [x] Mainnet blob count ≥ 10
- [x] Blob log: [scripts/blob-log.session5.md](./scripts/blob-log.session5.md)
- [ ] MemWal issues filed: [#339](https://github.com/MystenLabs/MemWal/issues/339)–[#342](https://github.com/MystenLabs/MemWal/issues/342)



### Screenshots (DeepSurge / video)

- [x] MCP `memwal` connected (5 tools)
- [ ] `memwal_remember` after `decision:`
- [ ] `memwal_recall` returns hits
- [ ] `verify` → valid + walrusBlobId
- [ ] New chat → recall from durable memory

---



## Sample verify output

```json
{
  "valid": true,
  "memoryId": "dur-BY9bYdSdMjeSf4zl",
  "walrusBlobId": "BY9bYdSdMjeSf4zlcrbAyguuNyjl-FBWwdrlTwkCUoA",
  "local": { "valid": true, "synced": true },
  "walrus": { "valid": true, "found": false, "reasons": ["walrus_index_unavailable"] }
}
```

---



## Links

- Repo: [memwal_assistant](https://github.com/Olympusxvn/memwal_assistant)
- MCP: [https://www.npmjs.com/package/@mysten-incubation/memwal-mcp](https://www.npmjs.com/package/@mysten-incubation/memwal-mcp)
- Submission: [SUBMISSION.md](./SUBMISSION.md)
- Changelog: [CHANGELOG.md](./CHANGELOG.md)

