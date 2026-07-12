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

## Validación local

Para comprobar la sintaxis del JavaScript principal:

```bash
node --check app.js
```
