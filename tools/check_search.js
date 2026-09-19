#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { chromium } = require("playwright");
const catalog = require("../guide-catalog");

const root = path.resolve(__dirname, "..");
const deploymentPath = "/wiki-mfyc/";
const skippedDirectories = new Set([".git", ".github", "node_modules", "pagefind"]);
const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".wasm", "application/wasm"],
]);

function walkHtml(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && skippedDirectories.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkHtml(full);
    return entry.isFile() && entry.name.endsWith(".html") ? [full] : [];
  });
}

function createServer() {
  return http.createServer((request, response) => {
    try {
      const requestedPath = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
      const pathname = requestedPath.startsWith(deploymentPath)
        ? `/${requestedPath.slice(deploymentPath.length)}`
        : requestedPath;
      let file = path.resolve(root, `.${pathname}`);
      if (file !== root && !file.startsWith(`${root}${path.sep}`)) {
        response.writeHead(403).end("Forbidden");
        return;
      }
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
      if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
        response.writeHead(404).end("Not found");
        return;
      }
      response.writeHead(200, {
        "Content-Type": mimeTypes.get(path.extname(file)) || "application/octet-stream",
        "Cache-Control": "no-store",
      });
      fs.createReadStream(file).pipe(response);
    } catch (error) {
      response.writeHead(500).end(error.message);
    }
  });
}

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve(`http://127.0.0.1:${address.port}/`);
    });
  });
}

function close(server) {
  return new Promise((resolve) => server.close(resolve));
}

async function visibleCount(locator) {
  return locator.evaluateAll((elements) => elements.filter((element) => {
    return !element.hidden && getComputedStyle(element).display !== "none";
  }).length);
}

async function checkFilterController(page, controller, pageName, index) {
  const label = `${pageName} filtro ${index + 1}`;
  const input = controller.locator("[data-filter-input]");
  assert.equal(await input.count(), 1, `${label}: debe haber exactamente un input`);

  const targetSelector = await controller.getAttribute("data-filter-target");
  const emptySelector = await controller.getAttribute("data-empty-target");
  assert.ok(targetSelector, `${label}: falta data-filter-target`);
  assert.ok(emptySelector, `${label}: falta data-empty-target`);

  const targets = page.locator(targetSelector);
  const total = await targets.count();
  assert.ok(total > 0, `${label}: el selector no encuentra elementos`);
  assert.equal(await visibleCount(targets), total, `${label}: el estado inicial debe mostrar todo`);

  const heading = targets.first().locator("h3").first();
  const targetText = ((await heading.count()) ? await heading.textContent() : await targets.first().textContent()).trim();
  const query = targetText.split(/\s+/)[0];
  assert.ok(query, `${label}: no se pudo obtener una consulta real`);
  await input.fill(query);
  const matched = await visibleCount(targets);
  assert.ok(matched >= 1, `${label}: una consulta real no devuelve resultados`);
  if (total > 1) assert.ok(matched < total, `${label}: una consulta específica no filtra nada`);

  await input.fill("__busqueda_sin_resultados_zzzz__");
  assert.equal(await visibleCount(targets), 0, `${label}: una consulta imposible deja resultados visibles`);
  await page.locator(emptySelector).waitFor({ state: "visible" });
  assert.equal(await visibleCount(page.locator("[data-filter-group]")), 0, `${label}: el filtro deja grupos vacíos visibles`);

  const counter = controller.locator("[data-filter-results], [data-result-count]");
  if (await counter.count()) {
    assert.match(await counter.first().textContent(), new RegExp(`^0 de ${total} `), `${label}: contador incorrecto`);
  }

  await input.fill("");
  assert.equal(await visibleCount(targets), total, `${label}: limpiar no restaura todos los resultados`);

  const buttons = controller.locator("[data-filter-button]");
  if (await buttons.count() > 1) {
    await buttons.nth(1).click();
    assert.equal(await buttons.nth(1).getAttribute("aria-pressed"), "true", `${label}: el filtro no se activa`);
    await buttons.first().click();
  }
}

async function searchFor(page, query) {
  const input = page.locator("[data-global-query]");
  await input.waitFor({ state: "visible", timeout: 15000 });
  await input.fill(query);
  await input.press("Enter");
  await page.locator("[data-search-results] .search-result-link").first().waitFor({ state: "visible", timeout: 15000 });
  await page.waitForFunction(() => /^\d+ resultados?/.test(document.querySelector("[data-search-status]").textContent));
}

