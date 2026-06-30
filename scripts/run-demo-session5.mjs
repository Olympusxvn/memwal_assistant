/**
 * DEPRECATED — community @memwalpp/mcp runner (remember/sync/verify, 10 tools).
 * Use official MCP instead: cd official-memwal && npm run demo
 *
 * Session 5 DEMO_SCRIPT runner — 10 remembers + 2 saveArtifacts → sync → verify sample.
 * Run from memwal-agent-memory (has @modelcontextprotocol/sdk):
 *
 *   MEMWAL_PRIVATE_KEY=... MEMWAL_ACCOUNT_ID=0x73b0... node ../memwal_assistant/scripts/run-demo-session5.mjs
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseToolJson(result) {
  const block = result.content?.find((c) => c.type === "text");
  if (!block?.text) throw new Error("tool result missing text content");
  return JSON.parse(block.text);
}

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

const DECISIONS = [
  {
    label: "1-storage-walrus",
    content: `## Decision\nWalrus is the durable layer for all Session 5 architecture artifacts.\n\n## Context\ninfrastructure/storage\n\n## Rationale\nVerifiable blobs, low cost, aligns with MemWal hybrid model.\n\n## Status\nProposed\n\n## Date\n2026-06-13`,
    metadata: { type: "decision", status: "Proposed", context: "infrastructure/storage" },
  },
  {
    label: "2-namespace",
    content: `## Decision\nUse namespace session5-architect for all Session 5 memories.\n\n## Context\nmcp/env\n\n## Rationale\nIsolates demo blobs from other projects.\n\n## Status\nProposed\n\n## Date\n2026-06-13`,
    metadata: { type: "decision", status: "Proposed", context: "mcp/env" },
  },
  {
    label: "4-cursor-npx",
    content: `## Decision\nCursor-first delivery via npx @memwalpp/mcp before monorepo clone.\n\n## Context\ndeveloper-onboarding\n\n## Rationale\nPrompt Jam submitters need five minute install.\n\n## Status\nProposed\n\n## Date\n2026-06-13`,
    metadata: { type: "decision", status: "Proposed", context: "developer-onboarding" },
  },
  {
    label: "5-repository-pattern",
    content: `## Decision\nRepository Pattern for all data access in backend services.\n\n## Context\nbackend/\n\n## Rationale\nTestability and separation from business logic.\n\n## Status\nProposed\n\n## Date\n2026-06-13`,
    metadata: { type: "decision", status: "Proposed", context: "backend/" },
  },
  {
    label: "6-hybrid-recall",
    content: `## Decision\nHybrid recall — local SQLite first, durable hydrate on forceDurable or thin local index.\n\n## Context\npackages/core sync\n\n## Rationale\nSub-10ms local path; Walrus for portability.\n\n## Status\nProposed\n\n## Date\n2026-06-13`,
    metadata: { type: "decision", status: "Proposed", context: "packages/core" },
  },
  {
    label: "8-redact-upstream",
    content: `## Decision\nredactForUpstream runs before every Walrus promote.\n\n## Context\nprivacy\n\n## Rationale\nPII must not reach MemWal relayer even after local store.\n\n## Status\nProposed\n\n## Date\n2026-06-13`,
    metadata: { type: "decision", status: "Proposed", context: "privacy" },
  },
  {
    label: "9-saveartifact-adr",
    content: `## Decision\nsaveArtifact for ADRs; remember for short decisions.\n\n## Context\nprompt-design\n\n## Rationale\nKeeps recall precise and artifacts structured.\n\n## Status\nProposed\n\n## Date\n2026-06-13`,
    metadata: { type: "decision", status: "Proposed", context: "prompt-design" },
  },
  {
    label: "10-verify-schema",
    content: `## Decision\nverify uses memoryId or proof JSON, not raw blob id alone.\n\n## Context\nmcp/tools\n\n## Rationale\nMatches @memwalpp/mcp v1 verify schema.\n\n## Status\nProposed\n\n## Date\n2026-06-13`,
    metadata: { type: "decision", status: "Proposed", context: "mcp/tools" },
  },
  {
    label: "11-single-prompt",
    content: `## Decision\nSession 5 submission uses single system prompt Architect Assistant not twelve separate products.\n\n## Context\nprompt-jam\n\n## Rationale\nJudges score one well-crafted prompt.\n\n## Status\nProposed\n\n## Date\n2026-06-13`,
    metadata: { type: "decision", status: "Proposed", context: "prompt-jam" },
  },
];

const ARTIFACTS = [
  {
    label: "3-microservices-map",
    name: "microservices-ai-agent-platform",
    content: `# Microservices map\n\n- Gateway\n- Memory (MCP)\n- Orchestrator\n- Verifier\n- Storage (Walrus)\n\nMCP exposes remember/recall/sync to IDE agents.`,
  },
  {
    label: "7-mcp-performance",
    name: "june-mcp-performance-notes",
    content: `# June MCP performance notes\n\nDemo session metrics: track remember/sync/verify latencies; target under 200ms local recall.`,
  },
  {
    label: "12-agent-trace",
    name: "agent-trace-demo-session",
    content: `# Agent trace\n\nSteps: receive decision → remember → sync → verify → recall in new chat.`,
  },
];

const dataDir = path.join(os.homedir(), ".memwal-agent-memory", "session5-architect");
fs.mkdirSync(dataDir, { recursive: true });

const env = {
  ...process.env,
  MEMWAL_PRIVATE_KEY: requireEnv("MEMWAL_PRIVATE_KEY"),
  MEMWAL_ACCOUNT_ID:
    process.env.MEMWAL_ACCOUNT_ID?.trim() ||
    "0xe969b46dbf2d66b9fb6a3a0586f02b8e5a8ba42ebcc22407023953fb843984c6",
  MEMWAL_SERVER_URL: process.env.MEMWAL_SERVER_URL?.trim() || "https://relayer.memory.walrus.xyz",
  MEMWAL_NAMESPACE: "session5-architect",
  MEMWAL_MCP_DATA_DIR: dataDir,
  MEMWAL_RECALL_FTS: "1",
  MEMWAL_SYNC_QUALITY_MIN: "0",
  MEMWAL_UPLOAD_THRESHOLD: "0",
  MEMWAL_WAIT_FOR_REMEMBER: "1",
  MCP_TRANSPORT: "stdio",
};
delete env.MEMWAL_MCP_MOCK_DURABLE;
delete env.MEMWAL_MCP_USE_MEMORY;

const log = [];
let client;
let transport;

try {
  transport = new StdioClientTransport({
    command: "npx",
    args: ["-y", "@memwalpp/mcp@0.1.1", "--transport", "stdio"],
    env,
    stderr: "pipe",
  });
  client = new Client({ name: "session5-demo", version: "1.0.0" });
  await client.connect(transport);

  const stats0 = parseToolJson(await client.callTool({ name: "getStats", arguments: {} }));
  log.push({ step: "getStats-initial", stats0 });

  for (const d of DECISIONS) {
    const out = parseToolJson(
      await client.callTool({
        name: "remember",
        arguments: { content: d.content, metadata: d.metadata, promote: "walrus" },
      }),
    );
    if (!out.stored) throw new Error(`remember failed: ${d.label} — ${JSON.stringify(out)}`);
    log.push({ step: "remember", label: d.label, recordId: out.recordId, stored: out.stored });
  }

  for (const a of ARTIFACTS) {
    const out = parseToolJson(
      await client.callTool({
        name: "saveArtifact",
        arguments: {
          name: a.name,
          mime: "text/markdown",
          content: a.content,
          promote: "walrus",
        },
      }),
    );
    if (!out.stored) throw new Error(`saveArtifact failed: ${a.label} — ${JSON.stringify(out)}`);
    log.push({
      step: "saveArtifact",
      label: a.label,
      recordId: out.recordId,
      artifactName: out.artifactName,
    });
  }

  const synced = parseToolJson(await client.callTool({ name: "sync", arguments: {} }));
  log.push({ step: "sync", ...synced });
  if (!synced.durableLive) throw new Error(`durable not live: ${synced.skipReason ?? "unknown"}`);
  const pushed = Number(synced.metrics?.pushed ?? 0);
  if (pushed < 10) {
    console.warn(`Warning: pushed=${pushed} (target >= 10). skipped=${synced.metrics?.skipped}`);
  }

  const lastId = log.filter((e) => e.recordId).at(-1)?.recordId;
  if (lastId) {
    const verified = parseToolJson(
      await client.callTool({
        name: "verify",
        arguments: { memoryId: lastId, checkWalrus: true },
      }),
    );
    log.push({ step: "verify-last", memoryId: lastId, ...verified });
  }

  const recalled = parseToolJson(
    await client.callTool({
      name: "recall",
      arguments: { query: "Walrus durable layer", options: { limit: 3 } },
    }),
  );
  log.push({ step: "recall-sample", hitCount: (recalled.hits ?? []).length });

  const outPath = path.join(__dirname, "blob-log.session5.json");
  const summary = {
    pass: pushed >= 1,
    namespace: env.MEMWAL_NAMESPACE,
    accountId: env.MEMWAL_ACCOUNT_ID,
    dataDir,
    pushed,
    skipped: synced.metrics?.skipped,
    failed: synced.metrics?.failed,
    records: log.filter((e) => e.recordId).map((e) => ({ label: e.label, recordId: e.recordId })),
    verifyLast: log.find((e) => e.step === "verify-last"),
    at: new Date().toISOString(),
  };
  fs.writeFileSync(outPath, JSON.stringify({ summary, log }, null, 2));
  console.log(JSON.stringify(summary, null, 2));
  console.log(`\nFull log: ${outPath}`);
} finally {
  await client?.close().catch(() => {});
  await transport?.close().catch(() => {});
}
