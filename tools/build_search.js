#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { walkPublicHtml, sourceHashes, writeManifest, checkIntegrity } = require("./pagefind_artifacts");

function recoverInterruptedInstall(root) {
  const target = path.join(root, "pagefind");
  const backup = path.join(root, ".pagefind-backup");
  if (!fs.existsSync(backup)) return;
  if (fs.existsSync(target)) {
    fs.rmSync(backup, { recursive: true, force: true });
    return;
  }
  fs.renameSync(backup, target);
  console.warn("Se restauró el último índice Pagefind válido tras una instalación interrumpida.");
}

function installGeneratedIndex(root, temporary) {
  const target = path.join(root, "pagefind");
  const backup = path.join(root, ".pagefind-backup");
  if (path.dirname(temporary) !== root || !path.basename(temporary).startsWith(".pagefind-build-")) {
    throw new Error(`Directorio temporal inseguro: ${temporary}`);
  }
  if (fs.existsSync(target)) fs.renameSync(target, backup);
  try {
    fs.renameSync(temporary, target);
  } catch (error) {
    if (!fs.existsSync(target) && fs.existsSync(backup)) fs.renameSync(backup, target);
    throw error;
  }
  fs.rmSync(backup, { recursive: true, force: true });
}

function checkResponse(response, operation) {
  if (response.errors?.length) throw new Error(`${operation}: ${response.errors.join("; ")}`);
  return response;
}

async function buildSearch(root) {
  root = path.resolve(root);
  recoverInterruptedInstall(root);
  const pages = walkPublicHtml(root);
  if (!pages.length) throw new Error("No se encontraron páginas HTML públicas para indexar.");
  const sources = sourceHashes(root);
  const pagefind = await import("pagefind");
  const temporary = fs.mkdtempSync(path.join(root, ".pagefind-build-"));

  try {
    const { index } = checkResponse(await pagefind.createIndex(), "Crear índice");
    if (!index) throw new Error("Pagefind no creó el índice.");
    // Pagefind asigna referencias internas al añadir páginas: preservar este orden.
    for (const file of pages) {
      const sourcePath = path.relative(root, file).split(path.sep).join("/");
      checkResponse(await index.addHTMLFile({ sourcePath, content: fs.readFileSync(file, "utf8") }), sourcePath);
    }
    checkResponse(await index.writeFiles({ outputPath: temporary }), "Escribir índice");
    if (!fs.existsSync(path.join(temporary, "pagefind-entry.json"))) {
      throw new Error("Pagefind no produjo pagefind-entry.json.");
    }
    writeManifest(root, temporary, sources);
    checkIntegrity(root, temporary);
    installGeneratedIndex(root, temporary);
    console.log(`Índice Pagefind regenerado en orden estable a partir de ${pages.length} páginas públicas, con manifiesto de integridad.`);
  } finally {
    await pagefind.close();
    fs.rmSync(temporary, { recursive: true, force: true });
  }
}

if (require.main === module) {
  buildSearch(path.resolve(__dirname, "..")).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = { buildSearch, recoverInterruptedInstall, installGeneratedIndex };