function resultLink(page, href) {
  return page.locator(`[data-search-results] a.search-result-link[href$="/${href}"]`);
}

async function checkPilotJourneys(page, baseUrl) {
  const journeys = [
    { query: "dolor torácico", href: "urgencias/dolor-toracico.html", anchor: "primeros-minutos" },
    { query: "DM2", href: "endocrino/diabetes-mellitus-tipo-2.html", anchor: "revision" },
    { query: "vértigo", href: "urgencias/mareo-y-vertigo.html", anchor: "alarma" },
    { query: "betalactámicos", href: "infecciosas/proa-betalactamicos-cefalosporinas-y-carbapenemicos.html", anchor: "matriz-cobertura" },
    { query: "lesiones elementales", href: "dermatologia/exploracion-lesiones-elementales.html", anchor: "frase" },
    { query: "plantilla boxes", href: "guardias/boxes-urgencias.html", anchor: "valoracion" },
  ];
  for (const journey of journeys) {
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    const input = page.locator("[data-global-search-input]");
    await input.fill(journey.query);
    await input.press("Enter");
    const result = resultLink(page, journey.href);
    await result.waitFor({ state: "visible", timeout: 15000 });
    const resultPaths = await page.locator("a.search-result-link").evaluateAll((links) => links.map((link) => new URL(link.href).pathname));
    assert.ok(resultPaths.every((route) => !route.endsWith("/") && !route.endsWith("/index.html")), `${journey.query}: aparecen índices entre las fichas`);
    assert.equal(new Set(resultPaths).size, resultPaths.length, `${journey.query}: una ficha aparece duplicada`);
    if (journey.query === "vértigo") {
      const expanded = resultLink(page, "neuro/mareo-y-vertigo.html");
      await expanded.waitFor({ state: "visible" });
      assert.match(await result.locator("..").textContent(), /Valoración inicial/);
      assert.match(await expanded.locator("..").textContent(), /Exploración/);
    }
    const task = result.locator("..").locator(`.search-result-tasks a[href$="#${journey.anchor}"]`);
    await task.click();
    await page.waitForURL(new URL(`${journey.href}#${journey.anchor}`, baseUrl).href);
    await page.locator(`[id="${journey.anchor}"]`).waitFor({ state: "visible" });

    if (journey.query === "dolor torácico" || journey.query === "vértigo") {
      const destination = journey.query === "dolor torácico"
        ? "cardio/sindrome-coronario-agudo.html"
        : "neuro/mareo-y-vertigo.html";
      await page.locator(`.guide-scope-link a[href$="${destination}"]`).click();
      await page.waitForURL(new URL(destination, baseUrl).href);
      const anchor = journey.query === "dolor torácico" ? "ecg" : "exploracion";
      await page.locator(`.task-nav a[href="#${anchor}"]`).click();
      await page.waitForURL(new URL(`${destination}#${anchor}`, baseUrl).href);
    }
  }
}

async function checkTemplateCopy(page, baseUrl) {
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"], { origin: new URL(baseUrl).origin });
  let copied = 0;
  for (const guide of catalog.filter(({ kind }) => kind === "Plantilla")) {
    await page.goto(new URL(guide.href, baseUrl).href, { waitUntil: "domcontentloaded" });
    const buttons = page.locator("[data-copy-target]");
    assert.equal(await buttons.count(), await page.locator(".article-content pre").count(), `${guide.href}: hay plantillas sin copia`);
    for (const button of await buttons.all()) {
      const id = await button.getAttribute("data-copy-target");
      const expected = await page.locator(`[id="${id}"]`).textContent();
      await button.click();
      await page.waitForFunction((target) => {
        const control = document.querySelector(`[data-copy-target="${target}"]`);
        return control.parentElement.querySelector("[data-copy-status]").textContent === "Plantilla copiada.";
      }, id);
      assert.equal(await page.evaluate(() => navigator.clipboard.readText()), expected, `${id}: el portapapeles no coincide con la plantilla`);
      copied += 1;
    }
  }
  assert.equal(copied, 27, "Guardias debe conservar sus 27 plantillas copiables");
  await page.goto(new URL("guardias/boxes-urgencias.html", baseUrl).href, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => {
    Object.defineProperty(navigator.clipboard, "writeText", { configurable: true, value: async () => { throw new Error("Permiso denegado para la prueba"); } });
  });
  await page.locator("[data-copy-target]").first().click();
  await page.waitForFunction(() => document.querySelector("[data-copy-status]").textContent.includes("Texto seleccionado"));
  assert.equal(await page.evaluate(() => window.getSelection().toString()), await page.locator("#plantilla-valoracion").textContent(),
    "La copia denegada no deja seleccionado el texto de la plantilla");
}

