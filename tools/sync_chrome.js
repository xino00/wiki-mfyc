#!/usr/bin/env node
/**
 * Sincroniza únicamente dos bloques generados de cada HTML:
 *   - <!-- shared-header:start/end -->
 *   - <!-- shared-meta:start/end -->
 *
 * El cuerpo clínico queda fuera de esos marcadores y nunca se modifica aquí.
 */
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const config = require("../site.config.json");

const root = path.resolve(__dirname, "..");
const skippedDirectories = new Set([".git", ".github", "node_modules", "pagefind"]);
const headerBlockRe = /<!-- shared-header:start -->[\s\S]*?<!-- shared-header:end -->/;
const legacyHeaderRe = /<header class="site-bar"[\s\S]*?<\/header>/;
const metaBlockRe = /<!-- shared-meta:start -->[\s\S]*?<!-- shared-meta:end -->/;

function walkHtml(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && skippedDirectories.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkHtml(full);
    return entry.isFile() && entry.name.endsWith(".html") ? [full] : [];
  });
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function relativeBase(file) {
  const depth = path.relative(root, file).split(path.sep).length - 1;
  return "../".repeat(depth);
}

function pageUrl(file) {
  const relative = path.relative(root, file).split(path.sep).join("/");
  return new URL(relative, config.url).toString();
}

function pageTitle(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!match) throw new Error("falta <title>");
  return match[1].trim();
}

function pageDescription(html) {
  const match = html.match(/<meta name="description" content="([^"]*)">/i);
  if (!match) throw new Error("falta meta description");
  return match[1].trim();
}

function buildHeader(base) {
  const quickLinks = config.quickLinks
    .map(({ href, label }) => `    <a href="${base}${href}">${escapeHtml(label)}</a>`)
    .join("\n");
  const modules = config.modules
    .map(({ href, label }) => `        <a href="${base}${href}">${escapeHtml(label)}</a>`)
    .join("\n");

  return `<!-- shared-header:start -->
<header class="site-bar" data-base="${base}" data-pagefind-ignore>
  <a class="brand" href="${base}index.html" aria-label="Inicio">
    <span class="brand-mark">MF</span>
    <span class="brand-text">Guía MFyC</span>
  </a>
  <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="site-nav" aria-label="Abrir menú de navegación">
    <span class="nav-toggle-lines" aria-hidden="true"></span>
  </button>
  <nav class="site-nav" id="site-nav" aria-label="Navegación principal">
${quickLinks}
    <details class="nav-more">
      <summary>Biblioteca</summary>
      <div class="nav-more-panel">
${modules}
      </div>
    </details>
  </nav>
  <div class="site-actions">
    <button class="search-toggle" type="button" data-search-open aria-label="Buscar en la guía">
      <span class="search-toggle-icon" aria-hidden="true">⌕</span>
      <span class="search-toggle-text">Buscar</span>
    </button>
    <button class="theme-toggle" type="button" data-theme-toggle aria-label="Cambiar tema">Tema</button>
  </div>
</header>
<script src="${base}guide-catalog.js"></script>
<!-- shared-header:end -->`;
}

function buildMeta(file, html) {
  const title = escapeHtml(pageTitle(html));
  const description = escapeHtml(pageDescription(html));
  const url = escapeHtml(pageUrl(file));
  return `<!-- shared-meta:start -->
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${escapeHtml(config.name)}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${url}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <!-- shared-meta:end -->`;
}

function synchronize(file, source, migrateHeaders) {
  const header = buildHeader(relativeBase(file));
  let output = source;
  if (headerBlockRe.test(output)) {
    output = output.replace(headerBlockRe, header);
  } else if (migrateHeaders && legacyHeaderRe.test(output)) {
    output = output.replace(legacyHeaderRe, header);
  } else {
    throw new Error("faltan los marcadores shared-header");
  }

  if (!metaBlockRe.test(output)) throw new Error("faltan los marcadores shared-meta");
  return output.replace(metaBlockRe, buildMeta(file, output));
}

function main() {
  const check = process.argv.includes("--check");
  const migrateHeaders = process.argv.includes("--migrate-headers");
  if (check && migrateHeaders) throw new Error("--check y --migrate-headers no pueden combinarse.");

  const failures = [];
  const drift = [];
  let changed = 0;

  for (const file of walkHtml(root)) {
    const relative = path.relative(root, file);
    const source = fs.readFileSync(file, "utf8");
    try {
      const output = synchronize(file, source, migrateHeaders);
      if (output === source) continue;
      if (check) drift.push(relative);
      else {
        fs.writeFileSync(file, output);
        changed += 1;
      }
    } catch (error) {
      failures.push(`${relative}: ${error.message}`);
    }
  }

  if (failures.length) throw new Error(failures.join("\n"));
  if (check && drift.length) {
    throw new Error(`Chrome compartido desincronizado:\n${drift.map((file) => `  ${file}`).join("\n")}`);
  }

  if (check) console.log("OK: cabecera y metadatos compartidos sincronizados.");
  else console.log(`Cabecera y metadatos sincronizados en ${changed} archivo(s).`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
