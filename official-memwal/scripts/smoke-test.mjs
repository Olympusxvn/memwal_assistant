/**
 * Smoke test for @mysten-incubation/memwal-mcp (official Mysten MCP).
 *
 * Prerequisites:
 *   npx -y @mysten-incubation/memwal-mcp login
 *   (saves ~/.memwal/credentials.json — browser wallet flow)
 *
 * Usage:
 *   npm run smoke          # list tools + remember + recall + analyze
 *   npm run tools          # list tools only
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NAMESPACE = process.env.MEMWAL_NAMESPACE ?? "session5-architect";
const LIST_ONLY = process.argv.includes("--list-only");
const OUT_DIR = path.join(__dirname, "..", "test-output");

function parseToolJson(result) {
  const block = result.content?.find((c) => c.type === "text");
  if (!block?.text) return result;
  try {
    return JSON.parse(block.text);
  } catch {
    return { raw: block.text };
  }
}

function credsStatus() {
  const p = path.join(os.homedir(), ".memwal", "credentials.json");
  if (!fs.existsSync(p)) return { ok: false, path: p };
  try {
    const c = JSON.parse(fs.readFileSync(p, "utf8"));
    return {
      ok: true,
      path: p,
      accountId: c.accountId,
      relayerUrl: c.relayerUrl,
      label: c.label,
    };
  } catch {
    return { ok: false, path: p };
  }
}

async function main() {
  const creds = credsStatus();
  console.log("=== Official MemWal MCP smoke test ===");
  console.log("Package: @mysten-incubation/memwal-mcp@0.0.5");
  console.log("Namespace:", NAMESPACE);
  console.log(
    "Credentials:",
    creds.ok
      ? `OK (${creds.accountId?.slice(0, 10)}…)`
      : `MISSING — run: npx -y @mysten-incubation/memwal-mcp login`,
  );

  const transport = new StdioClientTransport({
    command: "npx",
    args: [
      "-y",
      "@mysten-incubation/memwal-mcp@0.0.5",
      "--namespace",
      NAMESPACE,
    ],
    env: {
      ...process.env,
      MEMWAL_NAMESPACE: NAMESPACE,
      MEMWAL_SERVER_URL: "https://relayer.memory.walrus.xyz",
    },
    stderr: "pipe",
  });

  const client = new Client({ name: "official-memwal-smoke", version: "1.0.0" });
  const log = { at: new Date().toISOString(), namespace: NAMESPACE, steps: [] };

  try {
    await client.connect(transport);

    const tools = await client.listTools();
    log.tools = tools.tools.map((t) => ({
      name: t.name,
      description: t.description?.slice(0, 120),
    }));
    console.log("\n--- Tools (" + tools.tools.length + ") ---");
    for (const t of tools.tools) {
      console.log(`  • ${t.name}`);
    }

    fs.mkdirSync(OUT_DIR, { recursive: true });
    fs.writeFileSync(
      path.join(OUT_DIR, "tools.json"),
      JSON.stringify(tools.tools, null, 2),
    );
    console.log("\nWrote", path.join(OUT_DIR, "tools.json"));

    if (LIST_ONLY) {
      log.steps.push({ step: "listTools", count: tools.tools.length });
      fs.writeFileSync(path.join(OUT_DIR, "smoke-log.json"), JSON.stringify(log, null, 2));
      return;
    }

    if (!creds.ok) {
      console.log("\nSkipping write tests — no credentials. Run memwal-mcp login first.");
      log.steps.push({ step: "skipped", reason: "no_credentials" });
      fs.writeFileSync(path.join(OUT_DIR, "smoke-log.json"), JSON.stringify(log, null, 2));
      return;
    }

    const decision = `## Decision
Session 5 official MCP smoke test (${new Date().toISOString().slice(0, 10)}).

## Context
official-memwal/smoke-test

## Rationale
Validate @mysten-incubation/memwal-mcp remember → recall → analyze on Mainnet relayer.

## Status
Proposed

## Date
${new Date().toISOString().slice(0, 10)}`;

    if (tools.tools.some((t) => t.name === "memwal_remember")) {
      const remember = parseToolJson(
        await client.callTool({
          name: "memwal_remember",
          arguments: { text: decision },
        }),
      );
      console.log("\n--- memwal_remember ---");
      console.log(JSON.stringify(remember, null, 2).slice(0, 800));
      log.steps.push({ step: "memwal_remember", result: remember });
    }

    if (tools.tools.some((t) => t.name === "memwal_recall")) {
      await new Promise((r) => setTimeout(r, 3000));
      const recall = parseToolJson(
        await client.callTool({
          name: "memwal_recall",
          arguments: { query: "official MCP smoke test", limit: 5 },
        }),
      );
      console.log("\n--- memwal_recall ---");
      console.log(JSON.stringify(recall, null, 2).slice(0, 800));
      log.steps.push({ step: "memwal_recall", result: recall });
    }

    if (tools.tools.some((t) => t.name === "memwal_analyze")) {
      const analyze = parseToolJson(
        await client.callTool({
          name: "memwal_analyze",
          arguments: {
            text: decision,
          },
        }),
      );
      console.log("\n--- memwal_analyze ---");
      console.log(JSON.stringify(analyze, null, 2).slice(0, 800));
      log.steps.push({ step: "memwal_analyze", result: analyze });
    }

    fs.writeFileSync(path.join(OUT_DIR, "smoke-log.json"), JSON.stringify(log, null, 2));
    console.log("\nDone. Log:", path.join(OUT_DIR, "smoke-log.json"));
  } finally {
    await client.close().catch(() => {});
    await transport.close().catch(() => {});
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