async function checkCollapsedAnchor(page, baseUrl) {
  await page.goto(new URL("infecciosas/proa-betalactamicos-cefalosporinas-y-carbapenemicos.html", baseUrl).href, { waitUntil: "domcontentloaded" });
  // Usar una ancla real dentro de dos details temporales prueba futuras secciones plegadas sin modificar el HTML publicado.
  await page.evaluate(() => {
    const target = document.getElementById("matriz-cobertura");
    const outer = document.createElement("details");
    const inner = document.createElement("details");
    outer.id = "fixture-outer";
    inner.id = "fixture-inner";
    outer.innerHTML = "<summary>Referencia</summary>";
    inner.innerHTML = "<summary>Matriz</summary>";
    target.before(outer);
    outer.append(inner);
    inner.append(target);
  });
  await page.locator('.task-nav a[href="#matriz-cobertura"]').click();
  await page.waitForFunction(() => document.querySelector("#fixture-outer").open && document.querySelector("#fixture-inner").open);
  await page.locator("#matriz-cobertura").waitFor({ state: "visible" });
}

async function checkSamePageSearchTask(page, baseUrl) {
  const href = "infecciosas/proa-betalactamicos-cefalosporinas-y-carbapenemicos.html";
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto(new URL(href, baseUrl).href, { waitUntil: "domcontentloaded" });
  // La segunda apertura ya parte del mismo fragmento: no se dispara hashchange otra vez.
  for (let attempt = 0; attempt < 2; attempt += 1) {
    await page.locator(".site-bar [data-search-open]").click();
    await searchFor(page, "betalactámicos");
    await resultLink(page, href).locator("..").getByRole("link", { name: "Comparar espectro", exact: true }).click();
    await page.locator("dialog.search-modal").waitFor({ state: "hidden" });
    await page.waitForURL(new URL(`${href}#matriz-cobertura`, baseUrl).href);
    await settleFrames(page);
    const position = await page.locator("#matriz-cobertura").boundingBox();
    const header = await page.locator(".site-bar").boundingBox();
    assert.ok(position && header && position.y >= header.y + header.height - 1 && position.y < 720,
      `Tarea en la misma página (${attempt + 1}): el ancla no queda visible debajo de la cabecera`);
  }
}

async function checkWholeWordPromotion(page, baseUrl) {
  let release;
  const held = new Promise((resolve) => { release = resolve; });
  const delay = async (route) => {
    await held;
    await route.continue();
  };
  await page.route("**/*.pf_fragment", delay);
  try {
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.locator("[data-global-search-input]").fill("SCA");
    const fragmentRequested = page.waitForRequest("**/*.pf_fragment");
    await page.locator("[data-global-search-input]").press("Enter");
    await fragmentRequested;
    // Mientras llegan los fragmentos solo están presentes las promociones del catálogo.
    await resultLink(page, "cardio/sindrome-coronario-agudo.html").waitFor({ state: "visible" });
    assert.equal(await resultLink(page, "infecciosas/proa-betalactamicos-cefalosporinas-y-carbapenemicos.html").count(), 0,
      "SCA promociona Betalactámicos por la subcadena de buscar");
    release();
    await page.waitForFunction(() => /^\d+ resultados?/.test(document.querySelector("[data-search-status]").textContent));
  } finally {
    release();
    await page.unroute("**/*.pf_fragment", delay);
  }
}

