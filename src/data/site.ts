import { editorialMedia } from "@/data/editorial-media";

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
  eyebrow: "Laguna, montana y una vida mas serena",
  tagline:
    "Un territorio pensado para desconectarte del ruido y acercarte a lo esencial, entre laguna, montana y silencio.",
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
      "Lotes abiertos a una lectura amplia del paisaje, con silencio, horizonte y vocacion de refugio.",
    image: editorialMedia.projectAlpinas.src,
    locationLabel: "Alpinas etapa 1 y 2",
    mapKey: "alpinas",
  },
  VG: {
    code: "VG",
    name: "Virgilio",
    summary:
      "Un tramo donde la laguna y la amplitud del terreno convierten la inversion en una presencia serena y memorable.",
    image: editorialMedia.projectVirgilio.src,
    locationLabel: "Virgilio",
    mapKey: "virgilio",
  },
  PR: {
    code: "PR",
    name: "Lotizacion Piuray",
    summary:
      "Un paisaje de campo abierto donde la tierra se siente pausa, aire y horizonte patrimonial.",
    image: editorialMedia.projectPiuray.src,
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
      "Referencia que amplia la lectura del paisaje y refuerza la presencia del proyecto en un entorno de gran calma.",
  },
];

export const benefits = [
  {
    title: "Naturaleza con profundidad",
    copy:
      "Huaypo no se mira de pasada. Se siente amplio, silencioso y lleno de aire, como si el paisaje hubiera guardado espacio para una vida mas plena.",
  },
  {
    title: "Club que acompana la vida",
    copy:
      "La propuesta suma encuentro, sobremesa, fuego, descanso y comunidad. No es un extra: es parte de la forma de habitar este lugar.",
  },
  {
    title: "Inversion con paisaje",
    copy:
      "Invertir aqui no es elegir un lote cualquiera. Es entrar en un paisaje que conserva belleza, horizonte y una promesa de valorizacion sostenida.",
  },
  {
    title: "Visitas que revelan el lugar",
    copy:
      "Hay decisiones que solo se aclaran caminando la tierra. Por eso la visita es una parte central de la experiencia, no un paso secundario.",
  },
];

export const huaypoStories = [
  {
    title: "El paisaje aquieta la mirada",
    copy:
      "Entre laguna, cielo y montana, el ruido pierde fuerza. Queda una sensacion de calma que cambia la forma de imaginar una propiedad.",
  },
  {
    title: "La tierra gana sentido",
    copy:
      "No es solo una inversion. Es una presencia futura, una pausa propia y una forma mas consciente de proyectar patrimonio.",
  },
  {
    title: "Silencio, comunidad y tiempo",
    copy:
      "Huaypo une retiro y pertenencia. La naturaleza no te aisla: te acerca a una comunidad que comparte otra velocidad de vida.",
  },
];

export const clubHighlights = [
  {
    title: "Encuentros bajo otro cielo",
    copy:
      "El club propone un punto de reunion donde la tarde se alarga, el fuego convoca y la vida social se vuelve parte del paisaje.",
  },
  {
    title: "Bienestar que se vuelve costumbre",
    copy:
      "Cada espacio acompana la idea de descanso con mas calidez: madera, piedra, aire libre y momentos que se quieren repetir.",
  },
  {
    title: "Pertenencia con identidad",
    copy:
      "Cuando un proyecto ofrece comunidad y atmosfera, deja de sentirse como una compra fria y empieza a sentirse como un lugar propio.",
  },
];

export const locationHighlights = [
  {
    title: "Laguna, montana y horizonte",
    copy:
      "La fuerza del lugar esta en su amplitud. El paisaje no solo rodea al proyecto: le da identidad y profundidad emocional.",
  },
  {
    title: "Llegar se siente natural",
    copy:
      "La visita se coordina con facilidad para que el traslado no sea una barrera, sino el comienzo de la experiencia.",
  },
  {
    title: "Referencias que acercan",
    copy:
      "Ver el mapa, entender los accesos y ubicar los puntos clave ayuda a imaginar la visita con mucha mas certeza.",
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
    heroLabel: "Cercania, comunidad y un terreno con mucha vida alrededor",
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
      "Sentimos que no estabamos comprando un terreno aislado, sino un lugar donde queriamos volver una y otra vez.",
    author: "Familia Quispe",
  },
  {
    quote:
      "Lo distinto aqui es la atmosfera: naturaleza, club y una sensacion de pertenencia que aparece desde la primera visita.",
    author: "Socio Alpinas",
  },
];
