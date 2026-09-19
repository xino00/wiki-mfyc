#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const config = require("../site.config.json");
const { checkHtmlTarget } = require("./site_links");

const root = path.resolve(__dirname, "..");
const skippedDirectories = new Set([".git", ".github", "node_modules", "pagefind"]);

function walkHtml(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && skippedDirectories.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkHtml(full);
    return entry.isFile() && entry.name.endsWith(".html") ? [full] : [];
  });
}

function relative(file) {
  return path.relative(root, file).split(path.sep).join("/");
}

function count(html, expression) {
  return [...html.matchAll(expression)].length;
}

function checkConfiguration(failures) {
  if (!config.name || !config.url) failures.push("site.config.json: faltan name o url");
  for (const collectionName of ["quickLinks", "modules"]) {
    const collection = config[collectionName];
    if (!Array.isArray(collection) || !collection.length) {
      failures.push(`site.config.json: ${collectionName} debe ser una lista no vacía`);
      continue;
    }
    const seen = new Set();
    for (const item of collection) {
      if (!item.href || !item.label) failures.push(`site.config.json: entrada incompleta en ${collectionName}`);
      if (seen.has(item.href)) failures.push(`site.config.json: href duplicado en ${collectionName}: ${item.href}`);
      seen.add(item.href);
      if (item.href) {
        try {
          checkHtmlTarget(root, item.href, `site.config.json ${collectionName}`);
        } catch (error) {
          failures.push(error.message);
        }
      }
    }
  }
}

function checkStructure(file, html, failures) {
  const name = relative(file);
  const rules = [
    [/^<!doctype html>/i, "falta <!doctype html>"],
    [/<html lang="es">/i, "falta lang=\"es\""],
    [/<meta name="description" content="[^"]+">/i, "falta meta description"],
    [/<!-- shared-meta:start -->[\s\S]*?<!-- shared-meta:end -->/i, "falta el bloque shared-meta"],
    [/<!-- shared-header:start -->[\s\S]*?<!-- shared-header:end -->/i, "falta el bloque shared-header"],
    [/<link rel="stylesheet" href="(?:\.\.\/)*styles\.css">/i, "falta styles.css"],
    [/<script src="(?:\.\.\/)*app\.js"><\/script>/i, "falta app.js"],
    [/<script src="(?:\.\.\/)*guide-catalog\.js"><\/script>/i, "falta guide-catalog.js"],
  ];
  for (const [expression, message] of rules) {
    if (!expression.test(html)) failures.push(`${name}: ${message}`);
  }

  const exactCounts = [
    [/<title>[^<]+<\/title>/gi, 1, "<title>"],
    [/<h1\b/gi, 1, "<h1>"],
    [/<header class="site-bar"(?:\s|>)/gi, 1, "site-bar"],
  ];
  for (const [expression, expected, label] of exactCounts) {
    const actual = count(html, expression);
    if (actual !== expected) failures.push(`${name}: ${label} aparece ${actual} veces; se esperaba ${expected}`);
  }

  if (/\sstyle\s*=/i.test(html)) failures.push(`${name}: contiene estilos inline`);
  if (/<(?:input|textarea)\b[^>]*\bdata-search=/i.test(html)) {
    failures.push(`${name}: usa la API antigua data-search; migra a data-filter-scope`);
  }

  const ids = new Set();
  for (const match of html.matchAll(/\sid="([^"]+)"/g)) {
    if (ids.has(match[1])) failures.push(`${name}: id duplicado: ${match[1]}`);
    ids.add(match[1]);
  }
}

function buildIdIndex(htmlFiles) {
  const index = new Map();
  for (const file of htmlFiles) {
    const ids = new Set([...fs.readFileSync(file, "utf8").matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
    index.set(path.normalize(file), ids);
  }
  return index;
}

function checkLinks(htmlFiles, failures) {
  const idsByFile = buildIdIndex(htmlFiles);
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, "utf8");
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const url = match[1];
      if (!url || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(url)) continue;

      const [beforeHash, rawHash = ""] = url.split("#", 2);
      const rawPath = beforeHash.split("?", 1)[0];
      let decodedPath;
      let decodedHash;
      try {
        decodedPath = decodeURIComponent(rawPath);
        decodedHash = decodeURIComponent(rawHash);
      } catch (_) {
        failures.push(`${relative(file)} -> ${url}: URL local mal codificada`);
        continue;
      }

      let target = decodedPath ? path.resolve(path.dirname(file), decodedPath) : path.resolve(file);
      if (decodedPath.endsWith("/")) target = path.join(target, "index.html");
      if (target !== root && !target.startsWith(`${root}${path.sep}`)) {
        failures.push(`${relative(file)} -> ${url}: sale de la raíz pública`);
        continue;
      }
      if (decodedPath && !fs.existsSync(target)) {
        failures.push(`${relative(file)} -> ${url}: destino inexistente`);
        continue;
      }
      if (decodedHash && target.endsWith(".html") && !idsByFile.get(path.normalize(target))?.has(decodedHash)) {
        failures.push(`${relative(file)} -> ${url}: ancla inexistente`);
      }
    }
  }
}

function main() {
  const failures = [];
  const htmlFiles = walkHtml(root);
  if (!htmlFiles.length) failures.push("No se encontraron páginas HTML públicas.");

  checkConfiguration(failures);
  for (const file of htmlFiles) checkStructure(file, fs.readFileSync(file, "utf8"), failures);
  checkLinks(htmlFiles, failures);

  if (failures.length) throw new Error(failures.join("\n"));
  const articleCount = htmlFiles.filter((file) => path.basename(file) !== "index.html").length;
  console.log(`OK: ${htmlFiles.length} HTML, ${articleCount} artículos, estructura y enlaces locales válidos.`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