async function checkFragmentRecovery(page, baseUrl) {
  let failedPath;
  let attempts = 0;
  const failOnce = async (route) => {
    const requestPath = new URL(route.request().url()).pathname;
    if (!failedPath) {
      failedPath = requestPath;
      attempts += 1;
      await route.abort("failed");
    } else {
      if (requestPath === failedPath) attempts += 1;
      await route.continue();
    }
  };
  await page.route("**/*.pf_fragment", failOnce);
  try {
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.locator("[data-global-search-input]").fill("sepsis");
    await page.locator("[data-global-search-input]").press("Enter");
    await page.locator("[data-search-retry]").waitFor({ state: "visible" });
    await page.keyboard.press("Escape");
    await page.locator(".site-bar [data-search-open]").click();
    assert.equal(await page.locator("[data-global-query]").inputValue(), "sepsis", "Reabrir pierde la consulta fallida");
    await page.waitForFunction(() => /^\d+ resultados?/.test(document.querySelector("[data-search-status]").textContent));
    assert.ok(attempts >= 2, "Reabrir conserva la promesa rechazada del fragmento sin volver a descargarlo");
    assert.ok(!(await page.locator("[data-search-retry]").isVisible()), "Reabrir después de recuperar el fragmento mantiene el error");
    assert.ok(await page.locator("a.search-result-link").count() > 0, "La búsqueda recuperada no muestra fichas");
  } finally {
    await page.unroute("**/*.pf_fragment", failOnce);
  }
}

async function settleFrames(page) {
  await page.evaluate(() => new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  }));
}

async function checkModalAccess(page, baseUrl, viewport) {
  const label = `Buscador ${viewport.width}×${viewport.height}`;
  await page.setViewportSize(viewport);
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  const opener = page.locator(".site-bar [data-search-open]");
  await opener.click();
  await searchFor(page, "sepsis");

  if (viewport.width > 600) {
    const before = await page.locator("a.search-result-link").count();
    await page.locator("[data-search-more]").click();
    await page.waitForFunction((count) => document.querySelectorAll("a.search-result-link").length > count, before);
  }

  const panel = page.locator(".search-modal-panel");
  await page.waitForFunction(() => {
    const element = document.querySelector(".search-modal-panel");
    return element.scrollHeight > element.clientHeight + 100;
  });
  const box = await panel.boundingBox();
  assert.ok(box && box.x >= 0 && box.y >= 0 && box.x + box.width <= viewport.width + 1 &&
    box.y + box.height <= viewport.height + 1, `${label}: el panel desborda la pantalla`);
  const backgroundScroll = await page.evaluate(() => window.scrollY);

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.wheel(0, 600);
  await page.waitForFunction(() => document.querySelector(".search-modal-panel").scrollTop > 0);
  assert.equal(await page.evaluate(() => window.scrollY), backgroundScroll, `${label}: la rueda desplaza el fondo`);

  const lastLink = page.locator("[data-search-results] .search-result-link").last();
  await lastLink.scrollIntoViewIfNeeded();
  const lastBox = await lastLink.boundingBox();
  assert.ok(lastBox && lastBox.y >= box.y && lastBox.y + lastBox.height <= box.y + box.height + 1,
    `${label}: no se puede alcanzar el último resultado`);
  await page.mouse.move(2, viewport.height / 2);
  await page.mouse.wheel(0, 600);
  await settleFrames(page);
  assert.equal(await page.evaluate(() => window.scrollY), backgroundScroll, `${label}: el fondo se desplaza fuera del panel`);

  const closeButton = page.locator("[data-search-close]");
  await closeButton.focus();
  const focusStops = await page.locator(".search-modal").evaluate((dialog) => {
    return [...dialog.querySelectorAll("a[href], button, input, select, textarea, [tabindex]")]
      .filter((element) => !element.disabled && element.tabIndex >= 0 && element.getClientRects().length).length;
  });
  for (const key of ["Shift+Tab", "Tab"]) {
    for (let index = 0; index < focusStops + 2; index += 1) {
      await page.keyboard.press(key);
      const focus = await page.locator(".search-modal").evaluate((dialog) => ({
        inside: dialog.contains(document.activeElement),
        active: document.activeElement?.tagName,
      }));
      assert.ok(focus.inside, `${label}: ${key} permite salir del buscador (foco en ${focus.active})`);
    }
  }
  await page.keyboard.press("Escape");
  await page.locator(".search-modal").waitFor({ state: "hidden" });
  assert.ok(await opener.evaluate((element) => element === document.activeElement), `${label}: Esc no devuelve el foco al botón de apertura`);
  assert.equal(await page.evaluate(() => window.scrollY), backgroundScroll, `${label}: cerrar cambia la posición del documento`);
  await page.mouse.move(viewport.width / 2, viewport.height / 2);
  await page.mouse.wheel(0, 300);
  await page.waitForFunction((previous) => window.scrollY > previous, backgroundScroll);
}

