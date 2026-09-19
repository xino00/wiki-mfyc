#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const journeys = [
  { id: "dolor-toracico", title: "Dolor torácico", destinations: 2 },
  { id: "diabetes", title: "Diabetes", destinations: 1 },
  { id: "mareo", title: "Mareo", destinations: 2 },
  { id: "antibioticos", title: "Antibióticos", destinations: 2 },
  { id: "piel", title: "Piel", destinations: 2 },
  { id: "boxes", title: "Boxes", destinations: 1 },
];
const outcomes = new Set(["sin_ayuda", "con_ayuda", "abandono"]);

function template() {
  return {
    schema: 1,
    participant: null,
    date: null,
    device: null,
    familiarity: null,
    journeys: journeys.map(({ id }) => ({
      id,
      query: "",
      firstDestination: "",
      outcome: null,
      secondsToFirstSection: null,
      secondsToSecondSection: null,
      purposeConfused: null,
      technicalFailure: null,
      notes: "",
    })),
  };
}

function validate(session) {
  assert.equal(session.schema, 1, "Esquema de sesión desconocido");
  assert.match(session.participant || "", /^P\d{2,3}$/, "Usa un código anónimo como P01");
  assert.match(session.date || "", /^\d{4}-\d{2}-\d{2}$/, `${session.participant}: falta fecha`);
  assert.equal(new Date(`${session.date}T12:00:00Z`).toISOString().slice(0, 10), session.date, "Fecha no válida");
  for (const key of ["device", "familiarity"]) {
    assert.ok(typeof session[key] === "string" && session[key].trim(), `${session.participant}: falta ${key}`);
  }
  assert.ok(Array.isArray(session.journeys), "Faltan recorridos");
  assert.deepEqual(session.journeys.map(({ id }) => id).sort(), journeys.map(({ id }) => id).sort(),
    `${session.participant}: deben constar los seis recorridos, sin duplicados`);
  for (const result of session.journeys) {
    const label = `${session.participant}/${result.id}`;
    const journey = journeys.find(({ id }) => id === result.id);
    assert.ok(outcomes.has(result.outcome), `${label}: falta resultado`);
    for (const key of ["purposeConfused", "technicalFailure"]) {
      assert.equal(typeof result[key], "boolean", `${label}: falta ${key}`);
    }
    for (const key of ["query", "firstDestination", "notes"]) {
      assert.equal(typeof result[key], "string", `${label}: ${key} debe ser texto`);
    }
    for (const key of ["secondsToFirstSection", "secondsToSecondSection"]) {
      assert.ok(result[key] === null || (Number.isFinite(result[key]) && result[key] >= 0), `${label}: tiempo inválido`);
    }
    if (result.outcome !== "abandono") {
      assert.notEqual(result.secondsToFirstSection, null, `${label}: falta tiempo hasta el primer destino`);
      if (journey.destinations === 2) assert.notEqual(result.secondsToSecondSection, null, `${label}: falta tiempo hasta el segundo destino`);
    }
    if (journey.destinations === 1) assert.equal(result.secondsToSecondSection, null, `${label}: solo hay un destino`);
    if (result.secondsToSecondSection !== null) {
      assert.notEqual(result.secondsToFirstSection, null, `${label}: falta el primer tiempo`);
      assert.ok(result.secondsToSecondSection >= result.secondsToFirstSection, `${label}: los tiempos son acumulados desde el inicio`);
    }
  }
  return session;
}

function median(values) {
  if (!values.length) return null;
  const ordered = [...values].sort((a, b) => a - b);
  const middle = Math.floor(ordered.length / 2);
  return ordered.length % 2 ? ordered[middle] : (ordered[middle - 1] + ordered[middle]) / 2;
}

function summarize(sessions) {
  sessions.forEach(validate);
  assert.equal(new Set(sessions.map(({ participant }) => participant)).size, sessions.length, "Participante duplicado: una sesión por persona");
  return journeys.map((journey) => {
    const results = sessions.map((session) => session.journeys.find(({ id }) => id === journey.id));
    const unassisted = results.filter(({ outcome }) => outcome === "sin_ayuda");
    const times = unassisted.map(({ secondsToFirstSection }) => secondsToFirstSection);
    return {
      ...journey,
      participants: sessions.length,
      unassisted: unassisted.length,
      assisted: results.filter(({ outcome }) => outcome === "con_ayuda").length,
      abandoned: results.filter(({ outcome }) => outcome === "abandono").length,
      medianFirst: median(times),
      maximumFirst: times.length ? Math.max(...times) : null,
      medianSecond: median(unassisted.map(({ secondsToSecondSection }) => secondsToSecondSection).filter((time) => time !== null)),
      confused: results.filter(({ purposeConfused }) => purposeConfused).length,
      failed: results.filter(({ technicalFailure }) => technicalFailure).length,
    };
  });
}

function report(sessions) {
  const rows = summarize(sessions);
  const time = (value) => value === null ? "—" : `${Number(value.toFixed(1))} s`;
  const lines = [
    "# Resultados de las sesiones de uso", "",
    `${sessions.length} participantes con los seis recorridos registrados. ${sessions.length < 5 ? "Faltan sesiones para completar el grupo de cinco." : "Grupo mínimo de cinco cubierto."}`,
    "", "Los tiempos incluyen solo recorridos completados sin ayuda. Segundo destino: tiempo acumulado desde el inicio. Los recuentos de ayuda, abandono, confusión y fallos se muestran por separado. Esta evaluación no valida contenido clínico.", "",
    "| Recorrido | Sin ayuda | Con ayuda | Abandono | Mediana 1.º | Máximo 1.º | Mediana 2.º | Confusión | Fallo técnico |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...rows.map((row) => `| ${row.title} | ${row.unassisted}/${row.participants} | ${row.assisted} | ${row.abandoned} | ${time(row.medianFirst)} | ${time(row.maximumFirst)} | ${time(row.medianSecond)} | ${row.confused} | ${row.failed} |`),
    "", "## Decisión pendiente del equipo", "",
    "Contrastar con el protocolo: al menos cuatro de las cinco primeras personas completan cada recorrido sin ayuda, mediana inicial menor de 30 segundos, ninguna confusión de propósito y ningún fallo técnico. Si se amplía la muestra, acordar el criterio antes de interpretar los resultados. Revisar también las notas originales para detectar bloqueos repetidos.",
  ];
  return `${lines.join("\n")}\n`;
}

function main(args) {
  if (args.length === 1 && args[0] === "--template") {
    process.stdout.write(`${JSON.stringify(template(), null, 2)}\n`);
    return;
  }
  if (args.length === 2 && args[0] === "--report") {
    const directory = path.resolve(args[1]);
    const sessions = fs.readdirSync(directory).filter((file) => file.endsWith(".json")).sort().map((file) => {
      try { return validate(JSON.parse(fs.readFileSync(path.join(directory, file), "utf8"))); }
      catch (error) { throw new Error(`${file}: ${error.message}`); }
    });
    process.stdout.write(report(sessions));
    return;
  }
  throw new Error("Uso: node tools/user_study.js --template | --report <carpeta-de-sesiones>");
}

module.exports = { template, validate, summarize, report };
if (require.main === module) {
  try { main(process.argv.slice(2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
