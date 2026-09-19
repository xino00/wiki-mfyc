# Prueba de uso de la guía

Estado: protocolo preparado; **no se han realizado sesiones ni recogido resultados**. Este documento mide consulta y navegación, no valida las decisiones médicas de las fichas.

## Participantes y preparación

Invitar a cinco residentes de MFyC que no hayan diseñado la guía. Buscar variedad de experiencia y de familiaridad con la guía. Usar situaciones ficticias y no introducir datos de pacientes. Registrar el dispositivo y la familiaridad previa sin identificar a la persona en las notas.

Cada participante hará los seis recorridos. Rotar el orden para reducir el aprendizaje: la persona 1 empieza por el recorrido 1, la persona 2 por el 2, y así sucesivamente. Comenzar cada recorrido en la portada. Pedir que expliquen qué esperan encontrar, sin enseñarles nombres de botones ni consultas. El observador no ayuda hasta que se declare bloqueo o pasen dos minutos; cualquier ayuda se registra.

## Seis recorridos

| Recorrido | Consigna para el participante | Final verificable por el observador |
| --- | --- | --- |
| 1. Dolor torácico | «Busca dónde consultar la actuación de los primeros minutos ante dolor torácico y después dónde ampliar el ECG si sospechas un síndrome coronario.» | `urgencias/dolor-toracico.html#primeros-minutos`, seguido de `cardio/sindrome-coronario-agudo.html#ecg`. |
| 2. Diabetes | «Tienes una revisión de una persona con DM2. Encuentra el apartado para revisar su tratamiento.» | `endocrino/diabetes-mellitus-tipo-2.html#revision`. |
| 3. Mareo | «Localiza la entrada para un mareo en urgencias. Después encuentra la exploración neurológica ampliada.» | `urgencias/mareo-y-vertigo.html#alarma`, seguido de `neuro/mareo-y-vertigo.html#exploracion`; distingue el propósito de ambas páginas. |
| 4. Antibióticos | «Quieres comparar el espectro de los betalactámicos y localizar la ficha de un fármaco.» | Matriz `#matriz-cobertura` y buscador `#farmacos-espectro` de la ficha de betalactámicos. Registrar si distingue la leyenda de la matriz. |
| 5. Piel | «Necesitas redactar la descripción de una lesión cutánea. Encuentra la ayuda para escribirla y para comparar lesiones elementales.» | `dermatologia/exploracion-lesiones-elementales.html#frase` y `#lesiones`. |
| 6. Boxes | «Prepara una nota inicial de boxes con la plantilla de la guía. Copia el modelo para adaptarlo en un documento vacío.» | `guardias/boxes-urgencias.html#valoracion`; copia del texto de `plantilla-valoracion`, con comprensión de que debe completarlo. |

## Qué registrar

Una fila por participante y recorrido: dispositivo, consulta escrita, primer destino elegido, tiempo hasta encontrar el apartado correcto, desvíos, petición de ayuda, éxito sin ayuda/éxito con ayuda/abandono, y comentario literal de la persona. En la copia, comprobar que el texto pegado coincide con el modelo y que no incluye botones o navegación.

El tiempo empieza al terminar de leer la consigna y termina cuando la persona señala el apartado esperado. En recorridos con dos destinos, registrar un tiempo para cada uno. No medir el tiempo de interpretar o aplicar una recomendación médica. Marcar el motivo del desvío: término no reconocido, resultados ambiguos, contexto confuso, ancla oculta, lectura extensa o fallo técnico.

## Criterios propuestos para decidir la siguiente iteración

- Al menos cuatro de cinco participantes completan cada recorrido sin ayuda.
- Ninguna persona confunde una plantilla documental con una pauta terapéutica.
- Copia, anclas, apertura y cierre del buscador funcionan en todos los dispositivos de las sesiones.
- Como objetivo inicial a revisar con las primeras sesiones: llegar al primer apartado en menos de 30 segundos de mediana por recorrido. Informar también el mayor tiempo y los abandonos; la mediana sola puede ocultarlos.

Con cinco personas, informar recuentos y problemas observados, sin extrapolar porcentajes a todos los residentes. Priorizar para la siguiente iteración los bloqueos repetidos y cualquier confusión de propósito. Las pruebas automáticas de `check:search` complementan estas sesiones, pero no las sustituyen.

## Resultados

Pendientes de realizar las cinco sesiones. No hay tiempos, citas de participantes ni tasas de éxito disponibles.

## Registro y cálculo

Desde `docs/`, crear una ficha por participante en una carpeta privada ya existente, fuera de este checkout:

```bash
node tools/user_study.js --template > /ruta/privada/sesiones/P01.json
node tools/user_study.js --report /ruta/privada/sesiones > /ruta/privada/resultados.md
```

Usar códigos `P01` a `P05`; no nombres ni datos de pacientes. Completar fecha, dispositivo y familiaridad. En cada recorrido registrar `outcome` como `sin_ayuda`, `con_ayuda` o `abandono`; los dos tiempos se cuentan desde el mismo inicio. `secondsToSecondSection` permanece `null` en Diabetes y Boxes. En abandonos, un destino no alcanzado queda en `null`, nunca en cero. Registrar `purposeConfused` y `technicalFailure` como `true` o `false` según lo observado; describir los desvíos, ayuda, problemas de copia y comentarios en `notes`.

La herramienta exige los seis recorridos por persona y rechaza participantes duplicados. Calcula las medianas solo con éxitos sin ayuda, junto a máximo, abandonos, ayudas, confusiones y fallos. Un grupo de cinco completo no declara automáticamente que la guía haya superado los criterios. Los registros vacíos se rechazan y los datos sintéticos de las pruebas no se guardan como resultados.