async function checkHomeSearch(page, baseUrl) {
  await page.setViewportSize({ width: 1280, height: 720 });
  const pagefindRequests = [];
  const trackRequest = (request) => {
    if (request.url().includes("/pagefind/")) pagefindRequests.push(request.url());
  };
  page.on("request", trackRequest);
  try {
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    const opener = page.getByRole("button", { name: "Buscar en toda la guía", exact: true });
    await page.locator("[data-global-search-input]").fill("dolor torácico");
    await opener.click();
    await page.locator("[data-global-query]").waitFor({ state: "visible" });
    assert.equal(await page.locator("[data-global-query]").inputValue(), "dolor torácico", "La portada no traslada la consulta al buscador");
    const result = page.locator('[data-search-results] a.search-result-link[href$="/urgencias/dolor-toracico.html"]');
    await result.waitFor({ state: "visible", timeout: 15000 });
    const target = new URL(await result.getAttribute("href"), page.url());
    assert.equal(target.href, new URL("urgencias/dolor-toracico.html", baseUrl).href,
      "La búsqueda de portada pierde la ruta de publicación");
    assert.ok(pagefindRequests.length > 0, "La portada no carga el índice Pagefind");
    assert.ok(pagefindRequests.every((url) => url.startsWith(new URL("pagefind/", baseUrl).href)),
      "Los recursos Pagefind no respetan la ruta de publicación");
    await result.click();
    await page.waitForURL(target.href);
    assert.match(await page.locator("h1").textContent(), /dolor torácico/i, "El resultado no abre el artículo de dolor torácico");
  } finally {
    page.off("request", trackRequest);
  }
}

async function checkLoadRecovery(page, baseUrl, recovery) {
  const label = `Recuperación de Pagefind (${recovery})`;
  let attempts = 0;
  const failOnce = async (route) => {
    attempts += 1;
    if (attempts === 1) await route.abort("failed");
    else await route.continue();
  };
  await page.route("**/pagefind/pagefind.js*", failOnce);
  try {
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    const opener = page.locator("[data-search-open]").first();
    await opener.click();
    await page.locator("[data-search-retry]").waitFor({ state: "visible" });
    assert.match(await page.locator("[data-search-status]").textContent(), /cargar|conexi[oó]n|error/i,
      `${label}: el fallo no tiene una explicación visible`);
    if (recovery === "botón") {
      await page.locator("[data-search-retry]").click();
    } else {
      await page.keyboard.press("Escape");
      await opener.click();
    }
    await searchFor(page, "sepsis");
    assert.equal(attempts, 2, `${label}: debe volver a descargar el recurso sin recargar la página`);
    assert.ok(!(await page.locator("[data-search-retry]").isVisible()), `${label}: persiste el estado de error`);
  } finally {
    await page.unroute("**/pagefind/pagefind.js*", failOnce);
  }
}

async function checkCloseDuringLoad(page, baseUrl) {
  let release;
  const held = new Promise((resolve) => { release = resolve; });
  const delay = async (route) => {
    await held;
    await route.continue();
  };
  await page.route("**/pagefind/pagefind.js*", delay);
  try {
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    const opener = page.locator("[data-search-open]").first();
    const requestStarted = page.waitForRequest("**/pagefind/pagefind.js*");
    await opener.click();
    await requestStarted;
    await page.keyboard.press("Escape");
    await page.locator(".search-modal").waitFor({ state: "hidden" });
    // El usuario puede seguir navegando mientras acaba la descarga pendiente.
    const nextControl = page.locator("[data-theme-toggle]");
    await nextControl.focus();
    const downloadFinished = page.waitForResponse("**/pagefind/pagefind.js*");
    release();
    await downloadFinished;
    await settleFrames(page);
    const focus = await nextControl.evaluate((element) => ({
      retained: element === document.activeElement,
      active: document.activeElement?.outerHTML.slice(0, 160),
    }));
    assert.ok(focus.retained, `Una descarga tardía roba el foco después de cerrar el buscador: ${focus.active}`);
    await opener.click();
    await searchFor(page, "sepsis");
  } finally {
    release();
    await page.unroute("**/pagefind/pagefind.js*", delay);
  }
}

