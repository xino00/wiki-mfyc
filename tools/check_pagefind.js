#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { walkSearchableHtml, checkIntegrity } = require("./pagefind_artifacts");

const root = path.resolve(__dirname, "..");
const indexDir = path.join(root, "pagefind");

function main() {
  const entryFile = path.join(indexDir, "pagefind-entry.json");
  if (!fs.existsSync(entryFile)) {
    throw new Error("Falta pagefind/pagefind-entry.json. Ejecuta npm run build:search.");
  }

  const entry = JSON.parse(fs.readFileSync(entryFile, "utf8"));
  const languages = Object.values(entry.languages || {});
  if (!languages.length) throw new Error("El índice Pagefind no declara ningún idioma.");

  const htmlCount = walkSearchableHtml(root).length;
  const indexedCount = languages.reduce((total, language) => total + Number(language.page_count || 0), 0);
  if (indexedCount !== htmlCount) {
    throw new Error(`Pagefind contiene ${indexedCount}/${htmlCount} páginas. Ejecuta npm run build:search.`);
  }

  const expectedMeta = new Set(languages.map((language) => `pagefind.${language.hash}.pf_meta`));
  for (const name of expectedMeta) {
    if (!name.includes("undefined") && fs.existsSync(path.join(indexDir, name))) continue;
    throw new Error(`Falta el metadato activo de Pagefind: ${name}`);
  }

  const actualMeta = fs.readdirSync(indexDir).filter((name) => /^pagefind\..+\.pf_meta$/.test(name));
  const staleMeta = actualMeta.filter((name) => !expectedMeta.has(name));
  if (staleMeta.length) {
    throw new Error(`Pagefind conserva metadatos obsoletos: ${staleMeta.join(", ")}. Ejecuta npm run build:search.`);
  }

  const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  const expectedVersion = packageJson.devDependencies?.pagefind;
  if (entry.version !== expectedVersion) {
    throw new Error(`Índice creado con Pagefind ${entry.version}; package.json fija ${expectedVersion}.`);
  }

  checkIntegrity(root, indexDir);
  console.log(`OK: Pagefind ${entry.version}, ${indexedCount}/${htmlCount} páginas, fuentes y artefactos íntegros.`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
