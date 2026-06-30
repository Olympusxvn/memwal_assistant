# Demo video storyboard (≤ 3 minutes)

Upload final video to **Walrus** per Prompt Jam rules. Record at 1080p; show Cursor UI + MCP tool results (blur secrets).

Official MCP: **`memwal`** — 5 tools (`memwal_remember`, `memwal_recall`, `memwal_analyze`, `memwal_restore`, `memwal_login`).

---

## 0:00 – 0:25 | Problem

**Voiceover / on-screen text:**

> "Architecture decisions live in chat history and die when the session ends. Teams re-debate the same trade-offs. MemWal Architect Assistant fixes that with one system prompt and Walrus durable memory on Mainnet."

**Visual:** Split screen — messy chat history vs structured ADR list.

---

## 0:25 – 0:45 | Setup

**Show:**

- This repo open in Cursor
- Settings → MCP → **`memwal`** green, **5 tools**
- `.cursor/mcp.json.example` — namespace `session5-architect` (no private keys in frame)

---

## 0:45 – 1:30 | Capture decisions

**Live chat (from [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) rows 1–3):**

1. `decision: Walrus is the durable layer…`
2. `decision: Use namespace session5-architect…`
3. `artifact: Microservices map…`

**Show:** Tool calls → **`memwal_remember`**; assistant confirms queued for Walrus Mainnet.

---

## 1:30 – 2:00 | Walrus durable (no sync step)

**Voiceover:**

> "Official MCP promotes to Walrus automatically on remember — no batch sync."

**Chat (after ~10s pause):**

```
recall decisions about Walrus durable layer
```

**Show:** `memwal_recall` returns prior decision.

Optional cutaway: Suiscan account page (account ID on screen).

---

## 2:00 – 2:35 | Cross-session recall

**Open new chat** (proves continuity):

```
recall decisions about Walrus durable layer
```

**Show:** Same decision from Walrus-backed memory.

Optional: `restore architecture memory` only if demo needs it.

---

## 2:35 – 2:55 | Submit artifact

**On-screen:**

- GitHub repo URL
- MemWal account Suiscan: `0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6`
- "Full prompt in **PROMPT.md**"

---

## 2:55 – 3:00 | End card

**Text:** `#Walrus` · `@mysten-incubation/memwal-mcp` · Session 5 Prompt Jam

---

## Recording tips

- Run [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) **before** recording so recall hits are fast on camera.
- If relayer lag hits, pause 15s or cut to pre-recorded recall screenshot.
- No delegate keys on screen — login via Edge browser beforehand.