async function checkCurrentNavigation(page, baseUrl) {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  const home = page.locator(".site-nav > a").filter({ hasText: /^Inicio$/ });
  assert.equal(await home.getAttribute("aria-current"), "page", "Inicio no se marca en la portada");
  await page.goto(new URL("cardio/index.html", baseUrl).href, { waitUntil: "domcontentloaded" });
  assert.equal(await home.getAttribute("aria-current"), null, "Inicio se marca también en un índice de módulo");
  assert.equal(await page.locator(".nav-more-panel a").filter({ hasText: /^Cardiología$/ }).getAttribute("aria-current"), "page",
    "La biblioteca no marca el módulo actual");
  await page.goto(new URL("index.html#consulta", baseUrl).href, { waitUntil: "domcontentloaded" });
  assert.equal(await home.getAttribute("aria-current"), null, "Inicio también se marca al abrir una sección");
  assert.equal(await page.locator(".site-nav > a").filter({ hasText: /^Consulta$/ }).getAttribute("aria-current"), "location",
    "La navegación no distingue la sección Consulta");
}

async function checkLibrary(page, baseUrl) {
  const routes = walkHtml(root).map((file) => path.relative(root, file).split(path.sep).join("/"));
  const failures = [];
  for (const width of [320, 900, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(new URL(route, baseUrl).href, { waitUntil: "domcontentloaded" });
      const layout = await page.evaluate(() => ({
        width: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        article: Boolean(document.querySelector("article.article")),
      }));
      if (layout.scrollWidth > layout.width + 1) failures.push(`${route} (${width}): desborda ${layout.scrollWidth - layout.width}px`);
      if (!layout.article) continue;
      const outline = page.locator(".page-outline");
      assert.equal(await outline.count(), 1, `${route}: falta el menú de apartados`);
      const task = page.locator(".task-nav a").first();
      await task.click();
      await settleFrames(page);
      const target = page.locator(`[id="${(await task.getAttribute("href")).slice(1)}"]`);
      const position = await target.boundingBox();
      const toolbar = await page.locator(".page-tools").boundingBox();
      const header = await page.locator(".site-bar").boundingBox();
      if (!toolbar || !header || toolbar.y < header.y + header.height) {
        failures.push(`${route} (${width}): la cabecera tapa el menú de apartados`);
      }
      if (!position || !toolbar || position.y < toolbar.y + toolbar.height - 1) {
        failures.push(`${route} (${width}): la barra tapa el primer acceso por tarea`);
      }
      await outline.locator("summary").click();
      const links = outline.locator("nav a");
      assert.ok(await links.count() > 0, `${route}: menú de apartados vacío`);
      await links.first().click();
      assert.equal(await outline.getAttribute("open"), null, `${route}: el índice permanece abierto al elegir apartado`);
    }
    console.log(`Biblioteca: ${routes.length} páginas recorridas a ${width} px.`);
  }
  // Solo se prepara el borrador: se cancela la navegación y no se envía ninguna incidencia.
  const correction = await page.locator("[data-correction-link]").evaluate((link) => {
    link.addEventListener("click", (event) => event.preventDefault(), { once: true });
    link.click();
    return link.href;
  });
  const draft = new URL(correction);
  assert.equal(draft.origin, "https://github.com");
  assert.match(draft.searchParams.get("title"), /^Corrección: /);
  assert.ok(draft.searchParams.get("body").includes(new URL(page.url()).hash), "La corrección pierde el apartado actual");
  assert.deepEqual(failures, [], `Problemas de biblioteca:\n${failures.join("\n")}`);
  console.log(`OK: ${routes.length} páginas sin desbordamiento a 320/900/1440 px; tareas e índice de apartados en ${catalog.length} guías.`);
}

