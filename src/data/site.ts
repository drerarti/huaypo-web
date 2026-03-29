export type Lot = {
  id?: string;
  code: string;
  slug: string;
  name: string;
  area: string;
  price: string;
  stage: string;
  status: string;
  summary: string;
  location: string;
  view: string;
  heroLabel: string;
  intro: string;
  description: string;
  features: string[];
  idealFor: string[];
  access: string[];
  projectCode?: string;
  projectName?: string;
  phase?: string;
  block?: string;
  lotNumber?: string;
  areaValue?: number;
  priceValue?: number;
  image?: string;
  mapKey?: string;
  featured?: boolean;
};

export const siteSettings = {
  brand: "Corporacion Ayllu Laguna Huaypo",
  brandCompact: "Ayllu Laguna Huaypo",
  projectLabel: "Laguna Huaypo",
  eyebrow: "Lotes, laguna y estilo de vida",
  tagline:
    "Lotes, naturaleza y una presentacion inmobiliaria premium para proyectos con caracter alrededor de Huaypo y su entorno.",
  whatsappNumber: "51910847262",
  whatsappDisplay: "+51 910 847 262",
  phone: "+51 910 847 262",
  email: "rodrigoesp871@gmail.com",
  address: "Huaypo, Chinchero, Cusco",
  schedule: "Visitas guiadas de lunes a domingo, previa coordinacion.",
  mapEmbedUrl: "https://www.google.com/maps?q=Huaypo%20Cusco&z=12&output=embed",
  mapDirectionsUrl: "https://www.google.com/maps?q=Huaypo%20Cusco",
};

export const projectCatalog = {
  ALP: {
    code: "ALP",
    name: "Alpinas Etapa 1 y 2",
    summary:
      "Una lectura de lotes premium-natural con fuerte relacion con el paisaje y el concepto de proyecto.",
    image: "/media/alp-f2-360.jpg",
    locationLabel: "Alpinas etapa 1 y 2",
    mapKey: "alpinas",
  },
  VG: {
    code: "VG",
    name: "Virgilio",
    summary:
      "Sector con buena presencia de inventario y una narrativa comercial clara para compradores que buscan amplitud y proyeccion.",
    image: "/media/laguna-atardecer.jpg",
    locationLabel: "Virgilio",
    mapKey: "virgilio",
  },
  PR: {
    code: "PR",
    name: "Lotizacion Piuray",
    summary:
      "Una opcion de lotes con lectura patrimonial y un contexto natural muy atractivo para presentacion comercial.",
    image: "/media/fogata.jpg",
    locationLabel: "Lotizacion Piuray",
    mapKey: "piuray",
  },
} as const;

export const siteLocations = [
  {
    key: "virgilio",
    name: "Virgilio",
    mapEmbedUrl: "https://www.google.com/maps?q=Virgilio%20Huaypo%20Cusco&z=14&output=embed",
    mapLink: "https://maps.app.goo.gl/cK2L7WyRg4CQjSir6",
    copy:
      "Referencia de ubicacion para un recorrido con fuerte lectura de paisaje y cercania emocional con la laguna.",
  },
  {
    key: "alpinas",
    name: "Alpinas etapa 1 y 2",
    mapEmbedUrl: "https://www.google.com/maps?q=Alpinas%20Huaypo%20Cusco&z=14&output=embed",
    mapLink: "https://maps.app.goo.gl/x82M5UHjNDCyukMZA",
    copy:
      "Sector clave dentro de la narrativa del proyecto, ideal para explicar propuesta, entorno y estilo de vida.",
  },
  {
    key: "piuray",
    name: "Lotizacion Piuray",
    mapEmbedUrl: "https://www.google.com/maps?q=Piuray%20Cusco&z=14&output=embed",
    mapLink: "https://maps.app.goo.gl/kbxdDrY3jid49KeW6",
    copy:
      "Ubicacion de referencia para ampliar la lectura comercial del portafolio y reforzar presencia territorial.",
  },
];

export const benefits = [
  {
    title: "Lotes con una narrativa clara",
    copy:
      "La propuesta no gira solo alrededor del metraje. Cada lote se presenta como una forma de invertir, descansar y proyectar vida de campo con identidad.",
  },
  {
    title: "Club como valor diferencial",
    copy:
      "El club refuerza la experiencia del proyecto con espacios sociales y recreativos que convierten la compra en una decision mas emocional y aspiracional.",
  },
  {
    title: "Entorno con potencial de valorizacion",
    copy:
      "Huaypo combina paisaje, tranquilidad y crecimiento de interes inmobiliario, algo clave para compradores que miran futuro y calidad de vida al mismo tiempo.",
  },
  {
    title: "Comercializacion cercana y guiada",
    copy:
      "La web prioriza agendar visitas, conversar por WhatsApp y orientar la decision con acompanamiento, no solo mostrar fichas.",
  },
];

