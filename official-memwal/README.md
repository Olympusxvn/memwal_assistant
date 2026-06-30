# Official Walrus Memory MCP (`@mysten-incubation/memwal-mcp`)

Mysten Labs **official** MCP for Walrus Memory — required for Session 5 Prompt Jam submission.

| | |
|---|---|
| **Package** | [`@mysten-incubation/memwal-mcp`](https://www.npmjs.com/package/@mysten-incubation/memwal-mcp) |
| **Version tested** | `0.0.5` |
| **Relayer** | `https://relayer.memory.walrus.xyz` (Mainnet) |
| **Namespace (demo)** | `session5-architect` |
| **Auth** | Browser wallet login → `~/.memwal/credentials.json` |

---

## Quick install

### 1. Login (once per machine)

```bash
npx -y @mysten-incubation/memwal-mcp login
```

Opens **Microsoft Edge** (or your Windows default browser) → connect Sui wallet → delegate key saved to `~/.memwal/credentials.json`. **No private key in repo.**

**MemWal account ID:** `0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6`

Optional — force Chrome: `npm run login:chrome` (see [SETUP.md](../SETUP.md)).

### 2. Cursor MCP

Copy [mcp.example.json](./mcp.example.json) into project [`.cursor/mcp.json`](../.cursor/mcp.json) (gitignored):

```json
{
  "mcpServers": {
    "memwal": {
      "command": "npx",
      "args": [
        "-y",
        "@mysten-incubation/memwal-mcp@0.0.5",
        "--namespace",
        "session5-architect"
      ],
      "env": {
        "MEMWAL_NAMESPACE": "session5-architect",
        "MEMWAL_SERVER_URL": "https://relayer.memory.walrus.xyz"
      }
    }
  }
}
```

Restart Cursor. Settings → MCP → **`memwal`** green, **5 tools**.

### 3. Smoke test

```bash
cd official-memwal
npm install
npm run tools    # list tools (no auth required for schema)
npm run smoke    # remember + recall + analyze (requires login)
```

Output: [test-output/tools.json](./test-output/tools.json), [test-output/smoke-log.json](./test-output/smoke-log.json).

---

## Tools (official — 5)

| Tool | Purpose | Walrus role |
|------|---------|-------------|
| `memwal_remember` | Save text to personal memory | Relayer persists to **Walrus** (async job) |
| `memwal_recall` | Semantic search memories | Reads from Walrus-backed index |
| `memwal_analyze` | Extract facts from passage → multiple remembers | Batch Walrus writes |
| `memwal_restore` | Re-index namespace from Walrus blobs | Durable recovery / hydrate |
| `memwal_login` | Browser auth | Registers delegate key on-chain |

See [TOOLS.md](./TOOLS.md) for schemas and Architect Assistant mapping.

---

## vs `@memwalpp/mcp` (community — deprecated for Jam)

| Community (`@memwalpp/mcp`) | Official (`@mysten-incubation/memwal-mcp`) |
|-----------------------------|---------------------------------------------|
| `remember`, `saveArtifact` | `memwal_remember` (`text` field) |
| `recall`, `search` | `memwal_recall` |
| `sync`, `getStats` | **No batch sync** — relayer promotes on remember |
| `verify`, `getLineage` | **Not exposed** — use dashboard / Suiscan |
| Manual `MEMWAL_PRIVATE_KEY` in mcp.json | **`memwal_login`** browser flow |
| 10 tools | 5 tools |

**Smart Walrus usage with official MCP:** structured ADR markdown in `memwal_remember` → relayer async job → Walrus Mainnet blob. Use `memwal_restore` if recall index is stale after promote.

---

## Architect Assistant prompts

Draft system prompt for official tools: [../PROMPT.md](../PROMPT.md) (submit this file).

---

## Links

- MemWal repo: https://github.com/MystenLabs/MemWal (`packages/mcp`)
- Session 5 rules: [../SUBMISSION.md](../SUBMISSION.md)
- Feedback (issues closed — use official MCP): [../FEEDBACK.md](../FEEDBACK.md)
