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
| **Serverless latency docs** | [#277](https://github.com/MystenLabs/MemWal/issues/277) | Open — remember vs await / Vercel budgets |
| **MCP Prompt Jam DX** | [#408](https://github.com/MystenLabs/MemWal/issues/408) | Open — zkLogin login, core tools, 429, recall lag |
| **Agent job/index status** | [#409](https://github.com/MystenLabs/MemWal/issues/409) | Open — queued → Walrus → recallable |
| **Local write cache (indexer lag)** | [#433](https://github.com/MystenLabs/MemWal/issues/433) | Open — optimistic same-session recall buffer |
| **Native memory types / tags** | [#434](https://github.com/MystenLabs/MemWal/issues/434) | Open — metadata beyond raw text |
| **Write-path dry-run / secrets** | [#435](https://github.com/MystenLabs/MemWal/issues/435) | Open — client validate before relayer (link #425) |
| **Per-blob forget / supersede** | [#444](https://github.com/MystenLabs/MemWal/issues/444) | Open — **commented** (Prompt Jam evidence); do **not** open a duplicate delete issue |
| **Soft-delete / un-recallable** | [#258](https://github.com/MystenLabs/MemWal/issues/258) | Open — Mysten: soft-delete tombstone + SDK/MCP `forget` (WALM-115); Session 4 +1 already posted |


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

**Issue:** [MystenLabs/sui#27109](https://github.com/MystenLabs/sui/issues/27109)  
**Slush extension:** **26.15.0** `[release]`  
**Observed (2026-06-30):** During MemWal browser login, user repeatedly entered the same password on Slush **Unlock wallet** and always got “wrong password.” Screen recording showed a single unlock field (not confirm-password).

**Root cause:** Session wallet was created with **zkLogin (Google)** — **no Slush local password was ever created**. Re-auth is OAuth (Google), not a vault password. **Unlock wallet** is a dead end for this account type ([DrVelvetFog](https://github.com/MystenLabs/sui/issues/27109#issuecomment-4868012986)).

**Workaround (confirmed):** **Sign in with Google** in Slush extension first → **skip Unlock wallet** → complete MemWal connect URL. Do not create or enter a Slush password.

| Wallet type | Open Slush | Do not use |
|-------------|------------|------------|
| **zkLogin (Google)** | **Sign in with Google** (same account as creation) | Unlock wallet + password |
| **Seed phrase import** | Password set at import time | Google sign-in (unless also linked) |

### MemWal login flow (for Slush / Sui team)

Path from **Cursor IDE** → **Walrus Memory** credentials. Slush is only the wallet sign-in at step 4.

1. **MCP in Cursor** — `@mysten-incubation/memwal-mcp@0.0.5`, namespace `session5-architect`, 5 tools (`memwal_remember`, `memwal_recall`, `memwal_analyze`, `memwal_restore`, `memwal_login`).
2. **`memwal_login`** — MCP generates a **delegate keypair**, opens `https://memory.walrus.xyz/connect/mcp?port=…&publicKey=…&delegateAddress=…`.
3. **Connect page** — user clicks **Connect Sui Wallet** → **Slush**.
4. **Slush (friction point)** — user must approve **`add_delegate_key`** on Sui Mainnet. For zkLogin: sign in via **Google first** (extension UI), then approve tx. dApp-triggered popup often shows **Unlock wallet** instead → “wrong password” loop.
5. **Connected** — MCP writes `~/.memwal/credentials.json`; user **fully quits Cursor** and reopens.
6. **After auth** — `memwal_remember` → relayer → **Walrus Mainnet** blob (async); `memwal_recall` searches namespace.

**Repro metadata (for #27109):**

| Field | Value |
|-------|--------|
| Slush version | **26.15.0** `[release]` |
| Account type | zkLogin (Google) — no local password ever set |
| Wallet reset | No |
| Consistent repro | Yes — Unlock from dApp popup before Google sign-in; workaround succeeds |
| MemWal account ID | `0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6` |
| dApp URL | `https://memory.walrus.xyz/connect/mcp?…` |

**Doc:** [SETUP.md](./SETUP.md) · Slush UX [MystenLabs/sui#27109](https://github.com/MystenLabs/sui/issues/27109)

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



## Session Feedback (Prompt Jam form)

The Walrus Sessions / Prompt Jam format was **genuinely useful**. It forced a full loop—problem → prompt → official MCP → Mainnet proof—instead of a slide-only narrative. That produced concrete lessons: how **zkLogin vs Unlock** breaks onboarding, why **`remember` is async**, how **429 / rate limits** show up in agent demos, and why **recall lag** is not “lost memory.”

### What worked

- A clear mandate: ship something **on Walrus Memory Mainnet** with a **single strong system prompt**.
- The **official `@mysten-incubation/memwal-mcp`** path (login → remember → recall → restore) matches how Cursor agents actually work.
- Community + Mysten feedback channels (Discord, GitHub, X) made issues like Slush zkLogin and serverless `rememberAndWait` **actionable**, not just complaints.
- Companion material (`walrus-skills` / `walrus-memory`) accelerated understanding of the relayer, namespaces, and tool surface.

### What didn’t / friction

- Wallet onboarding for **Google zkLogin** users still feels like folklore (Unlock vs Sign in with Google).
- Docs lagged the **8-tool MCP** surface vs “core 5” agent prompts.
- Demo scripts that burst many `memwal_remember` calls hit **429** without a first-class agent playbook.
- “Queued for Walrus” vs “recallable in index” is still hard to show judges without better **layer status**.

### What could be improved next session

1. A **first-hour checklist**: zkLogin login → MCP green → one remember → one recall → optional restore.
2. Explicit **rate-limit + async** guidance in MCP quickstarts.
3. A simple **job/index status** story for demos (queued → durable → searchable).
4. Keep the **Prompt Jam** constraint (one prompt, real Mainnet use)—it raised quality more than open-ended hacks.
5. More **office hours** on wallet/MCP auth; that was the tallest gate for us.

### Net

New ideas (agent-native ADRs, namespace isolation, durable cross-session memory) and new discipline (no secrets in repo, structure before store, Walrus as source of truth). We’d join again—especially if login and layer visibility get as polished as remember/recall.

**Short form (~500 chars):** Very useful sessions—new lessons on official MemWal MCP, async Walrus promote, zkLogin login friction, 429 batch writes, and recall lag. What worked: Prompt Jam’s “one prompt + Mainnet proof” bar and actionable GitHub feedback. What to improve: first-hour zkLogin/MCP checklist, rate-limit docs, and clearer queued→indexed status for demos. Strong ideas for agent-native ADRs; we’d return.

---

## Links

- Repo: [memwal_assistant](https://github.com/Olympusxvn/memwal_assistant)
- MCP: [https://www.npmjs.com/package/@mysten-incubation/memwal-mcp](https://www.npmjs.com/package/@mysten-incubation/memwal-mcp)
- Submission: [SUBMISSION.md](./SUBMISSION.md)
- Changelog: [CHANGELOG.md](./CHANGELOG.md)
- Prompt Jam tickets: [sui#27109](https://github.com/MystenLabs/sui/issues/27109) · [MemWal#277](https://github.com/MystenLabs/MemWal/issues/277) · [MemWal#408](https://github.com/MystenLabs/MemWal/issues/408) · [MemWal#409](https://github.com/MystenLabs/MemWal/issues/409) · [MemWal#433](https://github.com/MystenLabs/MemWal/issues/433) · [MemWal#434](https://github.com/MystenLabs/MemWal/issues/434) · [MemWal#435](https://github.com/MystenLabs/MemWal/issues/435)

