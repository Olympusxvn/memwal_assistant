# Demo video storyboard (≤ 3 minutes)

Upload final video to **Walrus** per Prompt Jam rules. Record at 1080p; show Cursor UI + MCP tool results (blur secrets).

---

## 0:00 – 0:25 | Problem

**Voiceover / on-screen text:**

> "Architecture decisions live in chat history and die when the session ends. Teams re-debate the same trade-offs. MemWal Architect Assistant fixes that with a single system prompt and Walrus durable memory."

**Visual:** Split screen — messy chat history vs structured ADR list.

---

## 0:25 – 0:45 | Setup (10 seconds)

**Show:**

- This repo open in Cursor
- Settings → MCP → `memwal-agent-memory` **green**, 10 tools
- `.cursor/mcp.json` — highlight `session5-architect` namespace (blur `MEMWAL_PRIVATE_KEY`)

---

## 0:45 – 1:30 | Capture decisions

**Live chat (paste from [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) rows 1–3):**

1. `decision: Walrus is the durable layer…`
2. `decision: Use namespace session5-architect…`
3. `artifact: Microservices map…`

**Show:** Tool calls in Cursor; assistant confirms `recordId` for each.

---

## 1:30 – 2:05 | Sync to Mainnet

**Chat:** `sync decisions`

**Show:**

- `getStats` → `durable.live: true`
- `sync` → `metrics.pushed` (target ≥ 10 if you ran full script before recording)
- Highlight at least one `walrusBlobId` from follow-up `verify`

---

## 2:05 – 2:35 | Verify + new session recall

**Chat:** `verify last decision` → `valid: true`

**Open new chat** (proves cross-session):

**Chat:** `recall decisions about Walrus durable layer`

**Show:** Prior decision returned from memory.

---

## 2:35 – 2:55 | Submit artifact

**On-screen:**

- GitHub repo URL
- MemWal account Suiscan link
- "Full prompt in PROMPT.md — copy-paste for any Cursor user"

---

## 2:55 – 3:00 | End card

**Text:** `#Walrus` · `@memwalpp/mcp` · Session 5 Prompt Jam

---

## Recording tips

- Run [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) **before** recording so sync is fast on camera.
- If async relayer delay hits, cut to pre-recorded verify PASS screenshot.
- Keep delegate key out of frame; use env already in mcp.json.
