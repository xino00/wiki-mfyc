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

## Evolución full stack

La nueva aplicación Next.js mantiene la consulta anónima, incorpora búsqueda PostgreSQL y reserva la autenticación para `/editor` y `/api/editor`. El alcance inicial incluye panel editorial, búsqueda avanzada y el modelo para favoritos/notas; estos dos últimos se activarán en la interfaz cuando haya una necesidad clínica validada.

### Puesta en marcha

```bash
cp .env.example .env
npm install
docker compose up -d db
npm run db:migrate
npm run db:seed
npm run dev
```

`npm run legacy:sync` copia de forma controlada los módulos HTML a `public/`, conservando URLs como `/cardio/index.html`. Los originales siguen siendo la fuente durante la migración. El contenido nuevo se valida con `npm run content:validate` y debe guardarse como MDX versionado o como `ContentRevision`, nunca como un único HTML mutable.

### Seguridad y publicación

Los endpoints editoriales exigen una cookie HTTP-only firmada. Los roles `EDITOR`, `REVIEWER` y `ADMIN` aplican el flujo `DRAFT → REVIEW → PUBLISHED → RETIRED`; únicamente revisores y administradores publican o retiran. La publicación archiva la versión pública previa dentro de una transacción y registra el cambio en `AuditEvent`.

### Operación en producción

Desplegar la imagen en un proveedor con runtime persistente y PostgreSQL administrado (por ejemplo, Render, Fly.io o Railway). Antes de habilitar cuentas editoriales:

1. activar backups diarios y recuperación a un punto en el tiempo, con retención mínima de 30 días;
2. ejecutar trimestralmente una restauración en un entorno aislado y documentar RPO/RTO;
3. centralizar logs de aplicación y auditoría, sin contraseñas ni contenido de sesiones;
4. monitorizar disponibilidad, latencia, errores 5xx, conexiones y espacio de PostgreSQL;
5. alertar al equipo de guardia y disponer de rollback de imagen y base de datos;
6. rotar `AUTH_SECRET`, usar TLS y limitar el acceso administrativo del proveedor.

La CI valida contenido, permisos del flujo, compatibilidad de URLs, tipos y build. Las migraciones se aplican antes de arrancar el servidor y nunca se ejecutan destructivamente sin backup verificado.
