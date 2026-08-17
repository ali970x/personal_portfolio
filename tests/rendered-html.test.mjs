import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
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
  assert.match(html, /Product engineer/i);
  assert.match(html, /What I do/);
  assert.match(html, /My career/);
  assert.match(html, /cinema-portfolio/);
  assert.match(html, /cinema-interactive-stage/);
  assert.match(html, /cinema-cursor-eye/);
  assert.match(html, /cinema-cursor-eye[\s\S]*cinema-header/);
  assert.match(html, /cinema-stars/);
  assert.match(html, /cinema-logo__home/);
  assert.match(html, /cinema-stage-portrait/);
  assert.match(html, /cinema-stage-portrait__photo/);
  assert.match(html, /assets\/portrait\/ali-dandash\.png/);
  assert.match(html, /cinema-stage-desk/);
  assert.match(html, /data-scene="intro"/);
  assert.match(html, /cinema-stack-world/);
  assert.match(html, /cinema-work-grid/);
  assert.match(html, /cinema-timeline__meta/);
  assert.match(html, /cinema-timeline__node/);
  assert.match(html, /aria-label="GitHub"/);
  assert.match(html, /aria-label="LinkedIn"/);
  assert.match(html, /aria-label="WhatsApp"/);
  assert.match(html, /assets\/3d\/ali-avatar-hero\.webp/);
  assert.match(html, /assets\/3d\/ali-avatar-desk\.webp/);
  assert.match(html, /og-cinema\.png/);
  assert.doesNotMatch(html, /og-video\.png/);
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
    /\.cinema-portfolio\s*>\s*\.case-modal\s*\{[^}]*position:\s*fixed;[^}]*z-index:\s*140;/s,
  );
});

test("cinematic identity assets are production-ready", async () => {
  const portrait = await stat(new URL("../public/assets/portrait/ali-dandash.png", import.meta.url));
  const hero = await stat(new URL("../public/assets/3d/ali-avatar-hero.webp", import.meta.url));
  const desk = await stat(new URL("../public/assets/3d/ali-avatar-desk.webp", import.meta.url));
  const socialPreview = await stat(new URL("../public/og-cinema.png", import.meta.url));
  const cv = await stat(new URL("../public/downloads/Ali_Majed_Dandash_Full_Stack_CV.pdf", import.meta.url));

  assert.ok(portrait.size > 20_000);
  assert.ok(hero.size > 20_000);
  assert.ok(desk.size > 20_000);
  assert.ok(socialPreview.size > 100_000);
  assert.ok(cv.size > 20_000);
});
