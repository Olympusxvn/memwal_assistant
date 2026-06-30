# Setup — MemWal Architect Assistant

## Official MCP (required for Session 5)

Use Mysten Labs package **`@mysten-incubation/memwal-mcp`** — not `@memwalpp/mcp`.

Full guide: **[official-memwal/README.md](./official-memwal/README.md)**

### 1. Requirements

- **Node.js 20+**
- **Cursor** with MCP support
- **Sui wallet** for browser login (Prompt Jam dedicated Session wallet)

### 2. Login

**Recommended (Microsoft Edge / default browser on Windows):**

```bash
npx -y @mysten-incubation/memwal-mcp login
```

Edge works fine — connect Sui wallet in the browser tab that opens.

**Slush + zkLogin (Google):** If the wallet was created with **Sign in with Google**, there is **no local Slush password**. Do **not** use the **Unlock wallet** screen — use **Sign in with Google** (same Google account as wallet creation). See [FEEDBACK.md](./FEEDBACK.md#setup-feedback--slush-zklogin-vs-unlock-wallet).

**Optional — force Google Chrome instead of Edge:**

```bash
cd official-memwal && npm install && npm run login:chrome
```

Credentials saved to `~/.memwal/credentials.json` (mode `0600`). **Never commit this file or paste delegate keys into repo.**

**Session account ID (Mainnet):** `0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6`  
[Suiscan](https://suiscan.xyz/mainnet/object/0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6)

### 3. Cursor MCP config

Copy [`.cursor/mcp.json.example`](./.cursor/mcp.json.example) → `.cursor/mcp.json` (gitignored). Server name in Cursor UI: **`memwal`** (5 tools).

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

**Fully quit and reopen Cursor** after saving.

Settings → **MCP** → look for server name **`memwal`** (not `memwal-agent-memory`) → **5 tools**, status green.

If missing, see [Troubleshooting — MCP not visible](#troubleshooting--mcp-not-visible) below.

### 4. Verify connection

Settings → MCP → **`memwal`** green, **5 tools**:

- `memwal_remember`, `memwal_recall`, `memwal_analyze`, `memwal_restore`, `memwal_login`

Automated smoke test:

```bash
cd official-memwal
npm install
npm run tools    # list tools
npm run smoke    # remember + recall (needs login)
```

### 5. Enable prompt

Copy **[PROMPT.md](./PROMPT.md)** into Cursor chat or enable [`.cursor/rules/architect-memory.mdc`](./.cursor/rules/architect-memory.mdc).

### 6. Chat smoke test

```
decision: Session 5 smoke test — official MemWal MCP OK. Context: setup. Rationale: Verify memwal_remember queues Walrus Mainnet blob.
```

Then:

```
recall decisions about smoke test
```

If recall empty after ~15s:

```
restore architecture memory
```

(agent calls `memwal_restore` then retries recall)

---

## Legacy: `@memwalpp/mcp` (community — 10 tools)

Deprecated for Jam submission. Kept for reference in [PROMPT.md](./PROMPT.md) and [DEMO_SCRIPT.md](./DEMO_SCRIPT.md).

<details>
<summary>Legacy manual env setup</summary>

```bash
npx -y @mysten-incubation/memwal-mcp login --prod
```

Map from `~/.memwal/credentials.json` into MCP env (not recommended — use official MCP config above):

| Env var | Notes |
|---------|--------|
| `MEMWAL_PRIVATE_KEY` | Delegate secret (hex) — **do not commit** |
| `MEMWAL_ACCOUNT_ID` | MemWal account object id |
| `MEMWAL_SERVER_URL` | `https://relayer.memory.walrus.xyz` |

Legacy mcp.json used `@memwalpp/mcp@0.1.1` with `remember` / `sync` / `verify` tools.

</details>

---

## Troubleshooting — MCP not visible

| Symptom | Fix |
|---------|-----|
| No **`memwal`** in Settings → MCP | Copy [`.cursor/mcp.json.example`](./.cursor/mcp.json.example) → `.cursor/mcp.json` |
| Only **`memwal-agent-memory`** (10 tools) | Old **community plugin** — disable in Cursor Settings → Plugins |
| Server red / error | `npx -y @mysten-incubation/memwal-mcp login` then **fully quit** Cursor and reopen |
| Slush **Unlock wallet** → wrong password (zkLogin) | Wallet uses **Google**, not a password — **Sign in with Google** instead of Unlock. See [FEEDBACK.md](./FEEDBACK.md) |
| `npx` not found | Use full path in mcp.json: `C:/Users/Admin/AppData/Roaming/fnm/node-versions/v22.23.0/installation/npx.cmd` |

**Expected:** Settings → MCP → **`memwal`** → green, **5 tools** (`memwal_remember`, `memwal_recall`, `memwal_analyze`, `memwal_restore`, `memwal_login`).

---

## Screenshot checklist (submission)

- [ ] Cursor **Settings → MCP** — `memwal` connected, **5 tools**
- [ ] Chat **`decision:`** → `memwal_remember` success
- [ ] Chat **`recall decisions about …`** → `memwal_recall` hit
- [ ] Optional: [Suiscan MemWal account](https://suiscan.xyz/mainnet/object/0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6)
