"use strict";

const fs = require("node:fs");
const path = require("node:path");

// Las páginas retiradas declaran un destino local; no son artículos del catálogo.
function guideRedirect(html) {
  return html.match(/<meta name="guide-redirect" content="([^"]+)">/i)?.[1] || null;
}

// Catálogos y configuración usan rutas HTML relativas a la raíz pública.
function checkHtmlTarget(root, href, label) {
  if (typeof href !== "string" || !/^[^/?#][^?#]*\.html(?:#[^?#]+)?$/.test(href) || href.includes(":")) {
    throw new Error(`${label}: ruta HTML relativa inválida: ${href}`);
  }
  const [route, hash = ""] = href.split("#");
  let target;
  let id;
  try {
    target = path.resolve(root, decodeURIComponent(route));
    id = decodeURIComponent(hash);
  } catch (_) {
    throw new Error(`${label}: URL mal codificada: ${href}`);
  }
  if (!target.startsWith(`${root}${path.sep}`)) throw new Error(`${label}: sale de la raíz pública: ${href}`);
  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) throw new Error(`${label}: no existe ${href}`);
  const html = fs.readFileSync(target, "utf8");
  if (id && ![...html.matchAll(/\bid=["']([^"']+)["']/g)].some((match) => match[1] === id)) {
    throw new Error(`${label}: ancla inexistente: ${href}`);
  }
  return { target, id, html };
}

module.exports = { checkHtmlTarget, guideRedirect };
