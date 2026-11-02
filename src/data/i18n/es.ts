/**
 * es.ts, Spanish. Translated from en.ts; shape: see ./types.ts.
 * Keep every key; translate values only. Metric and stat values use Spanish number formatting (1.790, 5,0, 200 %).
 */
import type { LocaleBundle } from './types';

export const es: LocaleBundle = {
  projects: {
    'coach-luki': {
      desc: 'Web de entrenamiento personal orientada a la conversión para el entrenador personal vegano de referencia en Berlín.',
      challenge: 'Luke Satterly (Coach Luki) es uno de los entrenadores personales más comprometidos de Berlín. Atleta vegano que entrena a sus clientes en Holmes Place y John Reed, necesitaba una web a la altura de su energía: atrevida, centrada en resultados y construida para convertir. El objetivo era simple. Alguien llega a la web, entiende exactamente qué hace Luki, ve las pruebas y reserva una llamada. Sin relleno. Sin confusión. Solo resultados.',
      solution: 'Diseñamos una web donde cada sección empuja hacia un único objetivo: reservar una consulta gratuita. La integración de pagos con Stripe permite a los clientes comprar paquetes de sesiones directamente y sin fricción. El SEO local para Berlín se integró desde el primer día, apuntando a búsquedas como "personal trainer Berlín" y "entrenador fitness vegano Berlín".',
      results: 'Una web de entrenamiento personal totalmente optimizada para la conversión, en línea en Berlín, diseñada, construida y desplegada por Blok Blok Studio. Los clientes ahora reservan y pagan directamente en la web, sin mensajes directos ni facturas. El posicionamiento SEO local atrae tráfico orgánico de quienes buscan en Berlín.',
    },
    'bronco-plumbing': {
      desc: 'Web de captación de clientes y sistema de crecimiento online para una empresa de fontanería de Dallas-Fort Worth.',
      challenge: 'Colton Staley lanzó Bronco Plumbing en Dallas-Fort Worth en 2026 como empresa de primer año gestionada por su propietario. Partía de cero: sin web, sin presencia online y sin forma de que los propietarios de DFW que buscaban un fontanero pudieran encontrarlo. En los oficios, quien aparece primero en Google con pruebas de un trabajo de calidad se lleva la llamada.',
      solution: 'Construimos una web orientada a la conversión en torno al propio Colton: el dueño atiende cada llamada, presupuestos honestos y reseñas reales de Google cargadas en vivo. Cada sección empuja hacia una llamada o una solicitud de presupuesto, con una barra de llamada fija en el móvil para quienes buscan en plena emergencia. El SEO local para búsquedas de fontanería en DFW se integró desde el primer día, y el canal de contacto alimenta directamente su flujo de trabajos.',
      results: 'En sus primeros 5 meses, Colton generó más de $50.000 de ingresos brutos entre su trabajo de fontanería y el sistema online. La web mantiene una valoración de 5,0 estrellas en 52 reseñas de Google, ocupa una posición media de 5,2 en Google para sus términos de búsqueda y acumuló más de 8.000 impresiones de búsqueda en sus primeros 3 meses de seguimiento.',
      metrics: [
        {
          value: '$50k',
          label: 'Ingresos brutos en los primeros 5 meses',
        },
        {
          value: '5,0',
          label: 'Valoración en Google con 52 reseñas',
        },
        {
          value: '5,2',
          label: 'Posición media en Google',
        },
        {
          value: '8.000+',
          label: 'Impresiones de búsqueda en 3 meses',
        },
      ],
    },
    'coach-kofi': {
      desc: 'Marca personal de alto rendimiento y plataforma de coaching con una identidad visual atrevida.',
      challenge: 'Coach Kofi necesitaba una web de marca personal a la altura de su contundente filosofía "Just Do The Work". Su presencia online anterior no reflejaba la energía ni la autoridad que aporta al coaching de movimiento, rendimiento y desarrollo.',
      solution: 'Diseñamos una web impactante en blanco y negro con tipografía atrevida, fotografía profesional integrada y un flujo de conversión claro de visitante a cliente de coaching. La web incluye reservas en tiempo real, contadores de prueba social (más de 150 clientes, más de 8.000 horas de entrenamiento) y un diseño responsive con enfoque mobile first.',
      results: 'Una presencia de marca profesional que transmite autoridad al instante. El flujo de reservas simplificado aumentó las solicitudes de consulta un 200 %, y el diseño atrevido se convirtió en un sello de la identidad de marca de Coach Kofi en todas las plataformas.',
      metrics: [
        {
          value: '200 %',
          label: 'Más solicitudes de consulta tras el lanzamiento',
        },
      ],
    },
    'exotic-ripz': {
      desc: 'Plataforma de e-commerce vibrante para una marca de la comunidad de cartas coleccionables.',
      challenge: 'Exotic Ripz necesitaba una tienda online que captara la emoción y la energía de la comunidad de cartas coleccionables. Necesitaban una plataforma capaz de gestionar sobres, nuevos lanzamientos, reposiciones y la participación de la comunidad en Discord, Twitch y redes sociales.',
      solution: 'Construimos una tienda Shopify completa con una marca animada y atrevida, enlaces integrados a la comunidad de Discord, presencia social multiplataforma (Discord, YouTube, Twitch, TikTok, Instagram, X, Threads), categorización inteligente de productos y popups optimizados para la captación de emails.',
      results: 'Más de $191.000 en ventas de cartas coleccionables en 1.790 pedidos en la tienda que construimos y entregamos, con el sistema de envíos configurado de principio a fin. La lista de correo creció un 400 % el primer mes gracias a la captación inteligente con descuentos, y los drops de sobres se agotaban sistemáticamente en pocas horas. La tienda se devolvió a sus propietarios para que la gestionaran, y desde entonces la han retirado, por lo que no hay un enlace en vivo que compartir.',
      metrics: [
        {
          value: '$191k',
          label: 'Ventas a través de la tienda',
        },
        {
          value: '1.790',
          label: 'Pedidos enviados',
        },
        {
          value: '400 %',
          label: 'Crecimiento de la lista de correo el primer mes',
        },
      ],
    },
    'kds-systems': {
      desc: 'Plataforma moderna de soluciones en la nube para un proveedor de servicios de TI gestionados y computación en la nube.',
      challenge: 'KDS Systems Inc. necesitaba una presencia digital profesional que comunicara su experiencia en computación en la nube, Microsoft Office 365, soluciones de almacenamiento y aplicaciones alojadas. La web anterior no transmitía la escala ni la fiabilidad de sus servicios de TI gestionados.',
      solution: 'Diseñamos una web moderna y elegante con una estética tecnológica oscura, acentos en verde intenso y una presentación clara de los servicios. La web incluye secciones de computación en la nube, almacenamiento y aplicaciones alojadas con iconografía visual, llamadas a la acción para reservar consultas y señales de confianza de nivel empresarial.',
      results: 'Una presencia de marca profesional que posiciona a KDS Systems como un socio de confianza en soluciones en la nube. El flujo de reserva de consultas simplificado y la comunicación clara de los servicios aumentaron de forma significativa los leads cualificados.',
    },
    'public-affair': {
      desc: 'Identidad de marca sofisticada y experiencia web para una marca de estilo de vida premium.',
      challenge: 'Public Affair necesitaba una presencia digital que transmitiera lujo, sofisticación y exclusividad. La marca requería una experiencia de verificación de edad elegante que marcara el tono antes incluso de que los visitantes entraran en la web principal.',
      solution: 'Creamos una experiencia de marca elegante que empieza con una puerta de verificación de edad cuidadosamente diseñada, con tipografía caligráfica a medida y una rica paleta en azul marino y dorado. Cada punto de contacto se diseñó para sentirse premium, desde el monograma P.A. hasta los textos refinados que convierten la verificación en una invitación y no en una barrera.',
      results: 'El reconocimiento de marca aumentó de forma significativa en los segmentos objetivo. La verificación de edad tiene una tasa de finalización superior al 95 %. Los visitantes disfrutan de la experiencia de entrada en lugar de abandonar. El posicionamiento premium se tradujo en un mayor valor percibido y en pedidos medios más altos.',
      metrics: [
        {
          value: '95 %+',
          label: 'Visitantes que completan la verificación de edad',
        },
      ],
    },
    'military-newschool': {
      desc: 'Presencia web institucional para el Center for Military-Affiliated Students de The New School.',
      challenge: 'El Center for Military-Affiliated Students de The New School, fundado en 2023, necesitaba una presencia digital que honrara a la comunidad vinculada al ejército y encajara en el lenguaje de diseño moderno de la universidad. La web debía comunicar con claridad los servicios de apoyo, los programas y los recursos.',
      solution: 'Diseñamos una página limpia y profesional dentro del ecosistema de The New School, con fotografía potente, una arquitectura de la información clara y contenido accesible que da la bienvenida a los estudiantes vinculados al ejército a una comunidad de académicos, artistas y diseñadores.',
      results: 'El centro cuenta ahora con una presencia digital sólida que comunica su misión con eficacia. Mayor interacción de futuros estudiantes vinculados al ejército y un acceso más sencillo a los programas y servicios de apoyo.',
    },
    'grant-parkhurst': {
      desc: 'Web de portafolio y portal de fotos autogestionado para clientes de un fotógrafo de Salt Lake City.',
      challenge: 'Grant Parkhurst fotografía retratos, eventos y fotografía analógica en Salt Lake City. Necesitaba un solo lugar que mostrara su trabajo en sus proporciones naturales, listara las localidades que cubre, aceptara reservas y le permitiera entregar las galerías terminadas a sus clientes sin andar enviando enlaces de descarga por email.',
      solution: 'Construimos una web donde manda la fotografía y ninguna imagen se recorta, con tarjetas de servicios, portadas de álbum alineadas en cada fila, una sección de cobertura y un flujo de reservas. Detrás hay un portal de clientes en /portal: Grant inicia sesión, crea galerías, las sube a su propio almacenamiento de fotos y las comparte, y los clientes ven y descargan sus series.',
      results: 'La web y el portal se publicaron en agosto y septiembre de 2026, con Grant gestionando sus propias galerías desde el primer día. El dominio público ya no está en nuestro hosting, así que aquí no hay enlace en vivo; las capturas muestran la web tal y como la entregamos.',
    },
  },
  blog: {
    'why-your-website-is-losing-customers': {
      readTime: '5 min de lectura',
      content: `Tu web pierde clientes por razones predecibles: carga demasiado lento, no dice qué haces, frustra a quien entra desde el móvil y no da a los visitantes ningún motivo para confiar en ti. Nada de esto es una suposición. Estudios de Google, el Nielsen Norman Group y el Baymard Institute ponen cifras a cada una de estas razones, y todas tienen solución.

## 1. Los tiempos de carga lentos matan las conversiones

Cuando la BBC analizó su propio tráfico, descubrió que perdía un 10 % adicional de usuarios por cada segundo extra que tardaba en cargar la web. La otra cara es igual de real: Vodafone mejoró su Largest Contentful Paint un 31 % y las ventas subieron un 8 %, y Rakuten 24 aumentó los ingresos por visitante un 53 % tras superar los umbrales de Core Web Vitals. Los tres resultados están documentados en los estudios de caso de web.dev de Google (ver Fuentes más abajo).

Los objetivos actuales de Google son concretos: contenido principal visible (LCP) en menos de 2,5 segundos, respuesta a toques y clics (INP) en menos de 200 milisegundos y cambios de diseño (CLS) por debajo de 0,1, medidos en el percentil 75 de las visitas reales.

**La solución:** comprime y redimensiona las imágenes (WebP o AVIF), sirve la web a través de una CDN, elimina el JavaScript que no usas y carga de forma diferida todo lo que quede por debajo de la primera pantalla. Un framework moderno como Next.js resuelve la mayor parte de esto de serie.

## 2. Sin una propuesta de valor clara

El Nielsen Norman Group, a partir de un análisis de más de 200 millones de visitas a páginas, concluyó que los primeros 10 segundos son decisivos. Si una página no comunica su valor en ese margen, la mayoría de los visitantes se va. Quienes pasan de los 30 segundos suelen quedarse varios minutos. Y un estudio de investigadores de Google demostró que las personas se forman un juicio sobre el atractivo visual de una web en 50 milisegundos, antes de leer una sola palabra.

**La solución:** empieza con un titular claro y centrado en el beneficio. Di a los visitantes exactamente qué problema resuelves y para quién. Aperturas genéricas como "Bienvenido a nuestra web" desperdician los únicos segundos que importan.

## 3. Mala experiencia en el móvil

Google usa la versión móvil de tu web, rastreada con un agente de smartphone, para indexar y posicionar. Los datos de red de Cloudflare muestran que el 43 % de todas las peticiones web vinieron de dispositivos móviles en 2025, frente al 41 % del año anterior. Si tu web tiene zonas táctiles diminutas y texto ilegible en un teléfono, estás fallando tanto a Google como a una parte enorme de tu audiencia.

**La solución:** diseña primero para móvil y prueba en dispositivos reales. Las WCAG 2.2 fijan el mínimo de accesibilidad para las zonas táctiles en 24 por 24 píxeles CSS; tómalo como un mínimo y haz los botones principales bastante más grandes. Mantén el texto legible sin hacer zoom y la navegación al alcance del pulgar.

## 4. Llamadas a la acción débiles o inexistentes

Si los visitantes no saben qué hacer a continuación, se van. Cada página necesita una llamada a la acción clara, ya sea reservar una llamada, pedir un presupuesto o descargar un recurso.

**La solución:** usa una llamada a la acción principal por página. Hazla visualmente destacada con colores de contraste. Usa un lenguaje orientado a la acción ("Consigue tu auditoría gratuita" gana a "Enviar").

## 5. Sin señales de confianza

El metaanálisis del Baymard Institute de 50 estudios sitúa el abandono medio del carrito en algo más del 70 %. Entre las razones que tienen solución, el 19 % de los compradores de EE. UU. dijo que no confiaba en la web para introducir los datos de su tarjeta, y el 17 % abandonó por errores o caídas de la web. El Web Credibility Project de Stanford, basado en investigaciones con más de 4.500 participantes, concluyó que las personas juzgan la credibilidad de una web en gran medida por su diseño visual, y recomienda mostrar a las personas reales que hay detrás, una dirección física e información de contacto clara.

**La solución:** añade prueba social por toda la web, no solo en una página de testimonios. Muestra resultados reales, personas reales y cifras reales. Haz que tus datos de contacto sean fáciles de encontrar.

## ¿Listo para arreglar tu web?

Si alguno de estos problemas te suena, no eres el único. La mayoría de las webs de empresa sufren al menos dos o tres de ellos. ¿La buena noticia? Todos tienen solución.

Reserva una llamada de estrategia gratuita con nuestro equipo y te mostraremos exactamente qué está frenando tu web y cómo convertirla en un motor de crecimiento.

## Fuentes

- **Google web.dev, Why speed matters**: https://web.dev/articles/why-speed-matters
- **Google web.dev, Core Web Vitals**: https://web.dev/articles/vitals
- **Nielsen Norman Group, How Long Do Users Stay on Web Pages?**: https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/
- **Tuch et al., estudio de primeras impresiones (Google Research)**: https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/
- **Cloudflare Radar 2025 Year in Review**: https://blog.cloudflare.com/radar-2025-year-in-review/
- **W3C, WCAG 2.2 Target Size (Minimum)**: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- **Baymard Institute, Cart Abandonment Rate Statistics**: https://baymard.com/lists/cart-abandonment-rate
- **Stanford Web Credibility Project, Guidelines**: https://credibility.stanford.edu/guidelines/index.html`,
    },
    'seo-checklist-2026': {
      readTime: '7 min de lectura',
      content: `Posicionar en 2026 sigue siendo cuestión de fundamentos: una web que Google pueda rastrear, páginas que carguen rápido, una estructura que las máquinas puedan interpretar y contenido que responda a preguntas reales. Google confirma que esos mismos fundamentos deciden ahora si apareces también en AI Overviews y en AI Mode. Esta es la checklist que aplicamos en cada web que construimos.

## Fundamentos de SEO técnico

- **HTTPS en todas partes**: Google usa HTTPS como señal de posicionamiento desde 2014. Es una señal ligera, pero los navegadores marcan las webs inseguras y los visitantes lo notan.
- **Core Web Vitals rápidos**: LCP por debajo de 2,5 segundos, INP por debajo de 200 milisegundos, CLS por debajo de 0,1, medidos en el percentil 75 de las visitas reales. INP sustituyó a FID como métrica de capacidad de respuesta en 2024, así que retira cualquier panel antiguo de FID.
- **Indexación mobile first**: Google rastrea con un agente de smartphone y usa tu versión móvil para indexar y posicionar. Tu web móvil ES tu web.
- **Estructura de URL limpia**: usa URL descriptivas y legibles. Evita los parámetros de consulta siempre que puedas.
- **Sitemap XML**: envíalo a Google Search Console. Mantenlo actualizado.
- **robots.txt**: bloquea lo que no debe indexarse (páginas de administración, rutas de API).

## SEO on-page

- **Etiquetas de título únicas**: Google dice que no hay un límite fijo de caracteres, pero los títulos largos se truncan para caber en la pantalla. Pon las palabras importantes al principio, da a cada página un texto descriptivo distinto y evita el texto repetitivo y las palabras clave duplicadas.
- **Meta descripciones**: escribe un resumen atractivo para cada página. Google trunca los fragmentos largos, así que pon el valor en la primera frase.
- **Jerarquía de encabezados**: un H1 por página y una estructura lógica de H2 a H6.
- **Enlazado interno**: conecta páginas relacionadas. Usa textos de anclaje descriptivos.
- **Optimización de imágenes**: texto alternativo, formatos comprimidos (WebP/AVIF), carga diferida.

## Datos estructurados

Los datos estructurados ayudan a Google a entender tu contenido y pueden darte resultados enriquecidos (desplegables de FAQ, valoraciones con estrellas, migas de pan). Los propios estudios de caso de Google demuestran que mueven cifras reales: Rotten Tomatoes midió un 25 % más de clics en las páginas con datos estructurados, y Nestlé midió un 82 % más de clics en las páginas que aparecen como resultados enriquecidos.

- **Schema Organization**: dile a Google quién eres.
- **Schema LocalBusiness**: imprescindible para el SEO local.
- **Schema BreadcrumbList**: ayuda a la navegación en los resultados de búsqueda.
- **Schema FAQPage**: puede conseguir fragmentos de FAQ ampliados en las búsquedas.
- **Schema Article**: para artículos de blog y noticias.

## La búsqueda con IA sigue siendo SEO

Google es explícito: no hay requisitos adicionales para aparecer en AI Overviews o en AI Mode. Ni archivos especiales, ni marcado nuevo, ni una optimización aparte. Los mismos fundamentos de rastreabilidad, experiencia de página y contenido útil deciden si las funciones de IA muestran y citan tus páginas. Y si quieres limitar cómo usan tu contenido, los controles existentes (nosnippet, max-snippet, noindex) siguen aplicándose.

## Estrategia de contenido

- **Apunta a palabras clave long tail**: menos competencia, mayor intención.
- **Responde preguntas reales**: busca ideas de contenido en "Otras preguntas de los usuarios" y en los emails de tus propios clientes.
- **Mantén el contenido al día**: revísalo cada trimestre. Actualiza datos, capturas y fechas para que las páginas sigan siendo exactas.
- **Construye autoridad temática**: crea grupos de contenido relacionado en torno a tus temas principales.

## En resumen

El SEO no es un proyecto puntual. Es una práctica continua. Pero acertar con los fundamentos desde el primer día te da una ventaja enorme frente a los competidores que lo tratan como algo secundario.

Si prefieres no recorrer esta checklist por tu cuenta, reserva una llamada de estrategia gratuita y repasaremos exactamente en qué punto está tu web y qué arreglar primero.

## Fuentes

- **Google web.dev, Core Web Vitals**: https://web.dev/articles/vitals
- **Google Search Central, HTTPS as a ranking signal**: https://developers.google.com/search/blog/2014/08/https-as-ranking-signal
- **Google Search Central, Mobile-first indexing**: https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing
- **Google Search Central, Title links**: https://developers.google.com/search/docs/appearance/title-link
- **Google Search Central, Structured data introduction**: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- **Google Search Central, AI features and your website**: https://developers.google.com/search/docs/appearance/ai-features`,
    },
    'brand-identity-investment': {
      readTime: '5 min de lectura',
      content: `La mayoría de las empresas tratan el branding como decoración. Las cifras dicen lo contrario. El ranking BrandZ de Kantar valora las 100 marcas más valiosas del mundo en 13,1 billones de dólares en conjunto en 2026, un 22 % más en un solo año. La marca es un activo y, como cualquier activo, se capitaliza con el tiempo. Esto es lo que una identidad sólida hace de verdad por un negocio, y cómo saber si la tuya te está frenando.

## Qué es realmente la identidad de marca

La identidad de marca es el sistema visual y verbal completo que representa a tu negocio. Incluye tu logotipo, paleta de colores, tipografía, voz, mensajes y las sensaciones que la gente asocia con tu nombre.

Piensa en las marcas más valiosas del mundo. Las reconoces al instante, no solo por su logotipo, sino por todo su lenguaje visual y por cómo te hacen sentir.

## Por qué importa para el crecimiento

**1. Confianza a primera vista.** Una investigación de Google demostró que las personas se forman un juicio sobre el atractivo visual de una web en los primeros 50 milisegundos. El Web Credibility Project de Stanford, basado en estudios con más de 4.500 participantes, concluyó que la credibilidad se juzga en gran medida por el diseño visual. Una marca pulida y coherente transmite profesionalidad antes de que nadie lea una palabra.

**2. Precios premium.** Kantar mide la fortaleza de marca en parte como poder de fijación de precios: la capacidad de cobrar más que la competencia sin perder demanda. Ese poder explica en gran parte por qué el valor de las marcas más fuertes del mundo sigue subiendo mientras los competidores más débiles pelean por precio.

**3. Fidelidad del cliente.** Harvard Business Review documentó qué ocurrió cuando las empresas invirtieron en la conexión emocional con sus clientes: un banco aumentó el uso de productos en su segmento objetivo un 70 % y las nuevas cuentas un 40 %, y una cadena de moda multiplicó por más de tres el crecimiento de ventas comparables. La gente no compra solo productos, compra marcas en las que cree.

**4. Eficiencia del marketing.** Cuando tu marca es clara y coherente, cada euro de marketing rinde más. La gente te recuerda. Te reconoce. Vuelve.

## Señales de que necesitas renovar tu marca

- Tu identidad visual parece anticuada o inconsistente entre plataformas
- Tus clientes no saben explicar qué te hace diferente
- Compites sobre todo por precio y no por valor
- Tu equipo no tiene claro cómo representar la marca de forma coherente

## Donde vive tu marca: tu web

No necesitas el presupuesto de una empresa del Fortune 500 para aplicar esta investigación. Para la mayoría de los negocios, el lugar donde la identidad de marca se encuentra con los clientes es la web. Ahí ocurre la primera impresión de 50 milisegundos, ahí se juzga la credibilidad y ahí una identidad inconsistente te cuesta consultas sin que lo notes.

Si tu web actual no se parece al negocio que has construido de verdad, reserva una llamada de estrategia gratuita y te mostraremos cómo podría ser una web que se gane esa confianza.

## Fuentes

- **Kantar BrandZ Most Valuable Global Brands**: https://www.kantar.com/campaigns/brandz/global
- **Tuch et al., estudio de primeras impresiones (Google Research)**: https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/
- **Stanford Web Credibility Project, Guidelines**: https://credibility.stanford.edu/guidelines/index.html
- **Harvard Business Review, The New Science of Customer Emotions**: https://hbr.org/2015/11/the-new-science-of-customer-emotions`,
    },
  },
  videos: {
    kofi: {
      name: 'Coach Kofi habla de trabajar con Blok Blok Studio',
      description: 'Testimonio en video de Coach Kofi, atleta de Nike y entrenador personal en Berlín, grabado en su gimnasio. Blok Blok Studio construyó coachkofi.de; las solicitudes de consulta subieron un 200 % tras el lanzamiento.',
      transcript: `He estado trabajando con Chase en mi web y el resultado ha sido una locura. Me dio ese toque de logo de Apple, de diseño de Apple. Las cosas aparecen con mucha suavidad. La web tiene un acabado muy fino.

A mí personalmente me gustan las webs de una sola página. Lo decidimos así. La comunicación con él es muy fácil. Es un buen tipo, de verdad. Muy decidido.

Y creo que necesitas a alguien que trabaje contigo en tu capa exterior de software. Necesitas a alguien que responda rápido, que sepa lo que hace y que se adapte a lo que necesitas.

Así que sí, recomiendo de verdad a Chase, o a Blok Blok Studio. Trabajar con ellos me ayudó mucho. En serio. Dales una oportunidad. Son muy buenos.`,
    },
    luki: {
      name: 'Coach Luki habla de trabajar con Blok Blok Studio',
      description: 'Testimonio en video de Coach Luki, entrenador personal en Berlín. Blok Blok Studio construyó coachluki.com, que gestiona sus reservas y pagos directamente en la web en lugar de por mensajes directos y facturas manuales.',
      transcript: `Soy entrenador personal en Berlín y di con Chase, o Blok Blok Studio, a través de un amigo que ya había trabajado con él. Así que tuve una llamada con él, hablamos de mis objetivos y de mi visión para la web, y sentí que me entendía desde el primer momento. Además había una conexión muy natural, lo que hizo que trabajar con Chase fuera mucho más relajado, eso seguro.

Chase es, en general, una gran persona y tiene mucha paciencia contigo. Trabajamos juntos en una época en la que yo tenía muchas cosas encima a nivel personal, y él fue muy paciente conmigo, se aseguraba de que yo no perdiera el hilo y me guiaba por todo el proceso sin que me sintiera desbordado, y eso para mí fue uno de los grandes puntos a favor.

Su comunicación es excelente, responde muy rápido, y eso es un gran plus. Yo tenía un montón de ideas que quería meter en la web, y él las fue repasando, esas ideas y esa visión que tenía para la web, y se aseguró de que encajaran con la identidad de marca, sin descartar nunca ninguna de verdad. Eso fue otro de los grandes puntos a favor para mí.

Durante todo el proceso me sentí visto, me sentí escuchado, sentí que formaba parte de todo el proceso y, lo más importante, sentí que de verdad cuidaban de mí. Y eso ya no es lo habitual hoy en día, diría yo.

Lo que más me gusta de la web es que no es otra plantilla más que cualquiera puede montar. Hay mucha intención detrás. Nos centramos en el recorrido del cliente, en la experiencia de usuario, y nos aseguramos de que la web y la identidad de marca se vieran auténticas y memorables.

Así que si buscas a alguien que cuide de ti, que se fije en los detalles, que esté ahí para ti y que responda rápido, sin duda estás en el lugar correcto con Chase, o con Blok Blok Studio en este caso.`,
    },
    founder: {
      name: 'Unas palabras del fundador de Blok Blok Studio',
      description: 'Chase Haynes explica dónde pierden clientes online los negocios de servicios sin darse cuenta y cómo lo soluciona Blok Blok Studio, en una grabación de pantalla sobre la web del estudio.',
      transcript: `Me llamo Chase y soy el fundador de Blok Blok Studio. Puedo contarte todos los casos de éxito del mundo sobre nuestro negocio, pero si no me conoces como persona, no sirve de nada. Así que voy a presentarme.

Me llamo Chase. Soy de San Diego, California. Crecí en buena parte por Estados Unidos y acabé en la costa este. Entré en el Cuerpo de Marines, estuve cinco años. Al salir me mudé a Nueva York para estudiar en Parsons School of Design. Me gradué con un Bachelor of Fine Arts en Diseño y Tecnología. Después fundé mi agencia, Blok Blok Studio, en junio de 2024. Y alrededor de un año más tarde me mudé a Berlín, Alemania.

Desde entonces no hemos parado de hacer crecer el negocio. Va creciendo, todo va a más. Ahora somos un equipo de cuatro personas. Tengo a mi director creativo en Virginia, a mi estratega de marketing en Los Ángeles y a mi desarrollador full stack aquí en Berlín, Alemania. Ha sido un viaje increíble y aquí estamos cada día dándolo todo.

Me encantaría trabajar contigo. Aquí abajo vas a ver varios casos de éxito. Vas a ver cuatro ejemplos del trabajo que hemos hecho. Repásalos, échales un vistazo. Si tienes preguntas, escríbeme por Instagram o por email, lo que te venga mejor.

Más abajo tenemos un formulario de contacto. Rellena tus datos. Me llega directamente a mí, lo reviso, hacemos una llamada y vemos si encaja. Si encaja, genial. Si no, no pasa nada. Pero tengo muchas ganas de conocerte, y que tengas un gran día. Hablamos pronto.`,
    },
  },
  specialties: {
    'webdesign-berlin': {
      metaTitle: 'Diseño web en Berlín | Blok Blok Studio',
      metaDescription: 'Agencia de diseño web en Berlín. Webs a medida en Next.js que consiguen clientes. Sin plantillas ni constructores de páginas. Primera llamada gratuita.',
      kicker: 'Agencia de diseño web en Berlín',
      h1: 'Diseño web desde Berlín que trae clientes',
      intro: 'Diseñamos y desarrollamos webs a medida para empresas de Berlín y de todo el mundo. Cada página se construye desde cero: rápida, optimizada para buscadores y orientada a un único objetivo, convertir visitantes en clientes.',
      stats: [
        {
          value: '15+',
          label: 'Proyectos entregados',
        },
        {
          value: '100 %',
          label: 'Desarrollo a medida, sin plantillas',
        },
        {
          value: '2',
          label: 'Coaches de Berlín que reciben reservas a través de su web',
        },
      ],
      featuresHeading: 'Qué recibes',
      features: [
        {
          title: 'Diseño a medida, sin constructores',
          desc: 'Cada web se desarrolla a mano en Next.js. Eso significa mejores tiempos de carga, mejor posicionamiento en Google y un diseño que no existe dos veces.',
        },
        {
          title: 'SEO desde el primer día',
          desc: 'Estructura limpia, términos de búsqueda locales, datos estructurados y métricas de rendimiento que Google premia. Tu web tiene que encontrarse, no solo verse bien.',
        },
        {
          title: 'Reservas y pagos directamente en la web',
          desc: 'Reserva de citas, pagos con Stripe, formularios de contacto con aviso inmediato. Tu web trabaja aunque tú no lo hagas.',
        },
        {
          title: 'Visible en la búsqueda con IA (AEO)',
          desc: 'Cada vez más clientes preguntan a ChatGPT, Perplexity o a las AI Overviews de Google en lugar de buscar en Google como siempre. Integramos datos estructurados, formatos de respuesta y llms.txt para que tu web se cite en las respuestas de la IA.',
        },
        {
          title: 'Atención desde Berlín',
          desc: 'Contacto directo, respuestas rápidas, entrega personal. Sin sistema de tickets ni colas de espera de agencia.',
        },
      ],
      caseStudy: {
        heading: 'Caso real',
        name: 'Coach Luki, entrenador personal en Berlín',
        result: 'Reservas y pagos gestionados por completo a través de la web',
        body: 'Luke Satterly entrena a sus clientes en Holmes Place y John Reed. Su web acepta reservas y procesa pagos a través de Stripe, sin mensajes directos ni facturas a mano. Además, SEO local para términos como "personal trainer Berlín".',
        linkLabel: 'Ver el caso de éxito',
      },
      faqHeading: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Cuánto cuesta una web con Blok Blok Studio?',
          a: 'Cada proyecto se presupuesta de forma individual según su alcance y funcionalidades. Tras una primera llamada gratuita recibes una oferta a precio fijo con entregables claramente definidos. Encontrarás una visión general en nuestra página de precios.',
        },
        {
          q: '¿Cuánto tarda el desarrollo?',
          a: 'Una web de empresa típica está en línea en 2 a 4 semanas. Los proyectos más grandes, con sistema de reservas o tienda, tardan algo más. El calendario exacto lo fijamos antes de empezar.',
        },
        {
          q: '¿Trabajan solo con empresas de Berlín?',
          a: 'No. Estamos en Berlín y atendemos a los clientes locales en persona, pero trabajamos con empresas de todo el mundo, entre otros en Estados Unidos.',
        },
        {
          q: '¿Por qué no una web hecha con IA o un constructor como Wix?',
          a: 'Los constructores con IA entregan en minutos una web que se parece a otras mil, carga lento y no se encuentra de forma fiable ni en Google ni en la búsqueda con IA. Una web desarrollada a medida cuesta más, pero a cambio consigue clientes de forma medible. Nuestros casos de éxito muestran las cifras.',
        },
        {
          q: '¿Por qué Next.js en lugar de WordPress o Wix?',
          a: 'Las webs en Next.js cargan más rápido, son más seguras y posicionan mejor, porque no arrastran el lastre de plugins y temas. Recibes exactamente lo que tu empresa necesita y nada que la frene.',
        },
      ],
      ctaHeading: 'Hablemos de tu proyecto',
      ctaBody: 'Primera llamada gratuita de 15 minutos. Nos cuentas qué necesitas y te decimos con honestidad cómo lo haríamos.',
      ctaButton: 'Reservar la llamada gratuita',
    },
    'plumber-website-design': {
      metaTitle: 'Diseño web para fontaneros | Blok Blok Studio',
      metaDescription: 'Webs para fontaneros y empresas de servicios para el hogar que convierten búsquedas en Google y en IA en trabajos contratados. Nuestro cliente de fontanería generó $50k con su web en su primer año.',
      kicker: 'Oficios y servicios para el hogar',
      h1: 'Webs para fontaneros que convierten búsquedas en trabajos contratados',
      intro: 'Cuando a un propietario se le rompe una tubería, busca, llama al primer resultado que le inspira confianza y no vuelve a mirar. Construimos webs para fontaneros y empresas de servicios para el hogar que ganan ese momento: rápidas, preparadas para el SEO local y construidas alrededor del botón de llamada.',
      stats: [
        {
          value: '$50k',
          label: 'Ingresos generados por nuestro cliente de fontanería en sus primeros 5 meses',
        },
        {
          value: '5,0',
          label: 'Estrellas en 52 reseñas de Google, cargadas en vivo en la web',
        },
        {
          value: '8.000+',
          label: 'Impresiones de búsqueda en Google en los primeros 3 meses de seguimiento',
        },
      ],
      featuresHeading: 'Qué necesita la web de un oficio para producir trabajos de verdad',
      features: [
        {
          title: 'Una barra de llamada fija en el móvil',
          desc: 'La mayoría de las búsquedas de emergencia se hacen desde el teléfono. El número está en pantalla todo el tiempo, así que en el momento en que el propietario se decide, toca una vez y el teléfono suena.',
        },
        {
          title: 'SEO local integrado desde el primer día',
          desc: 'Páginas de servicio por tipo de trabajo, segmentación por ciudad, schema de reseñas y alineación con el Perfil de Empresa de Google. El objetivo es simple: aparecer cuando tu zona busca "fontanero cerca de mí".',
        },
        {
          title: 'Reseñas reales, cargadas en vivo',
          desc: 'Tus reseñas de Google se muestran automáticamente en la web. Prueba fresca sin que tengas que tocar nada, y las mismas señales de confianza que Google premia.',
        },
        {
          title: 'Visible en la búsqueda con IA, no solo en Google',
          desc: 'Cada vez más propietarios preguntan a ChatGPT y a AI Overviews de Google "quién es el mejor fontanero cerca de mí". Construimos los datos estructurados y el contenido orientado a respuestas (AEO) que hacen que tu negocio se cite en esas respuestas de IA.',
        },
        {
          title: 'Leads directos a tu flujo de trabajo',
          desc: 'Las solicitudes de presupuesto y los formularios de contacto llegan al instante a tu bandeja de entrada y a tu pipeline de trabajos. En los oficios, la rapidez en responder al lead gana el trabajo.',
        },
      ],
      caseStudy: {
        heading: 'Caso de éxito',
        name: 'Bronco Plumbing, Dallas-Fort Worth',
        result: '$50.000 de ingresos brutos en los primeros 5 meses de actividad',
        body: 'Colton Staley lanzó Bronco Plumbing sin web y sin presencia online. Construimos una web orientada a la conversión en torno a él: el dueño atiende cada llamada, presupuestos honestos, reseñas de Google en vivo y una barra de llamada fija para las búsquedas en plena emergencia. La web ocupa una posición media de 5,2 para sus términos de búsqueda.',
        linkLabel: 'Leer el caso de éxito completo',
      },
      faqHeading: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Cuánto cuesta una web para fontaneros?',
          a: 'Cada desarrollo se presupuesta según su alcance tras una llamada gratuita de 15 minutos. Recibes un precio fijo con entregables definidos antes de empezar. Consulta nuestra página de precios para ver cómo se estructuran los proyectos.',
        },
        {
          q: '¿Cuánto tarda la web en empezar a generar leads?',
          a: 'La web en sí suele estar en línea en 2 a 4 semanas. El SEO local se acumula durante los meses siguientes; nuestro cliente de fontanería registró más de 8.000 impresiones de búsqueda en sus primeros 3 meses de seguimiento.',
        },
        {
          q: '¿Trabajan con otros oficios además de la fontanería?',
          a: 'Sí. El mismo método funciona para electricistas, climatización, tejados y cualquier negocio de servicios para el hogar donde los clientes buscan en su zona y llaman: SEO local, reseñas en vivo y una web construida alrededor de la llamada.',
        },
        {
          q: '¿Por qué no usar simplemente un constructor de webs con IA?',
          a: 'Los constructores con IA producen una web genérica en minutos, pero no pueden hacer lo que consigue trabajos de fontanería: SEO local por zona de servicio, reseñas de Google en vivo, un diseño móvil centrado en la llamada y leads conectados a tu flujo de trabajo. Nuestro cliente de fontanería generó $50k en 5 meses con una web construida para su mercado, no a partir de una plantilla.',
        },
        {
          q: '¿Pueden conectar la web con mis herramientas actuales?',
          a: 'Sí. Los formularios de contacto pueden alimentar tu CRM, tu software de gestión de trabajos o un pipeline sencillo que configuramos para ti. Nuestro desarrollo para Bronco envía los leads directamente al flujo de trabajos del propietario.',
        },
      ],
      ctaHeading: '¿Quieres una web que consiga trabajos?',
      ctaBody: 'Llamada gratuita de 15 minutos. Cuéntanos tu zona de servicio y te diremos exactamente qué construiríamos.',
      ctaButton: 'Reservar una llamada gratuita',
    },
    'personal-trainer-website-design': {
      metaTitle: 'Diseño web para entrenadores personales | Blok Blok Studio',
      metaDescription: 'Webs para entrenadores personales y coaches con reservas y pagos integrados. Nuestros clientes reciben reservas y cobran directamente a través de su web. Mira ejemplos reales.',
      kicker: 'Coaches y entrenadores',
      h1: 'Webs para entrenadores personales que consiguen clientes mientras tú entrenas',
      intro: 'Perseguir leads por mensajes directos y enviar facturas a mano limita cuántos clientes puedes aceptar. Construimos webs para entrenadores personales y coaches donde los visitantes reservan sesiones y pagan directamente en la web, para que tu agenda se llene sola.',
      stats: [
        {
          value: '200 %',
          label: 'Aumento de las solicitudes de consulta tras el lanzamiento (Coach Kofi)',
        },
        {
          value: '0',
          label: 'Facturas enviadas a mano desde el lanzamiento, los pagos pasan por Stripe (Coach Luki)',
        },
        {
          value: '2',
          label: 'Coaches de Berlín cuyas reservas pasan por completo por su web',
        },
      ],
      featuresHeading: 'Qué necesita una web de coaching para convertir',
      features: [
        {
          title: 'Reservas y pagos en la web',
          desc: 'Los clientes eligen un horario y pagan en un solo flujo a través de Stripe. Sin idas y venidas por mensajes directos, sin perseguir pagos y sin ausencias por reservas sin confirmar.',
        },
        {
          title: 'Una página que vende tu método',
          desc: 'Tu filosofía, tus resultados, tus pruebas, estructurados para que un visitante entienda en segundos qué haces y reserve antes de irse.',
        },
        {
          title: 'SEO local para tu ciudad',
          desc: 'Cuando alguien busca "entrenador personal" más tu ciudad, quieres ser la respuesta. Integramos la segmentación local desde el primer día.',
        },
        {
          title: 'Encontrado en la búsqueda con IA (AEO)',
          desc: 'Los posibles clientes ya piden recomendaciones de entrenadores a ChatGPT y Perplexity. Los datos estructurados, las FAQ orientadas a respuestas y el llms.txt hacen que tu web sea citable por los buscadores con IA, no solo posicionable en Google.',
        },
        {
          title: 'Prueba social que se acumula',
          desc: 'Número de clientes, resultados de transformación, testimonios en video. Las cifras reales en la página hacen la venta que no deberías tener que hacer por mensajes directos.',
        },
      ],
      caseStudy: {
        heading: 'Caso de éxito',
        name: 'Coach Luki, Berlín',
        result: 'Reservas y pagos directamente a través de la web',
        body: '"Construyeron toda mi web desde cero y ahora los clientes reservan y pagan directamente en ella. Antes perdía horas con mensajes directos y facturas." Luke Satterly entrena a sus clientes en Holmes Place y John Reed, en Berlín. Su web gestiona las reservas, los pagos con Stripe y el SEO local para búsquedas como "personal trainer Berlín".',
        linkLabel: 'Leer el caso de éxito completo',
      },
      faqHeading: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Cuánto cuesta una web para entrenadores personales?',
          a: 'Cada desarrollo se presupuesta según su alcance tras una llamada gratuita de 15 minutos, con un precio fijo y entregables definidos antes de empezar. Consulta nuestra página de precios para ver cómo se estructuran los proyectos.',
        },
        {
          q: '¿Los clientes pueden pagar de verdad a través de la web?',
          a: 'Sí. Integramos Stripe para que los clientes compren paquetes de sesiones directamente. El dinero llega a tu cuenta, los recibos salen automáticamente y nunca vuelves a enviar una factura a mano.',
        },
        {
          q: 'Consigo la mayoría de mis clientes por Instagram. ¿Sigo necesitando una web?',
          a: 'Instagram genera atención; la web la convierte. Un enlace en la bio que lleva a una página con pruebas, precios y reserva inmediata cierra clientes que los mensajes directos pierden. Las solicitudes de consulta de Coach Kofi subieron más de un 200 % tras el lanzamiento.',
        },
        {
          q: '¿Por qué no usar simplemente un constructor de webs con IA?',
          a: 'Un constructor con IA puede describir tu coaching. No puede aceptar una reserva, procesar un pago con Stripe ni posicionar para "entrenador personal" en tu ciudad. La web se paga sola cuando consigue clientes mientras tú entrenas, y eso requiere ingeniería de verdad, no una plantilla generada.',
        },
        {
          q: '¿Solo trabajan con coaches de fitness?',
          a: 'No. La misma estructura funciona para cualquier coach o consultor que trabaje con sesiones reservadas: nutrición, rendimiento, coaching empresarial. Si tu negocio funciona con llamadas reservadas, este es el método.',
        },
      ],
      ctaHeading: '¿Listo para llenar tu agenda?',
      ctaBody: 'Llamada gratuita de 15 minutos. Cuéntanos cómo consigues clientes hoy y te mostraremos qué debería hacer la web.',
      ctaButton: 'Reservar una llamada gratuita',
    },
    'ecommerce-website-design': {
      metaTitle: 'Diseño web para e-commerce | Blok Blok Studio',
      metaDescription: 'Diseño de tiendas online y Shopify que venden. Construimos una tienda de cartas coleccionables que facturó $191k en 1.790 pedidos. Tiendas orientadas a la conversión y preparadas para la búsqueda con IA.',
      kicker: 'E-commerce y Shopify',
      h1: 'Tiendas online construidas para vender, no solo para existir',
      intro: 'Una tienda no es un catálogo. Cada decisión, desde la cuadrícula de productos hasta el checkout o la captación de emails, acerca al visitante a la compra o lo pierde. Diseñamos y construimos tiendas online donde las cifras demuestran el diseño.',
      stats: [
        {
          value: '$191k',
          label: 'Ventas en la tienda de cartas coleccionables que construimos y entregamos',
        },
        {
          value: '1.790',
          label: 'Pedidos a través de esa tienda',
        },
        {
          value: '400 %',
          label: 'Crecimiento de la lista de correo el primer mes gracias a la captación inteligente',
        },
      ],
      featuresHeading: 'Qué convierte en e-commerce',
      features: [
        {
          title: 'Diseño de tienda orientado a la conversión',
          desc: 'Páginas de producto construidas alrededor de la decisión de compra: precios claros, urgencia donde es honesta y un checkout sin obstáculos.',
        },
        {
          title: 'Captación de emails que hace crecer la lista de verdad',
          desc: 'Captación de descuento a cambio de email colocada donde convierte. La lista de nuestro cliente creció un 400 % el primer mes, y el email es el canal que te pertenece.',
        },
        {
          title: 'Drops, reposiciones y comunidad',
          desc: 'Los lanzamientos que se agotan necesitan cuentas atrás, avisos de disponibilidad e integración con la comunidad (Discord, redes) conectados a la tienda, no añadidos a posteriori.',
        },
        {
          title: 'Preparada para la búsqueda con IA y los motores de respuesta',
          desc: 'Los compradores preguntan a los asistentes de IA qué comprar antes de llegar a Google. El schema de producto, los feeds limpios y el contenido orientado a respuestas (AEO) hacen que tus productos se citen en ChatGPT, Perplexity y AI Overviews de Google.',
        },
        {
          title: 'Shopify o totalmente a medida',
          desc: 'Construimos en Shopify cuando encaja y totalmente a medida en Next.js cuando no. La decisión sale de tu catálogo y tus márgenes, no de nuestras preferencias.',
        },
      ],
      caseStudy: {
        heading: 'Caso de éxito',
        name: 'Exotic Ripz, cartas coleccionables',
        result: '$191.042 en ventas en 1.790 pedidos',
        body: 'Una tienda Shopify completa para una marca de la comunidad de cartas coleccionables: marca animada y atrevida, integración con Discord y redes multiplataforma, categorización inteligente de productos y captación de emails optimizada para la conversión. Los drops de sobres se agotaban sistemáticamente en pocas horas, y el sistema de envíos se configuró de principio a fin.',
        linkLabel: 'Leer el caso de éxito completo',
      },
      faqHeading: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Construyen en Shopify o a medida?',
          a: 'Ambos. Shopify es la opción adecuada para la mayoría de los negocios de producto; las tiendas totalmente a medida en Next.js tienen sentido para catálogos poco habituales, suscripciones o cuando las comisiones de la plataforma superan la comodidad. Recomendamos según tus cifras.',
        },
        {
          q: '¿Cuánto cuesta una tienda online?',
          a: 'Se presupuesta según su alcance tras una llamada gratuita de 15 minutos, con un precio fijo y entregables definidos antes de empezar. El tamaño de la tienda, las integraciones y las necesidades de migración determinan la cifra.',
        },
        {
          q: '¿Pueden migrar mi tienda actual?',
          a: 'Sí. Los productos, los clientes y el historial de pedidos se pueden migrar desde la mayoría de las plataformas. Planificamos la migración para que la tienda nunca se quede fuera de servicio durante el cambio.',
        },
        {
          q: '¿Por qué no usar simplemente un constructor de tiendas con IA?',
          a: 'Las tiendas generadas se ven bien y convierten mal, porque la conversión vive en los detalles: dónde se coloca la captación, la mecánica de los drops, la fricción del checkout, el schema de producto para la búsqueda con IA. La tienda de $191k que construimos agotaba sus drops en horas porque cada uno de esos detalles se diseñó con ingeniería, no se generó.',
        },
        {
          q: '¿También configuran envíos y pagos?',
          a: 'Sí. El desarrollo de Exotic Ripz incluyó el sistema de envíos configurado de principio a fin, además de pagos, impuestos y las piezas operativas que la mayoría de los diseñadores te dejan a ti.',
        },
      ],
      ctaHeading: '¿Quieres una tienda que venda?',
      ctaBody: 'Llamada gratuita de 15 minutos. Trae tus cifras y te diremos por dónde se le escapan los ingresos a la tienda.',
      ctaButton: 'Reservar una llamada gratuita',
    },
  },
  consent: 'Sí, Blok Blok Studio puede enviarme por email consejos prácticos de crecimiento y ofertas ocasionales. Enviaremos un email para confirmar, y solo quedas suscrito cuando haces clic en el enlace que contiene. Puedes darte de baja en cualquier momento.',
};
