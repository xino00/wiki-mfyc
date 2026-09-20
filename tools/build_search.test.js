"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { test } = require("node:test");
const { gunzipSync } = require("node:zlib");
const { buildSearch, recoverInterruptedInstall, installGeneratedIndex } = require("./build_search");
const { artifactHashes, checkIntegrity } = require("./pagefind_artifacts");

function temporaryRoot(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "wiki-search-test-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}

function write(root, name, content) {
  const file = path.join(root, name);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  return file;
}

const pages = ["index.html", "cardio/index.html", "urgencias/shock.html"];

function populate(root, names) {
  for (const name of names) {
    write(root, name, `<!doctype html><html lang="es"><head><title>${name}</title></head><body><nav data-pagefind-ignore>ruidoexcluido</nav><h1>${name}</h1><p>sepsis hipotensión</p></body></html>`);
  }
}

test("Pagefind conserva contenido y URLs y produce los mismos bytes con distinto orden físico", async (t) => {
  const first = temporaryRoot(t);
  const second = temporaryRoot(t);
  populate(first, pages);
  populate(second, [...pages].reverse());
  await buildSearch(first);
  await buildSearch(second);
  const firstIndex = path.join(first, "pagefind");
  assert.deepEqual(artifactHashes(firstIndex), artifactHashes(path.join(second, "pagefind")));
  assert.equal(fs.readFileSync(path.join(firstIndex, "integrity.json"), "utf8"), fs.readFileSync(path.join(second, "pagefind/integrity.json"), "utf8"));

  for (const asset of ["pagefind.js", "pagefind-ui.js", "pagefind-ui.css", "wasm.es.pagefind"]) {
    assert.ok(fs.statSync(path.join(firstIndex, asset)).size > 0, `Falta el recurso ${asset}`);
  }
  const fragments = fs.readdirSync(path.join(firstIndex, "fragment")).map((name) => {
    const bytes = gunzipSync(fs.readFileSync(path.join(firstIndex, "fragment", name)));
    assert.equal(bytes.subarray(0, 12).toString(), "pagefind_dcd");
    return JSON.parse(bytes.subarray(12).toString());
  });
  assert.deepEqual(fragments.map(({ url }) => url).sort(), ["/", "/cardio/", "/urgencias/shock.html"]);
  assert.ok(fragments.every(({ content }) => content.includes("sepsis hipotensión") && !content.includes("ruidoexcluido")));

  checkIntegrity(first, firstIndex);
  const fragment = path.join(firstIndex, "fragment", fs.readdirSync(path.join(firstIndex, "fragment"))[0]);
  const original = fs.readFileSync(fragment);
  fs.unlinkSync(fragment);
  assert.throws(() => checkIntegrity(first, firstIndex), /Artefactos Pagefind: falta fragment\//);
  fs.writeFileSync(fragment, original);
  fs.appendFileSync(fragment, "corrupción");
  assert.throws(() => checkIntegrity(first, firstIndex), /Artefactos Pagefind: cambió fragment\//);
  fs.writeFileSync(fragment, original);
  const extra = write(firstIndex, "fragment/obsoleto.pf_fragment", "obsoleto");
  assert.throws(() => checkIntegrity(first, firstIndex), /archivo no registrado fragment\/obsoleto/);
  fs.unlinkSync(extra);
  fs.appendFileSync(path.join(first, "index.html"), "<p>Cambio clínico</p>");
  assert.throws(() => checkIntegrity(first, firstIndex), /Fuentes de Pagefind: cambió index.html/);
});

test("Un fallo al instalar restaura el índice anterior", (t) => {
  const root = temporaryRoot(t);
  const temporary = path.join(root, ".pagefind-build-test");
  write(root, "pagefind/sentinel", "anterior");
  write(temporary, "sentinel", "nuevo");
  const rename = fs.renameSync;
  const mock = t.mock.method(fs, "renameSync", (from, to) => {
    if (from === temporary) throw new Error("Fallo simulado de rename");
    return rename(from, to);
  });
  assert.throws(() => installGeneratedIndex(root, temporary), /Fallo simulado/);
  mock.mock.restore();
  assert.equal(fs.readFileSync(path.join(root, "pagefind/sentinel"), "utf8"), "anterior");
  assert.equal(fs.existsSync(path.join(root, ".pagefind-backup")), false);
});

test("Las redirecciones no se indexan y siguen protegidas por el manifiesto", async (t) => {
  const root = temporaryRoot(t);
  populate(root, ["index.html"]);
  const retired = write(root, "retirada.html", '<!doctype html><html lang="es"><head><title>Guía retirada</title><meta name="guide-redirect" content="index.html"></head><body><h1>Contenido trasladado</h1></body></html>');
  await buildSearch(root);
  const indexDir = path.join(root, "pagefind");
  const entry = JSON.parse(fs.readFileSync(path.join(indexDir, "pagefind-entry.json"), "utf8"));
  assert.equal(Object.values(entry.languages).reduce((total, language) => total + language.page_count, 0), 1);
  const fragments = fs.readdirSync(path.join(indexDir, "fragment")).map((name) =>
    JSON.parse(gunzipSync(fs.readFileSync(path.join(indexDir, "fragment", name))).subarray(12).toString()));
  assert.deepEqual(fragments.map(({ url }) => url), ["/"]);
  checkIntegrity(root, indexDir);
  fs.appendFileSync(retired, "<!-- cambio en la redirección -->");
  assert.throws(() => checkIntegrity(root, indexDir), /Fuentes de Pagefind: cambió retirada.html/);
});

test("Recupera una instalación interrumpida antes y después de colocar el índice nuevo", (t) => {
  const root = temporaryRoot(t);
  write(root, ".pagefind-backup/sentinel", "anterior");
  recoverInterruptedInstall(root);
  assert.equal(fs.readFileSync(path.join(root, "pagefind/sentinel"), "utf8"), "anterior");
  write(root, ".pagefind-backup/sentinel", "anterior");
  write(root, "pagefind/sentinel", "nuevo");
  recoverInterruptedInstall(root);
  assert.equal(fs.readFileSync(path.join(root, "pagefind/sentinel"), "utf8"), "nuevo");
  assert.equal(fs.existsSync(path.join(root, ".pagefind-backup")), false);
});

test("Un error previo a la generación conserva el índice publicado", async (t) => {
  const root = temporaryRoot(t);
  write(root, "pagefind/sentinel", "anterior");
  await assert.rejects(buildSearch(root), /No se encontraron páginas HTML/);
  assert.equal(fs.readFileSync(path.join(root, "pagefind/sentinel"), "utf8"), "anterior");
});
