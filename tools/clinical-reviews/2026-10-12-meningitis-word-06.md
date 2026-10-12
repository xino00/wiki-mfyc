# Cotejo documental de meningitis con Word 0.6

Fecha: 12/10/2026. Página: `infecciosas/meningitis-bacteriana-aguda.html`.
SHA-256 del HTML clínico cotejado:
`c347d517743cd3f35c773b2293411ba8414bd894601373ea69a5765d013ba247`.

Fuente autorizada única: `Meningitis_bacteriana_aguda_0.6.docx`, en
`SNC_infecciosas/entregables`, fuera del checkout público.
SHA-256: `3b61c5dbd98bf7f44169207cec9957047d6f95f20740b358bd5146988751c772`.

Se comprobó integridad ZIP y se leyó el cuerpo final OOXML: 251 párrafos,
8 tablas/201 celdas y 44 comentarios separados del cuerpo. No hay inserciones ni
eliminaciones controladas. Se excluyó el índice automático. Los comentarios se
usaron para detectar problemas, sin aplicar automáticamente sus propuestas.

El coordinador cotejó fuente y HTML; un agente verificador clínico realizó una
segunda pasada adversarial independiente sobre todas las cifras, dosis, unidades,
vías, intervalos, duraciones y celdas. Se revisaron también los escenarios,
condiciones y atribuciones. No quedan divergencias cuantitativas ni hallazgos de
fidelidad pendientes después de corregir dos matices de atribución.

Esta evidencia acredita fidelidad documental al Word, no una revisión clínica
humana, una nueva comprobación de sus originales citados ni su vigencia. No se
consultaron fuentes externas ni se renderizó el Word. Las siete referencias se
conservan como bibliografía del documento, sin atribuirles una nueva validación.
El registro editorial mantiene responsable sin asignar y revisión clínica humana
pendiente.

## Localizadores y correspondencia

`Pxxx` identifica párrafos directos de `w:body`, en orden, incluidos los vacíos;
`Tn Rn Cn` identifica tabla, fila y celda, contando encabezados. Estos localizadores
no son números de página del Word.

| Word | Contenido | HTML | Filas/celdas cotejadas |
| --- | --- | --- | --- |
| T1 | Etiología, riesgos, orientación y Gram | Tabla 1, `#sospecha` | 5/20 |
| T2 | LCR bacteriano y vírico | Tabla 2, `#pruebas-y-lcr` | 5/20 |
| T3 | Rendimiento de las pruebas de LCR | Tabla 3, `#pruebas-y-lcr` | 7/21 |
| T4 | Empírico neuroquirúrgico | Tabla 5, `#tratamiento-empirico` | 4/8 |
| T5 | Dosis diarias y penetración | Tabla 6, `#tratamiento-empirico` | 13/39 |
| T6 | Tratamiento dirigido y duración | Tabla 7, `#tratamiento-dirigido` | 9/27 |
| T7 | Duraciones comparadas | Tabla 8, `#tratamiento-dirigido` | 9/36 |
| T8 | Complicaciones y actuación | Tabla 9, `#complicaciones-e-ingreso` | 10/30 |

Las tablas nuevas son una agrupación escrita a mano del cuerpo:

- Tabla 4: empírico por escenario, P108–P112, P121–P122 y P125–P126.
- Tabla 10: profilaxis meningocócica, P217–P220.

Además de la lectura celda a celda se compararon sus tokens numéricos. Las únicas
diferencias de esa comparación corresponden a la nota de glucorraquia de P090
añadida a la celda, al traslado del rendimiento del lactato de comentario a
rendimiento, y a citas/remisiones retiradas. No hay cambios en las cantidades.
Las 201 celdas originales están representadas en 10 tablas HTML/225 celdas.

## Precauciones conservadas

