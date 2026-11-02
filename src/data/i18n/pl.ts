/**
 * pl.ts, Polish. Translated from ./en.ts; shape: see ./types.ts.
 * Keep every key; translate values only. Metric and stat values stay as in English.
 */
import type { LocaleBundle } from './types';

export const pl: LocaleBundle = {
  projects: {
    'coach-luki': {
      desc: 'Nastawiona na konwersję strona dla czołowego wegańskiego trenera personalnego w Berlinie.',
      challenge: 'Luke Satterly (Coach Luki) to jeden z najbardziej oddanych trenerów personalnych w Berlinie. Wegański sportowiec trenujący klientów w Holmes Place i John Reed potrzebował strony dorównującej jego energii: odważnej, nastawionej na wyniki i zbudowanej pod konwersję. Cel był prosty. Ktoś trafia na stronę, od razu rozumie, czym zajmuje się Luki, widzi dowody i umawia rozmowę. Bez lania wody. Bez zamieszania. Tylko wyniki.',
      solution: 'Zaprojektowaliśmy stronę, w której każda sekcja prowadzi do jednego celu: rezerwacji bezpłatnej konsultacji. Integracja płatności Stripe pozwala klientom kupować pakiety sesji bezpośrednio i bez tarcia. Lokalne SEO dla Berlina wbudowaliśmy od pierwszego dnia, celując w frazy takie jak „personal trainer Berlin” i „vegan fitness coach Berlin”.',
      results: 'W pełni zoptymalizowana pod konwersję strona trenera personalnego działa w Berlinie, zaprojektowana, zbudowana i wdrożona przez Blok Blok Studio. Klienci rezerwują i płacą bezpośrednio przez stronę, bez wiadomości prywatnych i faktur. Lokalne pozycjonowanie przyciąga ruch organiczny od osób szukających w Berlinie.',
    },
    'bronco-plumbing': {
      desc: 'Generująca leady strona i system rozwoju online dla firmy hydraulicznej z Dallas-Fort Worth.',
      challenge: 'Colton Staley uruchomił Bronco Plumbing w Dallas-Fort Worth w 2026 roku jako jednoosobową firmę w pierwszym roku działalności. Start od zera: bez strony, bez obecności w sieci, bez szansy, żeby właściciele domów z DFW szukający hydraulika go znaleźli. W branżach usługowych telefon dostaje ten, kto pierwszy pojawi się w Google z dowodami dobrej roboty.',
      solution: 'Zbudowaliśmy nastawioną na konwersję stronę wokół samego Coltona: właściciel na każdym zleceniu, uczciwe wyceny, prawdziwe opinie Google pobierane na żywo. Każda sekcja prowadzi do telefonu lub prośby o wycenę, a przyklejony pasek z numerem na telefonie służy osobom szukającym pomocy w środku awarii. Lokalne SEO dla fraz hydraulicznych w DFW wbudowaliśmy od pierwszego dnia, a zgłoszenia z formularza trafiają prosto do jego systemu zleceń.',
      results: 'W pierwsze 5 miesięcy Colton wygenerował ponad 50 000 $ przychodu brutto z prac hydraulicznych i systemu online. Strona ma ocenę 5,0 z 52 opinii Google, zajmuje średnio pozycję 5,2 w Google dla swoich fraz i zebrała ponad 8000 wyświetleń w wyszukiwarce w pierwsze 3 miesiące pomiaru.',
      metrics: [
        {
          value: '$50k',
          label: 'Przychód brutto w pierwsze 5 miesięcy',
        },
        {
          value: '5.0',
          label: 'Ocena Google z 52 opinii',
        },
        {
          value: '5.2',
          label: 'Średnia pozycja w Google',
        },
        {
          value: '8,000+',
          label: 'Wyświetleń w wyszukiwarce w 3 miesiące',
        },
      ],
    },
    'coach-kofi': {
      desc: 'Marka osobista i platforma coachingowa klasy premium z odważną identyfikacją wizualną.',
      challenge: 'Coach Kofi potrzebował strony marki osobistej, która dorówna jego odważnej filozofii „Just Do The Work”. Dotychczasowa obecność w sieci nie oddawała energii i autorytetu, jakie wnosi do coachingu ruchu, wydolności i rozwoju.',
      solution: 'Zaprojektowaliśmy wyrazistą czarno-białą stronę z odważną typografią, profesjonalną fotografią i czytelną ścieżką konwersji od odwiedzającego do klienta coachingu. Strona ma rezerwację w czasie rzeczywistym, liczniki dowodów społecznych (ponad 150 klientów, ponad 8000 godzin coachingu) i responsywny projekt mobile-first.',
      results: 'Profesjonalna obecność marki, która natychmiast komunikuje autorytet. Uproszczona ścieżka rezerwacji zwiększyła liczbę zapytań o konsultacje o 200%, a odważny design stał się znakiem rozpoznawczym marki Coacha Kofiego na wszystkich platformach.',
      metrics: [
        {
          value: '200%',
          label: 'Więcej zapytań o konsultacje po starcie',
        },
      ],
    },
    'exotic-ripz': {
      desc: 'Żywa platforma e-commerce dla marki społeczności kolekcjonerów kart.',
      challenge: 'Exotic Ripz potrzebowało sklepu internetowego, który odda ekscytację i energię społeczności kolekcjonerów kart. Platforma musiała obsłużyć boostery, nowe wydania, uzupełnienia stanów i zaangażowanie społeczności na Discordzie, Twitchu i w social mediach.',
      solution: 'Zbudowaliśmy pełny sklep na Shopify z odważnym animowanym brandingiem, linkami do społeczności na Discordzie, obecnością na wielu platformach (Discord, YouTube, Twitch, TikTok, Instagram, X, Threads), inteligentną kategoryzacją produktów i zoptymalizowanymi pod konwersję pop-upami do zbierania e-maili.',
      results: 'Ponad 191 000 $ sprzedaży kart w 1790 zamówieniach w sklepie, który zbudowaliśmy i uruchomiliśmy, z zapleczem wysyłkowym skonfigurowanym od początku do końca. Lista mailingowa urosła o 400% w pierwszym miesiącu dzięki sprytnemu zbieraniu adresów w zamian za rabat, a dropy boosterów regularnie wyprzedawały się w kilka godzin od premiery. Sklep przekazaliśmy właścicielom do dalszego prowadzenia, a oni od tego czasu zamknęli stronę, więc nie ma działającego linku do pokazania.',
      metrics: [
        {
          value: '$191k',
          label: 'Sprzedaż przez sklep',
        },
        {
          value: '1,790',
          label: 'Wysłanych zamówień',
        },
        {
          value: '400%',
          label: 'Wzrost listy mailingowej w pierwszym miesiącu',
        },
      ],
    },
    'kds-systems': {
      desc: 'Nowoczesna platforma rozwiązań chmurowych dla dostawcy zarządzanych usług IT i chmury obliczeniowej.',
      challenge: 'KDS Systems Inc. potrzebowało profesjonalnej obecności cyfrowej, która zakomunikuje ich kompetencje w chmurze obliczeniowej, Microsoft Office 365, rozwiązaniach pamięci masowej i aplikacjach hostowanych. Dotychczasowa strona nie oddawała skali i niezawodności ich zarządzanych usług IT.',
      solution: 'Zaprojektowaliśmy elegancką, nowoczesną stronę z ciemną, technologiczną estetyką, wyrazistymi zielonymi akcentami i czytelnym podziałem usług. Strona ma sekcje chmury obliczeniowej, pamięci masowej i aplikacji hostowanych z ikonografią, wezwania do umówienia konsultacji i sygnały zaufania klasy enterprise.',
      results: 'Profesjonalna obecność marki, która pozycjonuje KDS Systems jako zaufanego partnera w rozwiązaniach chmurowych. Uproszczona ścieżka rezerwacji konsultacji i jasna komunikacja usług znacząco zwiększyły liczbę wartościowych leadów.',
    },
    'public-affair': {
      desc: 'Wyrafinowana identyfikacja marki i doświadczenie webowe dla marki lifestylowej klasy premium.',
      challenge: 'Public Affair potrzebowało obecności cyfrowej, która odda luksus, wyrafinowanie i ekskluzywność. Marka wymagała eleganckiej weryfikacji wieku, która nada ton, zanim odwiedzający w ogóle wejdą na główną stronę.',
      solution: 'Stworzyliśmy eleganckie doświadczenie marki, zaczynając od pięknie zaprojektowanej bramki weryfikacji wieku z autorską typografią pisaną i bogatą paletą granatu i złota. Każdy punkt styku zaprojektowaliśmy tak, by czuło się klasę premium: od monogramu P.A. po dopracowane teksty, dzięki którym weryfikacja przypomina zaproszenie, a nie barierę.',
      results: 'Rozpoznawalność marki znacząco wzrosła w docelowych grupach. Bramka weryfikacji wieku ma ponad 95% ukończeń. Odwiedzający cieszą się wejściem, zamiast się zniechęcać. Pozycjonowanie premium przełożyło się na wyższą postrzeganą wartość i wyższą średnią wartość zamówienia.',
      metrics: [
        {
          value: '95%+',
          label: 'Odwiedzających, którzy przechodzą weryfikację wieku',
        },
      ],
    },
    'military-newschool': {
      desc: 'Instytucjonalna obecność w sieci dla Center for Military-Affiliated Students uczelni The New School.',
      challenge: 'Center for Military-Affiliated Students uczelni The New School, założone w 2023 roku, potrzebowało obecności cyfrowej, która uhonoruje społeczność związaną z wojskiem i jednocześnie wpisze się w nowoczesny język projektowy uniwersytetu. Strona musiała jasno komunikować usługi wsparcia, programy i zasoby.',
      solution: 'Zaprojektowaliśmy czystą, profesjonalną podstronę w ekosystemie The New School z przyciągającą fotografią, przejrzystą architekturą informacji i dostępnymi treściami, które witają studentów związanych z wojskiem w społeczności naukowców, artystów i projektantów.',
      results: 'Centrum ma teraz silną obecność cyfrową, która skutecznie komunikuje jego misję. Większe zaangażowanie kandydatów związanych z wojskiem i łatwiejszy dostęp do programów i usług wsparcia.',
    },
    'grant-parkhurst': {
      desc: 'Strona portfolio i samoobsługowy portal zdjęciowy dla klientów fotografa z Salt Lake City.',
      challenge: 'Grant Parkhurst fotografuje portrety i wydarzenia oraz kręci filmy w Salt Lake City. Potrzebował jednego miejsca, które pokaże prace w naturalnych proporcjach, wymieni obsługiwane miejscowości, przyjmie rezerwacje i pozwoli przekazywać klientom gotowe galerie bez rozsyłania linków do pobrania mailem.',
      solution: 'Zbudowaliśmy stronę, w której fotografia jest na pierwszym miejscu i żadne zdjęcie nie jest przycinane, z kartami usług, okładkami albumów wyrównanymi w rzędzie, sekcją obszaru działania i ścieżką rezerwacji. Za nią stoi portal klienta pod adresem /portal: Grant loguje się, tworzy galerie, wgrywa zdjęcia do własnego magazynu i udostępnia je, a klienci przeglądają i pobierają swoje zestawy.',
      results: 'Strona i portal ruszyły w sierpniu i wrześniu 2026, a Grant od pierwszego dnia sam zarządza galeriami. Publiczna domena została od tego czasu przeniesiona poza nasz hosting, więc nie ma tu działającego linku; zrzuty ekranu pokazują stronę w wersji, którą oddaliśmy.',
    },
  },
  blog: {
    'why-your-website-is-losing-customers': {
      readTime: '5 min czytania',
      content: `Twoja strona traci klientów z przewidywalnych powodów: ładuje się zbyt wolno, nie mówi, czym się zajmujesz, irytuje na telefonie i nie daje odwiedzającym żadnego powodu, żeby Ci zaufać. Nic z tego nie jest zgadywaniem. Badania Google, Nielsen Norman Group i Baymard Institute podają konkretne liczby dla każdego z tych problemów, a każdy z nich da się naprawić.

## 1. Wolne ładowanie zabija konwersję

Kiedy BBC przeanalizowało własny ruch, okazało się, że traci dodatkowe 10% użytkowników z każdą kolejną sekundą ładowania strony. Druga strona medalu jest równie realna: Vodafone poprawił Largest Contentful Paint o 31% i sprzedaż wzrosła o 8%, a Rakuten 24 zwiększył przychód na odwiedzającego o 53% po osiągnięciu progów Core Web Vitals. Wszystkie trzy wyniki są udokumentowane w studiach przypadków Google na web.dev (zobacz Źródła poniżej).

Aktualne cele Google są konkretne: główna treść widoczna (LCP) w ciągu 2,5 sekundy, reakcja na dotknięcia i kliknięcia (INP) w ciągu 200 milisekund i przesunięcia układu (CLS) poniżej 0,1, mierzone na 75. percentylu rzeczywistych wizyt.

**Rozwiązanie:** Kompresuj i skaluj obrazy (WebP lub AVIF), serwuj stronę przez CDN, usuń nieużywany JavaScript i ładuj leniwie wszystko poniżej pierwszego ekranu. Nowoczesny framework, taki jak Next.js, załatwia większość z tego od ręki.

## 2. Brak jasnej propozycji wartości

Nielsen Norman Group, opierając się na analizie ponad 200 milionów odwiedzin stron, ustaliła, że pierwsze 10 sekund jest decydujące. Jeśli strona nie zakomunikuje swojej wartości w tym oknie, większość odwiedzających odchodzi. Ci, którzy zostaną dłużej niż 30 sekund, często zostają na minuty. A badanie naukowców Google wykazało, że ludzie oceniają atrakcyjność wizualną strony w ciągu 50 milisekund, zanim przeczytają choć jedno słowo.

**Rozwiązanie:** Zacznij od jasnego nagłówka opartego na korzyści. Powiedz odwiedzającym dokładnie, jaki problem rozwiązujesz i dla kogo. Ogólnikowe otwarcia w stylu „Witamy na naszej stronie” marnują jedyne sekundy, które się liczą.

## 3. Słabe doświadczenie mobilne

Google do indeksowania i rankingu używa mobilnej wersji Twojej strony, skanowanej agentem smartfonowym. Dane sieciowe Cloudflare pokazują, że w 2025 roku 43% wszystkich żądań w sieci pochodziło z urządzeń mobilnych, wobec 41% rok wcześniej. Jeśli Twoja strona ma na telefonie maleńkie przyciski i nieczytelny tekst, zawodzisz zarówno Google, jak i ogromną część swoich odbiorców.

**Rozwiązanie:** Projektuj mobile-first i testuj na prawdziwych urządzeniach. WCAG 2.2 ustala próg dostępności dla elementów dotykowych na 24 na 24 piksele CSS; traktuj to jako minimum i rób główne przyciski wyraźnie większe. Tekst ma być czytelny bez powiększania, a nawigacja w zasięgu kciuka.

## 4. Słabe lub brakujące wezwania do działania

Jeśli odwiedzający nie wiedzą, co zrobić dalej, odchodzą. Każda podstrona potrzebuje jasnego wezwania do działania, czy to umówienia rozmowy, prośby o wycenę, czy pobrania materiału.

**Rozwiązanie:** Używaj jednego głównego CTA na podstronę. Wyróżnij je wizualnie kontrastowym kolorem. Używaj języka działania („Odbierz bezpłatny audyt” wygrywa z „Wyślij”).

## 5. Brak sygnałów zaufania

Metaanaliza 50 badań Baymard Institute podaje średni wskaźnik porzucania koszyka na poziomie nieco ponad 70%. Wśród powodów, które da się naprawić, 19% kupujących w USA stwierdziło, że nie ufa stronie na tyle, by podać dane karty, a 17% porzuciło zakupy z powodu błędów lub awarii strony. Stanford Web Credibility Project, oparty na badaniach z udziałem ponad 4500 osób, wykazał, że ludzie oceniają wiarygodność strony głównie po jej wyglądzie, i zaleca pokazywanie prawdziwych ludzi stojących za stroną, fizycznego adresu i czytelnych danych kontaktowych.

**Rozwiązanie:** Dodaj dowody społeczne na całej stronie, nie tylko w osobnej zakładce z opiniami. Pokazuj prawdziwe wyniki, prawdziwych ludzi i prawdziwe liczby. Zadbaj, by dane kontaktowe były łatwe do znalezienia.

## Gotowy naprawić swoją stronę?

Jeśli którykolwiek z tych problemów brzmi znajomo, nie jesteś sam. Większość firmowych stron cierpi na co najmniej dwa lub trzy z nich. Dobra wiadomość? Wszystkie da się naprawić.

Umów bezpłatną rozmowę strategiczną z naszym zespołem, a pokażemy Ci dokładnie, co hamuje Twoją stronę i jak zamienić ją w silnik wzrostu.

## Źródła

- **Google web.dev, Why speed matters**: https://web.dev/articles/why-speed-matters
- **Google web.dev, Core Web Vitals**: https://web.dev/articles/vitals
- **Nielsen Norman Group, How Long Do Users Stay on Web Pages?**: https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/
- **Tuch i in., badanie pierwszego wrażenia (Google Research)**: https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/
- **Cloudflare Radar 2025 Year in Review**: https://blog.cloudflare.com/radar-2025-year-in-review/
- **W3C, WCAG 2.2 Target Size (Minimum)**: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- **Baymard Institute, statystyki porzucania koszyka**: https://baymard.com/lists/cart-abandonment-rate
- **Stanford Web Credibility Project, wytyczne**: https://credibility.stanford.edu/guidelines/index.html`,
    },
    'seo-checklist-2026': {
      readTime: '7 min czytania',
      content: `Pozycjonowanie w 2026 roku nadal sprowadza się do podstaw: strona, którą Google potrafi przeskanować, podstrony, które szybko się ładują, struktura, którą maszyny potrafią odczytać, i treści, które odpowiadają na prawdziwe pytania. Google potwierdza, że te same fundamenty decydują dziś również o tym, czy pojawisz się w AI Overviews i trybie AI. Oto checklista, którą przechodzimy przy każdej budowanej stronie.

## Fundamenty technicznego SEO

- **HTTPS wszędzie**: Google używa HTTPS jako sygnału rankingowego od 2014 roku. To lekki sygnał, ale przeglądarki oznaczają niezabezpieczone strony, a odwiedzający to zauważają.
- **Szybkie Core Web Vitals**: LCP poniżej 2,5 sekundy, INP poniżej 200 milisekund, CLS poniżej 0,1, mierzone na 75. percentylu rzeczywistych wizyt. INP zastąpił FID jako metrykę responsywności w 2024 roku, więc pożegnaj stare dashboardy z FID.
- **Indeksowanie mobile-first**: Google skanuje agentem smartfonowym i używa Twojej wersji mobilnej do indeksowania i rankingu. Twoja strona mobilna JEST Twoją stroną.
- **Czysta struktura adresów URL**: Używaj opisowych, czytelnych adresów. Unikaj parametrów zapytania, gdzie tylko się da.
- **Mapa strony XML**: Zgłoś ją w Google Search Console. Utrzymuj ją aktualną.
- **robots.txt**: Blokuj to, co nie powinno być indeksowane (strony administracyjne, ścieżki API).

## SEO na stronie

- **Unikalne tagi tytułu**: Google mówi, że nie ma sztywnego limitu znaków, ale długie tytuły są przycinane, by zmieścić się na ekranie. Najważniejsze słowa dawaj na początku, każdej podstronie nadaj odrębny, opisowy tekst i unikaj szablonowych fraz oraz powtarzanych słów kluczowych.
- **Meta opisy**: Napisz przekonujące streszczenie dla każdej podstrony. Google przycina długie fragmenty, więc wartość umieść w pierwszym zdaniu.
- **Hierarchia nagłówków**: Jeden H1 na podstronę, logiczna struktura od H2 do H6.
- **Linkowanie wewnętrzne**: Łącz powiązane podstrony. Używaj opisowych tekstów kotwic.
- **Optymalizacja obrazów**: Teksty alternatywne, skompresowane formaty (WebP/AVIF), leniwe ładowanie.

## Dane strukturalne

Dane strukturalne pomagają Google zrozumieć Twoje treści i mogą zapewnić Ci wyniki rozszerzone (rozwijane FAQ, gwiazdki ocen, okruszki). Własne studia przypadków Google pokazują, że przekładają się na realne liczby: Rotten Tomatoes zmierzyło o 25% wyższy współczynnik klikalności na stronach z danymi strukturalnymi, a Nestlé o 82% wyższy współczynnik klikalności na stronach wyświetlanych jako wyniki rozszerzone.

- **Schema Organization**: Powiedz Google, kim jesteś.
- **Schema LocalBusiness**: Niezbędne w lokalnym SEO.
- **Schema BreadcrumbList**: Ułatwia nawigację w wynikach wyszukiwania.
- **Schema FAQPage**: Może zapewnić rozwinięte fragmenty FAQ w wynikach.
- **Schema Article**: Do wpisów blogowych i aktualności.

## Wyszukiwanie AI to nadal SEO

Google mówi wprost, że nie ma dodatkowych wymagań, by pojawić się w AI Overviews lub trybie AI: żadnych specjalnych plików, nowych znaczników ani osobnej optymalizacji. O tym, czy funkcje AI wyświetlą i zacytują Twoje strony, decydują te same fundamenty: skanowalność, doświadczenie strony i przydatne treści. A jeśli chcesz ograniczyć sposób wykorzystania Twoich treści, istniejące mechanizmy (nosnippet, max-snippet, noindex) nadal obowiązują.

## Strategia treści

- **Celuj w frazy długiego ogona**: Mniejsza konkurencja, wyższa intencja.
- **Odpowiadaj na prawdziwe pytania**: Szukaj pomysłów w sekcji „Podobne pytania” i w mailach od własnych klientów.
- **Utrzymuj treści aktualne**: Przeglądaj je co kwartał. Aktualizuj fakty, zrzuty ekranu i daty, żeby strony pozostały wiarygodne.
- **Buduj autorytet tematyczny**: Twórz klastry powiązanych treści wokół swoich kluczowych tematów.

## Podsumowanie

SEO nie jest jednorazowym projektem. To stała praktyka. Ale dopięcie podstaw od pierwszego dnia daje ogromną przewagę nad konkurencją, która traktuje je po macoszemu.

Jeśli wolisz nie przechodzić tej checklisty w pojedynkę, umów bezpłatną rozmowę strategiczną, a pokażemy dokładnie, gdzie stoi Twoja strona i co naprawić najpierw.

## Źródła

- **Google web.dev, Core Web Vitals**: https://web.dev/articles/vitals
- **Google Search Central, HTTPS jako sygnał rankingowy**: https://developers.google.com/search/blog/2014/08/https-as-ranking-signal
- **Google Search Central, indeksowanie mobile-first**: https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing
- **Google Search Central, linki tytułowe**: https://developers.google.com/search/docs/appearance/title-link
- **Google Search Central, wprowadzenie do danych strukturalnych**: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- **Google Search Central, funkcje AI a Twoja strona**: https://developers.google.com/search/docs/appearance/ai-features`,
    },
    'brand-identity-investment': {
      readTime: '5 min czytania',
      content: `Większość firm traktuje branding jak dekorację. Liczby mówią co innego. Ranking BrandZ firmy Kantar wycenia 100 najcenniejszych marek świata na łącznie 13,1 biliona dolarów w 2026 roku, o 22% więcej w ciągu jednego roku. Marka jest aktywem i jak każde aktywo procentuje. Oto, co silna identyfikacja naprawdę robi dla firmy i jak rozpoznać, że Twoja Cię hamuje.

## Czym właściwie jest tożsamość marki

Tożsamość marki to kompletny system wizualny i werbalny, który reprezentuje Twoją firmę. Obejmuje logo, paletę kolorów, typografię, głos, przekaz i emocje, które ludzie łączą z Twoją nazwą.

Pomyśl o najcenniejszych markach świata. Rozpoznajesz je natychmiast, nie tylko po logo, ale po całym języku wizualnym i po tym, jak sprawiają, że się czujesz.

## Dlaczego to ma znaczenie dla wzrostu

**1. Zaufanie od pierwszego spojrzenia.** Badania Google wykazały, że ludzie oceniają atrakcyjność wizualną strony w ciągu 50 milisekund od jej zobaczenia. Stanford Web Credibility Project, oparty na badaniach z udziałem ponad 4500 osób, wykazał, że ludzie oceniają wiarygodność głównie po wyglądzie. Dopracowana, spójna marka sygnalizuje profesjonalizm, zanim ktokolwiek przeczyta jedno słowo.

**2. Wyższe ceny.** Kantar mierzy siłę marki częściowo jako siłę cenową: zdolność do żądania więcej niż konkurencja bez utraty popytu. Ta siła cenowa to w dużej mierze powód, dla którego wartość najsilniejszych marek świata wciąż rośnie, podczas gdy słabsi konkurenci walczą ceną.

**3. Lojalność klientów.** Harvard Business Review udokumentował, co się stało, gdy firmy zainwestowały w emocjonalną więź z klientami: jeden bank zwiększył korzystanie z produktów w docelowym segmencie o 70%, a liczbę nowych kont o 40%, a sieć odzieżowa ponad trzykrotnie przyspieszyła wzrost sprzedaży w porównywalnych sklepach. Ludzie nie kupują po prostu produktów, kupują marki.

**4. Skuteczniejszy marketing.** Kiedy Twoja marka jest jasna i spójna, każda złotówka na marketing pracuje mocniej. Ludzie Cię pamiętają. Rozpoznają Cię. Wracają.

## Sygnały, że potrzebujesz odświeżenia marki

- Twoja identyfikacja wizualna wygląda przestarzale lub niespójnie na różnych platformach
- Klienci nie potrafią powiedzieć, co Cię wyróżnia
- Konkurujesz głównie ceną, a nie wartością
- Twój zespół nie wie, jak spójnie reprezentować markę

## Gdzie żyje Twoja marka: na Twojej stronie

Nie potrzebujesz budżetu z listy Fortune 500, żeby wykorzystać te badania. Dla większości firm miejscem, w którym tożsamość marki spotyka klientów, jest strona internetowa. To tam dzieje się pierwsze wrażenie w 50 milisekund, tam oceniana jest wiarygodność i tam niespójna identyfikacja po cichu kosztuje Cię zapytania.

Jeśli Twoja obecna strona nie wygląda jak firma, którą naprawdę zbudowałeś, umów bezpłatną rozmowę strategiczną, a pokażemy, jak mogłaby wyglądać strona, która zdobywa to zaufanie.

## Źródła

- **Kantar BrandZ Most Valuable Global Brands**: https://www.kantar.com/campaigns/brandz/global
- **Tuch i in., badanie pierwszego wrażenia (Google Research)**: https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/
- **Stanford Web Credibility Project, wytyczne**: https://credibility.stanford.edu/guidelines/index.html
- **Harvard Business Review, The New Science of Customer Emotions**: https://hbr.org/2015/11/the-new-science-of-customer-emotions`,
    },
  },
  videos: {
    kofi: {
      name: 'Coach Kofi o współpracy z Blok Blok Studio',
      description: 'Wideo-referencja od Coacha Kofiego, sportowca Nike i trenera personalnego w Berlinie, nagrana w jego siłowni. Blok Blok Studio zbudowało coachkofi.de; zapytania o konsultacje wzrosły o 200% po starcie.',
      transcript: `Pracowałem z Chase'em nad moją stroną i wyszło zupełnie niesamowicie. Dał mi to logo w stylu Apple, ten design w stylu Apple. Elementy wyskakują naprawdę ładnie. Strona ma gładkie wykończenie.

Osobiście lubię strony jednostronicowe. Na to się zdecydowaliśmy. Komunikacja z nim jest naprawdę łatwa. To dobry człowiek, serio. Bardzo zdeterminowany.

I myślę, że potrzebujesz kogoś, kto zajmie się tą zewnętrzną warstwą Twojego oprogramowania. Potrzebujesz kogoś, kto szybko odpowiada, zna się na rzeczy i potrafi dopasować się do Twoich potrzeb.

Tak, więc naprawdę polecam Chase'a, czyli Blok Blok Studio. Współpraca z nimi bardzo mi pomogła. Tak, serio. Dajcie im szansę. Są naprawdę dobrzy.`,
    },
    luki: {
      name: 'Coach Luki o współpracy z Blok Blok Studio',
      description: 'Wideo-referencja od Coacha Lukiego, trenera personalnego w Berlinie. Blok Blok Studio zbudowało coachluki.com, stronę, która przyjmuje jego rezerwacje i płatności bezpośrednio, zamiast przez wiadomości prywatne i ręczne faktury.',
      transcript: `Jestem trenerem personalnym w Berlinie i trafiłem na Chase'a, czyli Blok Blok Studio, przez znajomego, który wcześniej z nim pracował. Umówiłem się więc na rozmowę, pogadaliśmy o moich celach, o mojej wizji strony, i od razu poczułem, że zostałem zrozumiany. Była w tym też bardzo swojska atmosfera, co na pewno sprawiło, że współpraca z Chase'em była dużo luźniejsza.

Chase to po prostu świetny facet, który ma do Ciebie mnóstwo cierpliwości. Pracowaliśmy razem w czasie, kiedy miałem sporo na głowie prywatnie, a on był bardzo cierpliwy, pilnował, żebym trzymał się planu, i prowadził mnie przez cały proces tak, żebym nie czuł się przytłoczony. To było dla mnie dużym plusem.

Jego komunikacja jest świetna, odpowiada bardzo szybko, to ogromny plus. Miałem mnóstwo pomysłów, które chciałem wprowadzić na stronę, a on przeszedł przez te pomysły, przez te wizje, które miałem, i zadbał, żeby pasowały do tożsamości marki, i nigdy żadnego nie zbył. To był dla mnie kolejny mocny punkt.

Przez cały proces czułem się zauważony, wysłuchany, czułem, że jestem częścią całego procesu, a co najważniejsze, czułem, że ktoś naprawdę o mnie dba. A to dzisiaj już nie jest norma, powiedziałbym.

Najbardziej w tej stronie podoba mi się to, że to nie jest kolejny szablon, który każdy może skleić. Włożono w nią mnóstwo intencji. Skupiliśmy się na ścieżce klienta, na doświadczeniu użytkownika, i zadbaliśmy, żeby strona i tożsamość marki wyglądały autentycznie i zapadały w pamięć.

Więc jeśli szukasz kogoś, kto o Ciebie zadba, kto skupia się na szczegółach, kto jest dla Ciebie i szybko odpowiada, to z Chase'em, czyli w tym przypadku z Blok Blok Studio, jesteś zdecydowanie we właściwym miejscu.`,
    },
    founder: {
      name: 'Kilka słów od założyciela Blok Blok Studio',
      description: 'Chase Haynes pokazuje, gdzie firmy usługowe po cichu tracą klientów w sieci i jak Blok Blok Studio to naprawia, nagranie ekranu na tle strony studia.',
      transcript: `Nazywam się Chase, jestem założycielem Blok Blok Studio. Mogę Ci opowiedzieć wszystkie case studies świata o naszej firmie, ale jeśli nie znasz mnie jako człowieka, to nie ma to żadnego znaczenia. Więc się przedstawię.

Nazywam się Chase. Pochodzę z San Diego w Kalifornii. Dorastałem w różnych miejscach w Stanach, wylądowałem na Wschodnim Wybrzeżu. Wstąpiłem do Korpusu Piechoty Morskiej, służyłem pięć lat. Po wyjściu przeprowadziłem się do Nowego Jorku, do Parsons School of Design. Zdobyłem dyplom, licencjat sztuk pięknych z designu i technologii. Potem, w czerwcu 2024, założyłem swoją agencję, Blok Blok Studio. A jakiś rok później przeprowadziłem się do Berlina.

Od tego czasu po prostu skalujemy firmę. Rośnie, wszystko nabiera tempa. Mamy teraz czteroosobowy zespół. Mój dyrektor kreatywny jest w Wirginii, strateg marketingu w Los Angeles, a full stack developer tutaj, w Berlinie. To niesamowita jazda i jesteśmy tu każdego dnia, dając z siebie wszystko.

Chętnie z Tobą popracuję. Poniżej zobaczysz kilka case studies. Zobaczysz cztery przykłady naszych realizacji. Przejrzyj je, sprawdź. Jeśli masz pytania, napisz do mnie na Instagramie albo mailem, jak Ci wygodniej.

Pod spodem jest formularz kontaktowy. Po prostu wpisz swoje dane. Trafiają prosto do mnie, przejrzę je, umówimy się na rozmowę i zobaczymy, czy to zagra. Jeśli zagra, świetnie. Jeśli nie, trudno. Ale naprawdę nie mogę się doczekać, żeby Cię poznać. Miłego dnia. Do usłyszenia.`,
    },
  },
  specialties: {
    'webdesign-berlin': {
      metaTitle: 'Projektowanie stron Berlin | Blok Blok Studio',
      metaDescription: 'Studio projektowania stron w Berlinie. Autorskie strony w Next.js, które zdobywają klientów. Bez szablonów, bez kreatorów. Bezpłatna rozmowa wstępna.',
      kicker: 'Studio projektowania stron w Berlinie',
      h1: 'Projektowanie stron z Berlina, które przynosi klientów',
      intro: 'Projektujemy i budujemy autorskie strony internetowe dla firm w Berlinie i na całym świecie. Każdą stronę budujemy od podstaw: szybką, zoptymalizowaną pod wyszukiwarki i nastawioną na jeden cel, zamianę odwiedzających w klientów.',
      stats: [
        {
          value: '15+',
          label: 'Zrealizowanych projektów',
        },
        {
          value: '100%',
          label: 'Autorskie realizacje, zero szablonów',
        },
        {
          value: '2',
          label: 'Berlińskich trenerów z rezerwacjami płynącymi przez ich strony',
        },
      ],
      featuresHeading: 'Co dostajesz',
      features: [
        {
          title: 'Autorski projekt, nie kreator',
          desc: 'Każdą stronę budujemy ręcznie w Next.js. To oznacza krótsze czasy ładowania, lepsze pozycje w Google i design, który nie istnieje nigdzie indziej.',
        },
        {
          title: 'SEO od pierwszego dnia',
          desc: 'Czysta struktura, lokalne frazy, dane strukturalne i wyniki wydajności, które Google nagradza. Twoja strona ma być znajdowana, nie tylko dobrze wyglądać.',
        },
        {
          title: 'Rezerwacje i płatności bezpośrednio na stronie',
          desc: 'Umawianie terminów, płatności Stripe, formularze kontaktowe z natychmiastowym powiadomieniem. Twoja strona pracuje, nawet kiedy Ty nie pracujesz.',
        },
        {
          title: 'Widoczność w wyszukiwaniu AI (AEO)',
          desc: 'Coraz więcej klientów pyta ChatGPT, Perplexity lub przegląd AI w Google zamiast klasycznie googlować. Wbudowujemy dane strukturalne, formaty odpowiedzi i llms.txt, żeby Twoja strona była cytowana w odpowiedziach AI.',
        },
        {
          title: 'Opieka z Berlina',
          desc: 'Bezpośredni kontakt, szybkie odpowiedzi, osobiste przekazanie projektu. Bez systemu zgłoszeń, bez agencyjnej kolejki.',
        },
      ],
      caseStudy: {
        heading: 'Z praktyki',
        name: 'Coach Luki, trener personalny w Berlinie',
        result: 'Rezerwacje i płatności przechodzą w całości przez stronę',
        body: 'Luke Satterly trenuje klientów w Holmes Place i John Reed. Jego strona przyjmuje rezerwacje i obsługuje płatności przez Stripe, bez wiadomości prywatnych i ręcznie wystawianych faktur. Do tego lokalne SEO dla fraz takich jak „personal trainer Berlin”.',
        linkLabel: 'Zobacz case study',
      },
      faqHeading: 'Częste pytania',
      faqs: [
        {
          q: 'Ile kosztuje strona w Blok Blok Studio?',
          a: 'Każdy projekt wyceniamy indywidualnie, zależnie od zakresu i funkcji. Po bezpłatnej rozmowie wstępnej otrzymujesz ofertę ze stałą ceną i jasno określonym zakresem prac. Orientację znajdziesz na naszej stronie z cennikiem.',
        },
        {
          q: 'Ile trwa realizacja?',
          a: 'Typowa strona firmowa jest gotowa w 2 do 4 tygodni. Większe projekty z systemem rezerwacji lub sklepem trwają odpowiednio dłużej. Dokładny harmonogram ustalamy przed startem projektu.',
        },
        {
          q: 'Pracujecie tylko z firmami z Berlina?',
          a: 'Nie. Mamy siedzibę w Berlinie i klientów z miasta obsługujemy osobiście, ale pracujemy z firmami na całym świecie, między innymi w USA.',
        },
        {
          q: 'Dlaczego nie strona z AI albo kreator w stylu Wix?',
          a: 'Kreatory AI w kilka minut dostarczają stronę, która wygląda jak tysiąc innych, wolno się ładuje i nie jest wiarygodnie znajdowana ani w Google, ani w wyszukiwaniu AI. Autorska strona kosztuje więcej, ale za to mierzalnie zdobywa klientów. Nasze case studies pokazują liczby.',
        },
        {
          q: 'Dlaczego Next.js zamiast WordPressa lub Wix?',
          a: 'Strony w Next.js ładują się szybciej, są bezpieczniejsze i lepiej się pozycjonują, bo nie ciągną za sobą balastu wtyczek i motywów. Dostajesz dokładnie to, czego potrzebuje Twoja firma, i nic, co by ją spowalniało.',
        },
      ],
      ctaHeading: 'Porozmawiajmy o Twoim projekcie',
      ctaBody: 'Bezpłatna rozmowa wstępna, 15 minut. Ty mówisz, czego potrzebujesz, my szczerze mówimy, jak byśmy to zrealizowali.',
      ctaButton: 'Umów bezpłatną rozmowę',
    },
    'plumber-website-design': {
      metaTitle: 'Strony internetowe dla hydraulików | Blok Blok Studio',
      metaDescription: 'Strony dla hydraulików i firm usług domowych, które zamieniają wyszukiwania w Google i AI w umówione zlecenia. Nasz klient-hydraulik w pierwszym roku działalności wygenerował 50 tys. $ dzięki swojej stronie.',
      kicker: 'Rzemiosło i usługi dla domu',
      h1: 'Strony dla hydraulików, które zamieniają wyszukiwania w zlecenia',
      intro: 'Kiedy właścicielowi domu pęknie rura, wpisuje hasło w wyszukiwarkę, dzwoni do pierwszego wiarygodnego wyniku i nigdy nie przewija dalej. Budujemy strony dla hydraulików i firm usług domowych, które wygrywają ten moment: szybkie, gotowe na lokalne SEO i zbudowane wokół przycisku połączenia.',
      stats: [
        {
          value: '$50k',
          label: 'Przychód wygenerowany przez naszego klienta-hydraulika w pierwsze 5 miesięcy',
        },
        {
          value: '5.0',
          label: 'Ocena z 52 opinii Google, pobieranych na żywo na stronę',
        },
        {
          value: '8,000+',
          label: 'Wyświetleń w wyszukiwarce Google w pierwsze 3 miesiące pomiaru',
        },
      ],
      featuresHeading: 'Czego potrzebuje strona fachowca, żeby naprawdę przynosić zlecenia',
      features: [
        {
          title: 'Przyklejony pasek z numerem na telefonie',
          desc: 'Większość wyszukiwań w nagłych sytuacjach odbywa się na telefonie. Numer jest cały czas na ekranie, więc w chwili, gdy klient podejmie decyzję, stuka raz i telefon dzwoni.',
        },
        {
          title: 'Lokalne SEO wbudowane od pierwszego dnia',
          desc: 'Podstrony usług dla każdego typu zlecenia, targetowanie miast, schema opinii i spójność z Profilem Firmy w Google. Cel jest prosty: pojawiać się, gdy Twoja okolica szuka „hydraulik w pobliżu”.',
        },
        {
          title: 'Prawdziwe opinie, pobierane na żywo',
          desc: 'Twoje opinie z Google wyświetlają się na stronie automatycznie. Świeże dowody bez Twojego udziału i te same sygnały zaufania, które nagradza Google.',
        },
        {
          title: 'Widoczność w wyszukiwaniu AI, nie tylko w Google',
          desc: 'Właściciele domów coraz częściej pytają ChatGPT i przegląd AI w Google „kto jest najlepszym hydraulikiem w pobliżu”. Budujemy dane strukturalne i treści w formie odpowiedzi (AEO), dzięki którym Twoja firma jest cytowana w tych odpowiedziach AI.',
        },
        {
          title: 'Leady prosto do Twojego systemu pracy',
          desc: 'Prośby o wycenę i zgłoszenia z formularza natychmiast trafiają do Twojej skrzynki i Twojego systemu zleceń. W rzemiośle zlecenie wygrywa ten, kto pierwszy oddzwoni.',
        },
      ],
      caseStudy: {
        heading: 'Studium przypadku',
        name: 'Bronco Plumbing, Dallas-Fort Worth',
        result: '50 000 $ przychodu brutto w pierwsze 5 miesięcy działalności',
        body: 'Colton Staley uruchomił Bronco Plumbing bez strony i bez obecności w sieci. Zbudowaliśmy wokół niego stronę nastawioną na konwersję: właściciel na każdym zleceniu, uczciwe wyceny, opinie Google na żywo i przyklejony pasek z numerem dla osób szukających w środku awarii. Strona zajmuje średnio pozycję 5,2 dla swoich fraz.',
        linkLabel: 'Przeczytaj pełne case study',
      },
      faqHeading: 'Częste pytania',
      faqs: [
        {
          q: 'Ile kosztuje strona dla hydraulika?',
          a: 'Każdą realizację wyceniamy do zakresu po bezpłatnej 15-minutowej rozmowie. Przed startem dostajesz stałą cenę i określony zakres prac. Zobacz naszą stronę z cennikiem, żeby poznać strukturę współpracy.',
        },
        {
          q: 'Kiedy strona zacznie przynosić leady?',
          a: 'Sama strona jest zwykle gotowa w 2 do 4 tygodni. Lokalne SEO narasta przez kolejne miesiące; nasz klient-hydraulik odnotował ponad 8000 wyświetleń w wyszukiwarce w pierwsze 3 miesiące pomiaru.',
        },
        {
          q: 'Pracujecie też z innymi fachowcami, nie tylko hydraulikami?',
          a: 'Tak. Ten sam schemat działa dla elektryków, firm HVAC, dekarzy i każdej firmy usług domowych, której klienci szukają lokalnie i dzwonią: lokalne SEO, opinie na żywo i strona zbudowana wokół telefonu.',
        },
        {
          q: 'Dlaczego nie skorzystać po prostu z kreatora stron AI?',
          a: 'Kreatory AI w kilka minut produkują ogólnikową stronę, ale nie potrafią tego, co przynosi zlecenia hydraulikowi: lokalnego SEO dla każdego obszaru usług, opinii Google na żywo, mobilnego układu zbudowanego wokół telefonu i leadów podpiętych do Twojego systemu pracy. Nasz klient-hydraulik wygenerował 50 tys. $ w 5 miesięcy dzięki stronie zbudowanej pod jego rynek, a nie z szablonu.',
        },
        {
          q: 'Możecie połączyć stronę z narzędziami, których już używam?',
          a: 'Tak. Formularze mogą zasilać Twój CRM, oprogramowanie do zarządzania zleceniami albo prosty pipeline, który dla Ciebie skonfigurujemy. Nasza realizacja dla Bronco przekazuje leady bezpośrednio do systemu zleceń właściciela.',
        },
      ],
      ctaHeading: 'Chcesz stronę, która przynosi zlecenia?',
      ctaBody: 'Bezpłatna 15-minutowa rozmowa. Opowiedz nam o swoim obszarze działania, a my powiemy dokładnie, co byśmy zbudowali.',
      ctaButton: 'Umów bezpłatną rozmowę',
    },
    'personal-trainer-website-design': {
      metaTitle: 'Strony internetowe dla trenerów personalnych | Blok Blok Studio',
      metaDescription: 'Strony dla trenerów personalnych i coachów z wbudowaną rezerwacją i płatnościami. Nasi klienci przyjmują rezerwacje i pieniądze bezpośrednio przez swoje strony. Zobacz prawdziwe przykłady.',
      kicker: 'Coachowie i trenerzy',
      h1: 'Strony dla trenerów personalnych, które rezerwują klientów, gdy Ty trenujesz',
      intro: 'Gonienie leadów w wiadomościach prywatnych i ręczne wysyłanie faktur ogranicza liczbę klientów, których możesz przyjąć. Budujemy strony dla trenerów personalnych i coachów, na których odwiedzający rezerwują sesje i płacą bezpośrednio, więc Twój kalendarz zapełnia się sam.',
      stats: [
        {
          value: '200%',
          label: 'Wzrost zapytań o konsultacje po starcie (Coach Kofi)',
        },
        {
          value: '0',
          label: 'Faktur wysłanych ręcznie od startu, płatności idą przez Stripe (Coach Luki)',
        },
        {
          value: '2',
          label: 'Berlińskich trenerów, u których rezerwacje w całości przechodzą przez strony',
        },
      ],
      featuresHeading: 'Czego potrzebuje strona coacha, żeby konwertować',
      features: [
        {
          title: 'Rezerwacje i płatności na stronie',
          desc: 'Klienci wybierają termin i płacą w jednym kroku przez Stripe. Bez wymiany wiadomości, bez gonienia płatności, bez nieobecności z niepotwierdzonych rezerwacji.',
        },
        {
          title: 'Strona, która sprzedaje Twoją metodę',
          desc: 'Twoja filozofia, Twoje wyniki, Twoje dowody, ułożone tak, by odwiedzający w kilka sekund zrozumiał, co robisz, i zarezerwował, zanim wyjdzie.',
        },
        {
          title: 'Lokalne SEO dla Twojego miasta',
          desc: 'Kiedy ktoś wpisuje „trener personalny” plus Twoje miasto, chcesz być odpowiedzią. Lokalne targetowanie wbudowujemy od pierwszego dnia.',
        },
        {
          title: 'Znajdowany w wyszukiwaniu AI (AEO)',
          desc: 'Potencjalni klienci pytają dziś ChatGPT i Perplexity o polecanych trenerów. Dane strukturalne, FAQ w formie odpowiedzi i llms.txt sprawiają, że Twoją stronę mogą cytować wyszukiwarki AI, a nie tylko pozycjonować Google.',
        },
        {
          title: 'Dowody społeczne, które procentują',
          desc: 'Liczba klientów, efekty przemian, wideo-referencje. Prawdziwe liczby na stronie sprzedają za Ciebie, żebyś nie musiał tego robić w wiadomościach prywatnych.',
        },
      ],
      caseStudy: {
        heading: 'Studium przypadku',
        name: 'Coach Luki, Berlin',
        result: 'Rezerwacje i płatności idą prosto przez stronę',
        body: '„Zbudowali całą moją stronę od zera i teraz klienci rezerwują i płacą bezpośrednio przez nią. Wcześniej traciłem godziny na wiadomości i faktury.” Luke Satterly trenuje klientów w Holmes Place i John Reed w Berlinie. Jego strona obsługuje rezerwacje, płatności Stripe i lokalne SEO dla fraz takich jak „personal trainer Berlin”.',
        linkLabel: 'Przeczytaj pełne case study',
      },
      faqHeading: 'Częste pytania',
      faqs: [
        {
          q: 'Ile kosztuje strona dla trenera personalnego?',
          a: 'Każdą realizację wyceniamy do zakresu po bezpłatnej 15-minutowej rozmowie, ze stałą ceną i określonym zakresem prac przed startem. Zobacz naszą stronę z cennikiem, żeby poznać strukturę współpracy.',
        },
        {
          q: 'Czy klienci naprawdę mogą płacić przez stronę?',
          a: 'Tak. Integrujemy Stripe, więc klienci kupują pakiety sesji bezpośrednio. Pieniądze trafiają na Twoje konto, potwierdzenia wychodzą automatycznie, a Ty nigdy nie wystawiasz faktury ręcznie.',
        },
        {
          q: 'Większość klientów mam z Instagrama. Czy nadal potrzebuję strony?',
          a: 'Instagram buduje uwagę; strona ją konwertuje. Link w bio prowadzący na stronę z dowodami, cennikiem i natychmiastową rezerwacją domyka klientów, których wiadomości prywatne gubią. Zapytania o konsultacje u Coacha Kofiego wzrosły po starcie o ponad 200%.',
        },
        {
          q: 'Dlaczego nie skorzystać po prostu z kreatora stron AI?',
          a: 'Kreator AI potrafi opisać Twój coaching. Nie potrafi przyjąć rezerwacji, obsłużyć płatności Stripe ani wypozycjonować się na „trener personalny” w Twoim mieście. Strona zwraca się, gdy rezerwuje klientów, podczas gdy Ty trenujesz, a to wymaga prawdziwej inżynierii, nie wygenerowanego szablonu.',
        },
        {
          q: 'Pracujecie tylko z trenerami fitness?',
          a: 'Nie. Ta sama struktura działa dla każdego coacha lub konsultanta, który rezerwuje sesje: dietetyka, trening wydolnościowy, coaching biznesowy. Jeśli Twój biznes opiera się na umówionych rozmowach, to jest schemat dla Ciebie.',
        },
      ],
      ctaHeading: 'Gotowy zapełnić kalendarz?',
      ctaBody: 'Bezpłatna 15-minutowa rozmowa. Opowiedz nam, jak dziś zdobywasz klientów, a pokażemy, co strona powinna robić.',
      ctaButton: 'Umów bezpłatną rozmowę',
    },
    'ecommerce-website-design': {
      metaTitle: 'Projektowanie sklepów internetowych | Blok Blok Studio',
      metaDescription: 'Projektowanie sklepów internetowych i Shopify, które sprzedają. Zbudowaliśmy sklep z kartami kolekcjonerskimi, który zrobił 191 tys. $ w 1790 zamówieniach. Sklepy nastawione na konwersję i gotowe na wyszukiwanie AI.',
      kicker: 'E-commerce i Shopify',
      h1: 'Sklepy internetowe zbudowane, żeby sprzedawać, a nie tylko istnieć',
      intro: 'Sklep to nie katalog. Każda decyzja, od siatki produktów przez koszyk po zbieranie e-maili, albo przybliża odwiedzającego do zakupu, albo go traci. Projektujemy i budujemy sklepy internetowe, w których liczby potwierdzają design.',
      stats: [
        {
          value: '$191k',
          label: 'Sprzedaż w sklepie z kartami kolekcjonerskimi, który zbudowaliśmy i uruchomiliśmy',
        },
        {
          value: '1,790',
          label: 'Zamówień przez ten sklep',
        },
        {
          value: '400%',
          label: 'Wzrost listy mailingowej w pierwszym miesiącu dzięki sprytnemu zbieraniu adresów',
        },
      ],
      featuresHeading: 'Co konwertuje w e-commerce',
      features: [
        {
          title: 'Sklep zaprojektowany pod konwersję',
          desc: 'Strony produktów zbudowane wokół decyzji zakupowej: jasna cena, pilność tam, gdzie jest uczciwa, i koszyk, w którym nic nie stoi na drodze.',
        },
        {
          title: 'Zbieranie e-maili, które naprawdę powiększa listę',
          desc: 'Rabat za adres e-mail umieszczony tam, gdzie konwertuje. Lista naszego klienta urosła o 400% w pierwszym miesiącu, a e-mail to kanał, który należy do Ciebie.',
        },
        {
          title: 'Dropy, uzupełnienia stanów i społeczność',
          desc: 'Dropy, które się wyprzedają, potrzebują odliczania, powiadomień o dostępności i integracji ze społecznością (Discord, social media) wbudowanych w sklep, a nie doklejonych.',
        },
        {
          title: 'Gotowość na wyszukiwanie AI i silniki odpowiedzi',
          desc: 'Kupujący pytają asystentów AI, co kupić, zanim w ogóle trafią do Google. Schema produktów, czyste feedy i treści w formie odpowiedzi (AEO) sprawiają, że Twoje produkty mogą być cytowane w ChatGPT, Perplexity i przeglądzie AI w Google.',
        },
        {
          title: 'Shopify albo w pełni autorski',
          desc: 'Budujemy na Shopify, gdy pasuje, i w pełni autorsko w Next.js, gdy nie pasuje. Decyzja wynika z Twojego katalogu i marż, nie z naszych preferencji.',
        },
      ],
      caseStudy: {
        heading: 'Studium przypadku',
        name: 'Exotic Ripz, kolekcjonerskie karty',
        result: '191 042 $ sprzedaży w 1790 zamówieniach',
        body: 'Pełny sklep na Shopify dla marki społeczności kolekcjonerów kart: odważny animowany branding, integracja z Discordem i wieloma platformami społecznościowymi, inteligentna kategoryzacja produktów i zoptymalizowane pod konwersję zbieranie e-maili. Dropy boosterów regularnie wyprzedawały się w kilka godzin od premiery, a zaplecze wysyłkowe skonfigurowaliśmy od początku do końca.',
        linkLabel: 'Przeczytaj pełne case study',
      },
      faqHeading: 'Częste pytania',
      faqs: [
        {
          q: 'Budujecie na Shopify czy autorsko?',
          a: 'Jedno i drugie. Shopify to dobry wybór dla większości firm produktowych; w pełni autorskie sklepy w Next.js mają sens przy nietypowych katalogach, subskrypcjach lub gdy opłaty platformy przerastają jej wygodę. Rekomendujemy na podstawie Twoich liczb.',
        },
        {
          q: 'Ile kosztuje sklep internetowy?',
          a: 'Wyceniamy do zakresu po bezpłatnej 15-minutowej rozmowie, ze stałą ceną i określonym zakresem prac przed startem. O kwocie decydują wielkość sklepu, integracje i potrzeby migracji.',
        },
        {
          q: 'Możecie zmigrować mój obecny sklep?',
          a: 'Tak. Produkty, klientów i historię zamówień da się przenieść z większości platform. Migrację planujemy tak, żeby sklep ani na chwilę nie zniknął podczas przejścia.',
        },
        {
          q: 'Dlaczego nie skorzystać po prostu z kreatora sklepów AI?',
          a: 'Wygenerowane sklepy wyglądają w porządku, ale słabo konwertują, bo konwersja kryje się w szczegółach: miejscu zbierania adresów, mechanice dropów, tarciu w koszyku, schema produktów dla wyszukiwania AI. Sklep za 191 tys. $, który zbudowaliśmy, wyprzedawał dropy w kilka godzin, bo każdy z tych szczegółów został zaprojektowany, a nie wygenerowany.',
        },
        {
          q: 'Konfigurujecie też wysyłkę i płatności?',
          a: 'Tak. Realizacja dla Exotic Ripz obejmowała zaplecze wysyłkowe skonfigurowane od początku do końca, a do tego płatności, podatki i te operacyjne elementy, które większość projektantów zostawia Tobie.',
        },
      ],
      ctaHeading: 'Chcesz sklep, który sprzedaje?',
      ctaBody: 'Bezpłatna 15-minutowa rozmowa. Przynieś swoje liczby, a powiemy Ci, gdzie sklep traci przychód.',
      ctaButton: 'Umów bezpłatną rozmowę',
    },
  },
  consent: 'Tak, Blok Blok Studio może wysyłać mi praktyczne wskazówki dotyczące rozwoju firmy i okazjonalne oferty. Wyślemy jeden e-mail z prośbą o potwierdzenie, a zapis nastąpi dopiero po kliknięciu zawartego w nim linku. Z subskrypcji można zrezygnować w każdej chwili.',
};
