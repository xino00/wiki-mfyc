# Mantenimiento de la guía

Este procedimiento se aplica a todas las páginas publicadas. El contenido de cada guía se escribe en su HTML; catálogo, registro y herramientas no generan recomendaciones clínicas.

## Responsabilidades

| Función | Trabajo y evidencia de cierre |
| --- | --- |
| Responsable de contenido por módulo | Identificar el documento autorizado y su edición para cada modificación clínica; comprobar tablas, cifras y dosis una a una contra el original. Registrar nombre, fecha y evidencia de la revisión efectivamente realizada. |
| Responsable técnico | Mantener navegación, accesibilidad, búsqueda y publicación; ejecutar las comprobaciones completas y revisar el resultado visual cuando cambie la interfaz. |
| Responsable de plantillas | Revisar los campos documentales y su copia en el circuito de trabajo. Mantener Guardias como ayuda para escribir y organizarse. |
| Coordinación de uso | Organizar las cinco sesiones, registrar observaciones y ordenar las mejoras a partir de los bloqueos encontrados. |

Los nombres todavía no están asignados. `owner: null` en `editorial-register.json` indica ese pendiente; no usar nombres inferidos del historial Git ni declarar revisiones por haber pasado pruebas técnicas. La presencia de bibliografía en una página identifica una referencia observada, no acredita una revisión nueva de su original.

## Una corrección desde la página

«Sugerir una corrección» prepara una incidencia con el título, la URL y el apartado consultado. El visitante puede describir el problema, proponer el cambio e indicar una fuente; decide si envía el borrador. Revisar primero la reproducibilidad del problema y el documento autorizado cuando afecte al contenido clínico.

Un enlace roto, una ancla oculta o un fallo de copia se puede corregir como cambio técnico. Una corrección de dosis, criterios, interpretación de tablas o tratamiento necesita revisión del original autorizado y una segunda pasada adversarial de las cifras afectadas. Si falta esa fuente, registrar el pendiente antes de completar la afirmación.

## Cambio de una guía

1. Leer entero el HTML y revisar el estado Git para conservar trabajo previo.
2. Editar a mano solo los apartados necesarios. Conservar IDs usados en enlaces; si una ruta cambia, actualizar todas sus referencias.
3. Mantener la cabecera breve, `task-nav` con tareas específicas, apartados con IDs y `related-guides` con al menos dos destinos pertinentes. Los índices de módulo deben incluir la nueva guía.
4. Actualizar `guide-catalog.js`: una entrada por artículo, alias precisos, tareas con anclas reales y relaciones válidas. Las tres primeras tareas aparecen en cada resultado de búsqueda; poner primero las más útiles. No añadir allí recomendaciones clínicas.
5. Actualizar el registro editorial solo con evidencia observada o revisiones realizadas. Para declarar `revisada`, completar `owner`, `lastClinicalReview` y `reviewEvidence`; las plantillas usan `no_aplica_plantilla`.
6. Ejecutar `node tools/sync_chrome.js`, `npm run build:search`, `npm run check` y `git diff --check`. Revisar también los archivos nuevos y eliminados del índice generado.
7. Abrir la página modificada en móvil y escritorio. Comprobar el primer apartado, tablas, menú de secciones, enlaces relacionados, modo oscuro e impresión si se ha tocado el formato.

## Publicación y recuperación

La CI comprueba cada push y pull request. Preparar un cambio revisable con propósito, módulos, comprobaciones y capturas cuando haya cambios visuales. Publicar la raíz de este repositorio con el mecanismo de GitHub Pages ya configurado; no subir fuentes privadas ni registros de participantes.

Después de publicar, abrir la URL pública y probar una búsqueda y el apartado modificado: una comprobación local no verifica la versión desplegada. Si hay una regresión, revertir el commit que la introdujo mediante un nuevo commit y volver a comprobar; conservar el historial y evitar borrar trabajo de otros.

## Pendientes humanos

- Asignar responsables nominales de los módulos y de las plantillas.
- Realizar las cinco sesiones descritas en `pilot-user-study.md` e incorporar sus observaciones reales.
- Registrar futuras revisiones clínicas con fuentes autorizadas, responsable y fecha.

La implementación y las pruebas de navegación pueden cerrarse antes de esos pasos. No presentarlos como realizados por disponer de un protocolo, un registro o datos sintéticos.