async function checkLocalCatalog(browser) {
  const page = await browser.newPage();
  const errors = [];
  const pagefindRequests = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (request.url().includes("/pagefind/")) pagefindRequests.push(request.url());
  });
  try {
    const home = pathToFileURL(path.join(root, "index.html")).href;
    for (const [query, href] of [
      ["HTA", "cardio/hipertension-arterial.html"],
      ["gota", "hemato-reuma/monoartritis-y-gota.html"],
      ["epistaxis", "trauma-derma-orl/orl-frecuente.html"],
      ["plantilla planta", "guardias/planta.html"],
    ]) {
      await page.goto(home);
      await page.locator(".site-bar [data-search-open]").click();
      await searchFor(page, query);
      const result = resultLink(page, href);
      await result.waitFor({ state: "visible" });
      assert.equal(await page.locator(".search-result-link").first().getAttribute("href"),
        pathToFileURL(path.join(root, href)).href, `${query}: la búsqueda local no prioriza la guía esperada`);
      const task = result.locator("..").locator(".search-result-tasks a").first();
      const destination = await task.getAttribute("href");
      await task.click();
      await page.waitForURL(destination);
      const id = decodeURIComponent(new URL(destination).hash.slice(1));
      await page.locator(`[id="${id}"]`).waitFor({ state: "visible" });
    }
    await page.goto(home);
    await page.locator(".site-bar [data-search-open]").click();
    await searchFor(page, "valorar");
    const initial = await page.locator(".search-result-link").count();
    const more = page.locator("[data-search-more]");
    assert.ok(await more.isVisible(), "La búsqueda local amplia debe permitir acceder a más coincidencias");
    let pages = 0;
    while (await more.isVisible()) {
      assert.ok(++pages <= catalog.length, "La paginación local no termina");
      const before = await page.locator(".search-result-link").count();
      await more.click();
      await page.waitForFunction((count) => document.querySelectorAll(".search-result-link").length > count, before);
    }
    const hrefs = await page.locator(".search-result-link").evaluateAll((links) => links.map((link) => link.href));
    assert.ok(hrefs.length > initial, "Más resultados no amplía la búsqueda local");
    assert.equal(new Set(hrefs).size, hrefs.length, "La búsqueda local duplica guías");
    await page.locator("[data-global-query]").fill("__sin_coincidencias_zzzz__");
    await page.locator("[data-global-query]").press("Enter");
    await page.waitForFunction(() => document.querySelector("[data-search-status]").textContent.startsWith("Sin coincidencias"));
    assert.equal(await page.locator(".search-result-link").count(), 0);
    assert.equal(pagefindRequests.length, 0, "Abrir el HTML directamente no debe intentar cargar Pagefind");
    assert.deepEqual(errors, [], "Errores al abrir la guía como archivo local");
    console.log("OK: búsqueda file:// por alias, acceso a tareas, paginación y consulta sin coincidencias.");
  } finally {
    await page.close();
  }
}

async function main() {
  const searchablePages = walkHtml(root).filter((file) => fs.readFileSync(file, "utf8").includes("data-filter-scope"));
  assert.ok(searchablePages.length, "No hay páginas con filtros locales.");

  const server = createServer();
  const baseUrl = await listen(server);
  let browser;
  let controllerCount = 0;
  const browserErrors = [];

  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    page.setDefaultTimeout(15000);
    page.on("pageerror", (error) => browserErrors.push(error.message));

    for (const file of searchablePages) {
      const pageName = path.relative(root, file).split(path.sep).join("/");
      await page.goto(new URL(pageName, baseUrl).toString(), { waitUntil: "domcontentloaded" });
      const controllers = page.locator("[data-filter-scope]");
      const count = await controllers.count();
      for (let index = 0; index < count; index += 1) {
        await checkFilterController(page, controllers.nth(index), pageName, index);
        controllerCount += 1;
      }
    }

    for (const viewport of [{ width: 1280, height: 720 }, { width: 390, height: 844 }]) {
      await checkModalAccess(page, baseUrl, viewport);
    }
    for (const mountedUrl of [baseUrl, new URL(deploymentPath, baseUrl).href]) {
      await checkHomeSearch(page, mountedUrl);
      await checkCurrentNavigation(page, mountedUrl);
      await checkPilotJourneys(page, mountedUrl);
    }
    for (const recovery of ["botón", "reapertura"]) {
      await checkLoadRecovery(page, baseUrl, recovery);
    }
    await checkCloseDuringLoad(page, baseUrl);
    await checkSamePageSearchTask(page, new URL(deploymentPath, baseUrl).href);
    await checkWholeWordPromotion(page, baseUrl);
    await checkFragmentRecovery(page, baseUrl);
    await checkTemplateCopy(page, new URL(deploymentPath, baseUrl).href);
    await checkCollapsedAnchor(page, new URL(deploymentPath, baseUrl).href);
    await checkLocalCatalog(browser);
    await checkLibrary(page, new URL(deploymentPath, baseUrl).href);
    assert.deepEqual(browserErrors, [], `Errores de página: ${browserErrors.join(" | ")}`);
    console.log(`OK: ${searchablePages.length} páginas, ${controllerCount} filtros locales; seis recorridos en raíz/subruta, 27 copias y copia denegada, anclas plegadas, Pagefind en escritorio/móvil, foco, scroll y recuperación de red probados en Chromium.`);
  } finally {
    if (browser) await browser.close();
    await close(server);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
