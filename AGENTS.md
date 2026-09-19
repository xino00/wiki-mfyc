# Repository Guidelines

## Límite del repositorio

Este directorio es el checkout Git real y la raíz pública de GitHub Pages. Todo lo necesario para validar o mantener el sitio debe estar versionado aquí.

- Los HTML públicos viven en la raíz y en carpetas de módulo como `infecciosas/` o `urgencias/`.
- `tools/`, `.github/`, `site.config.json`, `package.json` y este archivo forman parte del repositorio.
- Las fuentes clínicas privadas/locales quedan fuera de este checkout. La CI no debe intentar inferir cobertura clínica a partir de nombres de archivo.

## Producto

- El título es **Guía de supervivencia para el residente de MFyC**. No renombrarlo como «Manual».
- El sitio es una guía práctica de apuntes clínicos, no un panel público de auditoría editorial.
- No mostrar insignias públicas de fuente o revisión.
- Consolidar notas relacionadas cuando mejore la consulta; no crear una página pública por nota de forma automática.
- Los artículos clínicos se escriben a mano en su HTML final. No crear generadores de contenido clínico.
- Una herramienta puede validar índices/enlaces o sincronizar bloques compartidos, pero nunca escribir el cuerpo clínico.
- Las páginas de Guardias son plantillas y checklists de trabajo, no autorización para publicar protocolos clínicos incrustados.

## Fuentes clínicas

- Usar únicamente fuentes autorizadas por el usuario.
- No completar afirmaciones por inferencia cuando falta una fuente autorizada.
- La cobertura y exactitud clínicas requieren revisión humana; no se consideran demostradas por recuentos de palabras, clases CSS o coincidencias de términos.
- Si se añade trazabilidad fuente→página, debe ser una relación explícita y revisable, nunca una heurística global.

## Estructura y edición

- `app.js`: comportamiento compartido y filtros locales.
- `styles.css`: sistema visual compartido; evitar estilos inline.
- `site.config.json`: nombre, URL y navegación canónica.
- `guide-catalog.js`: metadatos de todas las fichas y sus tareas para orientar el buscador y los checks. Debe cubrir exactamente los artículos publicados. La portada es HTML escrito a mano con enlaces validados; no se genera desde el catálogo. Nunca alojar aquí contenido clínico.
- `tools/editorial-register.json`: referencias observadas en el HTML y responsables/revisión pendientes; no inferir fuentes ni verificaciones.
- `tools/sync_chrome.js`: única fuente de la cabecera y metadatos sociales compartidos.
- `tools/check_wiki.js`: estructura y enlaces locales objetivamente comprobables.
- `tools/check_search.js`: prueba de filtros y Pagefind en Chromium real.
- `tools/build_search.js`: regeneración limpia y transaccional de `pagefind/`.
- `pagefind/`: salida generada y versionada; no editar a mano.

Antes de editar un archivo, leerlo entero. Para páginas clínicas, preservar el contenido existente salvo petición explícita.

## Comandos

```bash
npm ci
npx playwright install --only-shell chromium
npm run check
npm run build:search
git status --short --untracked-files=all -- pagefind
```

Comprobaciones individuales:

```bash
npm run check:syntax
npm run check:site
npm run check:catalog
npm run check:chrome
npm run check:build
npm run check:pagefind
npm run check:study
npm run check:search
```

Después de añadir, eliminar, renombrar o modificar una página pública, regenerar Pagefind y revisar el diff. Antes de dar una tarea por terminada, ejecutar `npm run check` y `git diff --check`.

La generación usa la API de Pagefind con rutas ordenadas. `pagefind/integrity.json` es generado y verifica hashes de fuentes y artefactos; no editarlo a mano. Revisar también los archivos nuevos de `pagefind/`, que `git diff` no muestra.

Al cambiar una ficha, mantener sus tareas/anclas y relaciones en `guide-catalog.js` y ejecutar `check:catalog`. Cada artículo usa `guide-page`, navegación por tareas y guías relacionadas. Los seis recorridos automáticos y las comprobaciones de toda la biblioteca no sustituyen las cinco sesiones propuestas en `tools/pilot-user-study.md` ni permiten inventar resultados de usabilidad. Los registros reales de `tools/user_study.js` se guardan fuera del checkout público; sus fixtures de prueba no cuentan como participantes. Seguir `tools/maintenance.md` para mantenimiento y revisión.

## Convenciones

- HTML semántico y accesible: un `<h1>`, jerarquía clara, etiquetas y navegación significativa.
- Nombres públicos en kebab-case, por ejemplo `tuberculosis-tb.html`.
- Sin dependencias en tiempo de ejecución para el visitante; las dependencias npm son solo de desarrollo y validación.
- Los bloques generados se delimitan con `shared-header:start/end` y `shared-meta:start/end`.
- Si falta una página o un bloque compartido, la validación debe fallar; nunca crear placeholders.

## Pull requests

Incluir propósito, módulos afectados, comandos ejecutados y capturas cuando haya cambios visuales. Usar mensajes de commit breves e imperativos.
