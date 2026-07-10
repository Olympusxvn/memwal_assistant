# MemWal Architect Assistant

**Walrus Session 5 · Prompt Jam** — system prompt + setup kit for capturing and retrieving **architecture decisions** on **Walrus Mainnet** via Mysten’s official MCP.

| | |
|---|---|
| **Problem** | ADRs and trade-offs live in chat history and vanish between sessions. |
| **Solution** | `decision:` / `artifact:` → **`memwal_remember`** → Walrus Mainnet → **`memwal_recall`** in any new chat. |
| **MCP** | [`@mysten-incubation/memwal-mcp`](https://www.npmjs.com/package/@mysten-incubation/memwal-mcp) — Cursor server **`memwal`** (**5 core tools** in this prompt; package may expose extras) |
| **Namespace** | `session5-architect` |
| **MemWal account** | [`0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6`](https://suiscan.xyz/mainnet/object/0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6) |

---

## How it uses Walrus

1. **Structured capture** — ADR markdown via `memwal_remember`.
2. **Durable by default** — relayer async job → **Walrus Mainnet** (no sync tool).
3. **Cross-session recall** — `memwal_recall` by topic.
4. **Recovery** — `memwal_restore` re-indexes from Walrus blobs.
5. **Bulk extract** — `memwal_analyze` from long design docs.

Auth: `memwal_login` or `npx -y @mysten-incubation/memwal-mcp login` (Edge OK). Credentials: `~/.memwal/credentials.json` — never commit.

---

## Why not just local ADR `.md` files?

Traditional ADRs are for **humans**. MemWal ADRs are for **AI agents** — programmable memory the agent can write and query without re-uploading a folder every chat.

| Benefit | Local Markdown (`.md`) | Walrus Mainnet (`memwal_assistant`) |
|---------|------------------------|-------------------------------------|
| **Context retention** | Short-lived / siloed — new chat loses context unless you re-feed files | Cross-session memory via `memwal_recall` |
| **Durability** | Disk loss, accidental delete, machine move (unless Git) | Immutable Walrus blobs; recover with `memwal_restore` |
| **Workflow** | Manual structure + save into the repo | Agent captures + ships with one `decision:` / `artifact:` prompt |
| **Availability** | Team sees ADRs after Git push/PR | Same MemWal account + namespace can recall after write (relayer index) |
| **Privacy** | Fully local — best for confidential enterprise ADRs | Account-scoped via MemWal; blobs on Walrus — prefer OSS / Web3 / non-secret decisions (never store secrets) |
| **Context window** | Dumping a whole ADR folder bloats the prompt | Pinpoint recall of only the relevant decision |

See [docs/DESIGN.md](./docs/DESIGN.md#local-markdown-vs-walrus-memwal).

---

## Quick start

```bash
npx -y @mysten-incubation/memwal-mcp login
# copy .cursor/mcp.json.example → .cursor/mcp.json, restart Cursor
cd official-memwal && npm install && npm run demo
```

| Doc | Purpose |
|-----|---------|
| [PROMPT.md](./PROMPT.md) | **Submit this** system prompt |
| [SETUP.md](./SETUP.md) | Install + MCP troubleshooting |
| [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) | ≥10 blob walkthrough |
| [SUBMISSION.md](./SUBMISSION.md) | DeepSurge checklist |
| [DEMO_VIDEO.md](./DEMO_VIDEO.md) | 3-minute storyboard |
| [official-memwal/](./official-memwal/) | Tool schemas, smoke/demo scripts |

Enable rule: [`.cursor/rules/architect-memory.mdc`](./.cursor/rules/architect-memory.mdc)

---

## MCP in Cursor

Settings → MCP → **`memwal`** → green. This prompt’s **core surface is 5 tools**:

`memwal_remember` · `memwal_recall` · `memwal_analyze` · `memwal_restore` · `memwal_login`

(Newer package builds may list extras such as `memwal_remember_bulk`, `memwal_health`, `memwal_logout` — optional; not required by [PROMPT.md](./PROMPT.md).)

Template: [`.cursor/mcp.json.example`](./.cursor/mcp.json.example)

---

## Repository layout

```
memwal_assistant/
├── PROMPT.md              ← submit-ready system prompt
├── DEMO_SCRIPT.md         ← 10+ Mainnet blob demo
├── official-memwal/       ← MCP tools, smoke + demo runners
├── SETUP.md · SUBMISSION.md · DEMO_VIDEO.md
├── .cursor/mcp.json.example · rules/architect-memory.mdc
└── scripts/blob-log.template.md
```

Legacy community MCP runner (deprecated): `scripts/run-demo-session5.mjs`

---

## Links

- Official MCP: https://www.npmjs.com/package/@mysten-incubation/memwal-mcp
- MemWal: https://github.com/MystenLabs/MemWal
- Prompt Jam: https://thewalrussessions.wal.app/prompt-jam/index.html

---

## License

Apache-2.0 — [LICENSE](./LICENSE)