export const huaypoStories = [
  {
    title: "Paisaje que baja el ritmo",
    copy:
      "Huaypo invita a desconectarse del apuro y reconectar con aire limpio, amplitud visual y una rutina mas humana.",
  },
  {
    title: "Inversion con mas significado",
    copy:
      "La compra se siente solida cuando une tierra, proyeccion de valorizacion y una experiencia que la familia puede disfrutar desde el primer dia.",
  },
  {
    title: "Vida social en un entorno natural",
    copy:
      "El valor del proyecto crece porque la naturaleza no esta aislada: se complementa con comunidad, club y encuentros reales.",
  },
];

export const clubHighlights = [
  {
    title: "Comunidad con ritmo propio",
    copy:
      "El club crea un punto de encuentro para familias, socios e invitados, con una atmosfera de descanso bien cuidada.",
  },
  {
    title: "Amenidades que elevan la propuesta",
    copy:
      "Los espacios del club ayudan a que el proyecto se perciba como una experiencia completa, no como una compra aislada.",
  },
  {
    title: "Una marca inmobiliaria con vida",
    copy:
      "Mostrar el club en la web aporta credibilidad, deseo y una identidad diferencial frente a ofertas mas planas.",
  },
];

export const locationHighlights = [
  {
    title: "Entorno natural de alto valor percibido",
    copy:
      "El proyecto se apoya en la amplitud del paisaje, la calma del entorno y una cercania emocional con Cusco que lo vuelve escapada y destino a la vez.",
  },
  {
    title: "Accesos para visitas y recorridos",
    copy:
      "La web deja claro que visitar es facil: se puede coordinar por WhatsApp, recibir una guia y entender rapidamente el recorrido hasta la zona.",
  },
  {
    title: "Mapa y orientacion claros para la visita",
    copy:
      "La referencia visual del mapa ayuda a ubicar el proyecto, entender los accesos y bajar fricciones al momento de coordinar el recorrido.",
  },
];

