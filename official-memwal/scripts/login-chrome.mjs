/**
 * Walrus Memory login — open sign-in in Google Chrome (not system default Edge).
 *
 * memwal-mcp login calls open(url) without an app → Windows uses default browser.
 * This script uses loginFlow with onUrl + open(..., { app: { name: 'chrome' } }).
 *
 * Usage:
 *   npm run login:chrome
 *   node scripts/login-chrome.mjs
 */
import open from "open";
import { loginFlow } from "@mysten-incubation/memwal-mcp";

const CHROME_APP =
  process.env.MEMWAL_LOGIN_BROWSER ??
  (process.platform === "win32" ? "chrome" : "google chrome");

const relayerUrl =
  process.env.MEMWAL_SERVER_URL ?? "https://relayer.memory.walrus.xyz";
const webUrl = process.env.MEMWAL_WEB_URL ?? "https://memory.walrus.xyz";
const label = process.env.MEMWAL_CLIENT_LABEL ?? "Walrus Memory MCP";

console.log("Walrus Memory login — opening Google Chrome");
console.log("Relayer:", relayerUrl);
console.log("Browser app name:", CHROME_APP);

try {
  const creds = await loginFlow({
    relayerUrl,
    webUrl,
    label,
    openBrowser: false,
    onUrl: async (connectUrl) => {
      console.log("\nSign-in URL (fallback if Chrome does not open):");
      console.log(connectUrl);
      console.log("");
      await open(connectUrl, { app: { name: CHROME_APP } });
      console.log("Chrome launched — connect Sui wallet and approve delegate key.");
    },
  });

  console.log("\nLogin OK");
  console.log("Account:", creds.accountId);
  console.log("Credentials:", `${process.env.USERPROFILE ?? process.env.HOME}/.memwal/credentials.json`);
} catch (err) {
  console.error("\nLogin failed:", err?.message ?? err);
  console.error("\nTips:");
  console.error("  • Install Chrome or set MEMWAL_LOGIN_BROWSER to full path");
  console.error("  • Windows example:");
  console.error('    MEMWAL_LOGIN_BROWSER="C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" npm run login:chrome');
  process.exit(1);
}
