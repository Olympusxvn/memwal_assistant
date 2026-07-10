# Walrus Session 5 — Submission checklist

**Project name:** MemWal Architect Assistant  
**Event:** [Walrus Memory Prompt Jam](https://thewalrussessions.wal.app/prompt-jam/index.html)  
**Hackathon window:** 26 Jun 2026 09:00 UTC → 13 Jul 2026 14:00 UTC  

---

## Problem statement (submit — 2 sentences)

When working on a large codebase, important architectural decisions are forgotten or never recorded systematically, causing repeated debates and contradictory choices across sessions. MemWal Architect Assistant instructs the agent to capture structured decisions and ADRs via official `@mysten-incubation/memwal-mcp`, recall them by topic, and store them durably on Walrus Mainnet for cross-session continuity.

---



## How it uses Walrus Memory (submit — 2–5 sentences)

The system prompt binds user triggers (`decision:`, `artifact:`, `recall decisions about …`) to official MCP tools: `memwal_remember` writes structured markdown and the MemWal relayer queues **Walrus Mainnet** blobs (async). `memwal_recall` retrieves decisions in new sessions; `memwal_restore` re-indexes a namespace from Walrus when needed; `memwal_analyze` extracts multiple ADRs from long docs. Namespace `session5-architect` isolates Session 5 blobs. Full prompt: [PROMPT.md](./PROMPT.md).

Unlike local ADR `.md` files (human-oriented, session-siloed), MemWal ADRs are agent-queryable across chats with pinpoint `memwal_recall` instead of re-feeding a whole docs folder. Comparison: [docs/DESIGN.md](./docs/DESIGN.md#local-markdown-vs-walrus-memwal).

**Core tools (5):** `memwal_remember`, `memwal_recall`, `memwal_analyze`, `memwal_restore`, `memwal_login`.

---



## Mainnet proof


| Field                             | Value                                                                                                                                                                                                          |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **MemWal account ID**             | `0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6`                                                                                                                                           |
| **Suiscan**                       | [https://suiscan.xyz/mainnet/object/0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6](https://suiscan.xyz/mainnet/object/0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6) |
| **Namespace**                     | `session5-architect`                                                                                                                                                                                           |
| **MCP package**                   | `@mysten-incubation/memwal-mcp@0.0.5`                                                                                                                                                                          |
| **Target blob count**             | ≥ 10 (see [DEMO_SCRIPT.md](./DEMO_SCRIPT.md))                                                                                                                                                                  |
| **Blob count (official MCP run)** | **11** — 2026-06-30                                                                                                                                                                                            |
| **Blob log**                      | [scripts/blob-log.official-mcp.md](./scripts/blob-log.official-mcp.md) · [template](./scripts/blob-log.template.md) |


---



## Checklist Blobs

**Run:** 2026-06-30 · **MCP:** `@mysten-incubation/memwal-mcp@0.0.5` · **Auth:** Slush zkLogin (Google) + `memwal_login`  
**Namespace:** `session5-architect` · **Total:** 11 / ≥10 — **PASS**


| ☐   | #   | Tool              | Topic                              | Walrus blob ID                                | Explorer                                                                                    |
| --- | --- | ----------------- | ---------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [x] | 1   | `memwal_remember` | Walrus durable layer               | `tHRZKaaiLcy7zCZAGPQ_9X0xwwXJwPQ6Wnm_5M_36p4` | [Walruscan](https://walruscan.com/mainnet/blob/tHRZKaaiLcy7zCZAGPQ_9X0xwwXJwPQ6Wnm_5M_36p4) |
| [x] | 2   | `memwal_remember` | Namespace `session5-architect`     | `UHJW8YVOwosxrj3dKGgHfSHZMuJtPVbuTpc8ZsXtMhk` | [Walruscan](https://walruscan.com/mainnet/blob/UHJW8YVOwosxrj3dKGgHfSHZMuJtPVbuTpc8ZsXtMhk) |
| [x] | 3   | `memwal_remember` | Microservices map (artifact)       | `I1bwEz_NhNEFEJmGFzZkmlpxNIiB7NK1I0tcflkWXH0` | [Walruscan](https://walruscan.com/mainnet/blob/I1bwEz_NhNEFEJmGFzZkmlpxNIiB7NK1I0tcflkWXH0) |
| [x] | 4   | `memwal_remember` | Cursor-first official MCP          | `7gHOrwpSsl08aQSRCy5O2vlWEC5CPE1vc-GeeOMCHBw` | [Walruscan](https://walruscan.com/mainnet/blob/7gHOrwpSsl08aQSRCy5O2vlWEC5CPE1vc-GeeOMCHBw) |
| [x] | 5   | `memwal_remember` | Repository Pattern                 | `J5f5ukHgJIq95KGDKbfrYLGhswXffqC-Hd8jSfJRSv8` | [Walruscan](https://walruscan.com/mainnet/blob/J5f5ukHgJIq95KGDKbfrYLGhswXffqC-Hd8jSfJRSv8) |
| [x] | 6   | `memwal_remember` | `memwal_recall` / `memwal_restore` | `MZ3OiO9yn94h2Q8sJdGIO5T_uxFH0ETMxSYciPhgDPc` | [Walruscan](https://walruscan.com/mainnet/blob/MZ3OiO9yn94h2Q8sJdGIO5T_uxFH0ETMxSYciPhgDPc) |
| [x] | 7   | `memwal_remember` | Structured ADR template            | `ayE3FahxtkMyRD3dtb35K8d0dz2YrHT5G7FHG83b1UY` | [Walruscan](https://walruscan.com/mainnet/blob/ayE3FahxtkMyRD3dtb35K8d0dz2YrHT5G7FHG83b1UY) |
| [x] | 8   | `memwal_remember` | Browser login / delegate key       | `vg0RHN2fjJAlxSq4mMe8f6gne-xZmAZ17-vUnirVMXI` | [Walruscan](https://walruscan.com/mainnet/blob/vg0RHN2fjJAlxSq4mMe8f6gne-xZmAZ17-vUnirVMXI) |
| [x] | 9   | `memwal_remember` | Single system prompt submission    | `x5981TIyyOnbT4Kx6v-AVic-er-4uBGEFiUmE4fg4qc` | [Walruscan](https://walruscan.com/mainnet/blob/x5981TIyyOnbT4Kx6v-AVic-er-4uBGEFiUmE4fg4qc) |
| [x] | 10  | `memwal_remember` | `memwal_analyze` bulk extract      | `Y9yNyuTHyImi5fmJ5vWACydhb0DmCEFNd4XZynpwnGM` | [Walruscan](https://walruscan.com/mainnet/blob/Y9yNyuTHyImi5fmJ5vWACydhb0DmCEFNd4XZynpwnGM) |
| [x] | 11  | `memwal_remember` | Cross-session continuity           | `f3allb7KozVbGWzjbEs0mn4p8JVaIT7sq_x2CmnT_q4` | [Walruscan](https://walruscan.com/mainnet/blob/f3allb7KozVbGWzjbEs0mn4p8JVaIT7sq_x2CmnT_q4) |




### Recall spot-check


| Query                            | Hit? | Notes                            |
| -------------------------------- | ---- | -------------------------------- |
| Walrus durable layer             | [x]  | Top hit score ~0.64 (2026-06-30) |
| Repository Pattern               | [x]  | Top hit score ~0.62 (2026-06-30) |
| New chat → `resume architecture` | [ ]  | Demo Phase 2 |




### Optional 12th blob

- [ ] `artifact: June MCP performance notes` — see [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) Phase 1 optional

> **Note:** [scripts/blob-log.session5.md](./scripts/blob-log.session5.md) logs an earlier **community MCP** run (12 blobs). The table above is the **official MCP** Mainnet proof for submission forms.

---



## Submission checklist



### Required content

- [ ] **GitHub repo** — `memwal_assistant` public
- [ ] **Full prompt** — [PROMPT.md](./PROMPT.md) copy-pasteable
- [ ] **DeepSurge** — register + submit project
- [ ] **Walform** — [https://walform.wal.app/f?formId=0x308876d0…](https://walform.wal.app/f?formId=0x308876d0…) (from event rules)
- [x] **Mainnet** — ≥10 blobs; agent ID + blob count on form (**11 blobs** — see [Checklist Blobs](#checklist-blobs))
- [ ] **Dedicated Session wallet** — documented ([official-memwal/ACCOUNT.md](./official-memwal/ACCOUNT.md), not private key)
- [ ] **Demo video** — ≤3 min, uploaded to Walrus ([DEMO_VIDEO.md](./DEMO_VIDEO.md))
- [x] MemWal / Slush feedback — [#339–342](https://github.com/MystenLabs/MemWal/issues/339) · [sui#27109](https://github.com/MystenLabs/sui/issues/27109) · [FEEDBACK.md](./FEEDBACK.md)
- [ ] **Discord** — [Walrus Discord](https://discord.com/invite/walrusprotocol)
- [ ] **X post** — `#Walrus` with demo link or screenshot



### Screenshots (attach to DeepSurge / video)

- [ ] Cursor Settings → MCP `memwal` connected (**5 tools**)
- [ ] `decision:` → `memwal_remember` success
- [ ] `recall decisions about …` → `memwal_recall` hit
- [ ] New chat → recall returns prior decision



### Prompt quality self-check (judge criteria)

- [ ] Solves **real** recurring problem (architecture amnesia)
- [ ] Clear rules: **when** to remember, **structure**, **when** to recall/restore
- [ ] Uses Walrus **meaningfully** (durable Mainnet blobs, cross-session recall)
- [ ] **Works** — [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) completed on Mainnet

---

## Links

- Official MCP: [https://www.npmjs.com/package/@mysten-incubation/memwal-mcp](https://www.npmjs.com/package/@mysten-incubation/memwal-mcp)
- MemWal repo: [https://github.com/MystenLabs/MemWal](https://github.com/MystenLabs/MemWal)
- Session 5 Notion: [https://mystenlabs.notion.site/Walrus-Session-5-3756d9dcb4e9808ca16fc8c22562e3c6](https://mystenlabs.notion.site/Walrus-Session-5-3756d9dcb4e9808ca16fc8c22562e3c6)
- Setup: [SETUP.md](./SETUP.md) · [official-memwal/](./official-memwal/)

