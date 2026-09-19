#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs");
const catalog = require("../guide-catalog");
const register = require("./editorial-register.json");
const { checkHtmlTarget } = require("./site_links");
const { walkPublicHtml } = require("./pagefind_artifacts");

const root = path.resolve(__dirname, "..");
const contexts = new Set(["Consulta", "Urgencias", "Tratamientos", "Técnicas", "Planta"]);
const kinds = new Set(["Valoración inicial", "Seguimiento", "Referencia", "Exploración", "Plantilla"]);

function nonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function main() {
  assert.ok(Array.isArray(catalog) && catalog.length, "El catálogo no puede estar vacío.");
  const articleRoutes = walkPublicHtml(root)
    .filter((file) => /<article\b[^>]*class="[^"]*\barticle\b/.test(fs.readFileSync(file, "utf8")))
    .map((file) => path.relative(root, file).split(path.sep).join("/"));
  assert.deepEqual(catalog.map(({ href }) => href).sort(), articleRoutes.sort(),
    "El catálogo debe cubrir exactamente todos los artículos publicados, sin índices ni omisiones.");
  const ids = new Set();
  const routes = new Set();
  let tasks = 0;
  for (const guide of catalog) {
    assert.match(guide.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, "ID de ficha inválido");
    assert.ok(!ids.has(guide.id), `ID duplicado: ${guide.id}`);
    assert.ok(!routes.has(guide.href), `Ruta duplicada: ${guide.href}`);
    ids.add(guide.id);
    routes.add(guide.href);
    assert.ok(nonEmpty(guide.title), `${guide.id}: falta título`);
    assert.ok(contexts.has(guide.context), `${guide.id}: contexto inválido`);
    assert.ok(kinds.has(guide.kind), `${guide.id}: tipo inválido`);
    assert.ok(!guide.href.includes("#") && !guide.href.endsWith("index.html"), `${guide.id}: debe apuntar a una ficha`);
    const { html } = checkHtmlTarget(root, guide.href, guide.id);
    assert.match(html, /<body\b[^>]*class="[^"]*\bguide-page\b/, `${guide.id}: falta el diseño de guía`);
    assert.match(html, /class="[^"]*\btask-nav\b/, `${guide.id}: faltan accesos por tarea`);
    assert.match(html, /class="[^"]*\brelated-guides\b/, `${guide.id}: faltan guías relacionadas`);
    if (guide.searchPriority !== undefined) assert.ok(Number.isInteger(guide.searchPriority), `${guide.id}: prioridad inválida`);
    assert.ok(Array.isArray(guide.aliases) && guide.aliases.length && guide.aliases.every(nonEmpty), `${guide.id}: alias inválidos`);
    assert.ok(Array.isArray(guide.tasks) && guide.tasks.length, `${guide.id}: faltan tareas`);
    const taskLinks = new Set();
    for (const task of guide.tasks) {
      assert.ok(nonEmpty(task.label), `${guide.id}: tarea sin etiqueta`);
      assert.ok(task.href.startsWith(`${guide.href}#`), `${guide.id}: la tarea debe señalar una sección de su ficha`);
      assert.ok(!taskLinks.has(task.href), `${guide.id}: tarea duplicada: ${task.href}`);
      taskLinks.add(task.href);
      checkHtmlTarget(root, task.href, `${guide.id}: ${task.label}`);
      assert.ok(html.includes(`href="#${task.href.split("#")[1]}"`), `${guide.id}: tarea sin acceso local: ${task.href}`);
      tasks += 1;
    }
  }
  for (const guide of catalog) {
    assert.ok(Array.isArray(guide.related) && guide.related.length >= 2, `${guide.id}: se necesitan al menos dos relaciones`);
    assert.equal(new Set(guide.related).size, guide.related.length, `${guide.id}: relación duplicada`);
    for (const id of guide.related) assert.ok(id !== guide.id && ids.has(id), `${guide.id}: relación inexistente o consigo misma: ${id}`);
  }

  assert.equal(register.schema, 1, "Esquema del registro editorial inválido");
  assert.ok(Array.isArray(register.records), "Faltan entradas del registro editorial");
  assert.deepEqual(register.records.map(({ id }) => id).sort(), [...ids].sort(), "El registro editorial debe cubrir exactamente el catálogo");
  for (const record of register.records) {
    const guide = catalog.find(({ id }) => id === record.id);
    assert.equal(record.href, guide.href, `${record.id}: el registro apunta a otra ficha`);
    assert.ok(record.owner === null || nonEmpty(record.owner), `${record.id}: responsable inválido`);
    assert.ok(["pendiente_asignar", "pendiente_revision", "revisada", "no_aplica_plantilla"].includes(record.clinicalReview), `${record.id}: estado de revisión no documentado`);
    if (record.clinicalReview === "revisada") {
      assert.ok(nonEmpty(record.owner) && /^\d{4}-\d{2}-\d{2}$/.test(record.lastClinicalReview || "") && nonEmpty(record.reviewEvidence),
        `${record.id}: una revisión declarada requiere responsable, fecha y evidencia documentada`);
    }
    if (record.clinicalReview === "no_aplica_plantilla") assert.equal(guide.kind, "Plantilla", `${record.id}: solo las plantillas quedan fuera de revisión clínica`);
    assert.ok(Array.isArray(record.sourcesObserved), `${record.id}: referencias observadas inválidas`);
    for (const source of record.sourcesObserved) {
      assert.ok(nonEmpty(source.title), `${record.id}: referencia sin título`);
      const { html } = checkHtmlTarget(root, source.htmlLocation, `${record.id}: evidencia de referencia`);
      if (source.url) assert.ok(html.includes(source.url), `${record.id}: el enlace de referencia no está en el HTML indicado`);
    }
    const template = guide.kind === "Plantilla";
    assert.equal(record.clinicalReview === "no_aplica_plantilla", template, `${record.id}: el registro debe distinguir plantillas y guías clínicas`);
  }
  console.log(`OK: ${catalog.length} fichas, ${tasks} tareas con anclas, relaciones y registro editorial coherentes. La revisión clínica sigue independiente.`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
