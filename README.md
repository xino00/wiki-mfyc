# Guía de supervivencia para el residente de MFyC

Proyecto de wiki clínica estática orientada a la práctica diaria de un residente de Medicina Familiar y Comunitaria.

No es una exportación automática de notas Markdown ni un manual editorial. La idea es convertir apuntes clínicos dispersos en páginas HTML útiles para consulta rápida, con estructura visual clara, tablas, esquemas, alertas, navegación interna y buscadores.

## En qué consiste

La wiki reúne contenido de consulta, urgencias, guardias y planta en módulos clínicos navegables como Cardiología, Infecciosas, Neurología, Digestivo, Nefro-Urología, Neumología, Endocrino, Psiquiatría o Trauma-Derma-ORL.

Cada página publicada en `docs/` está curada a mano en HTML. El objetivo no es transcribir una nota tal cual, sino reorganizarla en una guía práctica:

- qué no puedes perder
- qué prueba cambia la decisión
- qué tratamiento inicial tiene sentido
- cuándo derivar, ingresar o reevaluar

Las notas de `Referencias/10_Patologias/` y `Referencias/30_Urgencias/` actúan como material fuente. `Referencias/50_Guardias/` se usa como biblioteca operativa de plantillas y checklists, no como fuente clínica para el contenido publicado.

## Estructura

- `docs/`: sitio público de GitHub Pages
- `docs/<modulo>/`: páginas clínicas publicadas
- `docs/pagefind/`: índice Pagefind estático versionable
- `Referencias/`: material fuente y notas de trabajo
- `tools/`: sincronización de chrome/metadatos y validadores del sitio; no generan páginas clínicas

## Criterios del proyecto

- HTML curado página a página
- sin scripts Python para generar contenido publicado
- sin factorías de plantillas clínicas
- contenido clínico consolidado por temas, no una página por cada nota
- interfaz pensada para uso real: lectura rápida, tablas, callouts y navegación interna

## Flujo de mantenimiento

1. Editar el HTML clínico directamente en `docs/<modulo>/<pagina>.html`.
2. Ejecutar `node tools/sync_chrome.js` si se añade o renombra una página, o si cambia la cabecera compartida/metadatos.
3. Regenerar búsqueda tras cambios de páginas públicas:

```bash
npx pagefind --site docs
```

4. No editar ni minar `Referencias/50_Guardias/` como fuente clínica; las páginas de guardias son plantillas y checklists operativos.

## GitHub Pages

URL pública:

`https://xino00.github.io/wiki-mfyc/`

Repositorio:

`https://github.com/xino00/wiki-mfyc`

## Validación local

```bash
node --check docs/app.js
node --check tools/check_search.js
node --check tools/check_wiki.js
node tools/check_search.js
node tools/sync_chrome.js --check
node tools/check_wiki.js
```
