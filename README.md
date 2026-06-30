# MemWal Architect Assistant

**Walrus Session 5 · Prompt Jam** — a copy-paste **system prompt** plus setup kit for capturing and retrieving **architectural decisions** with [`@memwalpp/mcp`](https://www.npmjs.com/package/@memwalpp/mcp) and **Walrus Mainnet** durable memory.

| | |
|---|---|
| **Problem** | Architecture decisions get lost between Cursor sessions; teams repeat debates or contradict past choices. |
| **Solution** | Structured triggers (`decision:`, `artifact:`) → MCP tools → local SQLite → **sync to Walrus** → verify & recall on any machine. |
| **MCP package** | `@memwalpp/mcp@0.1.1` (10 tools) |
| **Namespace** | `session5-architect` |
| **MemWal account (Mainnet)** | [`0x73b07979a6712f54283c02ddf70e2bdfb3ec729627c9ef0e0d8a214015066a99`](https://suiscan.xyz/mainnet/object/0x73b07979a6712f54283c02ddf70e2bdfb3ec729627c9ef0e0d8a214015066a99) |

---

## Quick start

1. **[SETUP.md](./SETUP.md)** — Cursor MCP + Mainnet `MEMWAL_*` env (delegate key only).
2. Copy **[PROMPT.md](./PROMPT.md)** into Cursor chat or add **[`.cursor/rules/architect-memory.mdc`](./.cursor/rules/architect-memory.mdc)** to your project.
3. Run **[DEMO_SCRIPT.md](./DEMO_SCRIPT.md)** — 10+ Mainnet blobs for submission proof.
4. Follow **[SUBMISSION.md](./SUBMISSION.md)** — DeepSurge, video, `#Walrus` post.

---

## What judges see

- **One well-crafted prompt** — not a tool dump; solves a recurring dev-team pain.
- **Walrus Memory used thoughtfully** — structured remember/saveArtifact, batch sync, verify, lineage/history when IDs exist.
- **Mainnet proof** — ≥10 blobs under namespace `session5-architect`, agent account ID above.

---

## Repository layout

```
memwal_assistant/
├── PROMPT.md              ← full system prompt (submit this text)
├── SETUP.md               ← MCP + Mainnet env
├── DEMO_SCRIPT.md         ← 10+ blob walkthrough
├── DEMO_VIDEO.md          ← 3-minute storyboard
├── SUBMISSION.md          ← Session 5 checklist
├── .cursor/
│   ├── mcp.json           ← npx @memwalpp/mcp profile
│   └── rules/architect-memory.mdc
└── scripts/blob-log.template.md
```

---

## Related projects

- **MCP server source / monorepo:** [memwal-agent-memory](https://github.com/Olympusxvn/memwal-agent-memory)
- **Session rules:** [Walrus Memory Prompt Jam](https://thewalrussessions.wal.app/prompt-jam/index.html)
- **MemWal feedback:** [github.com/MystenLabs/MemWal](https://github.com/MystenLabs/MemWal)

---

## License

Apache-2.0 — see [LICENSE](./LICENSE).
