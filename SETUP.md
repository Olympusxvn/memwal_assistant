# Setup — MemWal Architect Assistant

## 1. Requirements

- **Node.js 20+**
- **Cursor** with MCP support
- **MemWal Mainnet account** (delegate key — never commit owner key)
- **Dedicated Session wallet** (Prompt Jam rules)

## 2. MemWal Mainnet credentials

Register / login (official path):

```bash
npx -y @mysten-incubation/memwal-mcp login --prod
```

Map from `~/.memwal/credentials.json` into MCP env (delegate key only):

| Env var | Example / notes |
|---------|-----------------|
| `MEMWAL_PRIVATE_KEY` | Ed25519 delegate secret (hex) |
| `MEMWAL_ACCOUNT_ID` | `0x73b07979a6712f54283c02ddf70e2bdfb3ec729627c9ef0e0d8a214015066a99` |
| `MEMWAL_SERVER_URL` | `https://relayer.memory.walrus.xyz` |

Optional for smoother promote:

| Env var | Value |
|---------|--------|
| `MEMWAL_WAIT_FOR_REMEMBER` | `1` |
| `MEMWAL_AUTO_PUSH` | `1` (only if you want auto-promote on remember — demo uses explicit `sync`) |
| `MEMWAL_RECALL_FTS` | `1` |

## 3. Cursor MCP config

**Project** (clone this repo and open in Cursor): use [`.cursor/mcp.json`](./.cursor/mcp.json).

**Global** (`~/.cursor/mcp.json`): merge the same block.

```json
{
  "mcpServers": {
    "memwal-agent-memory": {
      "command": "npx",
      "args": ["-y", "@memwalpp/mcp@0.1.1", "--transport", "stdio"],
      "env": {
        "MEMWAL_NAMESPACE": "session5-architect",
        "MEMWAL_MCP_DATA_DIR": "${userHome}/.memwal-agent-memory/session5-architect",
        "MEMWAL_RECALL_FTS": "1",
        "MEMWAL_PRIVATE_KEY": "<YOUR_DELEGATE_KEY>",
        "MEMWAL_ACCOUNT_ID": "0x73b07979a6712f54283c02ddf70e2bdfb3ec729627c9ef0e0d8a214015066a99",
        "MEMWAL_SERVER_URL": "https://relayer.memory.walrus.xyz"
      }
    }
  }
}
```

**Fully quit and reopen Cursor** after saving.

## 4. Enable the prompt

**Option A — Rule (recommended):** enable [`.cursor/rules/architect-memory.mdc`](./.cursor/rules/architect-memory.mdc) in Cursor Rules.

**Option B — Paste:** copy [PROMPT.md](./PROMPT.md) into the first message or Custom Instructions.

## 5. Smoke test

In chat:

```
decision: Session 5 smoke test — MemWal Architect Assistant namespace OK. Context: setup. Rationale: Verify MCP remember path before Mainnet sync.
```

Then:

```
recall decisions about smoke test
```

Then (with Mainnet env):

```
sync decisions
verify last decision
```

## 6. Screenshot checklist (submission)

Capture these for DeepSurge / demo:

- [ ] Cursor **Settings → MCP** — `memwal-agent-memory` connected, **10 tools** listed
- [ ] Chat showing **`decision:`** → tool call → confirmation with `recordId`
- [ ] Chat showing **`sync decisions`** → `metrics.pushed >= 1`
- [ ] Chat showing **`verify`** → `valid: true` + `walrusBlobId`
- [ ] Optional: [Suiscan MemWal account](https://suiscan.xyz/mainnet/object/0x73b07979a6712f54283c02ddf70e2bdfb3ec729627c9ef0e0d8a214015066a99)

Local SQLite path: `%USERPROFILE%\.memwal-agent-memory\session5-architect\` (Windows) or `~/.memwal-agent-memory/session5-architect/`.