export const lots: Lot[] = [
  {
    code: "AH-A12",
    slug: "mirador-huaypo-a12",
    name: "Mirador Huaypo",
    area: "540 m2",
    price: "US$ 29,500",
    stage: "Etapa 1",
    status: "Disponible",
    summary:
      "Un lote pensado para quien busca primera entrada al proyecto con buena proyeccion, amplitud y una vista abierta al valle.",
    location: "Sector mirador, a pocos minutos del club",
    view: "Vista amplia hacia Huaypo y el paisaje abierto",
    heroLabel: "Salida de fin de semana con vocacion de refugio",
    intro:
      "Mirador Huaypo es una opcion que combina acceso comodo, una lectura clara del terreno y una sensacion inmediata de respiro visual.",
    description:
      "Su metraje permite imaginar una casa de campo con terraza, jardin y zonas de descanso. Es un lote comercialmente atractivo para clientes que valoran paisaje, acceso y una entrada cuidada al proyecto.",
    features: [
      "Topografia amable para una implantacion flexible.",
      "Relacion cercana con los accesos principales del proyecto.",
      "Dimension pensada para una vivienda de descanso con buen retiro.",
    ],
    idealFor: [
      "Familias que quieren iniciar su patrimonio en Huaypo.",
      "Compradores que priorizan vista y proyeccion de uso inmediato.",
      "Clientes que valoran cercania al club sin perder privacidad.",
    ],
    access: [
      "Ingreso guiado previa coordinacion con el equipo comercial.",
      "Visitas recomendadas en horario de manana o tarde para apreciar la luz.",
      "Coordinacion rapida por WhatsApp para recorrido y reserva.",
    ],
    featured: true,
  },
  {
    code: "AH-B07",
    slug: "bosque-alpinas-b07",
    name: "Bosque Alpinas",
    area: "620 m2",
    price: "US$ 33,900",
    stage: "Etapa 2",
    status: "Ultimos disponibles",
    summary:
      "Una alternativa muy equilibrada para quien quiere estar cerca del corazon social del proyecto y construir una rutina mas activa.",
    location: "Franja cercana a servicios y recorrido interno",
    view: "Relacion directa con areas verdes y atmosfera de club",
    heroLabel: "Cercania, comunidad y un terreno con mucha lectura comercial",
    intro:
      "Bosque Alpinas acerca la experiencia del proyecto a quienes buscan una mezcla de naturaleza, movimiento y acceso rapido a las amenidades del club.",
    description:
      "Es un lote especialmente atractivo para perfiles familiares o para quienes imaginan una segunda vivienda con facil integracion a la vida social del proyecto. La sensacion es mas cercana, viva y comunitaria.",
    features: [
      "Metraje comodo para una casa de campo con zonas sociales.",
      "Muy buena relacion con recorridos peatonales y areas comunes.",
      "Ubicacion comercialmente fuerte para compradores que quieren disfrutar desde el inicio.",
    ],
    idealFor: [
      "Familias con interes en vida de club.",
      "Socios que quieren vincular mas su inversion con el estilo de vida del proyecto.",
      "Clientes que prefieren cercania funcional y valor aspiracional.",
    ],
    access: [
      "Recorrido guiado desde la zona de recepcion del proyecto.",
      "Coordinacion rapida para visita presencial o videollamada comercial.",
      "Asesoria para revisar disponibilidad y opcion de reserva.",
    ],
    featured: true,
  },
  {
    code: "AH-C03",
    slug: "sendero-del-valle-c03",
    name: "Sendero del Valle",
    area: "780 m2",
    price: "US$ 41,000",
    stage: "Etapa premium",
    status: "Reservas abiertas",
    summary:
      "Un lote de mayor amplitud y sensacion de retiro, pensado para quien quiere una presencia mas privada dentro del proyecto.",
    location: "Tramo sereno con mayor separacion entre frentes",
    view: "Entorno natural mas recogido y silencioso",
    heroLabel: "Mas terreno, mas calma y una lectura premium del proyecto",
    intro:
      "Sendero del Valle responde a un perfil que busca amplitud, baja densidad percibida y libertad para desarrollar una propuesta arquitectonica propia.",
    description:
      "Su dimension permite jugar con volumetria, patios, terrazas y una relacion mas generosa entre construccion y paisaje. Es el tipo de lote que transforma la compra en una declaracion de estilo de vida.",
    features: [
      "Mayor metraje para un proyecto arquitectonico mas ambicioso.",
      "Sensacion de privacidad reforzada por su ubicacion.",
      "Muy buena lectura para una propuesta premium o patrimonial.",
    ],
    idealFor: [
      "Clientes que buscan retiro con una huella mas exclusiva.",
      "Compradores con vision de largo plazo y disfrute familiar.",
      "Personas que priorizan amplitud sobre cercania inmediata.",
    ],
    access: [
      "Visita coordinada para apreciar recorrido, orientacion y contexto.",
      "Acompanamiento comercial enfocado en lectura de valor del lote.",
      "Informacion lista para seguimiento y reserva posterior.",
    ],
    featured: true,
  },
  {
    code: "AH-D09",
    slug: "ladera-huaypo-d09",
    name: "Ladera Huaypo",
    area: "500 m2",
    price: "US$ 27,800",
    stage: "Etapa 1",
    status: "Disponible",
    summary:
      "Una entrada accesible al proyecto para quien busca orden, valor y una primera decision bien acompanada.",
    location: "Acceso organizado con recorrido sencillo",
    view: "Perspectiva limpia al paisaje del entorno",
    heroLabel: "Compra inteligente para empezar con una buena base",
    intro:
      "Ladera Huaypo se presenta como una alternativa clara para compradores que quieren tomar decision rapido sin sacrificar identidad ni potencial.",
    description:
      "Su formato lo vuelve un lote muy comercial y versatil, ideal para una primera aproximacion al proyecto o para inversion con lectura pragmatica.",
    features: [
      "Acceso sencillo y buena lectura del terreno.",
      "Precio atractivo dentro del conjunto del proyecto.",
      "Versatil para casa de campo compacta o inversion.",
    ],
    idealFor: [
      "Compradores primerizos en el proyecto.",
      "Inversionistas que buscan una entrada ordenada al inventario.",
      "Clientes que valoran claridad y rapidez de decision.",
    ],
    access: [
      "Agenda simple para visita y orientacion inicial.",
      "Soporte comercial para resolver dudas de compra.",
      "Seguimiento posterior por WhatsApp y correo.",
    ],
  },
  {
    code: "AH-E05",
    slug: "laguna-serena-e05",
    name: "Laguna Serena",
    area: "690 m2",
    price: "US$ 37,400",
    stage: "Etapa 2",
    status: "Disponible",
    summary:
      "Un lote que equilibra amplitud, serenidad y una lectura muy amable del paisaje para una casa de descanso con caracter.",
    location: "Zona intermedia con buena relacion entre vista y acceso",
    view: "Visual abierta y atmosfera serena del entorno",
    heroLabel: "Equilibrio entre amplitud, calma y proyecto de vida",
    intro:
      "Laguna Serena conecta bien con quienes imaginan una casa de campo luminosa, con jardin y vida pausada, sin alejarse demasiado de la dinamica del conjunto.",
    description:
      "Es una opcion muy completa: tiene amplitud, una situacion espacial agradable y una forma de presentarse que transmite calma sin perder atractivo comercial.",
    features: [
      "Metraje generoso para una casa familiar con exteriores.",
      "Ubicacion equilibrada dentro del proyecto.",
      "Muy buena alternativa para una compra emocional y patrimonial.",
    ],
    idealFor: [
      "Familias que imaginan estadias largas o vida semiresidencial.",
      "Clientes que quieren paisaje sin aislarse.",
      "Compradores que buscan una opcion redonda y flexible.",
    ],
    access: [
      "Visitas guiadas con enfoque en orientacion y lectura del lote.",
      "Material comercial listo para seguimiento posterior.",
      "Apoyo del equipo para avanzar a reserva o decision final.",
    ],
  },
];

export const testimonials = [
  {
    quote:
      "Lo que nos convencio fue que no sentiamos que estabamos comprando un terreno suelto, sino una forma de proyectarnos en Huaypo.",
    author: "Familia Quispe",
  },
  {
    quote:
      "La propuesta se siente distinta porque combina naturaleza, club y una comunidad que ya tiene identidad propia.",
    author: "Socio Alpinas",
  },
];
