/**
 * Official Session 5 demo — 10× memwal_remember + recall samples.
 * Requires ~/.memwal/credentials.json (npx @mysten-incubation/memwal-mcp login).
 *
 *   cd official-memwal && npm run demo
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NAMESPACE = "session5-architect";
const OUT = path.join(__dirname, "..", "test-output", "demo-log.json");

const DECISIONS = [
  "## Decision\nWalrus is the durable layer for all Session 5 architecture artifacts.\n\n## Context\ninfrastructure/storage\n\n## Rationale\nVerifiable Mainnet blobs, low cost, aligns with MemWal hybrid model.\n\n## Status\nProposed\n\n## Date\n2026-06-30",
  "## Decision\nUse namespace session5-architect for all Session 5 memories.\n\n## Context\nmcp/env\n\n## Rationale\nIsolates demo blobs from other projects.\n\n## Status\nProposed\n\n## Date\n2026-06-30",
  "# Microservices map\n\nGateway, Memory (MCP), Orchestrator, Verifier, Storage (Walrus). MCP exposes memwal_remember/recall to IDE.",
  "## Decision\nCursor-first delivery via official @mysten-incubation/memwal-mcp.\n\n## Context\ndeveloper-onboarding\n\n## Rationale\nSession 5 requires Mysten official MCP.\n\n## Status\nProposed\n\n## Date\n2026-06-30",
  "## Decision\nRepository Pattern for all data access in backend services.\n\n## Context\nbackend/\n\n## Rationale\nTestability and separation from business logic.\n\n## Status\nProposed\n\n## Date\n2026-06-30",
  "## Decision\nmemwal_recall for topic search; memwal_restore when Walrus index is stale.\n\n## Context\npackages/core\n\n## Rationale\nDurable source of truth with relayer index.\n\n## Status\nProposed\n\n## Date\n2026-06-30",
  "# June MCP performance notes\n\nTrack memwal_remember/recall latencies; target fast recall after index warm-up.",
  "## Decision\nStructured markdown ADR template for every memwal_remember call.\n\n## Context\nprompt-design\n\n## Rationale\nConsistent recall and readable history.\n\n## Status\nProposed\n\n## Date\n2026-06-30",
  "## Decision\nBrowser login via Edge for MemWal delegate key.\n\n## Context\nsetup\n\n## Rationale\nNo private keys in repo.\n\n## Status\nProposed\n\n## Date\n2026-06-30",
  "## Decision\nSession 5 submission uses single system prompt Architect Assistant.\n\n## Context\nprompt-jam\n\n## Rationale\nJudges score one well-crafted prompt.\n\n## Status\nProposed\n\n## Date\n2026-06-30",
];

function parseToolJson(result) {
  const block = result.content?.find((c) => c.type === "text");
  if (!block?.text) return result;
  try {
    return JSON.parse(block.text);
  } catch {
    return { raw: block.text };
  }
}

async function main() {
  const credsPath = path.join(os.homedir(), ".memwal", "credentials.json");
  if (!fs.existsSync(credsPath)) {
    console.error("Missing credentials. Run: npx -y @mysten-incubation/memwal-mcp login");
    process.exit(1);
  }

  const transport = new StdioClientTransport({
    command: "npx",
    args: ["-y", "@mysten-incubation/memwal-mcp@0.0.5", "--namespace", NAMESPACE],
    env: { ...process.env, MEMWAL_NAMESPACE: NAMESPACE, MEMWAL_SERVER_URL: "https://relayer.memory.walrus.xyz" },
    stderr: "pipe",
  });

  const client = new Client({ name: "official-demo", version: "1.0.0" });
  const log = { at: new Date().toISOString(), namespace: NAMESPACE, remembers: [], recalls: [] };

  try {
    await client.connect(transport);
    let n = 0;
    for (const text of DECISIONS) {
      n += 1;
      const out = parseToolJson(
        await client.callTool({ name: "memwal_remember", arguments: { text } }),
      );
      console.log(`remember ${n}/10`, JSON.stringify(out).slice(0, 120));
      log.remembers.push({ n, out });
      await new Promise((r) => setTimeout(r, 1500));
    }

    console.log("Waiting 10s for relayer index…");
    await new Promise((r) => setTimeout(r, 10000));

    for (const query of ["Walrus durable layer", "Repository Pattern", "official memwal-mcp"]) {
      const out = parseToolJson(
        await client.callTool({ name: "memwal_recall", arguments: { query, limit: 5 } }),
      );
      console.log(`recall "${query}"`, JSON.stringify(out).slice(0, 200));
      log.recalls.push({ query, out });
    }

    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    fs.writeFileSync(OUT, JSON.stringify(log, null, 2));
    console.log("\nDone. remembers:", log.remembers.length, "→ log:", OUT);
  } finally {
    await client.close().catch(() => {});
    await transport.close().catch(() => {});
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
