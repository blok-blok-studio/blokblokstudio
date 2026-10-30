/**
 * projects.de.ts — German copy for the case studies in projects.ts.
 * Only the text fields; images, URLs and flags come from the English entry.
 */
import type { ProjectData } from './projects';

export type ProjectCopy = Pick<ProjectData, 'desc' | 'challenge' | 'solution' | 'results'> & { category?: string };

export const projectsDe: Record<string, ProjectCopy> = {
  'coach-luki': {
    desc: 'Conversion-starke Personal-Training-Website für Berlins führenden veganen Personal Trainer.',
    challenge: 'Luke Satterly (Coach Luki) gehört zu den engagiertesten Personal Trainern Berlins. Als veganer Athlet, der Kunden bei Holmes Place und John Reed trainiert, brauchte er eine Seite mit seiner Energie: markant, ergebnisorientiert und auf Abschluss gebaut. Das Ziel war simpel. Jemand landet auf der Seite, versteht sofort, was Luki macht, sieht die Belege und bucht ein Gespräch. Kein Füllmaterial. Keine Verwirrung. Nur Ergebnisse.',
    solution: 'Wir haben eine Website entworfen, auf der jeder Abschnitt auf ein Ziel hinarbeitet: die Buchung eines kostenlosen Erstgesprächs. Über die Stripe-Integration kaufen Kunden ihre Trainingspakete direkt und ohne Umwege. Lokales SEO für Berlin war von Anfang an eingebaut, ausgerichtet auf Suchen wie „Personal Trainer Berlin“ und „veganer Fitness Coach Berlin“.',
    results: 'Eine vollständig auf Conversion optimierte Personal-Training-Seite, live in Berlin, gestaltet, gebaut und ausgeliefert von Blok Blok Studio. Kunden buchen und bezahlen jetzt direkt über die Seite, ohne DMs und Rechnungen. Die lokale SEO-Positionierung bringt organischen Traffic von Suchenden aus Berlin.',
  },
  'bronco-plumbing': {
    desc: 'Website zur Lead-Generierung und Online-Wachstumssystem für einen Sanitärbetrieb in Dallas–Fort Worth.',
    challenge: 'Colton Staley gründete Bronco Plumbing 2026 in Dallas–Fort Worth als inhabergeführten Betrieb im ersten Jahr. Start bei null: keine Website, keine Online-Präsenz, kein Weg für Hausbesitzer in DFW, ihn bei der Suche nach einem Klempner zu finden. Im Handwerk bekommt den Anruf, wer bei Google zuerst auftaucht und Qualität belegen kann.',
    solution: 'Wir haben eine Website rund um Colton selbst gebaut: Inhaber bei jedem Einsatz, ehrliche Kostenvoranschläge, echte Google-Bewertungen live eingebunden. Jeder Abschnitt führt zu einem Anruf oder einer Anfrage, mit einer fixierten mobilen Anrufleiste für Hausbesitzer mitten im Notfall. Lokales SEO für Sanitärsuchen in DFW war von Tag eins dabei, und die Kontaktpipeline speist direkt seinen Auftragsablauf.',
    results: 'In den ersten fünf Monaten erzielte Colton über 50.000 $ Bruttoumsatz aus Sanitärarbeit und Online-System zusammen. Die Seite hält 5,0 Sterne bei 52 Google-Bewertungen, rangiert für ihre Suchbegriffe im Schnitt auf Position 5,2 und erreichte in den ersten drei Monaten der Messung über 8.000 Suchimpressionen.',
  },
  'coach-kofi': {
    desc: 'Leistungsstarke Personal-Brand- und Coaching-Plattform mit markanter visueller Identität.',
    challenge: 'Coach Kofi brauchte eine Personal-Brand-Website, die zu seiner Philosophie „Just Do The Work“ passt. Der bisherige Auftritt spiegelte weder die Energie noch die Autorität, die er in Bewegungs-, Leistungs- und Entwicklungscoaching einbringt.',
    solution: 'Wir haben eine markante Schwarz-Weiß-Website mit kräftiger Typografie, professioneller Fotografie und einem klaren Weg vom Besucher zum Coaching-Kunden entworfen. Die Seite bietet Echtzeit-Buchung, Social-Proof-Zähler (über 150 Kunden, über 8.000 Coaching-Stunden) und ein mobile-first Design.',
    results: 'Ein professioneller Markenauftritt, der Autorität sofort vermittelt. Der vereinfachte Buchungsablauf steigerte die Beratungsanfragen um 200 %, und das markante Design wurde plattformübergreifend zum Markenzeichen von Coach Kofi.',
  },
  'exotic-ripz': {
    desc: 'Lebendige E-Commerce-Plattform für eine Community-Marke rund um Sammelkarten.',
    challenge: 'Exotic Ripz brauchte einen Online-Shop, der die Begeisterung und Energie der Sammelkarten-Community einfängt. Die Plattform musste Booster-Packs, Neuerscheinungen, Nachschub und Community-Aktivität über Discord, Twitch und Social Media abbilden.',
    solution: 'Wir haben einen voll ausgestatteten Shopify-Shop gebaut, mit markantem animiertem Branding, eingebundenen Discord-Community-Links, Präsenz auf allen Plattformen (Discord, YouTube, Twitch, TikTok, Instagram, X, Threads), smarter Produktkategorisierung und conversion-optimierten Pop-ups zur E-Mail-Erfassung.',
    results: 'Über 191.000 $ Umsatz mit Sammelkarten bei 1.790 Bestellungen über den Shop, den wir gebaut und ausgeliefert haben, inklusive komplett eingerichtetem Versand-Backend. Die E-Mail-Liste wuchs im ersten Monat um 400 % durch smarte Rabatt-Erfassung, und Booster-Drops waren regelmäßig innerhalb von Stunden ausverkauft. Der Shop wurde an die Inhaber übergeben, die die Seite inzwischen offline genommen haben; einen Live-Link gibt es daher nicht.',
  },
  'kds-systems': {
    desc: 'Moderne Cloud-Plattform für einen Anbieter von Managed IT und Cloud-Computing.',
    challenge: 'KDS Systems Inc. brauchte einen professionellen digitalen Auftritt, der ihre Expertise in Cloud Computing, Microsoft Office 365, Speicherlösungen und gehosteten Anwendungen vermittelt. Die bisherige Seite zeigte weder Größe noch Zuverlässigkeit ihrer Managed-IT-Services.',
    solution: 'Wir haben eine klare, moderne Website mit dunkler, technischer Ästhetik, kräftigen grünen Akzenten und verständlich aufgeschlüsselten Leistungen entworfen. Bereiche für Cloud Computing, Speicher und gehostete Anwendungen mit visueller Ikonografie, Buchungs-CTAs für Beratungen und Vertrauenssignalen auf Enterprise-Niveau.',
    results: 'Ein professioneller Markenauftritt, der KDS Systems als verlässlichen Cloud-Partner positioniert. Der vereinfachte Beratungsablauf und die klare Kommunikation der Leistungen haben die Zahl qualifizierter Anfragen deutlich erhöht.',
  },
  'public-affair': {
    category: 'Branding',
    desc: 'Anspruchsvolle Markenidentität und Web-Erlebnis für eine Premium-Lifestyle-Marke.',
    challenge: 'Public Affair brauchte einen digitalen Auftritt, der Luxus, Anspruch und Exklusivität vermittelt. Die Marke verlangte eine elegante Altersverifikation, die den Ton setzt, bevor Besucher die eigentliche Seite betreten.',
    solution: 'Wir haben ein elegantes Markenerlebnis gestaltet, beginnend mit einem durchdachten Alterscheck mit eigener Schreibschrift-Typografie und einer satten Palette aus Marineblau und Gold. Jeder Berührungspunkt fühlt sich hochwertig an, vom P.A.-Monogramm bis zum feinen Text, der die Verifikation wie eine Einladung statt einer Hürde wirken lässt.',
    results: 'Die Markenbekanntheit in den Zielgruppen stieg deutlich. Den Alterscheck schließen über 95 % der Besucher ab. Der Einstieg wird als Erlebnis wahrgenommen, nicht als Abschreckung. Die Premium-Positionierung führte zu höherem wahrgenommenen Wert und höheren durchschnittlichen Bestellwerten.',
  },
  'military-newschool': {
    desc: 'Institutioneller Webauftritt für das Center for Military-Affiliated Students der New School.',
    challenge: 'Das 2023 gegründete Center for Military-Affiliated Students der New School brauchte einen digitalen Auftritt, der die Community mit Militärbezug würdigt und sich zugleich in die moderne Designsprache der Universität einfügt. Unterstützungsangebote, Programme und Ressourcen mussten klar kommuniziert werden.',
    solution: 'Wir haben eine klare, professionelle Seite innerhalb des Ökosystems der New School gestaltet, mit überzeugender Fotografie, klarer Informationsarchitektur und barrierefreien Inhalten, die Studierende mit Militärbezug in eine Gemeinschaft aus Forschenden, Künstlern und Designern einladen.',
    results: 'Das Center hat jetzt einen starken digitalen Auftritt, der seine Mission wirksam vermittelt. Mehr Interesse von Studieninteressierten mit Militärbezug und ein leichterer Zugang zu Unterstützungsprogrammen und Services.',
  },
};
