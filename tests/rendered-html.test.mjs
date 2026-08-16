import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Ali Dandash portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Ali Majed Dandash/);
  assert.match(html, /AreaMap/);
  assert.doesNotMatch(html, /MarketKernel|SubVanta/);
  assert.match(html, /Phonexa/);
  assert.match(html, /TapFlow AI/);
  assert.match(html, /TECHNICAL EXPERTISE/);
  assert.match(html, /I craft scalable full-stack product experiences/);
  assert.match(html, /video-skill-grid/);
  assert.match(html, /video-project-card/);
  assert.match(html, /Freelance Full-Stack Developer/);
  assert.match(html, /Programming Instructor/);
  assert.match(html, /\+961 76 652 276/);
  assert.doesNotMatch(html, /Active subscribers|independent internet service/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("case-study modal stays fixed above the portfolio", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(
    css,
    /\.video-portfolio\s*>\s*\.case-modal\s*\{[^}]*position:\s*fixed;[^}]*z-index:\s*100;/s,
  );
});
