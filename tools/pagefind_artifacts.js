"use strict";

const { createHash } = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const manifestName = "integrity.json";
const skippedDirectories = new Set([".git", ".github", "node_modules", "pagefind", "tools"]);

function relative(root, file) {
  return path.relative(root, file).split(path.sep).join("/");
}

function walkPublicHtml(root, dir = root) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && (skippedDirectories.has(entry.name) || entry.name.startsWith(".pagefind-"))) return [];
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkPublicHtml(root, full);
    return entry.isFile() && entry.name.endsWith(".html") ? [full] : [];
  }).sort((a, b) => relative(root, a) < relative(root, b) ? -1 : relative(root, a) > relative(root, b) ? 1 : 0);
}

function walkArtifacts(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkArtifacts(full);
    if (!entry.isFile()) throw new Error(`Artefacto Pagefind no regular: ${full}`);
    return [full];
  });
}

function hashes(root, files) {
  return Object.fromEntries(files.map((file) => [
    relative(root, file),
    createHash("sha256").update(fs.readFileSync(file)).digest("hex"),
  ]).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0));
}

function sourceHashes(root) {
  return hashes(root, walkPublicHtml(root));
}

function artifactHashes(indexDir) {
  return hashes(indexDir, walkArtifacts(indexDir).filter((file) => relative(indexDir, file) !== manifestName));
}

function compareHashes(expected, actual, label) {
  if (!expected || typeof expected !== "object" || Array.isArray(expected) || !Object.keys(expected).length) {
    throw new Error(`Manifiesto Pagefind inválido: ${label}. Ejecuta npm run build:search.`);
  }
  for (const name of new Set([...Object.keys(expected), ...Object.keys(actual)])) {
    if (!(name in actual)) throw new Error(`${label}: falta ${name}. Ejecuta npm run build:search.`);
    if (!(name in expected)) throw new Error(`${label}: archivo no registrado ${name}. Ejecuta npm run build:search.`);
    if (expected[name] !== actual[name]) throw new Error(`${label}: cambió ${name}. Ejecuta npm run build:search.`);
  }
}

function writeManifest(root, indexDir, sources) {
  compareHashes(sources, sourceHashes(root), "Fuentes modificadas durante la indexación");
  const manifest = { schema: 1, sources, files: artifactHashes(indexDir) };
  fs.writeFileSync(path.join(indexDir, manifestName), `${JSON.stringify(manifest, null, 2)}\n`);
}

function checkIntegrity(root, indexDir) {
  const manifestFile = path.join(indexDir, manifestName);
  if (!fs.existsSync(manifestFile)) throw new Error(`Falta pagefind/${manifestName}. Ejecuta npm run build:search.`);
  const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
  if (manifest.schema !== 1) throw new Error("Versión de manifiesto Pagefind desconocida. Ejecuta npm run build:search.");
  compareHashes(manifest.files, artifactHashes(indexDir), "Artefactos Pagefind");
  compareHashes(manifest.sources, sourceHashes(root), "Fuentes de Pagefind");
}

module.exports = { walkPublicHtml, sourceHashes, artifactHashes, writeManifest, checkIntegrity };
