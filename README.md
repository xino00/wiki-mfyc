# Guía de supervivencia para el residente de MFyC

Wiki clínica estática pensada para consulta rápida durante la residencia de Medicina Familiar y Comunitaria.

El objetivo es reunir en un único sitio información práctica sobre problemas frecuentes en consulta, urgencias, guardias y planta, con páginas HTML fáciles de leer, tablas, avisos, navegación interna y buscador.

## Para qué sirve

- Repasar abordajes iniciales de problemas clínicos habituales.
- Consultar criterios de alarma, pruebas útiles y tratamientos de primera línea.
- Tener a mano esquemas rápidos durante guardias o rotaciones.
- Navegar por temas clínicos agrupados por módulos.

## Contenido

La wiki está organizada en módulos clínicos:

- Urgencias
- Cardiología
- Infecciosas
- Neurología
- Digestivo
- Nefro-Urología
- Neumología
- Endocrino
- Psiquiatría
- Hematología y Reumatología
- Dermatología
- Trauma, Dermatología y ORL
- Guardias

Cada página resume información práctica y orientada a la toma de decisiones, con un formato pensado para lectura rápida.

## Sitio web

La versión publicada está disponible en:

`https://xino00.github.io/wiki-mfyc/`

Repositorio:

`https://github.com/xino00/wiki-mfyc`

## Estructura del sitio

- `index.html`: página principal
- `app.js`: buscador y comportamiento de la interfaz
- `styles.css`: estilos visuales
- Carpetas como `urgencias/`, `cardio/` o `infecciosas/`: páginas de cada módulo
- `site.config.json`: navegación y metadatos compartidos
- `guide-catalog.js`: títulos, alias, tareas y relaciones de todas las guías; no contiene recomendaciones clínicas
- `tools/`: validación, pruebas y sincronización de bloques comunes
- `.github/workflows/check.yml`: comprobación reproducible en cada push o pull request
- `pagefind/`: índice estático generado del buscador global

## Criterios de edición

- Editar cada guía clínica directamente en el HTML de su módulo.
- Consolidar notas relacionadas en páginas prácticas cuando mejore la consulta.
- Reutilizar `styles.css` y `app.js`; evitar estilos o scripts aislados por página.
- No usar generadores para producir el contenido clínico publicado.
- No interpretar los validadores técnicos como revisión clínica del contenido.

## Validación local

Desde la raíz de este repositorio:

```bash
npm ci
npx playwright install --only-shell chromium
npm run check
```

`npm run check` valida sintaxis, estructura y enlaces, cobertura completa del catálogo, sincronización de cabecera, generación reproducible e integridad de Pagefind, registro de sesiones y comportamiento real de navegación, copia y buscadores en Chromium.

Las pruebas de navegador recorren todas las páginas a 320, 900 y 1440 píxeles, comprueban que la cabecera no oculte el menú de apartados y verifican la copia de las 27 plantillas. También prueban el buscador por HTTP en la raíz y en la subruta de publicación, y la búsqueda local con `file://`.

Después de modificar páginas públicas, regenerar el índice de forma limpia:

```bash
npm run build:search
git diff -- pagefind
git status --short --untracked-files=all -- pagefind
```

`pagefind/` es salida generada: se versiona para GitHub Pages, pero no se edita a mano.

La generación añade los HTML en orden estable mediante la API de Pagefind. `pagefind/integrity.json` registra los hashes de las fuentes y de todos los archivos generados; `npm run check:pagefind` detecta cambios pendientes de indexar, archivos ausentes, alterados o sobrantes. `npm run check:build` prueba el orden de generación y la recuperación de instalaciones interrumpidas en directorios temporales.

## Mantener la guía

`guide-catalog.js` describe las fichas y sus tareas y orienta la prioridad de búsqueda. La portada se escribe a mano en HTML, con enlaces validados; su formulario abre el buscador compartido. Al cambiar una ruta o un ancla, actualizar las tareas del catálogo y ejecutar `npm run check:catalog`; este control comprueba rutas, anclas y relaciones. El HTML de cada ficha conserva el contenido escrito a mano. La cabecera compartida carga el catálogo y se actualiza con `node tools/sync_chrome.js`.

Todas las páginas de contenido usan `guide-page`, accesos por tarea escritos para su tema y guías relacionadas. El menú «En esta página» reúne los apartados reales del artículo y permanece accesible durante la lectura. «Sugerir una corrección» abre un borrador en GitHub con la página y el apartado; enviar la incidencia sigue siendo una acción del visitante. Las cinco páginas de Guardias ofrecen copia individual de sus 27 plantillas, con selección manual si el navegador deniega el portapapeles.

Al abrir `index.html` directamente, la búsqueda funciona con los títulos, alias y tareas del catálogo, sin servidor. La versión servida por HTTP añade las coincidencias dentro del texto con Pagefind. La interfaz indica el alcance de la búsqueda local.

`tools/editorial-register.json` registra únicamente la procedencia que puede observarse en los HTML y el trabajo pendiente de asignar. No representa una revisión clínica nueva. El [procedimiento de mantenimiento](tools/maintenance.md) concreta responsables por función, cambios, comprobaciones y publicación. Ninguno de estos archivos se presenta como panel ni insignia en la guía.

## Evaluación con residentes

[El protocolo de uso](tools/pilot-user-study.md) prepara cinco sesiones con seis recorridos; sus resultados siguen pendientes. `tools/user_study.js` crea un registro vacío y resume sesiones reales, rechazando duplicados, datos incompletos y tiempos incoherentes. Guardar los registros fuera del checkout público:

```bash
node tools/user_study.js --template > /ruta/privada/sesiones/P01.json
node tools/user_study.js --report /ruta/privada/sesiones > /ruta/privada/resultados.md
```

Completar cada JSON con observaciones reales antes de generar el informe. Las pruebas con datos sintéticos de `check:study` validan la herramienta; no cuentan como participantes ni como resultados de uso.