| Tema y localizador | Tratamiento en la página |
| --- | --- |
| Glucorraquia, T2 R4 y P090 | Perfil habitual &lt;45 mg/dL o &lt;40 % de glucemia simultánea; predictor SEN &lt;45 mg/dL señalado como posible errata junto a la cifra; ESCMID &lt;1,9 mmol/L y Mensa &lt;34,23 mg/dL, aproximadamente 34 mg/dL, diferenciados. |
| Cloxacilina, T5 R7 y P140 | 4–6 g/día cada 4–6 h señalado como dudoso en la propia celda; confirmar con Infecciosas. La dosis de CIMA citada por el Word no se convierte en pauta meníngea. |
| Vancomicina, P113 y T5 R13 | Cifra fija SEN 2–3 g/día cada 6–12 h comparada con pautas por peso y monitorización; no se presenta como dosis universal. AUC, valle, máximos y carga conservan su fuente y escenario. |
| Alergia grave, P119 | Vancomicina 30 mg/kg cada 12 h y rifampicina 15 mg/kg/día, máximo 900 mg/día, con aviso contiguo sobre vías/reparto ausentes y posible exceso del máximo por dosis de otra fuente. No se completa una pauta cerrada. |
| Otras omisiones de administración, P115, P128, P151, P167, P195 y T6 R7 | Vías, intervalo de rifampicina, vía de mantenimiento de levetiracetam y duración de profilaxis ausentes se conservan como tales. La ausencia se atribuye al Word, sin afirmarla sobre originales no inspeccionados. |
| PCR tras antibiótico, P018 y T3 R4 | Se conservan el posible descenso por duración del cuerpo y la afirmación SEN de ausencia de efecto en la tabla. No se aplica la propuesta de reversión del comentario. |
| Cultivo, T3 R2 | Diferencia entre reducción «un 10–20 %» de ESCMID y descenso «a un 10–20 %» de SEN conservada. |
| Gram negativo, P095–P103 | Adulto con pleocitosis; ausencia de los seis datos exactos, sensibilidad 99,6–100 % y consulta antes de omitir/retirar antibióticos. No se convierte en regla confirmatoria. |
| Inmunodepresión, P125–P129 | Pauta ampliada UpToDate, pauta SEN y alternativa Mensa separadas por fuente/intensidad; mantener ampicilina con meropenem según Mensa frente a cobertura inicial de Listeria con meropenem según UpToDate. NICE excluye inmunodeficiencia. |
| Dexametasona, P161–P172 | Regímenes SEN/ESCMID y Mensa, ventanas 4 h y &lt;12/&gt;12 h NICE, mantenimiento por germen y sepsis meningocócica sin meningitis separados. No se infiere conducta exacta a las 12 h ni pauta de prolongación por vasculopatía. |
| Repetición de PL, P181 | No rutina si mejora; Mensa 24–36 h, UpToDate 48 h/2–3 días/fiebre &gt;8 días con sus escenarios. CMI de cefotaxima 1 mg/L sin etiqueta de sensibilidad inferida. |
| HTIC, P184–P187 | mmHg de PIC separados de cm H₂O de apertura de LCR. Manitol y PaCO₂ de Mensa quedan como comparación especializada, con límites de NICE/ESCMID; no se define rescate universal. |
| Crisis, P195 | Profilaxis solo como valoración seleccionada de Mensa frente a no rutina ESCMID; cifras exactas, vía de mantenimiento/duración no completadas. |
| FJD, P114, P153 y P154 | Neumococo ≈29 % ampicilina y ≈12 % cefotaxima con puntos meníngeos; S. aureus 30 % meticilina; H. influenzae ≈9 % ampicilina. Siempre datos locales de informes internos de 2024. |
| Hib, T6 R4 y P154 | SEN propone ampicilina sin precisar sensibilidad. La comprobación del antibiograma se conserva como precaución, sin atribuir esa precisión a SEN. |
| S. aureus/dispositivos, T6 R6 | ≥14 días solo para S. aureus; no extender a S. epidermidis ni inventar duración nosocomial. Se elimina remisión al capítulo pendiente. |
| Ingreso/observación, P201–P209 | Todo paciente con MBA ingresa; observación 4–8 h tras PL ligada al diagnóstico no confirmado y estabilidad, sin convertirla en alta de MBA. |
| Profilaxis, P218–P220 | Dosis/vías/duración y condiciones de embarazo conservadas. El Word deja sin resolver exactamente 16 años; se explicita sin cambiar &gt;16 o &lt;16 por inferencia. |
| Seguimiento, P230–P233 | Audiometría desde que pueda realizarse frente a consulta desde el alta, y revisión de antiepilépticos a los 3 meses; esquemas vacunales recogidos sin actualización silenciosa. |

## Cobertura y cambios editoriales

La guía reúne sospecha/etiología, valoración inicial, TC/seguridad de PL, sangre y
LCR, empírico por riesgos y alergias, dirigido/duración, dexametasona/soporte,
complicaciones/ingreso, contactos/profilaxis y seguimiento. No hay generadores
clínicos ni transcripción automática del cuerpo. Se retiraron remisiones a
capítulos pendientes y la HTIC criptocócica remitida fuera del tema.

La condensación omite algunos detalles narrativos de fisiopatología y el contexto
de H. influenzae en ancianos con enfermedad respiratoria/niños no vacunados de
P031. No se detectó pérdida de una pauta operativa ni de una precaución decisiva.
Las diferencias y ambigüedades documentales permanecen visibles y no se resuelven
por inferencia.

## Verificación técnica

Revisión independiente de integración contra las copias iniciales: solo nueva
tarjeta en Infecciosas, dos accesos en Neurología, entrada de catálogo y relación
recíproca. Contenido y anclas previos conservados. El control de hashes confirma
que el resto del checkout, excepto los artefactos Pagefind regenerados, conserva
su estado inicial; Word y notas Markdown no se modificaron.

Chromium real: 320/900/1440 px, claro y oscuro, sin desbordamiento global; tablas
enfocables y desplazables con teclado, desplegables con Enter, seis accesos por
tarea y diez apartados del índice. «meningitis», «MBA» y «SNC» encuentran y
priorizan la guía en HTTP y file://; Pagefind contiene los tres términos. Se
comprobaron filtros de Infecciosas y acceso desde Neurología, sin errores JavaScript.

El coordinador inspeccionó capturas de escritorio/móvil en ambos temas y las diez
tablas. No se realizó prueba con lector de pantalla ni estudio con usuarios.
Las capturas y scripts temporales quedan fuera del checkout público.

Comprobaciones de cierre ejecutadas y correctas: sincronización de cabecera y
metadatos, `npm run build:search`, `npm run check` y `git diff --check`. La suite
completa pasó tanto en el checkout local como en el checkout aislado basado en
`origin/main`, que conserva los cambios anteriores a esta tarea fuera del commit.
El índice de búsqueda de cada checkout se reconstruyó sobre sus propios HTML.
