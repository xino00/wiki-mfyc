"use strict";

const assert = require("node:assert/strict");
const { test } = require("node:test");
const { template, validate, summarize, report } = require("./user_study");

// Datos sintéticos exclusivos de estas pruebas; no son sesiones de residentes.
function fixture(number, seconds, outcome = "sin_ayuda") {
  const session = template();
  Object.assign(session, { participant: `P0${number}`, date: "2026-09-07", device: "Dispositivo de prueba", familiarity: "Fixture" });
  session.journeys.forEach((result) => Object.assign(result, {
    outcome,
    secondsToFirstSection: seconds,
    secondsToSecondSection: ["diabetes", "boxes"].includes(result.id) ? null : seconds === null ? null : seconds + 10,
    purposeConfused: false,
    technicalFailure: false,
  }));
  return session;
}

test("una plantilla vacía nunca cuenta como sesión realizada", () => {
  assert.throws(() => validate(template()), /código anónimo/);
  assert.match(report([]), /0 participantes/);
  assert.match(report([]), /Faltan sesiones/);
  assert.doesNotMatch(report([]), /Grupo mínimo de cinco cubierto/);
});

test("no acepta participantes o recorridos duplicados ni tiempos incompletos", () => {
  assert.throws(() => summarize([fixture(1, 12), fixture(1, 15)]), /Participante duplicado/);
  const duplicate = fixture(1, 12);
  duplicate.journeys[1] = { ...duplicate.journeys[0] };
  assert.throws(() => validate(duplicate), /seis recorridos/);
  const incomplete = fixture(1, 12);
  incomplete.journeys[0].secondsToSecondSection = null;
  assert.throws(() => validate(incomplete), /segundo destino/);
  const reversed = fixture(1, 12);
  reversed.journeys[0].secondsToSecondSection = 5;
  assert.throws(() => validate(reversed), /acumulados/);
});

test("la mediana excluye ayudas y abandonos, que conservan sus recuentos", () => {
  const sessions = [fixture(1, 10), fixture(2, 30), fixture(3, 120, "con_ayuda"), fixture(4, null, "abandono")];
  sessions[3].journeys[0].technicalFailure = true;
  sessions[2].journeys[0].purposeConfused = true;
  const row = summarize(sessions)[0];
  assert.equal(row.medianFirst, 20);
  assert.equal(row.medianSecond, 30);
  assert.equal(row.maximumFirst, 30);
  assert.equal(row.unassisted, 2);
  assert.equal(row.assisted, 1);
  assert.equal(row.abandoned, 1);
  assert.equal(row.failed, 1);
  assert.equal(row.confused, 1);
});

test("completar cinco sesiones no declara automáticamente éxito de uso", () => {
  const result = report([1, 2, 3, 4, 5].map((number) => fixture(number, null, "abandono")));
  assert.match(result, /Grupo mínimo de cinco cubierto/);
  assert.match(result, /Decisión pendiente/);
  assert.match(result, /Dolor torácico \| 0\/5 \| 0 \| 5/);
});
