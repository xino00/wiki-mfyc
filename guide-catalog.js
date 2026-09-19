// Metadatos de navegación de todas las guías. El contenido clínico vive en cada HTML.
var GUIDE_CATALOG = [
  {
    id: "dolor-toracico",
    title: "Dolor torácico",
    href: "urgencias/dolor-toracico.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["dolor de pecho", "dolor toracico", "torácico", "pecho", "dolor torácico"],
    searchPriority: 30,
    tasks: [
      { label: "Primeros minutos", href: "urgencias/dolor-toracico.html#primeros-minutos" },
      { label: "Cuándo avisar", href: "urgencias/dolor-toracico.html#avisar" },
      { label: "Tratamiento inicial", href: "urgencias/dolor-toracico.html#tratamiento-inicial" },
      { label: "Orientar la causa", href: "urgencias/dolor-toracico.html#seis-letales" },
      { label: "Elegir pruebas", href: "urgencias/dolor-toracico.html#pruebas-escalas" },
      { label: "Antes de cerrar", href: "urgencias/dolor-toracico.html#trampas" }
    ],
    related: ["sindrome-coronario-agudo", "tep-y-tvp", "aorta-valvulas-y-estructural", "plantilla-boxes"]
  },
  {
    id: "sindrome-coronario-agudo",
    title: "Síndrome coronario agudo",
    href: "cardio/sindrome-coronario-agudo.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["SCA", "infarto", "SCACEST", "SCASEST", "ECG", "reperfusión"],
    tasks: [
      { label: "Interpretar ECG", href: "cardio/sindrome-coronario-agudo.html#ecg" },
      { label: "Reperfusión", href: "cardio/sindrome-coronario-agudo.html#reperfusion" },
      { label: "Consultar fármacos", href: "cardio/sindrome-coronario-agudo.html#farmacos" },
      { label: "Valoración inicial", href: "cardio/sindrome-coronario-agudo.html#puerta" },
      { label: "Estratificar SCASEST", href: "cardio/sindrome-coronario-agudo.html#nste" },
      { label: "Preparar el alta", href: "cardio/sindrome-coronario-agudo.html#alta" }
    ],
    related: ["dolor-toracico", "riesgo-cardiovascular-y-dislipemia", "plantilla-boxes"]
  },
  {
    id: "diabetes-tipo-2",
    title: "Diabetes mellitus tipo 2",
    href: "endocrino/diabetes-mellitus-tipo-2.html",
    context: "Consulta",
    kind: "Seguimiento",
    aliases: ["DM2", "diabetes", "revisión diabetes", "control diabetes"],
    tasks: [
      { label: "Primera visita", href: "endocrino/diabetes-mellitus-tipo-2.html#primera-visita" },
      { label: "Revisar tratamiento", href: "endocrino/diabetes-mellitus-tipo-2.html#revision" },
      { label: "Controles de seguimiento", href: "endocrino/diabetes-mellitus-tipo-2.html#seguimiento" },
      { label: "Complicaciones", href: "endocrino/diabetes-mellitus-tipo-2.html#complicaciones" }
    ],
    related: ["crisis-hiperglucemicas", "obesidad-ckm", "riesgo-cardiovascular-y-dislipemia"]
  },
  {
    id: "mareo-urgencias",
    title: "Mareo y vértigo en urgencias",
    href: "urgencias/mareo-y-vertigo.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["mareo", "vértigo", "vertigo", "mareo agudo", "alarmas mareo", "VPPB"],
    searchPriority: 30,
    tasks: [
      { label: "Valorar alarmas", href: "urgencias/mareo-y-vertigo.html#alarma" },
      { label: "Explorar", href: "urgencias/mareo-y-vertigo.html#exploracion" },
      { label: "Decidir destino", href: "urgencias/mareo-y-vertigo.html#destino" },
      { label: "Clasificar el patrón", href: "urgencias/mareo-y-vertigo.html#titrat" },
      { label: "Tratar según patrón", href: "urgencias/mareo-y-vertigo.html#tratamiento" },
      { label: "Consultar fármacos", href: "urgencias/mareo-y-vertigo.html#fármacos" },
      { label: "Antes de cerrar", href: "urgencias/mareo-y-vertigo.html#trampas" }
    ],
    related: ["mareo-consulta", "ictus-y-hemorragia", "plantilla-boxes"]
  },
  {
    id: "mareo-consulta",
    title: "Mareo y vértigo: exploración neurológica",
    href: "neuro/mareo-y-vertigo.html",
    context: "Urgencias",
    kind: "Exploración",
    aliases: ["mareo", "vértigo", "vertigo", "exploración mareo", "HINTS", "nistagmo", "TiTrATE"],
    searchPriority: 20,
    tasks: [
      { label: "Exploración neurológica", href: "neuro/mareo-y-vertigo.html#exploracion" },
      { label: "Interpretar HINTS", href: "neuro/mareo-y-vertigo.html#hints" },
      { label: "Diagnóstico diferencial", href: "neuro/mareo-y-vertigo.html#diferencial" },
      { label: "Valorar centralidad", href: "neuro/mareo-y-vertigo.html#entrada" },
      { label: "Consultar tratamiento", href: "neuro/mareo-y-vertigo.html#tratamiento" },
      { label: "Decidir derivación", href: "neuro/mareo-y-vertigo.html#derivar" }
    ],
    related: ["mareo-urgencias", "ictus-y-hemorragia", "cefaleas"]
  },
  {
    id: "betalactamicos",
    title: "Betalactámicos",
    href: "infecciosas/proa-betalactamicos-cefalosporinas-y-carbapenemicos.html",
    context: "Tratamientos",
    kind: "Referencia",
    aliases: ["betalactamicos", "beta lactámicos", "antibióticos", "espectro", "cobertura", "cefalosporinas", "carbapenémicos", "betalactámicos"],
    searchPriority: 30,
    tasks: [
      { label: "Comparar espectro", href: "infecciosas/proa-betalactamicos-cefalosporinas-y-carbapenemicos.html#matriz-cobertura" },
      { label: "Buscar fármaco", href: "infecciosas/proa-betalactamicos-cefalosporinas-y-carbapenemicos.html#farmacos-espectro" },
      { label: "Buscar patógeno", href: "infecciosas/proa-betalactamicos-cefalosporinas-y-carbapenemicos.html#mapa-bacteriano" },
      { label: "Consultar dosis y ajuste renal", href: "infecciosas/proa-betalactamicos-cefalosporinas-y-carbapenemicos.html#dosis-ajuste-renal" }
    ],
    related: ["proa-guia-de-antimicrobianos-y-sindromes-infecciosos", "perfusion-extendida-continua-de-betalactamicos", "gramnegativos-resistentes-idsa-2024-estudio-interactivo", "proa-otros-antimicrobianos-aminoglucosidos-glucopeptidos-y-miscelanea"]
  },
  {
    id: "exploracion-cutanea",
    title: "Describir lesiones cutáneas",
    href: "dermatologia/exploracion-lesiones-elementales.html",
    context: "Consulta",
    kind: "Exploración",
    aliases: ["lesiones elementales", "piel", "dermatología", "exploración cutánea", "describir lesión", "mácula", "pápula"],
    tasks: [
      { label: "Describir una lesión", href: "dermatologia/exploracion-lesiones-elementales.html#frase" },
      { label: "Comparar lesiones", href: "dermatologia/exploracion-lesiones-elementales.html#lesiones" },
      { label: "Elegir una prueba", href: "dermatologia/exploracion-lesiones-elementales.html#pruebas" },
      { label: "Registrar la evolución", href: "dermatologia/exploracion-lesiones-elementales.html#registro" }
    ],
    related: ["dermatologia-urgente", "lesiones-benignas-queratosis-cancer-cutaneo"]
  },
  {
    id: "plantilla-boxes",
    title: "Plantillas de boxes",
    href: "guardias/boxes-urgencias.html",
    context: "Urgencias",
    kind: "Plantilla",
    aliases: ["plantilla boxes", "nota de urgencias", "evolución", "reevaluación", "informe de alta", "pase de guardia"],
    tasks: [
      { label: "Escribir valoración", href: "guardias/boxes-urgencias.html#valoracion" },
      { label: "Documentar reevaluación", href: "guardias/boxes-urgencias.html#observacion" },
      { label: "Preparar alta", href: "guardias/boxes-urgencias.html#alta" },
      { label: "Preparar el pase", href: "guardias/boxes-urgencias.html#pase" },
      { label: "Escribir una nota breve", href: "guardias/boxes-urgencias.html#policlinica" }
    ],
    related: ["dolor-toracico", "sindrome-coronario-agudo", "hipertension-arterial", "disnea-aguda", "asma", "epoc", "neumonia-y-bronquitis", "shock", "sepsis-y-shock-septico", "must-sindromes", "dolor-abdominal", "hemorragia-digestiva", "patologia-biliar", "itu-pielonefritis-y-prostatitis", "urologia-urgente", "mareo-consulta", "cefaleas", "ictus-y-hemorragia", "planta", "curas-y-exploracion", "pediatria"]
  },
  {
    id: "aorta-valvulas-y-estructural",
    title: "Aorta, válvulas y cardiopatía estructural",
    href: "cardio/aorta-valvulas-y-estructural.html",
    context: "Urgencias",
    kind: "Referencia",
    aliases: ["valvulopatías", "soplo", "estenosis aórtica", "disección aórtica", "endocarditis"],
    tasks: [
      { label: "Reconocer gravedad", href: "cardio/aorta-valvulas-y-estructural.html#entrada" },
      { label: "Valorar aorta y arterias", href: "cardio/aorta-valvulas-y-estructural.html#aorta" },
      { label: "Valorar un soplo", href: "cardio/aorta-valvulas-y-estructural.html#valvulas" },
      { label: "Hipertensión pulmonar", href: "cardio/aorta-valvulas-y-estructural.html#htp-congenitas" },
      { label: "Sospecha de endocarditis", href: "cardio/aorta-valvulas-y-estructural.html#endocarditis" },
      { label: "Estratificar síncope", href: "cardio/aorta-valvulas-y-estructural.html#sincope" }
    ],
    related: ["dolor-toracico", "pericardio-y-miocardio", "insuficiencia-cardiaca", "esclerosis-multiple-y-sincope"]
  },
  {
    id: "fibrilacion-auricular-y-arritmias",
    title: "Fibrilación auricular y arritmias",
    href: "cardio/fibrilacion-auricular-y-arritmias.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["FA", "fibrilación auricular", "taquicardia", "bradicardia", "cardioversión", "anticoagulación"],
    tasks: [
      { label: "Valorar estabilidad", href: "cardio/fibrilacion-auricular-y-arritmias.html#puerta" },
      { label: "Controlar frecuencia en FA", href: "cardio/fibrilacion-auricular-y-arritmias.html#fa" },
      { label: "Decidir cardioversión", href: "cardio/fibrilacion-auricular-y-arritmias.html#cardioversion" },
      { label: "Revisar anticoagulación", href: "cardio/fibrilacion-auricular-y-arritmias.html#anticoagulacion" },
      { label: "Taquicardia con pulso", href: "cardio/fibrilacion-auricular-y-arritmias.html#taquicardias" },
      { label: "Bradicardia sintomática", href: "cardio/fibrilacion-auricular-y-arritmias.html#bradicardias" }
    ],
    related: ["soporte-vital-y-exploracion", "trastornos-ionicos-y-acido-base", "insuficiencia-cardiaca"]
  },
  {
    id: "hipertension-arterial",
    title: "Hipertensión arterial",
    href: "cardio/hipertension-arterial.html",
    context: "Consulta",
    kind: "Seguimiento",
    aliases: ["HTA", "hipertensión", "AMPA", "MAPA", "crisis hipertensiva"],
    tasks: [
      { label: "Buscar daño agudo", href: "cardio/hipertension-arterial.html#puerta" },
      { label: "Medir y confirmar", href: "cardio/hipertension-arterial.html#medicion" },
      { label: "Primera evaluación", href: "cardio/hipertension-arterial.html#estudio" },
      { label: "Ajustar tratamiento", href: "cardio/hipertension-arterial.html#tratamiento" },
      { label: "Valorar resistencia", href: "cardio/hipertension-arterial.html#resistente" },
      { label: "Atender una crisis", href: "cardio/hipertension-arterial.html#crisis" }
    ],
    related: ["riesgo-cardiovascular-y-dislipemia", "insuficiencia-cardiaca", "diabetes-tipo-2"]
  },
  {
    id: "insuficiencia-cardiaca",
    title: "Insuficiencia cardiaca",
    href: "cardio/insuficiencia-cardiaca.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["IC", "insuficiencia cardiaca", "congestión", "edema pulmonar", "diuréticos"],
    tasks: [
      { label: "Valorar descompensación", href: "cardio/insuficiencia-cardiaca.html#puerta" },
      { label: "Congestión y perfusión", href: "cardio/insuficiencia-cardiaca.html#perfil" },
      { label: "Tratamiento inicial", href: "cardio/insuficiencia-cardiaca.html#tratamiento-agudo" },
      { label: "Reevaluar diurético y riñón", href: "cardio/insuficiencia-cardiaca.html#diuretico-rinon" },
      { label: "Revisar tratamiento crónico", href: "cardio/insuficiencia-cardiaca.html#cronica" },
      { label: "Preparar destino y seguimiento", href: "cardio/insuficiencia-cardiaca.html#destino" }
    ],
    related: ["disnea-aguda", "shock", "fibrilacion-auricular-y-arritmias", "insuficiencia-respiratoria"]
  },
  {
    id: "pericardio-y-miocardio",
    title: "Pericardio y miocardio",
    href: "cardio/pericardio-y-miocardio.html",
    context: "Urgencias",
    kind: "Referencia",
    aliases: ["pericarditis", "miocarditis", "taponamiento", "derrame pericárdico"],
    tasks: [
      { label: "Decidir prioridad", href: "cardio/pericardio-y-miocardio.html#puerta" },
      { label: "Valorar pericarditis", href: "cardio/pericardio-y-miocardio.html#pericarditis" },
      { label: "Valorar un derrame", href: "cardio/pericardio-y-miocardio.html#derrame" },
      { label: "Reconocer taponamiento", href: "cardio/pericardio-y-miocardio.html#taponamiento" },
      { label: "Sospecha de miocarditis", href: "cardio/pericardio-y-miocardio.html#miocarditis" },
      { label: "Planificar seguimiento", href: "cardio/pericardio-y-miocardio.html#seguimiento" }
    ],
    related: ["dolor-toracico", "sindrome-coronario-agudo", "insuficiencia-cardiaca", "aorta-valvulas-y-estructural"]
  },
  {
    id: "riesgo-cardiovascular-y-dislipemia",
    title: "Riesgo cardiovascular y dislipemia",
    href: "cardio/riesgo-cardiovascular-y-dislipemia.html",
    context: "Consulta",
    kind: "Seguimiento",
    aliases: ["riesgo cardiovascular", "dislipemia", "colesterol", "LDL", "estatinas", "SCORE2"],
    tasks: [
      { label: "Primera valoración", href: "cardio/riesgo-cardiovascular-y-dislipemia.html#entrada" },
      { label: "Calcular riesgo", href: "cardio/riesgo-cardiovascular-y-dislipemia.html#riesgo" },
      { label: "Fijar objetivo lipídico", href: "cardio/riesgo-cardiovascular-y-dislipemia.html#objetivos" },
      { label: "Ajustar tratamiento", href: "cardio/riesgo-cardiovascular-y-dislipemia.html#tratamiento" },
      { label: "Valorar síntomas musculares", href: "cardio/riesgo-cardiovascular-y-dislipemia.html#sams" },
      { label: "Revisar respuesta", href: "cardio/riesgo-cardiovascular-y-dislipemia.html#seguimiento" }
    ],
    related: ["hipertension-arterial", "diabetes-tipo-2", "obesidad-ckm", "sindrome-coronario-cronico"]
  },
  {
    id: "sindrome-coronario-cronico",
    title: "Síndrome coronario crónico",
    href: "cardio/sindrome-coronario-cronico.html",
    context: "Consulta",
    kind: "Seguimiento",
    aliases: ["angina", "cardiopatía isquémica", "síndrome coronario crónico", "ANOCA", "INOCA"],
    tasks: [
      { label: "Separar estable de agudo", href: "cardio/sindrome-coronario-cronico.html#entrada" },
      { label: "Estimar probabilidad", href: "cardio/sindrome-coronario-cronico.html#ppt" },
      { label: "Elegir prueba", href: "cardio/sindrome-coronario-cronico.html#diagnostico" },
      { label: "Revisar tratamiento", href: "cardio/sindrome-coronario-cronico.html#tratamiento" },
      { label: "Angina sin obstrucción", href: "cardio/sindrome-coronario-cronico.html#anoca-inoca" },
      { label: "Valorar revascularización", href: "cardio/sindrome-coronario-cronico.html#revascularizacion" }
    ],
    related: ["sindrome-coronario-agudo", "riesgo-cardiovascular-y-dislipemia", "insuficiencia-cardiaca"]
  },
  {
    id: "tep-y-tvp",
    title: "TEP y TVP",
    href: "cardio/tep-y-tvp.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["TEP", "TVP", "tromboembolismo pulmonar", "trombosis venosa profunda", "anticoagulación"],
    tasks: [
      { label: "Valorar estabilidad", href: "cardio/tep-y-tvp.html#puerta" },
      { label: "Estudiar sospecha de TEP", href: "cardio/tep-y-tvp.html#diagnostico-tep" },
      { label: "Estratificar riesgo", href: "cardio/tep-y-tvp.html#riesgo" },
      { label: "Tratamiento inicial del TEP", href: "cardio/tep-y-tvp.html#tratamiento-tep" },
      { label: "Estudiar sospecha de TVP", href: "cardio/tep-y-tvp.html#tvp" },
      { label: "Decidir destino", href: "cardio/tep-y-tvp.html#destino" }
    ],
    related: ["disnea-aguda", "dolor-toracico", "shock", "aorta-valvulas-y-estructural"]
  },
  {
    id: "acne-rosacea",
    title: "Acné y rosácea",
    href: "dermatologia/acne-rosacea.html",
    context: "Consulta",
    kind: "Seguimiento",
    aliases: ["acné", "rosácea", "comedones"],
    tasks: [
      { label: "Distinguir acné de rosácea", href: "dermatologia/acne-rosacea.html#diferenciar" },
      { label: "Valorar gravedad del acné", href: "dermatologia/acne-rosacea.html#acne" },
      { label: "Elegir tratamiento del acné", href: "dermatologia/acne-rosacea.html#escalera" },
      { label: "Tratar el fenotipo de rosácea", href: "dermatologia/acne-rosacea.html#rosacea" },
      { label: "Buscar afectación ocular", href: "dermatologia/acne-rosacea.html#ocular" },
      { label: "Preparar la revisión", href: "dermatologia/acne-rosacea.html#seguimiento" }
    ],
    related: ["exploracion-cutanea", "dermatitis-atopica-eczemas", "psoriasis-dermatitis-seborreica"]
  },
  {
    id: "alopecias-unas-patologia-oral",
    title: "Alopecias, uñas y patología oral",
    href: "dermatologia/alopecias-unas-patologia-oral.html",
    context: "Consulta",
    kind: "Referencia",
    aliases: ["alopecia", "uñas", "patología oral", "caída del pelo", "lesión ungueal"],
    tasks: [
      { label: "Explorar pelo y cuero cabelludo", href: "dermatologia/alopecias-unas-patologia-oral.html#pelo" },
      { label: "Valorar una lesión ungueal", href: "dermatologia/alopecias-unas-patologia-oral.html#unas" },
      { label: "Explorar una lesión oral", href: "dermatologia/alopecias-unas-patologia-oral.html#boca" },
      { label: "Orientar el tipo de alopecia", href: "dermatologia/alopecias-unas-patologia-oral.html#alopecias" },
      { label: "Consultar tratamiento capilar", href: "dermatologia/alopecias-unas-patologia-oral.html#tratamiento" },
      { label: "Priorizar la derivación", href: "dermatologia/alopecias-unas-patologia-oral.html#derivacion" }
    ],
    related: ["psoriasis-dermatitis-seborreica", "infecciones-cutaneas-virosis-its", "lesiones-benignas-queratosis-cancer-cutaneo"]
  },
  {
    id: "dermatitis-atopica-eczemas",
    title: "Dermatitis atópica y eczemas",
    href: "dermatologia/dermatitis-atopica-eczemas.html",
    context: "Consulta",
    kind: "Seguimiento",
    aliases: ["dermatitis atópica", "eczema", "eccema", "dermatitis de contacto"],
    tasks: [
      { label: "Reconocer el patrón de eczema", href: "dermatologia/dermatitis-atopica-eczemas.html#reconocer" },
      { label: "Elegir tratamiento tópico", href: "dermatologia/dermatitis-atopica-eczemas.html#topico" },
      { label: "Valorar infección y alarmas", href: "dermatologia/dermatitis-atopica-eczemas.html#infeccion" },
      { label: "Explicar brote y mantenimiento", href: "dermatologia/dermatitis-atopica-eczemas.html#ciclo" },
      { label: "Revisar exposición en las manos", href: "dermatologia/dermatitis-atopica-eczemas.html#manos" },
      { label: "Decidir derivación", href: "dermatologia/dermatitis-atopica-eczemas.html#derivacion" }
    ],
    related: ["psoriasis-dermatitis-seborreica", "infecciones-cutaneas-virosis-its", "dermatologia-urgente"]
  },
  {
    id: "infecciones-cutaneas-virosis-its",
    title: "Infecciones cutáneas, virosis e ITS",
    href: "dermatologia/infecciones-cutaneas-virosis-its.html",
    context: "Consulta",
    kind: "Referencia",
    aliases: ["infecciones cutáneas", "micosis", "sarna", "herpes", "zóster", "lesiones genitales"],
    tasks: [
      { label: "Orientar por la lesión", href: "dermatologia/infecciones-cutaneas-virosis-its.html#mapa" },
      { label: "Valorar infección bacteriana", href: "dermatologia/infecciones-cutaneas-virosis-its.html#bacterias" },
      { label: "Estudiar una micosis", href: "dermatologia/infecciones-cutaneas-virosis-its.html#micosis" },
      { label: "Tratar sarna y contactos", href: "dermatologia/infecciones-cutaneas-virosis-its.html#sarna" },
      { label: "Valorar herpes y zóster", href: "dermatologia/infecciones-cutaneas-virosis-its.html#virosis" },
      { label: "Estudiar una lesión genital", href: "dermatologia/infecciones-cutaneas-virosis-its.html#its" }
    ],
    related: ["exploracion-cutanea", "alopecias-unas-patologia-oral", "proctologia-y-cirugia-menor", "dermatologia-urgente"]
  },
  {
    id: "lesiones-benignas-queratosis-cancer-cutaneo",
    title: "Lesiones benignas, queratosis actínicas y cáncer cutáneo",
    href: "dermatologia/lesiones-benignas-queratosis-cancer-cutaneo.html",
    context: "Consulta",
    kind: "Referencia",
    aliases: ["melanoma", "queratosis actínica", "CBC", "CEC", "carcinoma basocelular", "carcinoma espinocelular", "cáncer cutáneo"],
    tasks: [
      { label: "Explorar una lesión focal", href: "dermatologia/lesiones-benignas-queratosis-cancer-cutaneo.html#mirar" },
      { label: "Reconocer sospecha de melanoma", href: "dermatologia/lesiones-benignas-queratosis-cancer-cutaneo.html#melanoma" },
      { label: "Elegir la biopsia", href: "dermatologia/lesiones-benignas-queratosis-cancer-cutaneo.html#biopsia" },
      { label: "Valorar queratosis actínicas", href: "dermatologia/lesiones-benignas-queratosis-cancer-cutaneo.html#actinicas" },
      { label: "Distinguir CBC y CEC", href: "dermatologia/lesiones-benignas-queratosis-cancer-cutaneo.html#no-melanoma" },
      { label: "Priorizar derivación y seguimiento", href: "dermatologia/lesiones-benignas-queratosis-cancer-cutaneo.html#circuito" }
    ],
    related: ["exploracion-cutanea", "alopecias-unas-patologia-oral", "manifestaciones-sistemicas-fotodermatosis"]
  },
  {
    id: "manifestaciones-sistemicas-fotodermatosis",
    title: "Manifestaciones sistémicas y fotodermatosis",
    href: "dermatologia/manifestaciones-sistemicas-fotodermatosis.html",
    context: "Consulta",
    kind: "Referencia",
    aliases: ["fotodermatosis", "lupus cutáneo", "fotoprotección", "manifestaciones cutáneas sistémicas"],
    tasks: [
      { label: "Decidir si estudiar enfermedad sistémica", href: "dermatologia/manifestaciones-sistemicas-fotodermatosis.html#metodo" },
      { label: "Valorar un patrón autoinmune", href: "dermatologia/manifestaciones-sistemicas-fotodermatosis.html#autoinmune" },
      { label: "Distinguir fotodermatosis", href: "dermatologia/manifestaciones-sistemicas-fotodermatosis.html#foto" },
      { label: "Estudiar prurito y ampollas dorsales", href: "dermatologia/manifestaciones-sistemicas-fotodermatosis.html#renal-hepatica" },
      { label: "Comparar formas de lupus cutáneo", href: "dermatologia/manifestaciones-sistemicas-fotodermatosis.html#lupus-foto" },
      { label: "Explicar fotoprotección", href: "dermatologia/manifestaciones-sistemicas-fotodermatosis.html#proteccion" }
    ],
    related: ["lupus-y-eas", "vasculitis", "urticaria-angioedema-prurito", "enfermedad-renal-cronica"]
  },
  {
    id: "psoriasis-dermatitis-seborreica",
    title: "Psoriasis y dermatitis seborreica",
    href: "dermatologia/psoriasis-dermatitis-seborreica.html",
    context: "Consulta",
    kind: "Seguimiento",
    aliases: ["psoriasis", "dermatitis seborreica", "artritis psoriásica"],
    tasks: [
      { label: "Reconocer el fenotipo", href: "dermatologia/psoriasis-dermatitis-seborreica.html#reconocer" },
      { label: "Elegir tratamiento por zona", href: "dermatologia/psoriasis-dermatitis-seborreica.html#topico" },
      { label: "Tratar dermatitis seborreica", href: "dermatologia/psoriasis-dermatitis-seborreica.html#seborreica" },
      { label: "Medir superficie e impacto", href: "dermatologia/psoriasis-dermatitis-seborreica.html#gravedad" },
      { label: "Buscar afectación articular", href: "dermatologia/psoriasis-dermatitis-seborreica.html#articular" },
      { label: "Planificar revisión y derivación", href: "dermatologia/psoriasis-dermatitis-seborreica.html#seguimiento" }
    ],
    related: ["dermatitis-atopica-eczemas", "alopecias-unas-patologia-oral", "monoartritis-y-gota", "columna-y-lumbalgia"]
  },
  {
    id: "urticaria-angioedema-prurito",
    title: "Urticaria, angioedema y prurito",
    href: "dermatologia/urticaria-angioedema-prurito.html",
    context: "Consulta",
    kind: "Referencia",
    aliases: ["urticaria", "angioedema", "prurito", "habones"],
    tasks: [
      { label: "Confirmar el comportamiento del habón", href: "dermatologia/urticaria-angioedema-prurito.html#reloj" },
      { label: "Valorar angioedema", href: "dermatologia/urticaria-angioedema-prurito.html#angioedema" },
      { label: "Consultar tratamiento de urticaria", href: "dermatologia/urticaria-angioedema-prurito.html#tratamiento" },
      { label: "Elegir un estudio dirigido", href: "dermatologia/urticaria-angioedema-prurito.html#estudio" },
      { label: "Estudiar prurito sin lesión primaria", href: "dermatologia/urticaria-angioedema-prurito.html#prurito" },
      { label: "Priorizar la derivación", href: "dermatologia/urticaria-angioedema-prurito.html#derivacion" }
    ],
    related: ["exploracion-cutanea", "dermatitis-atopica-eczemas", "infecciones-cutaneas-virosis-its", "dermatologia-urgente"]
  },
  {
    id: "cirrosis-y-hepatopatia",
    title: "Cirrosis y hepatopatía metabólica",
    href: "digestivo/cirrosis-y-hepatopatia.html",
    context: "Planta",
    kind: "Referencia",
    aliases: ["cirrosis", "ascitis", "PBE", "MASLD", "hepatopatía metabólica", "transaminasas"],
    tasks: [
      { label: "Valorar una descompensación", href: "digestivo/cirrosis-y-hepatopatia.html#primeros-minutos" },
      { label: "Estudiar y tratar la ascitis", href: "digestivo/cirrosis-y-hepatopatia.html#ascitis" },
      { label: "Interpretar el líquido ascítico", href: "digestivo/cirrosis-y-hepatopatia.html#pbe" },
      { label: "Revisar profilaxis de PBE", href: "digestivo/cirrosis-y-hepatopatia.html#profilaxis" },
      { label: "Estratificar fibrosis en MASLD", href: "digestivo/cirrosis-y-hepatopatia.html#masld" },
      { label: "Estudiar transaminasas elevadas", href: "digestivo/cirrosis-y-hepatopatia.html#transaminasas" }
    ],
    related: ["hemorragia-digestiva", "patologia-biliar", "fracaso-renal-agudo", "diabetes-tipo-2"]
  },
  {
    id: "dolor-abdominal",
    title: "Dolor abdominal",
    href: "digestivo/dolor-abdominal.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["dolor abdominal", "abdomen agudo"],
    tasks: [
      { label: "Detectar alarma inicial", href: "digestivo/dolor-abdominal.html#entrada" },
      { label: "Orientar el patrón de dolor", href: "digestivo/dolor-abdominal.html#patrones" },
      { label: "Completar la exploración", href: "digestivo/dolor-abdominal.html#exploracion" },
      { label: "Elegir pruebas e imagen", href: "digestivo/dolor-abdominal.html#pruebas" },
      { label: "Consultar manejo inicial", href: "digestivo/dolor-abdominal.html#manejo" },
      { label: "Decidir observación o alta", href: "digestivo/dolor-abdominal.html#observacion" }
    ],
    related: ["patologia-biliar", "pancreatitis-y-obstruccion", "hemorragia-digestiva", "proctologia-y-cirugia-menor"]
  },
  {
    id: "eii",
    title: "Enfermedad inflamatoria intestinal",
    href: "digestivo/eii.html",
    context: "Consulta",
    kind: "Referencia",
    aliases: ["EII", "enfermedad inflamatoria intestinal", "Crohn", "colitis ulcerosa"],
    tasks: [
      { label: "Valorar infección y complicaciones", href: "digestivo/eii.html#entrada" },
      { label: "Medir gravedad", href: "digestivo/eii.html#gravedad" },
      { label: "Consultar tratamiento de CU", href: "digestivo/eii.html#cu" },
      { label: "Valorar Crohn complicado", href: "digestivo/eii.html#crohn" },
      { label: "Preparar el ingreso", href: "digestivo/eii.html#ingreso" },
      { label: "Organizar revisión tras el alta", href: "digestivo/eii.html#alta" }
    ],
    related: ["rge-y-gea", "pancreatitis-y-obstruccion", "hemorragia-digestiva", "proctologia-y-cirugia-menor"]
  },
  {
    id: "hemorragia-digestiva",
    title: "Hemorragia digestiva",
    href: "digestivo/hemorragia-digestiva.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["hemorragia digestiva", "HDA", "HDB", "hematemesis", "melenas", "rectorragia"],
    tasks: [
      { label: "Estabilizar y clasificar el sangrado", href: "digestivo/hemorragia-digestiva.html#entrada" },
      { label: "Decidir el circuito inicial", href: "digestivo/hemorragia-digestiva.html#destino" },
      { label: "Consultar HDA no varicosa", href: "digestivo/hemorragia-digestiva.html#hda" },
      { label: "Tratar sospecha de sangrado portal", href: "digestivo/hemorragia-digestiva.html#portal" },
      { label: "Valorar hemorragia baja", href: "digestivo/hemorragia-digestiva.html#hdb" },
      { label: "Revisar antitrombóticos", href: "digestivo/hemorragia-digestiva.html#antitromboticos" }
    ],
    related: ["cirrosis-y-hepatopatia", "anemia", "eii", "proctologia-y-cirugia-menor"]
  },
  {
    id: "pancreatitis-y-obstruccion",
    title: "Pancreatitis y obstrucción intestinal",
    href: "digestivo/pancreatitis-y-obstruccion.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["pancreatitis", "obstrucción intestinal", "íleo"],
    tasks: [
      { label: "Separar los dos cuadros", href: "digestivo/pancreatitis-y-obstruccion.html#puerta" },
      { label: "Confirmar pancreatitis y gravedad", href: "digestivo/pancreatitis-y-obstruccion.html#pancreatitis" },
      { label: "Consultar manejo de pancreatitis", href: "digestivo/pancreatitis-y-obstruccion.html#manejo-pancreatitis" },
      { label: "Reconocer obstrucción complicada", href: "digestivo/pancreatitis-y-obstruccion.html#obstruccion" },
      { label: "Consultar manejo de obstrucción", href: "digestivo/pancreatitis-y-obstruccion.html#manejo-obstruccion" },
      { label: "Reevaluar respuesta y destino", href: "digestivo/pancreatitis-y-obstruccion.html#reevaluacion" }
    ],
    related: ["dolor-abdominal", "patologia-biliar", "eii"]
  },
  {
    id: "patologia-biliar",
    title: "Patología biliar",
    href: "digestivo/patologia-biliar.html",
    context: "Urgencias",
    kind: "Referencia",
    aliases: ["cólico biliar", "colecistitis", "colangitis", "coledocolitiasis"],
    tasks: [
      { label: "Distinguir los cuadros biliares", href: "digestivo/patologia-biliar.html#mapa" },
      { label: "Decidir a quién avisar", href: "digestivo/patologia-biliar.html#avisos" },
      { label: "Consultar manejo del cólico", href: "digestivo/patologia-biliar.html#colico" },
      { label: "Consultar colecistitis", href: "digestivo/patologia-biliar.html#colecistitis" },
      { label: "Valorar obstrucción del colédoco", href: "digestivo/patologia-biliar.html#coledocolitiasis" },
      { label: "Valorar colangitis y drenaje", href: "digestivo/patologia-biliar.html#colangitis" }
    ],
    related: ["dolor-abdominal", "pancreatitis-y-obstruccion", "cirrosis-y-hepatopatia"]
  },
  {
    id: "proctologia-y-cirugia-menor",
    title: "Proctología y drenaje",
    href: "digestivo/proctologia-y-cirugia-menor.html",
    context: "Técnicas",
    kind: "Referencia",
    aliases: ["proctología", "hemorroides", "fisura anal", "fecaloma", "drenaje de absceso"],
    tasks: [
      { label: "Buscar datos de alarma", href: "digestivo/proctologia-y-cirugia-menor.html#puerta" },
      { label: "Valorar sangrado y hemorroides", href: "digestivo/proctologia-y-cirugia-menor.html#hemorroides" },
      { label: "Valorar una fisura", href: "digestivo/proctologia-y-cirugia-menor.html#fisura" },
      { label: "Distinguir fecaloma de obstrucción", href: "digestivo/proctologia-y-cirugia-menor.html#estrenimiento" },
      { label: "Decidir si drenar un absceso", href: "digestivo/proctologia-y-cirugia-menor.html#absceso" },
      { label: "Revisar errores frecuentes", href: "digestivo/proctologia-y-cirugia-menor.html#trampas" }
    ],
    related: ["hemorragia-digestiva", "pancreatitis-y-obstruccion", "eii", "heridas-y-suturas"]
  },
  {
    id: "rge-y-gea",
    title: "RGE y gastroenteritis",
    href: "digestivo/rge-y-gea.html",
    context: "Consulta",
    kind: "Referencia",
    aliases: ["RGE", "GEA", "reflujo", "gastroenteritis", "pirosis", "diarrea"],
    tasks: [
      { label: "Separar alarma de cuadro simple", href: "digestivo/rge-y-gea.html#puerta" },
      { label: "Valorar pirosis y reflujo", href: "digestivo/rge-y-gea.html#rge" },
      { label: "Valorar diarrea e hidratación", href: "digestivo/rge-y-gea.html#gea" },
      { label: "Revisar indicación de antibiótico", href: "digestivo/rge-y-gea.html#antibiotico" },
      { label: "Comprobar tolerancia y preparar alta", href: "digestivo/rge-y-gea.html#alta" },
      { label: "Revisar errores frecuentes", href: "digestivo/rge-y-gea.html#trampas" }
    ],
    related: ["dolor-abdominal", "eii", "hemorragia-digestiva", "dolor-toracico"]
  },
  {
    id: "crisis-hiperglucemicas",
    title: "Crisis hiperglucémicas",
    href: "endocrino/crisis-hiperglucemicas.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["CAD", "SHH", "cetoacidosis diabética", "estado hiperosmolar", "hiperglucemia"],
    tasks: [
      { label: "Primera hora", href: "endocrino/crisis-hiperglucemicas.html#primera-hora" },
      { label: "Diferenciar CAD y SHH", href: "endocrino/crisis-hiperglucemicas.html#diferenciar" },
      { label: "Secuencia de tratamiento", href: "endocrino/crisis-hiperglucemicas.html#tratamiento" },
      { label: "Reevaluar", href: "endocrino/crisis-hiperglucemicas.html#monitorizacion" },
      { label: "Retirar perfusión", href: "endocrino/crisis-hiperglucemicas.html#transicion" }
    ],
    related: ["diabetes-tipo-2", "trastornos-ionicos-y-acido-base", "coma-y-confusion"]
  },
  {
    id: "obesidad-ckm",
    title: "Obesidad y CKM",
    href: "endocrino/obesidad-ckm.html",
    context: "Consulta",
    kind: "Seguimiento",
    aliases: ["obesidad", "CKM", "adiposidad", "cirugía bariátrica"],
    tasks: [
      { label: "Evaluar adiposidad", href: "endocrino/obesidad-ckm.html#evaluacion" },
      { label: "Elegir siguiente paso", href: "endocrino/obesidad-ckm.html#escalada" },
      { label: "Antes de iniciar fármaco", href: "endocrino/obesidad-ckm.html#inicio-farmaco" },
      { label: "Valorar cirugía", href: "endocrino/obesidad-ckm.html#cirugia" },
      { label: "Revisar respuesta", href: "endocrino/obesidad-ckm.html#seguimiento" }
    ],
    related: ["diabetes-tipo-2", "riesgo-cardiovascular-y-dislipemia", "insuficiencia-cardiaca"]
  },
  {
    id: "cot-y-trauma",
    title: "Plantillas de COT y trauma",
    href: "guardias/cot-y-trauma.html",
    context: "Técnicas",
    kind: "Plantilla",
    aliases: ["plantilla COT", "nota de trauma", "preoperatorio", "inmovilización", "ingreso COT"],
    tasks: [
      { label: "Documentar ingreso COT", href: "guardias/cot-y-trauma.html#ingreso" },
      { label: "Revisar el preoperatorio", href: "guardias/cot-y-trauma.html#preoperatorio" },
      { label: "Escribir la exploración", href: "guardias/cot-y-trauma.html#exploracion" },
      { label: "Documentar inmovilización", href: "guardias/cot-y-trauma.html#inmovilizacion" },
      { label: "Escribir una incidencia", href: "guardias/cot-y-trauma.html#evolutivos" },
      { label: "Preparar el pase", href: "guardias/cot-y-trauma.html#pase" }
    ],
    related: ["planta", "curas-y-exploracion", "articulaciones-y-extremidades"]
  },
  {
    id: "curas-y-exploracion",
    title: "Plantillas de curas y exploración",
    href: "guardias/curas-y-exploracion.html",
    context: "Técnicas",
    kind: "Plantilla",
    aliases: ["plantilla curas", "documentar exploración", "nota de procedimiento", "trauma menor"],
    tasks: [
      { label: "Escribir la exploración", href: "guardias/curas-y-exploracion.html#exploracion" },
      { label: "Documentar una cura", href: "guardias/curas-y-exploracion.html#heridas" },
      { label: "Redactar una nota local", href: "guardias/curas-y-exploracion.html#trauma-menor" },
      { label: "Registrar el procedimiento", href: "guardias/curas-y-exploracion.html#procedimientos" },
      { label: "Preparar el alta", href: "guardias/curas-y-exploracion.html#alta" },
      { label: "Comprobar la nota", href: "guardias/curas-y-exploracion.html#seguridad" }
    ],
    related: ["plantilla-boxes", "cot-y-trauma", "heridas-y-suturas"]
  },
  {
    id: "pediatria",
    title: "Plantillas de pediatría",
    href: "guardias/pediatria.html",
    context: "Urgencias",
    kind: "Plantilla",
    aliases: ["plantilla pediatría", "nota pediátrica", "alta pediátrica", "información familiar"],
    tasks: [
      { label: "Escribir la valoración", href: "guardias/pediatria.html#valoracion" },
      { label: "Preparar el alta", href: "guardias/pediatria.html#alta" },
      { label: "Documentar reevaluación", href: "guardias/pediatria.html#evolucion" },
      { label: "Registrar la información familiar", href: "guardias/pediatria.html#comunicacion" },
      { label: "Revisar la nota", href: "guardias/pediatria.html#seguridad" }
    ],
    related: ["plantilla-boxes", "curas-y-exploracion", "cot-y-trauma"]
  },
  {
    id: "planta",
    title: "Plantillas de planta: evolución, ingreso y alta",
    href: "guardias/planta.html",
    context: "Planta",
    kind: "Plantilla",
    aliases: ["plantilla planta", "evolutivo", "nota de ingreso", "informe de alta", "pase de planta"],
    tasks: [
      { label: "Escribir el evolutivo", href: "guardias/planta.html#evolutivo" },
      { label: "Documentar el ingreso", href: "guardias/planta.html#ingreso" },
      { label: "Preparar el alta", href: "guardias/planta.html#alta" },
      { label: "Preparar el pase", href: "guardias/planta.html#pase" },
      { label: "Revisar la nota", href: "guardias/planta.html#checklist" }
    ],
    related: ["plantilla-boxes", "curas-y-exploracion", "cot-y-trauma"]
  },
  {
    id: "anemia",
    title: "Anemia",
    href: "hemato-reuma/anemia.html",
    context: "Consulta",
    kind: "Referencia",
    aliases: ["anemia", "ferropenia", "hierro", "hemólisis", "microcitosis"],
    tasks: [
      { label: "Valorar gravedad", href: "hemato-reuma/anemia.html#destino" },
      { label: "Clasificar la anemia", href: "hemato-reuma/anemia.html#entrada" },
      { label: "Orientar microcitosis", href: "hemato-reuma/anemia.html#micro" },
      { label: "Reponer hierro y buscar causa", href: "hemato-reuma/anemia.html#ferropenia" },
      { label: "Estudiar hemólisis", href: "hemato-reuma/anemia.html#hemolisis" },
      { label: "Decidir derivación", href: "hemato-reuma/anemia.html#derivar" }
    ],
    related: ["citopenias-y-hemofagocitico", "hemorragia-digestiva", "enfermedad-renal-cronica"]
  },
  {
    id: "citopenias-y-hemofagocitico",
    title: "Citopenias y síndrome hemofagocítico",
    href: "hemato-reuma/citopenias-y-hemofagocitico.html",
    context: "Planta",
    kind: "Referencia",
    aliases: ["citopenias", "pancitopenia", "trombocitopenia", "HLH", "MAS", "síndrome hemofagocítico"],
    tasks: [
      { label: "Hacer la primera valoración", href: "hemato-reuma/citopenias-y-hemofagocitico.html#puerta-10" },
      { label: "Revisar el frotis", href: "hemato-reuma/citopenias-y-hemofagocitico.html#frotis" },
      { label: "Reconocer rutas urgentes", href: "hemato-reuma/citopenias-y-hemofagocitico.html#rutas" },
      { label: "Organizar el estudio", href: "hemato-reuma/citopenias-y-hemofagocitico.html#analitica" },
      { label: "Consultar soporte inicial", href: "hemato-reuma/citopenias-y-hemofagocitico.html#soporte" },
      { label: "Valorar sospecha de HLH/MAS", href: "hemato-reuma/citopenias-y-hemofagocitico.html#hemofagocitico" }
    ],
    related: ["anemia", "lupus-y-eas", "neutropenia-febril-nf"]
  },
  {
    id: "lupus-y-eas",
    title: "LES y enfermedades autoinmunes sistémicas",
    href: "hemato-reuma/lupus-y-eas.html",
    context: "Consulta",
    kind: "Referencia",
    aliases: ["LES", "lupus", "enfermedades autoinmunes sistémicas", "autoanticuerpos", "nefritis lúpica"],
    tasks: [
      { label: "Valorar amenaza de órgano", href: "hemato-reuma/lupus-y-eas.html#primeros-minutos" },
      { label: "Orientar por patrón clínico", href: "hemato-reuma/lupus-y-eas.html#sospecha" },
      { label: "Elegir autoanticuerpos", href: "hemato-reuma/lupus-y-eas.html#anticuerpos" },
      { label: "Consultar tratamiento del LES", href: "hemato-reuma/lupus-y-eas.html#tratamiento" },
      { label: "Valorar afectación renal", href: "hemato-reuma/lupus-y-eas.html#nefritis" },
      { label: "Revisar planificación del embarazo", href: "hemato-reuma/lupus-y-eas.html#embarazo" }
    ],
    related: ["vasculitis", "manifestaciones-sistemicas-fotodermatosis", "fracaso-renal-agudo", "citopenias-y-hemofagocitico"]
  },
  {
    id: "monoartritis-y-gota",
    title: "Monoartritis y gota",
    href: "hemato-reuma/monoartritis-y-gota.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["monoartritis", "gota", "artrocentesis", "artritis por cristales"],
    tasks: [
      { label: "Valorar una articulación caliente", href: "hemato-reuma/monoartritis-y-gota.html#entrada" },
      { label: "Preparar la artrocentesis", href: "hemato-reuma/monoartritis-y-gota.html#artrocentesis" },
      { label: "Interpretar el líquido", href: "hemato-reuma/monoartritis-y-gota.html#resultado" },
      { label: "Elegir tratamiento de la crisis", href: "hemato-reuma/monoartritis-y-gota.html#tratamiento" },
      { label: "Organizar el seguimiento", href: "hemato-reuma/monoartritis-y-gota.html#alta" }
    ],
    related: ["articulaciones-y-extremidades", "lupus-y-eas", "enfermedad-renal-cronica"]
  },
  {
    id: "sarcoidosis",
    title: "Sarcoidosis",
    href: "hemato-reuma/sarcoidosis.html",
    context: "Consulta",
    kind: "Seguimiento",
    aliases: ["sarcoidosis", "Scadding", "Löfgren"],
    tasks: [
      { label: "Orientar la presentación", href: "hemato-reuma/sarcoidosis.html#puerta" },
      { label: "Preparar el estudio inicial", href: "hemato-reuma/sarcoidosis.html#estudio-minimo" },
      { label: "Consultar estadios de Scadding", href: "hemato-reuma/sarcoidosis.html#pulmon" },
      { label: "Buscar afectación extrapulmonar", href: "hemato-reuma/sarcoidosis.html#extra" },
      { label: "Consultar opciones de tratamiento", href: "hemato-reuma/sarcoidosis.html#tratamiento" },
      { label: "Organizar el seguimiento", href: "hemato-reuma/sarcoidosis.html#seguimiento" }
    ],
    related: ["manifestaciones-sistemicas-fotodermatosis", "tuberculosis-tb", "lupus-y-eas"]
  },
  {
    id: "vasculitis",
    title: "Vasculitis",
    href: "hemato-reuma/vasculitis.html",
    context: "Urgencias",
    kind: "Referencia",
    aliases: ["vasculitis", "ACG", "arteritis de células gigantes", "ANCA", "síndrome pulmón riñón"],
    tasks: [
      { label: "Reconocer amenaza de órgano", href: "hemato-reuma/vasculitis.html#puerta" },
      { label: "Elegir pruebas iniciales", href: "hemato-reuma/vasculitis.html#estudio-inicial" },
      { label: "Valorar sospecha de ACG", href: "hemato-reuma/vasculitis.html#acg" },
      { label: "Valorar síndrome pulmón-riñón", href: "hemato-reuma/vasculitis.html#pulmon-rinon" },
      { label: "Consultar tratamiento", href: "hemato-reuma/vasculitis.html#tratamiento" },
      { label: "Vigilar recaída y toxicidad", href: "hemato-reuma/vasculitis.html#seguimiento" }
    ],
    related: ["lupus-y-eas", "fracaso-renal-agudo", "manifestaciones-sistemicas-fotodermatosis"]
  },
  {
    id: "bacteriemia-y-candidemia",
    title: "Bacteriemia y Candidemia",
    href: "infecciosas/bacteriemia-y-candidemia.html",
    context: "Planta",
    kind: "Referencia",
    aliases: ["bacteriemia", "candidemia", "hemocultivo", "Candida"],
    tasks: [
      { label: "Actuar ante el hemocultivo", href: "infecciosas/bacteriemia-y-candidemia.html#aviso" },
      { label: "Valorar candidemia", href: "infecciosas/bacteriemia-y-candidemia.html#diagnostico" },
      { label: "Consultar tratamiento y duración", href: "infecciosas/bacteriemia-y-candidemia.html#tratamiento" },
      { label: "Revisar catéter y complicaciones", href: "infecciosas/bacteriemia-y-candidemia.html#especiales" }
    ],
    related: ["sepsis-antiinfecciosos-y-soporte-vital-ssc-2026", "sepsis-abordaje-inicial-ssc-2026", "infecciones-nosocomiales", "neutropenia-febril-nf"]
  },
  {
    id: "covid-19",
    title: "COVID-19",
    href: "infecciosas/covid-19.html",
    context: "Urgencias",
    kind: "Referencia",
    aliases: ["COVID", "COVID-19", "SARS-CoV-2"],
    tasks: [
      { label: "Valorar gravedad", href: "infecciosas/covid-19.html#mapa" },
      { label: "Escalar soporte y tratamiento", href: "infecciosas/covid-19.html#escalado" },
      { label: "Consultar antivirales", href: "infecciosas/covid-19.html#antivirales" },
      { label: "Consultar inmunomodulación", href: "infecciosas/covid-19.html#inflamacion" },
      { label: "Revisar tromboprofilaxis", href: "infecciosas/covid-19.html#soporte" }
    ],
    related: ["gripe-sindrome-gripal", "proa-infecciones-respiratorias", "enfermedades-del-viajero-aproximacion-practica"]
  },
  {
    id: "enfermedades-del-viajero-aproximacion-practica",
    title: "Enfermedades del Viajero — Aproximación Práctica",
    href: "infecciosas/enfermedades-del-viajero-aproximacion-practica.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["viajero", "fiebre tras viaje", "malaria", "paludismo", "diarrea del viajero"],
    tasks: [
      { label: "Valorar gravedad y aislamiento", href: "infecciosas/enfermedades-del-viajero-aproximacion-practica.html#triaje" },
      { label: "Descartar malaria", href: "infecciosas/enfermedades-del-viajero-aproximacion-practica.html#malaria" },
      { label: "Pedir estudio inicial", href: "infecciosas/enfermedades-del-viajero-aproximacion-practica.html#estudio" },
      { label: "Valorar diarrea", href: "infecciosas/enfermedades-del-viajero-aproximacion-practica.html#diarrea" },
      { label: "Decidir derivación", href: "infecciosas/enfermedades-del-viajero-aproximacion-practica.html#derivar" }
    ],
    related: ["proa-infecciones-gastrointestinales", "tuberculosis-tb", "vih-diagnostico-y-manejo-inicial"]
  },
  {
    id: "gramnegativos-resistentes-idsa-2024-estudio-interactivo",
    title: "Gramnegativos resistentes",
    href: "infecciosas/gramnegativos-resistentes-idsa-2024-estudio-interactivo.html",
    context: "Tratamientos",
    kind: "Referencia",
    aliases: ["gramnegativos resistentes", "IDSA", "BLEE", "AmpC", "CRE", "CRAB", "Pseudomonas DTR", "Stenotrophomonas"],
    tasks: [
      { label: "Actuar al recibir el cultivo", href: "infecciosas/gramnegativos-resistentes-idsa-2024-estudio-interactivo.html#conducta" },
      { label: "Consultar BLEE, AmpC y CRE", href: "infecciosas/gramnegativos-resistentes-idsa-2024-estudio-interactivo.html#enterobacterales" },
      { label: "Consultar Pseudomonas DTR", href: "infecciosas/gramnegativos-resistentes-idsa-2024-estudio-interactivo.html#pseudomonas" },
      { label: "Consultar CRAB", href: "infecciosas/gramnegativos-resistentes-idsa-2024-estudio-interactivo.html#crab" },
      { label: "Consultar Stenotrophomonas", href: "infecciosas/gramnegativos-resistentes-idsa-2024-estudio-interactivo.html#steno" },
      { label: "Comparar inhibidores", href: "infecciosas/gramnegativos-resistentes-idsa-2024-estudio-interactivo.html#matriz" }
    ],
    related: ["proa-guia-de-antimicrobianos-y-sindromes-infecciosos", "perfusion-extendida-continua-de-betalactamicos", "sepsis-y-shock-septico", "bacteriemia-y-candidemia"]
  },
  {
    id: "gripe-sindrome-gripal",
    title: "Gripe - Síndrome Gripal",
    href: "infecciosas/gripe-sindrome-gripal.html",
    context: "Consulta",
    kind: "Valoración inicial",
    aliases: ["gripe", "influenza", "síndrome gripal"],
    tasks: [
      { label: "Valorar gravedad", href: "infecciosas/gripe-sindrome-gripal.html#gravedad" },
      { label: "Decidir pruebas", href: "infecciosas/gripe-sindrome-gripal.html#pruebas" },
      { label: "Consultar tratamiento", href: "infecciosas/gripe-sindrome-gripal.html#tratamiento" },
      { label: "Preparar alta y reconsulta", href: "infecciosas/gripe-sindrome-gripal.html#alta" }
    ],
    related: ["covid-19", "enfermedades-del-viajero-aproximacion-practica", "infecciones-intraabdominales-iia"]
  },
  {
    id: "hepatitis-virales-a-e",
    title: "Hepatitis Virales (A-E)",
    href: "infecciosas/hepatitis-virales-a-e.html",
    context: "Consulta",
    kind: "Referencia",
    aliases: ["hepatitis virales", "VHB", "VHC", "VHA", "VHD", "VHE", "serología hepatitis"],
    tasks: [
      { label: "Interpretar serología y tratar VHB", href: "infecciosas/hepatitis-virales-a-e.html#vhb" },
      { label: "Consultar tratamiento del VHC", href: "infecciosas/hepatitis-virales-a-e.html#vhc" },
      { label: "Revisar antes de los AAD", href: "infecciosas/hepatitis-virales-a-e.html#preaad" },
      { label: "Consultar hepatitis A, D y E", href: "infecciosas/hepatitis-virales-a-e.html#otros" }
    ],
    related: ["profilaxis-postexposicion-biologica-ppe", "vih-diagnostico-y-manejo-inicial", "bacteriemia-y-candidemia"]
  },
  {
    id: "infecciones-intraabdominales-iia",
    title: "Infecciones Intraabdominales (IIA)",
    href: "infecciosas/infecciones-intraabdominales-iia.html",
    context: "Tratamientos",
    kind: "Referencia",
    aliases: ["IIA", "infección intraabdominal", "peritonitis", "absceso abdominal"],
    tasks: [
      { label: "Iniciar manejo y controlar foco", href: "infecciosas/infecciones-intraabdominales-iia.html#foco" },
      { label: "Clasificar peritonitis", href: "infecciosas/infecciones-intraabdominales-iia.html#peritonitis" },
      { label: "Valorar absceso y drenaje", href: "infecciosas/infecciones-intraabdominales-iia.html#absceso" },
      { label: "Elegir tratamiento empírico", href: "infecciosas/infecciones-intraabdominales-iia.html#empirico" },
      { label: "Revisar duración", href: "infecciosas/infecciones-intraabdominales-iia.html#duracion" }
    ],
    related: ["proa-infecciones-gastrointestinales", "sepsis-abordaje-inicial-ssc-2026", "bacteriemia-y-candidemia"]
  },
  {
    id: "infecciones-nosocomiales",
    title: "Infecciones Nosocomiales",
    href: "infecciosas/infecciones-nosocomiales.html",
    context: "Planta",
    kind: "Referencia",
    aliases: ["infección nosocomial", "infección de catéter", "neumonía nosocomial", "infección quirúrgica"],
    tasks: [
      { label: "Buscar el foco", href: "infecciosas/infecciones-nosocomiales.html#mapa" },
      { label: "Valorar retirada del catéter", href: "infecciosas/infecciones-nosocomiales.html#cateter" },
      { label: "Revisar sitio quirúrgico", href: "infecciosas/infecciones-nosocomiales.html#quirurgico" },
      { label: "Consultar neumonía nosocomial", href: "infecciosas/infecciones-nosocomiales.html#neumonia" }
    ],
    related: ["bacteriemia-y-candidemia", "sepsis-abordaje-inicial-ssc-2026", "neutropenia-febril-nf", "osteomielitis-y-artritis-septica"]
  },
  {
    id: "neutropenia-febril-nf",
    title: "Neutropenia Febril (NF)",
    href: "infecciosas/neutropenia-febril-nf.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["neutropenia febril", "NF", "MASCC"],
    tasks: [
      { label: "Iniciar valoración", href: "infecciosas/neutropenia-febril-nf.html#emergencia" },
      { label: "Estratificar riesgo", href: "infecciosas/neutropenia-febril-nf.html#riesgo" },
      { label: "Elegir tratamiento empírico", href: "infecciosas/neutropenia-febril-nf.html#tratamiento" },
      { label: "Ajustar por foco", href: "infecciosas/neutropenia-febril-nf.html#focos" },
      { label: "Reevaluar la evolución", href: "infecciosas/neutropenia-febril-nf.html#reevaluacion" }
    ],
    related: ["betalactamicos", "proa-otros-antimicrobianos-aminoglucosidos-glucopeptidos-y-miscelanea", "bacteriemia-y-candidemia"]
  },
  {
    id: "osteomielitis-y-artritis-septica",
    title: "Osteomielitis y Artritis Séptica",
    href: "infecciosas/osteomielitis-y-artritis-septica.html",
    context: "Tratamientos",
    kind: "Referencia",
    aliases: ["osteomielitis", "artritis séptica", "pie diabético", "prótesis infectada"],
    tasks: [
      { label: "Decidir muestra y momento del antibiótico", href: "infecciosas/osteomielitis-y-artritis-septica.html#mapa" },
      { label: "Consultar osteomielitis", href: "infecciosas/osteomielitis-y-artritis-septica.html#osteomielitis" },
      { label: "Valorar pie diabético", href: "infecciosas/osteomielitis-y-artritis-septica.html#pie" },
      { label: "Actuar en artritis séptica", href: "infecciosas/osteomielitis-y-artritis-septica.html#artritis" },
      { label: "Valorar prótesis infectada", href: "infecciosas/osteomielitis-y-artritis-septica.html#protesis" }
    ],
    related: ["bacteriemia-y-candidemia", "betalactamicos", "covid-19"]
  },
  {
    id: "perfusion-extendida-continua-de-betalactamicos",
    title: "Perfusión Extendida / Continua de Betalactámicos",
    href: "infecciosas/perfusion-extendida-continua-de-betalactamicos.html",
    context: "Tratamientos",
    kind: "Referencia",
    aliases: ["perfusión extendida", "perfusión continua", "infusión prolongada", "betalactámicos"],
    tasks: [
      { label: "Decidir cuándo prolongar", href: "infecciosas/perfusion-extendida-continua-de-betalactamicos.html#cuando-usarla" },
      { label: "Consultar dosis y perfusión", href: "infecciosas/perfusion-extendida-continua-de-betalactamicos.html#grupo-a-perfusion-extendida-continua-como-estrategia-tras-bolo-de-carga" },
      { label: "Revisar perfusión según ficha técnica", href: "infecciosas/perfusion-extendida-continua-de-betalactamicos.html#grupo-b-perfusion-prolongada-ya-prevista-en-ficha-tecnica" },
      { label: "Preparar la administración", href: "infecciosas/perfusion-extendida-continua-de-betalactamicos.html#como-hacerlo-en-la-practica" }
    ],
    related: ["betalactamicos", "sepsis-antiinfecciosos-y-soporte-vital-ssc-2026", "proa-guia-de-antimicrobianos-y-sindromes-infecciosos"]
  },
  {
    id: "proa-guia-de-antimicrobianos-y-sindromes-infecciosos",
    title: "PROA - Guía de Antimicrobianos y Síndromes Infecciosos",
    href: "infecciosas/proa-guia-de-antimicrobianos-y-sindromes-infecciosos.html",
    context: "Tratamientos",
    kind: "Referencia",
    aliases: ["PROA", "antimicrobianos", "antibióticos", "tratamiento por síndrome", "paso a vía oral"],
    searchPriority: 20,
    tasks: [
      { label: "Elegir guía por síndrome", href: "infecciosas/proa-guia-de-antimicrobianos-y-sindromes-infecciosos.html#por-sindrome" },
      { label: "Buscar familia antimicrobiana", href: "infecciosas/proa-guia-de-antimicrobianos-y-sindromes-infecciosos.html#por-familia" },
      { label: "Revisar peso y función renal", href: "infecciosas/proa-guia-de-antimicrobianos-y-sindromes-infecciosos.html#ajuste" },
      { label: "Valorar paso a vía oral", href: "infecciosas/proa-guia-de-antimicrobianos-y-sindromes-infecciosos.html#paso-oral" }
    ],
    related: ["proa-infecciones-respiratorias", "proa-infecciones-de-transmision-sexual-its", "proa-infecciones-del-tracto-urinario-itu", "proa-infecciones-de-piel-y-partes-blandas"]
  },
  {
    id: "proa-infecciones-de-piel-y-partes-blandas",
    title: "PROA - Infecciones de Piel y Partes Blandas",
    href: "infecciosas/proa-infecciones-de-piel-y-partes-blandas.html",
    context: "Tratamientos",
    kind: "Referencia",
    aliases: ["infecciones de piel", "partes blandas", "IPPB", "celulitis", "erisipela", "impétigo", "mordedura"],
    tasks: [
      { label: "Clasificar la lesión", href: "infecciosas/proa-infecciones-de-piel-y-partes-blandas.html#algoritmo" },
      { label: "Elegir muestra", href: "infecciosas/proa-infecciones-de-piel-y-partes-blandas.html#muestras" },
      { label: "Tratar impétigo y erisipela", href: "infecciosas/proa-infecciones-de-piel-y-partes-blandas.html#superficiales" },
      { label: "Tratar celulitis o absceso", href: "infecciosas/proa-infecciones-de-piel-y-partes-blandas.html#celulitis-absceso" },
      { label: "Valorar mordedura o herida", href: "infecciosas/proa-infecciones-de-piel-y-partes-blandas.html#mordeduras-heridas" }
    ],
    related: ["proa-guia-de-antimicrobianos-y-sindromes-infecciosos", "proa-infecciones-gastrointestinales", "proa-infecciones-respiratorias"]
  },
  {
    id: "proa-infecciones-de-transmision-sexual-its",
    title: "PROA - Infecciones de Transmisión Sexual (ITS)",
    href: "infecciosas/proa-infecciones-de-transmision-sexual-its.html",
    context: "Tratamientos",
    kind: "Referencia",
    aliases: ["ITS", "infecciones de transmisión sexual", "sífilis", "uretritis", "vulvovaginitis"],
    tasks: [
      { label: "Completar cribado inicial", href: "infecciosas/proa-infecciones-de-transmision-sexual-its.html#cribado" },
      { label: "Tratar secreción o dolor", href: "infecciosas/proa-infecciones-de-transmision-sexual-its.html#secrecion-dolor" },
      { label: "Valorar lesiones genitales", href: "infecciosas/proa-infecciones-de-transmision-sexual-its.html#lesiones-genitales" },
      { label: "Consultar sífilis y vulvovaginitis", href: "infecciosas/proa-infecciones-de-transmision-sexual-its.html#sifilis-vaginitis" }
    ],
    related: ["proa-infecciones-gastrointestinales", "proa-infecciones-respiratorias", "proa-infecciones-de-piel-y-partes-blandas"]
  },
  {
    id: "proa-infecciones-del-tracto-urinario-itu",
    title: "ITU: tratamiento antimicrobiano (PROA)",
    href: "infecciosas/proa-infecciones-del-tracto-urinario-itu.html",
    context: "Tratamientos",
    kind: "Referencia",
    aliases: ["ITU", "infección urinaria", "cistitis", "pielonefritis", "prostatitis", "antibiótico urinario"],
    tasks: [
      { label: "Decidir si tratar", href: "infecciosas/proa-infecciones-del-tracto-urinario-itu.html#triaje-proa" },
      { label: "Consultar pauta de cistitis", href: "infecciosas/proa-infecciones-del-tracto-urinario-itu.html#cistitis" },
      { label: "Tratar pielonefritis o prostatitis", href: "infecciosas/proa-infecciones-del-tracto-urinario-itu.html#parenquima" },
      { label: "Revisar dispositivo y muestra", href: "infecciosas/proa-infecciones-del-tracto-urinario-itu.html#dispositivos" },
      { label: "Consultar alternativas en BLEE", href: "infecciosas/proa-infecciones-del-tracto-urinario-itu.html#blee" }
    ],
    related: ["proa-guia-de-antimicrobianos-y-sindromes-infecciosos", "proa-infecciones-gastrointestinales", "proa-infecciones-respiratorias"]
  },
  {
    id: "proa-infecciones-gastrointestinales",
    title: "PROA - Infecciones Gastrointestinales",
    href: "infecciosas/proa-infecciones-gastrointestinales.html",
    context: "Tratamientos",
    kind: "Referencia",
    aliases: ["diarrea infecciosa", "coprocultivo", "Clostridioides difficile", "C. difficile", "diarrea del viajero"],
    tasks: [
      { label: "Decidir coprocultivo", href: "infecciosas/proa-infecciones-gastrointestinales.html#coprocultivo" },
      { label: "Elegir manejo por patrón", href: "infecciosas/proa-infecciones-gastrointestinales.html#patrones" },
      { label: "Consultar diarrea del viajero", href: "infecciosas/proa-infecciones-gastrointestinales.html#viajero" },
      { label: "Tratar C. difficile", href: "infecciosas/proa-infecciones-gastrointestinales.html#cdi" }
    ],
    related: ["proa-guia-de-antimicrobianos-y-sindromes-infecciosos", "proa-infecciones-respiratorias", "proa-infecciones-de-piel-y-partes-blandas"]
  },
  {
    id: "proa-infecciones-respiratorias",
    title: "PROA - Infecciones Respiratorias",
    href: "infecciosas/proa-infecciones-respiratorias.html",
    context: "Tratamientos",
    kind: "Referencia",
    aliases: ["infección respiratoria", "antibiótico respiratorio", "faringitis", "otitis", "sinusitis", "neumonía"],
    tasks: [
      { label: "Decidir si necesita antibiótico", href: "infecciosas/proa-infecciones-respiratorias.html#cribado-antibiotico" },
      { label: "Consultar faringitis, otitis y sinusitis", href: "infecciosas/proa-infecciones-respiratorias.html#vias-altas" },
      { label: "Consultar bronquitis y EPOC", href: "infecciosas/proa-infecciones-respiratorias.html#vias-bajas" },
      { label: "Tratar neumonía ambulatoria", href: "infecciosas/proa-infecciones-respiratorias.html#nac" }
    ],
    related: ["proa-guia-de-antimicrobianos-y-sindromes-infecciosos", "proa-infecciones-gastrointestinales", "proa-infecciones-de-piel-y-partes-blandas"]
  },
  {
    id: "proa-otros-antimicrobianos-aminoglucosidos-glucopeptidos-y-miscelanea",
    title: "PROA - Otros Antimicrobianos (Aminoglucósidos, Glucopéptidos y Miscelánea)",
    href: "infecciosas/proa-otros-antimicrobianos-aminoglucosidos-glucopeptidos-y-miscelanea.html",
    context: "Tratamientos",
    kind: "Referencia",
    aliases: ["aminoglucósidos", "glucopéptidos", "vancomicina", "gentamicina", "amikacina", "daptomicina", "niveles"],
    tasks: [
      { label: "Consultar aminoglucósidos", href: "infecciosas/proa-otros-antimicrobianos-aminoglucosidos-glucopeptidos-y-miscelanea.html#aminoglucosidos" },
      { label: "Consultar vancomicina y alternativas IV", href: "infecciosas/proa-otros-antimicrobianos-aminoglucosidos-glucopeptidos-y-miscelanea.html#grampositivos" },
      { label: "Buscar otros antimicrobianos", href: "infecciosas/proa-otros-antimicrobianos-aminoglucosidos-glucopeptidos-y-miscelanea.html#miscelanea" },
      { label: "Planificar niveles", href: "infecciosas/proa-otros-antimicrobianos-aminoglucosidos-glucopeptidos-y-miscelanea.html#niveles" },
      { label: "Revisar vigilancia y toxicidad", href: "infecciosas/proa-otros-antimicrobianos-aminoglucosidos-glucopeptidos-y-miscelanea.html#vigilancia" }
    ],
    related: ["proa-guia-de-antimicrobianos-y-sindromes-infecciosos", "betalactamicos", "proa-quinolonas-macrolidos-y-relacionados"]
  },
  {
    id: "proa-quinolonas-macrolidos-y-relacionados",
    title: "PROA - Quinolonas, Macrólidos y Relacionados",
    href: "infecciosas/proa-quinolonas-macrolidos-y-relacionados.html",
    context: "Tratamientos",
    kind: "Referencia",
    aliases: ["quinolonas", "macrólidos", "clindamicina", "doxiciclina", "linezolid"],
    tasks: [
      { label: "Consultar quinolonas y ajuste renal", href: "infecciosas/proa-quinolonas-macrolidos-y-relacionados.html#quinolonas" },
      { label: "Consultar macrólidos", href: "infecciosas/proa-quinolonas-macrolidos-y-relacionados.html#macrolidos" },
      { label: "Consultar clindamicina y doxiciclina", href: "infecciosas/proa-quinolonas-macrolidos-y-relacionados.html#relacionados" },
      { label: "Revisar dosis y vigilancia de linezolid", href: "infecciosas/proa-quinolonas-macrolidos-y-relacionados.html#linezolid" }
    ],
    related: ["proa-guia-de-antimicrobianos-y-sindromes-infecciosos", "betalactamicos", "proa-otros-antimicrobianos-aminoglucosidos-glucopeptidos-y-miscelanea"]
  },
  {
    id: "profilaxis-postexposicion-biologica-ppe",
    title: "Profilaxis Postexposición Biológica (PPE)",
    href: "infecciosas/profilaxis-postexposicion-biologica-ppe.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["PPE", "profilaxis postexposición", "exposición biológica", "pinchazo accidental", "IGHB"],
    tasks: [
      { label: "Actuar tras la exposición", href: "infecciosas/profilaxis-postexposicion-biologica-ppe.html#primeros-auxilios" },
      { label: "Solicitar serologías", href: "infecciosas/profilaxis-postexposicion-biologica-ppe.html#serologias" },
      { label: "Decidir PPE de VIH", href: "infecciosas/profilaxis-postexposicion-biologica-ppe.html#vih" },
      { label: "Consultar vacuna e IGHB", href: "infecciosas/profilaxis-postexposicion-biologica-ppe.html#vhb" },
      { label: "Revisar exposición a VHC", href: "infecciosas/profilaxis-postexposicion-biologica-ppe.html#vhc" },
      { label: "Organizar seguimiento", href: "infecciosas/profilaxis-postexposicion-biologica-ppe.html#seguimiento" }
    ],
    related: ["hepatitis-virales-a-e", "vih-diagnostico-y-manejo-inicial", "proa-infecciones-de-transmision-sexual-its"]
  },
  {
    id: "sepsis-abordaje-inicial-ssc-2026",
    title: "Sepsis - Abordaje Inicial (SSC 2026)",
    href: "infecciosas/sepsis-abordaje-inicial-ssc-2026.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["sepsis", "SSC 2026", "SOFA", "tratamiento inicial sepsis"],
    searchPriority: 20,
    tasks: [
      { label: "Iniciar las primeras medidas", href: "infecciosas/sepsis-abordaje-inicial-ssc-2026.html#bundle" },
      { label: "Consultar SOFA", href: "infecciosas/sepsis-abordaje-inicial-ssc-2026.html#sofa" },
      { label: "Elegir tratamiento por foco", href: "infecciosas/sepsis-abordaje-inicial-ssc-2026.html#foco" },
      { label: "Valorar aviso a UCI", href: "infecciosas/sepsis-abordaje-inicial-ssc-2026.html#uci" },
      { label: "Revisar probabilidad y gravedad", href: "infecciosas/sepsis-abordaje-inicial-ssc-2026.html#reconocer" }
    ],
    related: ["sepsis-hemodinamica-y-reanimacion-ssc-2026", "sepsis-antiinfecciosos-y-soporte-vital-ssc-2026", "sepsis-cuidados-post-uci-y-objetivos-ssc-2026"]
  },
  {
    id: "sepsis-antiinfecciosos-y-soporte-vital-ssc-2026",
    title: "Sepsis - Antiinfecciosos y Soporte Vital (SSC 2026)",
    href: "infecciosas/sepsis-antiinfecciosos-y-soporte-vital-ssc-2026.html",
    context: "Tratamientos",
    kind: "Referencia",
    aliases: ["sepsis", "SSC 2026", "antibióticos sepsis", "soporte de órgano"],
    tasks: [
      { label: "Elegir empírico sin foco claro", href: "infecciosas/sepsis-antiinfecciosos-y-soporte-vital-ssc-2026.html#empirico" },
      { label: "Tratar bacteriemia", href: "infecciosas/sepsis-antiinfecciosos-y-soporte-vital-ssc-2026.html#bacteriemia" },
      { label: "Valorar cobertura de Candida", href: "infecciosas/sepsis-antiinfecciosos-y-soporte-vital-ssc-2026.html#candida" },
      { label: "Consultar soporte respiratorio", href: "infecciosas/sepsis-antiinfecciosos-y-soporte-vital-ssc-2026.html#respiratorio" },
      { label: "Consultar soporte de órgano", href: "infecciosas/sepsis-antiinfecciosos-y-soporte-vital-ssc-2026.html#soporte" },
      { label: "Revisar tiempo y desescalada", href: "infecciosas/sepsis-antiinfecciosos-y-soporte-vital-ssc-2026.html#antibiotico" }
    ],
    related: ["sepsis-abordaje-inicial-ssc-2026", "sepsis-hemodinamica-y-reanimacion-ssc-2026", "sepsis-cuidados-post-uci-y-objetivos-ssc-2026"]
  },
  {
    id: "sepsis-cuidados-post-uci-y-objetivos-ssc-2026",
    title: "Sepsis - Cuidados Post-UCI y Objetivos (SSC 2026)",
    href: "infecciosas/sepsis-cuidados-post-uci-y-objetivos-ssc-2026.html",
    context: "Consulta",
    kind: "Seguimiento",
    aliases: ["sepsis", "post UCI", "secuelas sepsis", "objetivos de cuidado"],
    tasks: [
      { label: "Acordar objetivos de cuidado", href: "infecciosas/sepsis-cuidados-post-uci-y-objetivos-ssc-2026.html#objetivos" },
      { label: "Preparar el traspaso", href: "infecciosas/sepsis-cuidados-post-uci-y-objetivos-ssc-2026.html#transiciones" },
      { label: "Preparar el alta", href: "infecciosas/sepsis-cuidados-post-uci-y-objetivos-ssc-2026.html#alta" },
      { label: "Buscar secuelas post-UCI", href: "infecciosas/sepsis-cuidados-post-uci-y-objetivos-ssc-2026.html#post-uci" },
      { label: "Organizar primera revisión", href: "infecciosas/sepsis-cuidados-post-uci-y-objetivos-ssc-2026.html#seguimiento" }
    ],
    related: ["sepsis-abordaje-inicial-ssc-2026", "sepsis-hemodinamica-y-reanimacion-ssc-2026", "sepsis-antiinfecciosos-y-soporte-vital-ssc-2026"]
  },
  {
    id: "sepsis-hemodinamica-y-reanimacion-ssc-2026",
    title: "Sepsis - Hemodinámica y Reanimación (SSC 2026)",
    href: "infecciosas/sepsis-hemodinamica-y-reanimacion-ssc-2026.html",
    context: "Urgencias",
    kind: "Referencia",
    aliases: ["sepsis", "reanimación", "fluidoterapia", "vasopresores", "vasoactivos"],
    tasks: [
      { label: "Elegir fluido y volumen inicial", href: "infecciosas/sepsis-hemodinamica-y-reanimacion-ssc-2026.html#fluidos" },
      { label: "Reevaluar respuesta", href: "infecciosas/sepsis-hemodinamica-y-reanimacion-ssc-2026.html#respuesta" },
      { label: "Consultar dosis de vasoactivos", href: "infecciosas/sepsis-hemodinamica-y-reanimacion-ssc-2026.html#vasopresores" },
      { label: "Definir monitorización", href: "infecciosas/sepsis-hemodinamica-y-reanimacion-ssc-2026.html#monitorizacion" },
      { label: "Valorar retirada de fluidos", href: "infecciosas/sepsis-hemodinamica-y-reanimacion-ssc-2026.html#retirada" }
    ],
    related: ["sepsis-abordaje-inicial-ssc-2026", "sepsis-antiinfecciosos-y-soporte-vital-ssc-2026", "sepsis-cuidados-post-uci-y-objetivos-ssc-2026"]
  },
  {
    id: "sepsis-y-shock-septico",
    title: "Sepsis y Shock Séptico",
    href: "infecciosas/sepsis-y-shock-septico.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["sepsis", "shock séptico", "primera hora sepsis"],
    searchPriority: 30,
    tasks: [
      { label: "Iniciar los primeros 60 minutos", href: "infecciosas/sepsis-y-shock-septico.html#primeros-60" },
      { label: "Actuar ante shock", href: "infecciosas/sepsis-y-shock-septico.html#shock" },
      { label: "Decidir destino", href: "infecciosas/sepsis-y-shock-septico.html#destino" },
      { label: "Continuar manejo por problema", href: "infecciosas/sepsis-y-shock-septico.html#serie" }
    ],
    related: ["sepsis-abordaje-inicial-ssc-2026", "sepsis-hemodinamica-y-reanimacion-ssc-2026", "sepsis-antiinfecciosos-y-soporte-vital-ssc-2026", "sepsis-cuidados-post-uci-y-objetivos-ssc-2026"]
  },
  {
    id: "tuberculosis-tb",
    title: "Tuberculosis (TB)",
    href: "infecciosas/tuberculosis-tb.html",
    context: "Consulta",
    kind: "Referencia",
    aliases: ["tuberculosis", "TB", "ITL", "infección tuberculosa latente", "aislamiento"],
    tasks: [
      { label: "Actuar ante la sospecha", href: "infecciosas/tuberculosis-tb.html#sospecha" },
      { label: "Solicitar microbiología", href: "infecciosas/tuberculosis-tb.html#diagnostico" },
      { label: "Consultar pauta de TB activa", href: "infecciosas/tuberculosis-tb.html#tratamiento" },
      { label: "Consultar tratamiento de ITL", href: "infecciosas/tuberculosis-tb.html#itl" },
      { label: "Organizar aislamiento y contactos", href: "infecciosas/tuberculosis-tb.html#aislamiento" }
    ],
    related: ["vih-diagnostico-y-manejo-inicial", "profilaxis-postexposicion-biologica-ppe", "bacteriemia-y-candidemia"]
  },
  {
    id: "ulceras-por-presion-upp",
    title: "Úlceras por Presión (UPP)",
    href: "infecciosas/ulceras-por-presion-upp.html",
    context: "Técnicas",
    kind: "Referencia",
    aliases: ["UPP", "úlceras por presión", "escaras", "apósitos", "desbridamiento"],
    tasks: [
      { label: "Organizar primera valoración", href: "infecciosas/ulceras-por-presion-upp.html#plan" },
      { label: "Identificar estadio", href: "infecciosas/ulceras-por-presion-upp.html#estadios" },
      { label: "Elegir cura y apósito", href: "infecciosas/ulceras-por-presion-upp.html#cura" },
      { label: "Consultar desbridamiento", href: "infecciosas/ulceras-por-presion-upp.html#desbridamiento" },
      { label: "Valorar infección", href: "infecciosas/ulceras-por-presion-upp.html#infeccion" }
    ],
    related: ["proa-infecciones-de-piel-y-partes-blandas", "osteomielitis-y-artritis-septica", "covid-19"]
  },
  {
    id: "vih-diagnostico-y-manejo-inicial",
    title: "VIH — Diagnóstico y Manejo Inicial",
    href: "infecciosas/vih-diagnostico-y-manejo-inicial.html",
    context: "Consulta",
    kind: "Valoración inicial",
    aliases: ["VIH", "TAR", "Pneumocystis", "primera visita VIH"],
    tasks: [
      { label: "Organizar la primera visita", href: "infecciosas/vih-diagnostico-y-manejo-inicial.html#primera-visita" },
      { label: "Confirmar y estadiar", href: "infecciosas/vih-diagnostico-y-manejo-inicial.html#diagnostico" },
      { label: "Valorar neumonía por Pneumocystis", href: "infecciosas/vih-diagnostico-y-manejo-inicial.html#pjp" },
      { label: "Consultar TAR inicial", href: "infecciosas/vih-diagnostico-y-manejo-inicial.html#tar" },
      { label: "Revisar profilaxis", href: "infecciosas/vih-diagnostico-y-manejo-inicial.html#profilaxis" }
    ],
    related: ["profilaxis-postexposicion-biologica-ppe", "tuberculosis-tb", "hepatitis-virales-a-e", "neutropenia-febril-nf"]
  },
  {
    id: "enfermedad-renal-cronica",
    title: "Enfermedad renal crónica",
    href: "nefro-uro/enfermedad-renal-cronica.html",
    context: "Consulta",
    kind: "Seguimiento",
    aliases: ["ERC", "enfermedad renal crónica", "albuminuria", "filtrado glomerular"],
    tasks: [
      { label: "Confirmar y clasificar", href: "nefro-uro/enfermedad-renal-cronica.html#diagnostico" },
      { label: "Valorar derivación", href: "nefro-uro/enfermedad-renal-cronica.html#riesgo" },
      { label: "Revisar tratamiento", href: "nefro-uro/enfermedad-renal-cronica.html#nefroproteccion" },
      { label: "Revisar enfermedad intercurrente", href: "nefro-uro/enfermedad-renal-cronica.html#enfermedad-aguda" },
      { label: "Organizar seguimiento", href: "nefro-uro/enfermedad-renal-cronica.html#seguimiento" }
    ],
    related: ["fracaso-renal-agudo", "diabetes-tipo-2", "riesgo-cardiovascular-y-dislipemia"]
  },
  {
    id: "fracaso-renal-agudo",
    title: "Fracaso renal agudo",
    href: "nefro-uro/fracaso-renal-agudo.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["FRA", "LRA", "fracaso renal agudo", "lesión renal aguda", "oliguria"],
    tasks: [
      { label: "Iniciar valoración", href: "nefro-uro/fracaso-renal-agudo.html#primeros-30" },
      { label: "Orientar la causa", href: "nefro-uro/fracaso-renal-agudo.html#diferencial" },
      { label: "Interpretar índices urinarios", href: "nefro-uro/fracaso-renal-agudo.html#indices" },
      { label: "Consultar manejo inicial", href: "nefro-uro/fracaso-renal-agudo.html#manejo" },
      { label: "Valorar diálisis", href: "nefro-uro/fracaso-renal-agudo.html#dialisis" }
    ],
    related: ["enfermedad-renal-cronica", "urologia-urgente", "trastornos-ionicos-y-acido-base"]
  },
  {
    id: "itu-pielonefritis-y-prostatitis",
    title: "ITU, pielonefritis y prostatitis: valoración clínica",
    href: "nefro-uro/itu-pielonefritis-y-prostatitis.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["ITU", "infección urinaria", "cistitis", "pielonefritis", "prostatitis", "urocultivo"],
    tasks: [
      { label: "Valorar síntomas y gravedad", href: "nefro-uro/itu-pielonefritis-y-prostatitis.html#triaje" },
      { label: "Revisar cultivo y resistencias", href: "nefro-uro/itu-pielonefritis-y-prostatitis.html#micro-cultivo" },
      { label: "Tratar cistitis", href: "nefro-uro/itu-pielonefritis-y-prostatitis.html#cistitis" },
      { label: "Valorar pielonefritis", href: "nefro-uro/itu-pielonefritis-y-prostatitis.html#pna" },
      { label: "Consultar prostatitis", href: "nefro-uro/itu-pielonefritis-y-prostatitis.html#prostatitis" },
      { label: "Revisar situaciones especiales", href: "nefro-uro/itu-pielonefritis-y-prostatitis.html#especiales" }
    ],
    related: ["urologia-urgente", "proa-infecciones-del-tracto-urinario-itu", "sepsis-y-shock-septico"]
  },
  {
    id: "urologia-urgente",
    title: "Urología urgente",
    href: "nefro-uro/urologia-urgente.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["cólico renal", "retención urinaria", "hematuria", "escroto agudo"],
    tasks: [
      { label: "Iniciar valoración", href: "nefro-uro/urologia-urgente.html#primeros-10" },
      { label: "Valorar cólico", href: "nefro-uro/urologia-urgente.html#colico" },
      { label: "Resolver retención", href: "nefro-uro/urologia-urgente.html#rao" },
      { label: "Valorar hematuria", href: "nefro-uro/urologia-urgente.html#hematuria" },
      { label: "Valorar escroto agudo", href: "nefro-uro/urologia-urgente.html#escroto" }
    ],
    related: ["fracaso-renal-agudo", "itu-pielonefritis-y-prostatitis", "proa-infecciones-de-transmision-sexual-its"]
  },
  {
    id: "asma",
    title: "Asma",
    href: "neumo/asma.html",
    context: "Consulta",
    kind: "Seguimiento",
    aliases: ["asma", "crisis asmática", "inhaladores", "control del asma"],
    tasks: [
      { label: "Confirmar el diagnóstico", href: "neumo/asma.html#confirmar" },
      { label: "Revisar control", href: "neumo/asma.html#control" },
      { label: "Ajustar mantenimiento", href: "neumo/asma.html#escalones" },
      { label: "Atender una crisis", href: "neumo/asma.html#crisis" },
      { label: "Comprobar inhaladores", href: "neumo/asma.html#inhaladores" }
    ],
    related: ["rinitis-y-rinosinusitis", "epoc", "insuficiencia-respiratoria"]
  },
  {
    id: "epoc",
    title: "EPOC",
    href: "neumo/epoc.html",
    context: "Consulta",
    kind: "Seguimiento",
    aliases: ["EPOC", "agudización EPOC", "enfermedad pulmonar obstructiva crónica"],
    tasks: [
      { label: "Confirmar y clasificar", href: "neumo/epoc.html#diagnostico" },
      { label: "Revisar mantenimiento", href: "neumo/epoc.html#cronico" },
      { label: "Atender una agudización", href: "neumo/epoc.html#agudizacion" },
      { label: "Decidir antibiótico", href: "neumo/epoc.html#antibiotico" },
      { label: "Decidir ingreso o alta", href: "neumo/epoc.html#ingreso-alta" }
    ],
    related: ["asma", "insuficiencia-respiratoria", "neumonia-y-bronquitis"]
  },
  {
    id: "insuficiencia-respiratoria",
    title: "Insuficiencia respiratoria y SDRA",
    href: "neumo/insuficiencia-respiratoria.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["insuficiencia respiratoria", "SDRA", "gasometría", "VMNI", "oxigenoterapia"],
    tasks: [
      { label: "Primeros minutos", href: "neumo/insuficiencia-respiratoria.html#abc" },
      { label: "Interpretar gasometría", href: "neumo/insuficiencia-respiratoria.html#gasometria" },
      { label: "Elegir soporte", href: "neumo/insuficiencia-respiratoria.html#soporte" },
      { label: "Reevaluar respuesta", href: "neumo/insuficiencia-respiratoria.html#reevaluacion" },
      { label: "Ventilación en SDRA", href: "neumo/insuficiencia-respiratoria.html#ventilacion" }
    ],
    related: ["disnea-aguda", "epoc", "asma", "insuficiencia-cardiaca"]
  },
  {
    id: "neumonia-y-bronquitis",
    title: "Neumonía, bronquitis y broncoespasmo",
    href: "neumo/neumonia-y-bronquitis.html",
    context: "Consulta",
    kind: "Valoración inicial",
    aliases: ["neumonía", "NAC", "bronquitis", "broncoespasmo", "tos aguda"],
    tasks: [
      { label: "Valorar la tos aguda", href: "neumo/neumonia-y-bronquitis.html#diferencial" },
      { label: "Decidir destino", href: "neumo/neumonia-y-bronquitis.html#destino" },
      { label: "Antibiótico en neumonía", href: "neumo/neumonia-y-bronquitis.html#antibiotico-nac" },
      { label: "Valorar sibilancias", href: "neumo/neumonia-y-bronquitis.html#broncoespasmo" },
      { label: "Preparar seguimiento", href: "neumo/neumonia-y-bronquitis.html#seguimiento" }
    ],
    related: ["asma", "epoc", "insuficiencia-respiratoria"]
  },
  {
    id: "rinitis-y-rinosinusitis",
    title: "Rinitis alérgica y rinosinusitis",
    href: "neumo/rinitis-y-rinosinusitis.html",
    context: "Consulta",
    kind: "Seguimiento",
    aliases: ["rinitis", "rinosinusitis", "sinusitis", "poliposis nasal"],
    tasks: [
      { label: "Reconocer rinitis", href: "neumo/rinitis-y-rinosinusitis.html#diagnostico" },
      { label: "Revisar alarmas", href: "neumo/rinitis-y-rinosinusitis.html#alarma" },
      { label: "Valorar rinosinusitis aguda", href: "neumo/rinitis-y-rinosinusitis.html#aguda" },
      { label: "Elegir tratamiento", href: "neumo/rinitis-y-rinosinusitis.html#tratamiento" },
      { label: "Enseñar técnica nasal", href: "neumo/rinitis-y-rinosinusitis.html#spray" },
      { label: "Valorar poliposis", href: "neumo/rinitis-y-rinosinusitis.html#poliposis" }
    ],
    related: ["asma", "orl-frecuente", "neumonia-y-bronquitis"]
  },
  {
    id: "cefaleas",
    title: "Cefaleas",
    href: "neuro/cefaleas.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["cefalea", "migraña", "racimos", "neuralgia"],
    tasks: [
      { label: "Decidir destino", href: "neuro/cefaleas.html#triaje" },
      { label: "Revisar banderas rojas", href: "neuro/cefaleas.html#snoop" },
      { label: "Tratar migraña", href: "neuro/cefaleas.html#migrana" },
      { label: "Tratar racimos", href: "neuro/cefaleas.html#racimos" },
      { label: "Valorar neuralgia", href: "neuro/cefaleas.html#neuralgias" },
      { label: "Preparar alta y seguimiento", href: "neuro/cefaleas.html#alta" }
    ],
    related: ["ictus-y-hemorragia", "infeccion-snc-y-mielopatias", "tce"]
  },
  {
    id: "coma-y-confusion",
    title: "Coma, bajo nivel y síndrome confusional",
    href: "neuro/coma-y-confusion.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["coma", "confusión", "delirium", "síndrome confusional", "bajo nivel de conciencia"],
    tasks: [
      { label: "Estabilizar en los primeros minutos", href: "neuro/coma-y-confusion.html#entrada" },
      { label: "Explorar y localizar", href: "neuro/coma-y-confusion.html#exploracion" },
      { label: "Buscar causas reversibles", href: "neuro/coma-y-confusion.html#reversibles" },
      { label: "Reconocer delirium", href: "neuro/coma-y-confusion.html#delirium" },
      { label: "Tratar delirium", href: "neuro/coma-y-confusion.html#tratamiento" }
    ],
    related: ["crisis-y-neuromuscular", "infeccion-snc-y-mielopatias", "trastornos-ionicos-y-acido-base", "crisis-hiperglucemicas"]
  },
  {
    id: "crisis-y-neuromuscular",
    title: "Crisis y neuromuscular urgente",
    href: "neuro/crisis-y-neuromuscular.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["convulsiones", "crisis epiléptica", "status epiléptico", "miastenia", "Guillain Barré"],
    tasks: [
      { label: "Valorar gravedad y destino", href: "neuro/crisis-y-neuromuscular.html#destino" },
      { label: "Atender status epiléptico", href: "neuro/crisis-y-neuromuscular.html#status" },
      { label: "Consultar dosis de rescate", href: "neuro/crisis-y-neuromuscular.html#antiepilepticos" },
      { label: "Medir función respiratoria", href: "neuro/crisis-y-neuromuscular.html#respiratorio" },
      { label: "Crisis miasténica", href: "neuro/crisis-y-neuromuscular.html#miastenia" },
      { label: "Guillain-Barré", href: "neuro/crisis-y-neuromuscular.html#gbs" }
    ],
    related: ["coma-y-confusion", "insuficiencia-respiratoria", "trastornos-ionicos-y-acido-base"]
  },
  {
    id: "esclerosis-multiple-y-sincope",
    title: "Esclerosis múltiple y síncope neurológico",
    href: "neuro/esclerosis-multiple-y-sincope.html",
    context: "Consulta",
    kind: "Referencia",
    aliases: ["EM", "esclerosis múltiple", "brote", "síncope", "pérdida de conciencia"],
    tasks: [
      { label: "Distinguir brote y pseudobrote", href: "neuro/esclerosis-multiple-y-sincope.html#brote" },
      { label: "Orientar pérdida de conciencia", href: "neuro/esclerosis-multiple-y-sincope.html#sincope" },
      { label: "Estratificar síncope", href: "neuro/esclerosis-multiple-y-sincope.html#riesgo" },
      { label: "Estudiar sospecha de EM", href: "neuro/esclerosis-multiple-y-sincope.html#diagnostico-em" },
      { label: "Tratar el brote", href: "neuro/esclerosis-multiple-y-sincope.html#tratamiento-em" },
      { label: "Revisar precauciones", href: "neuro/esclerosis-multiple-y-sincope.html#trampas" }
    ],
    related: ["infeccion-snc-y-mielopatias", "crisis-y-neuromuscular", "aorta-valvulas-y-estructural", "fibrilacion-auricular-y-arritmias"]
  },
  {
    id: "ictus-y-hemorragia",
    title: "Ictus y hemorragia intracraneal",
    href: "neuro/ictus-y-hemorragia.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["ictus", "ACV", "AIT", "HSA", "hemorragia intracraneal", "reperfusión"],
    tasks: [
      { label: "Primeros diez minutos", href: "neuro/ictus-y-hemorragia.html#entrada" },
      { label: "Activar y estudiar ictus", href: "neuro/ictus-y-hemorragia.html#codigo-ictus" },
      { label: "Valorar reperfusión", href: "neuro/ictus-y-hemorragia.html#reperfusion" },
      { label: "Cefalea en trueno y HSA", href: "neuro/ictus-y-hemorragia.html#hsa" },
      { label: "Hemorragia intracerebral", href: "neuro/ictus-y-hemorragia.html#hic" },
      { label: "Trombosis venosa cerebral", href: "neuro/ictus-y-hemorragia.html#tvc" }
    ],
    related: ["fibrilacion-auricular-y-arritmias", "hipertension-arterial", "cefaleas", "mareo-urgencias"]
  },
  {
    id: "infeccion-snc-y-mielopatias",
    title: "Infección SNC y mielopatías",
    href: "neuro/infeccion-snc-y-mielopatias.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["meningitis", "encefalitis", "mielopatía", "infección SNC", "déficit medular"],
    tasks: [
      { label: "Actuar en la primera hora", href: "neuro/infeccion-snc-y-mielopatias.html#primera-hora" },
      { label: "Sospecha de meningitis", href: "neuro/infeccion-snc-y-mielopatias.html#meningitis" },
      { label: "Sospecha de encefalitis", href: "neuro/infeccion-snc-y-mielopatias.html#encefalitis" },
      { label: "Déficit medular agudo", href: "neuro/infeccion-snc-y-mielopatias.html#mielopatia" },
      { label: "Hipertensión intracraneal", href: "neuro/infeccion-snc-y-mielopatias.html#htic" },
      { label: "Revisar la orden inicial", href: "neuro/infeccion-snc-y-mielopatias.html#tratamiento" }
    ],
    related: ["coma-y-confusion", "crisis-y-neuromuscular", "esclerosis-multiple-y-sincope"]
  },
  {
    id: "tce",
    title: "Traumatismo craneoencefálico",
    href: "neuro/tce.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["TCE", "traumatismo craneoencefálico", "traumatismo craneal", "TC craneal", "Glasgow"],
    tasks: [
      { label: "Primera valoración", href: "neuro/tce.html#entrada" },
      { label: "Decidir TC craneal", href: "neuro/tce.html#tc" },
      { label: "Valorar columna cervical", href: "neuro/tce.html#cervical" },
      { label: "Atender TCE grave", href: "neuro/tce.html#grave" },
      { label: "Controlar presión intracraneal", href: "neuro/tce.html#pic" },
      { label: "Preparar alta y vigilancia", href: "neuro/tce.html#alta" }
    ],
    related: ["coma-y-confusion", "soporte-vital-y-exploracion", "crisis-y-neuromuscular", "cefaleas"]
  },
  {
    id: "agitacion-y-crisis",
    title: "Agitación, crisis de ansiedad y abstinencia",
    href: "psiquiatria/agitacion-y-crisis.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["agitación", "crisis de ansiedad", "abstinencia alcohólica", "delirium tremens"],
    tasks: [
      { label: "Asegurar la primera valoración", href: "psiquiatria/agitacion-y-crisis.html#puerta" },
      { label: "Consultar fármacos y precauciones", href: "psiquiatria/agitacion-y-crisis.html#farmacos-agitacion" },
      { label: "Reevaluar tras medicar", href: "psiquiatria/agitacion-y-crisis.html#reevaluacion" },
      { label: "Valorar una crisis de ansiedad", href: "psiquiatria/agitacion-y-crisis.html#ansiedad" },
      { label: "Valorar abstinencia alcohólica", href: "psiquiatria/agitacion-y-crisis.html#abstinencia" },
      { label: "Consultar delirium tremens", href: "psiquiatria/agitacion-y-crisis.html#dt" }
    ],
    related: ["riesgo-autolitico", "psicosis-y-esquizofrenia", "coma-y-confusion", "trastornos-afectivos-y-ansiedad"]
  },
  {
    id: "psicosis-y-esquizofrenia",
    title: "Psicosis aguda y esquizofrenia",
    href: "psiquiatria/psicosis-y-esquizofrenia.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["psicosis", "esquizofrenia", "primer episodio psicótico"],
    tasks: [
      { label: "Orientar el primer episodio", href: "psiquiatria/psicosis-y-esquizofrenia.html#algoritmo" },
      { label: "Buscar causa médica", href: "psiquiatria/psicosis-y-esquizofrenia.html#organicidad" },
      { label: "Elegir pruebas", href: "psiquiatria/psicosis-y-esquizofrenia.html#pruebas" },
      { label: "Preparar la entrevista", href: "psiquiatria/psicosis-y-esquizofrenia.html#entrevista" },
      { label: "Decidir el destino", href: "psiquiatria/psicosis-y-esquizofrenia.html#destino" }
    ],
    related: ["agitacion-y-crisis", "riesgo-autolitico", "coma-y-confusion"]
  },
  {
    id: "riesgo-autolitico",
    title: "Riesgo autolítico",
    href: "psiquiatria/riesgo-autolitico.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["riesgo autolítico", "suicidio", "ideación suicida", "plan de seguridad"],
    tasks: [
      { label: "Explorar ideas, plan y medios", href: "psiquiatria/riesgo-autolitico.html#entrevista" },
      { label: "Integrar los factores de riesgo", href: "psiquiatria/riesgo-autolitico.html#riesgo" },
      { label: "Decidir el circuito", href: "psiquiatria/riesgo-autolitico.html#circuito" },
      { label: "Preparar el plan de seguridad", href: "psiquiatria/riesgo-autolitico.html#plan-seguridad" },
      { label: "Tratar síntomas durante la visita", href: "psiquiatria/riesgo-autolitico.html#tratamiento" }
    ],
    related: ["agitacion-y-crisis", "trastornos-afectivos-y-ansiedad", "psicosis-y-esquizofrenia"]
  },
  {
    id: "trastornos-afectivos-y-ansiedad",
    title: "Depresión y trastornos de ansiedad",
    href: "psiquiatria/trastornos-afectivos-y-ansiedad.html",
    context: "Consulta",
    kind: "Seguimiento",
    aliases: ["depresión", "ansiedad", "antidepresivos", "trastornos afectivos"],
    tasks: [
      { label: "Valorar seguridad", href: "psiquiatria/trastornos-afectivos-y-ansiedad.html#puerta" },
      { label: "Buscar causas secundarias", href: "psiquiatria/trastornos-afectivos-y-ansiedad.html#organicidad" },
      { label: "Valorar derivación", href: "psiquiatria/trastornos-afectivos-y-ansiedad.html#gravedad" },
      { label: "Consultar antidepresivos", href: "psiquiatria/trastornos-afectivos-y-ansiedad.html#antidepresivos" },
      { label: "Organizar el seguimiento", href: "psiquiatria/trastornos-afectivos-y-ansiedad.html#seguimiento" },
      { label: "Valorar una crisis aguda", href: "psiquiatria/trastornos-afectivos-y-ansiedad.html#crisis-ansiedad" }
    ],
    related: ["riesgo-autolitico", "agitacion-y-crisis", "psicosis-y-esquizofrenia"]
  },
  {
    id: "articulaciones-y-extremidades",
    title: "Articulaciones y extremidades",
    href: "trauma-derma-orl/articulaciones-y-extremidades.html",
    context: "Urgencias",
    kind: "Exploración",
    aliases: ["traumatismo extremidades", "muñeca", "rodilla", "tobillo", "hombro", "esguince"],
    tasks: [
      { label: "Hacer la primera exploración", href: "trauma-derma-orl/articulaciones-y-extremidades.html#primeros-5" },
      { label: "Valorar muñeca tras caída", href: "trauma-derma-orl/articulaciones-y-extremidades.html#muneca-segura" },
      { label: "Explorar una rodilla", href: "trauma-derma-orl/articulaciones-y-extremidades.html#rodilla-exploracion" },
      { label: "Valorar tobillo y pie", href: "trauma-derma-orl/articulaciones-y-extremidades.html#tobillo-dedos" },
      { label: "Explorar hombro, codo y mano", href: "trauma-derma-orl/articulaciones-y-extremidades.html#miembro-superior" },
      { label: "Preparar tratamiento y revisión", href: "trauma-derma-orl/articulaciones-y-extremidades.html#tratamiento" }
    ],
    related: ["monoartritis-y-gota", "columna-y-lumbalgia", "heridas-y-suturas", "cot-y-trauma"]
  },
  {
    id: "columna-y-lumbalgia",
    title: "Columna: cervicalgia, lumbalgia y lumbociática",
    href: "trauma-derma-orl/columna-y-lumbalgia.html",
    context: "Consulta",
    kind: "Valoración inicial",
    aliases: ["lumbalgia", "lumbociática", "ciática", "cervicalgia", "dolor radicular"],
    tasks: [
      { label: "Buscar banderas rojas", href: "trauma-derma-orl/columna-y-lumbalgia.html#banderas-rojas" },
      { label: "Explorar dolor radicular", href: "trauma-derma-orl/columna-y-lumbalgia.html#lumbociatica" },
      { label: "Consultar tratamiento inicial", href: "trauma-derma-orl/columna-y-lumbalgia.html#tratamiento" },
      { label: "Valorar claudicación al caminar", href: "trauma-derma-orl/columna-y-lumbalgia.html#estenosis" },
      { label: "Valorar cervicalgia", href: "trauma-derma-orl/columna-y-lumbalgia.html#cervicalgia" },
      { label: "Preparar el alta y las alarmas", href: "trauma-derma-orl/columna-y-lumbalgia.html#alta" }
    ],
    related: ["articulaciones-y-extremidades", "psoriasis-dermatitis-seborreica", "cot-y-trauma"]
  },
  {
    id: "dermatologia-urgente",
    title: "Enfermedades ampollares y toxicodermias",
    href: "trauma-derma-orl/dermatologia-urgente.html",
    context: "Consulta",
    kind: "Valoración inicial",
    aliases: ["toxicodermia", "ampollas", "enfermedades ampollares"],
    tasks: [
      { label: "Describir el patrón", href: "trauma-derma-orl/dermatologia-urgente.html#enfoque" },
      { label: "Revisar cronología farmacológica", href: "trauma-derma-orl/dermatologia-urgente.html#toxicodermias" },
      { label: "Comparar enfermedades ampollares", href: "trauma-derma-orl/dermatologia-urgente.html#ampollas" },
      { label: "Preparar el estudio por biopsia", href: "trauma-derma-orl/dermatologia-urgente.html#biopsia" },
      { label: "Reconocer cuándo no esperar", href: "trauma-derma-orl/dermatologia-urgente.html#no-esperar" },
      { label: "Organizar el seguimiento", href: "trauma-derma-orl/dermatologia-urgente.html#seguimiento" }
    ],
    related: ["exploracion-cutanea", "infecciones-cutaneas-virosis-its", "urticaria-angioedema-prurito"]
  },
  {
    id: "heridas-y-suturas",
    title: "Heridas, suturas y trauma general",
    href: "trauma-derma-orl/heridas-y-suturas.html",
    context: "Técnicas",
    kind: "Referencia",
    aliases: ["heridas", "suturas", "trauma", "tétanos", "cierre de heridas"],
    tasks: [
      { label: "Explorar la herida", href: "trauma-derma-orl/heridas-y-suturas.html#exploracion" },
      { label: "Decidir el cierre", href: "trauma-derma-orl/heridas-y-suturas.html#cerrar-o-no" },
      { label: "Revisar profilaxis antitetánica", href: "trauma-derma-orl/heridas-y-suturas.html#tetanos" },
      { label: "Preparar curas y alta", href: "trauma-derma-orl/heridas-y-suturas.html#alta" },
      { label: "Valorar el traumatismo", href: "trauma-derma-orl/heridas-y-suturas.html#trauma-general" }
    ],
    related: ["articulaciones-y-extremidades", "proa-infecciones-de-piel-y-partes-blandas", "curas-y-exploracion"]
  },
  {
    id: "orl-frecuente",
    title: "ORL frecuente",
    href: "trauma-derma-orl/orl-frecuente.html",
    context: "Urgencias",
    kind: "Referencia",
    aliases: ["ORL", "otalgia", "otitis", "epistaxis", "faringitis", "ATM"],
    tasks: [
      { label: "Buscar señales de alarma", href: "trauma-derma-orl/orl-frecuente.html#alarma" },
      { label: "Consultar garganta y nariz", href: "trauma-derma-orl/orl-frecuente.html#garganta-nariz" },
      { label: "Valorar la otalgia", href: "trauma-derma-orl/orl-frecuente.html#otologia" },
      { label: "Atender una epistaxis", href: "trauma-derma-orl/orl-frecuente.html#epistaxis" },
      { label: "Valorar ATM y foco dental", href: "trauma-derma-orl/orl-frecuente.html#atm-dental" }
    ],
    related: ["proa-infecciones-respiratorias", "alopecias-unas-patologia-oral", "curas-y-exploracion"]
  },
  {
    id: "anafilaxia",
    title: "Anafilaxia",
    href: "urgencias/anafilaxia.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["anafilaxia", "reacción anafiláctica", "adrenalina"],
    tasks: [
      { label: "Actuar en los primeros minutos", href: "urgencias/anafilaxia.html#primeros-minutos" },
      { label: "Consultar dosis", href: "urgencias/anafilaxia.html#dosis" },
      { label: "Reconocer anafilaxia", href: "urgencias/anafilaxia.html#reconocer" },
      { label: "Escalar si no responde", href: "urgencias/anafilaxia.html#refractaria" },
      { label: "Observación y plan al alta", href: "urgencias/anafilaxia.html#observacion" }
    ],
    related: ["shock", "disnea-aguda", "asma"]
  },
  {
    id: "disnea-aguda",
    title: "Disnea aguda",
    href: "urgencias/disnea-aguda.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["disnea", "disnea aguda", "dificultad respiratoria"],
    tasks: [
      { label: "Reconocer gravedad", href: "urgencias/disnea-aguda.html#gravedad" },
      { label: "Elegir soporte respiratorio", href: "urgencias/disnea-aguda.html#soporte" },
      { label: "Orientar la causa", href: "urgencias/disnea-aguda.html#orientacion" },
      { label: "Elegir pruebas", href: "urgencias/disnea-aguda.html#pruebas" },
      { label: "Tratamiento inicial", href: "urgencias/disnea-aguda.html#tratamiento" },
      { label: "Reevaluar y decidir destino", href: "urgencias/disnea-aguda.html#salida" }
    ],
    related: ["insuficiencia-respiratoria", "insuficiencia-cardiaca", "tep-y-tvp", "epoc"]
  },
  {
    id: "must-sindromes",
    title: "MUST: síndromes frecuentes",
    href: "urgencias/must-sindromes.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["MUST", "síndromes frecuentes", "triaje", "fiebre", "síncope"],
    tasks: [
      { label: "Triaje inicial", href: "urgencias/must-sindromes.html#triaje" },
      { label: "Valorar dolor abdominal", href: "urgencias/must-sindromes.html#abdominal" },
      { label: "Valorar fiebre y sepsis", href: "urgencias/must-sindromes.html#fiebre-sepsis" },
      { label: "Estratificar síncope", href: "urgencias/must-sindromes.html#sincope" },
      { label: "Déficit neurológico agudo", href: "urgencias/must-sindromes.html#neurologico" },
      { label: "Confusión y agitación", href: "urgencias/must-sindromes.html#confusion-agitacion" }
    ],
    related: ["dolor-abdominal", "cefaleas", "coma-y-confusion", "sepsis-y-shock-septico"]
  },
  {
    id: "shock",
    title: "Shock",
    href: "urgencias/shock.html",
    context: "Urgencias",
    kind: "Valoración inicial",
    aliases: ["shock", "hipoperfusión", "POCUS", "hipotensión"],
    tasks: [
      { label: "Reconocer hipoperfusión", href: "urgencias/shock.html#confirmar" },
      { label: "Primeros quince minutos", href: "urgencias/shock.html#primeros-minutos" },
      { label: "Distinguir el tipo de shock", href: "urgencias/shock.html#fenotipo" },
      { label: "Orientar con POCUS", href: "urgencias/shock.html#pocus" },
      { label: "Consultar fármacos", href: "urgencias/shock.html#farmacos" },
      { label: "Tratar la causa y decidir destino", href: "urgencias/shock.html#causa" }
    ],
    related: ["sepsis-y-shock-septico", "anafilaxia", "sindrome-coronario-agudo", "tep-y-tvp"]
  },
  {
    id: "soporte-vital-y-exploracion",
    title: "Soporte vital y exploración dirigida",
    href: "urgencias/soporte-vital-y-exploracion.html",
    context: "Urgencias",
    kind: "Referencia",
    aliases: ["soporte vital", "RCP", "ABCDE", "exploración dirigida"],
    tasks: [
      { label: "Revisar soporte vital avanzado", href: "urgencias/soporte-vital-y-exploracion.html#sva" },
      { label: "Organizar roles", href: "urgencias/soporte-vital-y-exploracion.html#roles" },
      { label: "Buscar causas reversibles", href: "urgencias/soporte-vital-y-exploracion.html#causas" },
      { label: "Tras recuperar pulso", href: "urgencias/soporte-vital-y-exploracion.html#rce" },
      { label: "Explorar rodilla", href: "urgencias/soporte-vital-y-exploracion.html#rodilla" },
      { label: "Explorar tobillo y antepié", href: "urgencias/soporte-vital-y-exploracion.html#tobillo" }
    ],
    related: ["shock", "trastornos-ionicos-y-acido-base", "articulaciones-y-extremidades"]
  },
  {
    id: "trastornos-ionicos-y-acido-base",
    title: "Trastornos iónicos y ácido-base",
    href: "urgencias/trastornos-ionicos-y-acido-base.html",
    context: "Urgencias",
    kind: "Referencia",
    aliases: ["iones", "sodio", "potasio", "hiponatremia", "hipernatremia", "hiperpotasemia", "hipopotasemia", "acidosis", "alcalosis"],
    tasks: [
      { label: "Reconocer peligro inmediato", href: "urgencias/trastornos-ionicos-y-acido-base.html#peligro" },
      { label: "Consultar alteraciones del sodio", href: "urgencias/trastornos-ionicos-y-acido-base.html#sodio" },
      { label: "Consultar alteraciones del potasio", href: "urgencias/trastornos-ionicos-y-acido-base.html#potasio" },
      { label: "Revisar dosis y reposición", href: "urgencias/trastornos-ionicos-y-acido-base.html#reposicion" },
      { label: "Planificar la reevaluación", href: "urgencias/trastornos-ionicos-y-acido-base.html#reevaluacion" },
      { label: "Interpretar la gasometría", href: "urgencias/trastornos-ionicos-y-acido-base.html#gasometria" }
    ],
    related: ["fracaso-renal-agudo", "soporte-vital-y-exploracion", "shock"]
  }
];

if (typeof module !== "undefined" && module.exports) module.exports = GUIDE_CATALOG;
