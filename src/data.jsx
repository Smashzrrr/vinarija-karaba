// Shared state + translations
const { useState, useEffect, useRef, createContext, useContext, useMemo, useCallback } = React;

// Translations for HR/EN toggle
const TRANSLATIONS = {
  hr: {
    // Nav
    nav_home: 'Početna',
    nav_about: 'O nama',
    nav_wine: 'Vina',
    nav_vineyards: 'Vinogradi',
    nav_cellar: 'Podrum',
    nav_visit: 'Posjet',
    nav_news: 'Novosti',
    nav_contact: 'Kontakt',
    nav_shop: 'Katalog',
    cta_order: 'Naruči',
    cta_visit: 'Dogovori posjet',
    footer_about_eyebrow: 'O NAMA',

    // Hero
    hero_eyebrow: 'VINARIJA KARABA · PAKOŠTANE',
    hero_title_1: 'Vino',
    hero_title_2: 'iz kamena',
    hero_title_3: 'i vremena.',
    hero_rot_0: 'Templar',
    hero_rot_1: 'Plavac',
    hero_rot_2: 'Crljenak',
    hero_lede: 'Obiteljska vinarija u Pakoštanima. Od 2000. godine — autohtone sorte, ručna berba, starenje u francuskim barriquema. Vina koja nose tišinu kamena i težinu godina.',
    hero_cta_1: 'Naša vina',
    hero_cta_2: 'Posjetite podrum',

    // Stats
    stat_since: 'osnovano',
    stat_ha: 'hektara vinograda',
    stat_ha_sub: 'u ručnoj obradi',
    stat_bottles: 'boca godišnje',
    stat_bottles_sub: 'ograničena serija',
    stat_varieties: 'sorti',
    stat_varieties_sub: 'autohtone i klasične',

    // About
    about_eyebrow: 'OBITELJSKA PRIČA',
    about_title: 'Zemlja, loza, tišina.',
    about_p1: 'Vinarija Karaba obiteljski je projekt s korijenima u Pakoštanima, pokrenut 2000. godine. Naši vinogradi leže na kamenitom tlu iznad mora — mjestu gdje loza raste sporo, a grožđe sazrijeva duboko.',
    about_p2: 'Svaku bocu pratimo od rezidbe do punjenja. Berba je ručna, fermentacija prirodna, starenje u francuskim barriquema — bez žurbe i bez kompromisa.',
    about_p3: 'Naš ponos je **Templar** — flagship cuvée koji utjelovljuje sve što vjerujemo o vinu: strpljenje, mjesto, i ruka koja zna kada pustiti.',
    about_signature: 'Obitelj Karaba',
    about_signature_sub: 'Vinari',

    // Wine
    wine_eyebrow: 'NAŠA VINA',
    wine_title: 'Etikete kuće.',
    wine_lede: 'Tri bijele, šest crvenih, jedan flagship cuvée. Sva vina iz vlastitih vinograda, proizvedena u ograničenim serijama.',
    wine_see_all: 'Cijeli katalog',
    wine_buy: 'Naruči bocu',

    // Vineyards
    fields_eyebrow: 'VINOGRADI',
    fields_title: 'Kamen, sunce, bura.',
    fields_lede: 'Naši vinogradi prostiru se na blagim padinama iznad mora. Tlo je plitko, kamenito, sunce intenzivno, a zimi bura čisti lozu. Prirodni stres koji daje dubinu.',

    // Cellar / Process
    cellar_eyebrow: 'OD LOZE DO BOCE',
    cellar_title: 'Svaki korak, ručno.',

    // Visit
    visit_eyebrow: 'POSJETITE NAS',
    visit_title: 'Kušaonica u našoj konobi.',
    visit_lede: 'Vođena degustacija šest vina uz domaći sir, pršut i maslinovo ulje. Mali broj gostiju — da vino bude u prvom planu, a ne buka.',
    visit_price: 'od 45 €',
    visit_per: 'po osobi',
    visit_duration: 'trajanje 120 min',
    visit_size: 'grupe do 10',
    visit_book: 'Rezerviraj termin',

    // News
    news_eyebrow: 'NOVOSTI',
    news_title: 'Iz vinograda i podruma.',

    // Awards
    awards_eyebrow: 'PRIZNANJA',
    awards_title: 'Vino koje govori i izvan podruma.',

    // Contact
    contact_eyebrow: 'KONTAKT',
    contact_title: 'Javite nam se.',
    contact_lede: 'Za narudžbe, rezervacije i distribuciju — pišite ili nazovite. Odgovor u 24 sata.',
    contact_name: 'Ime i prezime',
    contact_email: 'Email',
    contact_phone: 'Telefon',
    contact_msg: 'Poruka',
    contact_send: 'Pošalji',
    contact_sent: 'Hvala — javljamo se uskoro.',

    // Gallery
    gallery_eyebrow: 'GALERIJA',
    gallery_title: 'Godina za godinom.',

    // Footer
    footer_tagline: 'Vinarija Karaba — obiteljska vinarija iz Pakoštana. Autohtona vina iz kamena i vremena.',
    footer_follow: 'Pratite nas',
    footer_nav: 'Navigacija',
    footer_contact: 'Kontakt',
    footer_rights: '© 2026 Vinarija Karaba. Sva prava pridržana.',
    footer_builtby: 'OIB 00000000000 · Pakoštane, Hrvatska',
  },
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_wine: 'Wines',
    nav_vineyards: 'Vineyards',
    nav_cellar: 'Cellar',
    nav_visit: 'Visit',
    nav_news: 'Journal',
    nav_contact: 'Contact',
    nav_shop: 'Catalogue',
    cta_order: 'Order',
    cta_visit: 'Book a visit',
    footer_about_eyebrow: 'ABOUT',

    hero_eyebrow: 'KARABA WINERY · PAKOŠTANE, CROATIA',
    hero_title_1: 'Wine',
    hero_title_2: 'of stone',
    hero_title_3: 'and time.',
    hero_rot_0: 'Templar',
    hero_rot_1: 'Plavac',
    hero_rot_2: 'Crljenak',
    hero_lede: 'A family winery in Pakoštane, Dalmatia. Since 2000 — native varieties, hand harvest, French barrique ageing. Wines that carry the stillness of stone and the weight of years.',
    hero_cta_1: 'Our wines',
    hero_cta_2: 'Visit the cellar',

    stat_since: 'founded',
    stat_ha: 'hectares of vineyard',
    stat_ha_sub: 'tended by hand',
    stat_bottles: 'bottles / year',
    stat_bottles_sub: 'limited production',
    stat_varieties: 'varieties',
    stat_varieties_sub: 'native and classic',

    about_eyebrow: 'FAMILY STORY',
    about_title: 'Earth, vine, silence.',
    about_p1: 'Karaba Winery is a family project rooted in Pakoštane, founded in 2000. Our vineyards lie on stony soil above the sea — a place where the vine grows slowly and the grape ripens deeply.',
    about_p2: 'We follow every bottle from pruning to filling. Harvest is by hand, fermentation natural, ageing in French barrique — without haste, without compromise.',
    about_p3: 'Our pride is **Templar** — the flagship cuvée that embodies everything we believe about wine: patience, place, and the hand that knows when to let go.',
    about_signature: 'The Karaba Family',
    about_signature_sub: 'Vintners',

    wine_eyebrow: 'OUR WINES',
    wine_title: 'Labels of the house.',
    wine_lede: 'Three whites, six reds, one flagship cuvée. All from our own vineyards, produced in limited batches.',
    wine_see_all: 'Full catalogue',
    wine_buy: 'Order a bottle',

    fields_eyebrow: 'VINEYARDS',
    fields_title: 'Stone, sun, bura.',
    fields_lede: 'Our vineyards rest on gentle slopes above the sea. Thin, stony soil, intense sun, and the bura wind cleansing the vines in winter. The natural stress that gives depth.',

    cellar_eyebrow: 'FROM VINE TO BOTTLE',
    cellar_title: 'Every step, by hand.',

    visit_eyebrow: 'VISIT US',
    visit_title: 'Tasting in our tavern.',
    visit_lede: 'A guided tasting of six wines with local cheese, prosciutto and olive oil. Small groups — so the wine speaks first, not the noise.',
    visit_price: 'from €45',
    visit_per: 'per person',
    visit_duration: 'duration 120 min',
    visit_size: 'groups up to 10',
    visit_book: 'Reserve a spot',

    news_eyebrow: 'JOURNAL',
    news_title: 'From the vineyard and the cellar.',

    awards_eyebrow: 'ACCOLADES',
    awards_title: 'Wine that speaks beyond the cellar.',

    contact_eyebrow: 'CONTACT',
    contact_title: 'Get in touch.',
    contact_lede: 'For orders, reservations and distribution — write or call. Reply within 24 hours.',
    contact_name: 'Full name',
    contact_email: 'Email',
    contact_phone: 'Phone',
    contact_msg: 'Message',
    contact_send: 'Send',
    contact_sent: 'Thank you — we\'ll be in touch soon.',

    gallery_eyebrow: 'GALLERY',
    gallery_title: 'Year after year.',

    footer_tagline: 'Karaba Winery — a family estate from Pakoštane, Croatia. Native wines of stone and time.',
    footer_follow: 'Follow us',
    footer_nav: 'Navigation',
    footer_contact: 'Contact',
    footer_rights: '© 2026 Karaba Winery. All rights reserved.',
    footer_builtby: 'ID 00000000000 · Pakoštane, Croatia',
  }
};

const LangContext = createContext({ lang: 'hr', t: (k) => k, setLang: () => {} });
const PageContext = createContext({ page: 'home', setPage: () => {} });
const TweakContext = createContext({ tweaks: {}, setTweak: () => {} });

function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('karaba_lang') || 'hr');
  useEffect(() => { localStorage.setItem('karaba_lang', lang); }, [lang]);
  const t = (key) => TRANSLATIONS[lang][key] || key;
  return <LangContext.Provider value={{ lang, t, setLang }}>{children}</LangContext.Provider>;
}

// ---------- HASH-BASED ROUTER ----------
function parseHash(hash) {
  const h = (hash || '#/').replace(/^#\/?/, '');
  if (!h || h === '') return { page: 'home', anchor: null };
  if (h === 'katalog' || h === 'catalog') return { page: 'catalog', anchor: null };
  if (h.startsWith('proizvod/') || h.startsWith('product/')) {
    return { page: 'product:' + h.split('/')[1], anchor: null };
  }
  const sectionMap = {
    vina: 'wines', wines: 'wines',
    vinogradi: 'fields', vineyards: 'fields', fields: 'fields',
    podrum: 'cellar', cellar: 'cellar', process: 'cellar',
    posjet: 'visit', visit: 'visit',
    novosti: 'news', news: 'news',
    kontakt: 'contact', contact: 'contact',
    about: 'about',
    galerija: 'gallery', gallery: 'gallery',
    nagrade: 'awards', awards: 'awards',
  };
  if (sectionMap[h]) return { page: 'home', anchor: sectionMap[h] };
  return { page: 'home', anchor: h };
}

function pageToHash(page, anchor) {
  if (page === 'catalog') return '#/katalog';
  if (page.startsWith('product:')) return '#/proizvod/' + page.split(':')[1];
  if (page === 'home' && anchor) return '#/' + anchor;
  return '#/';
}

function PageProvider({ children }) {
  const [page, setPageState] = useState(() => parseHash(window.location.hash).page);
  const [pendingAnchor, setPendingAnchor] = useState(() => parseHash(window.location.hash).anchor);
  const isInternalNav = useRef(false);

  const setPage = useCallback((p, anchor) => {
    isInternalNav.current = true;
    setPageState(p);
    const newHash = pageToHash(p, anchor);
    if (window.location.hash !== newHash) window.location.hash = newHash;
    if (p !== 'home' || !anchor) window.scrollTo({ top: 0, behavior: 'instant' });
    if (anchor) setPendingAnchor(anchor);
  }, []);

  useEffect(() => {
    if (pendingAnchor) {
      const timer = setTimeout(() => {
        const el = document.getElementById(pendingAnchor);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setPendingAnchor(null);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [pendingAnchor, page]);

  useEffect(() => {
    const handleHashChange = () => {
      if (isInternalNav.current) { isInternalNav.current = false; return; }
      const parsed = parseHash(window.location.hash);
      setPageState(parsed.page);
      if (parsed.anchor) setPendingAnchor(parsed.anchor);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return <PageContext.Provider value={{ page, setPage }}>{children}</PageContext.Provider>;
}

// ---------- WINES — Karaba portfolio ----------
const WINES = [
  // WHITES
  { id: 'posip',     name: 'Karaba Pošip',     type: 'white', variety: 'Pošip',     year: 2023, photo: 'assets/photos/posip-karaba.jpg',
    notes: { hr: 'Svjež, cvjetan, s notama marelice i ljetnog voća. Slana mineralnost u finišu.', en: 'Fresh and floral with apricot and stone-fruit notes. Saline mineral finish.' },
    food:  { hr: 'Školjke, bijela riba, rižot od morskih plodova.', en: 'Shellfish, white fish, seafood risotto.' },
    abv: 13.0, price: 16 },
  { id: 'debit',     name: 'Karaba Debit',     type: 'white', variety: 'Debit',     year: 2023, photo: 'assets/photos/debit-karaba.jpg',
    notes: { hr: 'Suh, svjež, s notama zelene jabuke i mediteranskog bilja. Autohtoni Debit u čistoj formi.', en: 'Dry and fresh, green apple and Mediterranean herbs. Native Debit in its purest form.' },
    food:  { hr: 'Gradele, salate, mlada janjetina.', en: 'Grilled fish, salads, spring lamb.' },
    abv: 12.5, price: 15 },
  { id: 'marastina', name: 'Karaba Maraština', type: 'white', variety: 'Maraština', year: 2023, photo: 'assets/photos/marastina-vinarija-karaba.jpg',
    notes: { hr: 'Pun, zreo, s notama meda i sušenog cvijeća. Duga, topla završnica.', en: 'Full and ripe, honey and dried-flower notes. A long, warm finish.' },
    food:  { hr: 'Zreli sirevi, sporo kuhana jela, bijelo meso.', en: 'Aged cheese, slow-cooked dishes, white meat.' },
    abv: 13.0, price: 17 },

  // REDS
  { id: 'plavina',   name: 'Karaba Plavina',   type: 'red', variety: 'Plavina',               year: 2022, photo: 'assets/photos/plavina-karaba.jpg',
    notes: { hr: 'Laka elegancija, crvena šumska voćka, nježna struktura.', en: 'Light elegance, red forest berries, gentle structure.' },
    food:  { hr: 'Pašteta, pečena piletina, domaći pršut.', en: 'Pâté, roast chicken, home prosciutto.' },
    abv: 13.0, price: 17 },
  { id: 'crljenak',  name: 'Karaba Crljenak',  type: 'red', variety: 'Crljenak Kaštelanski',  year: 2022, photo: 'assets/photos/crljenak-vinarija-karaba.jpg',
    notes: { hr: 'Šumska jagoda, papar, glatki tanini. Ponos autohtone Dalmacije.', en: 'Wild strawberry, peppercorn, smooth tannins. Dalmatian heritage.' },
    food:  { hr: 'Pečena janjetina, mladi pecorino, teletina.', en: 'Roast lamb, young pecorino, veal.' },
    abv: 14.0, price: 24 },
  { id: 'plavac',    name: 'Karaba Plavac Mali', type: 'red', variety: 'Plavac Mali',         year: 2021, photo: 'assets/photos/plavac-mali-vinarija-karaba.jpg',
    notes: { hr: 'Koncentrirano, mediteransko, suhe šljive i smokve. Čvrsti tanini.', en: 'Concentrated Mediterranean, dried plum and fig. Firm tannins.' },
    food:  { hr: 'Pašticada, divljač, dimljena slanina.', en: 'Pašticada, game, smoked bacon.' },
    abv: 14.5, price: 26 },
  { id: 'merlot',    name: 'Karaba Merlot',    type: 'red', variety: 'Merlot',                year: 2022, photo: 'assets/photos/merlot-karaba.jpg',
    notes: { hr: 'Meko, baršunasto, trešnja i slatki duhan. Elegantna internacionalna linija.', en: 'Soft, velvet, cherry and sweet tobacco. An elegant international line.' },
    food:  { hr: 'Pečeno meso, gusta juha, tvrdi sirevi.', en: 'Roasts, hearty stews, hard cheese.' },
    abv: 13.5, price: 22 },
  { id: 'cab-sauv',  name: 'Karaba Cabernet Sauvignon', type: 'red', variety: 'Cabernet Sauvignon', year: 2021, photo: 'assets/photos/cabernet-sauvignon-karaba.jpg',
    notes: { hr: 'Crni ribiz, cedrovina, grafit. Klasična struktura na mediteranskom tlu.', en: 'Blackcurrant, cedar, graphite. Classic structure on Mediterranean soil.' },
    food:  { hr: 'Biftek, plavi sirevi, pečeni ovčji but.', en: 'Steak, blue cheese, roasted lamb leg.' },
    abv: 13.5, price: 26 },
  { id: 'syrah',     name: 'Karaba Syrah',     type: 'red', variety: 'Syrah',                 year: 2021, photo: 'assets/photos/syrah-karaba.jpg',
    notes: { hr: 'Crni papar, ljubičica, tamne bobice. Topao, mediteranski izraz.', en: 'Black pepper, violet, dark berries. A warm Mediterranean expression.' },
    food:  { hr: 'Rebra, začinjena jela, zreli ovčji sir.', en: 'Ribs, spiced dishes, aged sheep cheese.' },
    abv: 14.0, price: 24 },
  { id: 'marastina-syrah', name: 'Karaba Maraština · Syrah', type: 'red', variety: 'Maraština · Syrah (co-fermentation)', year: 2022, photo: 'assets/photos/marastina-syrah-karaba.jpg',
    notes: { hr: 'Eksperimentalni cuvée — kožica Maraštine s Syrahom. Slojevito i nekonvencionalno.', en: 'An experimental cuvée — Maraština skins with Syrah. Layered and unconventional.' },
    food:  { hr: 'Začinjena azijska kuhinja, tartar od tune, divljač.', en: 'Spiced Asian cuisine, tuna tartare, game.' },
    abv: 13.5, price: 28 },

  // FLAGSHIP
  { id: 'templar',   name: 'Karaba Templar',   type: 'red', variety: 'Cabernet Sauvignon · Merlot · Plavac Mali', year: 2019, photo: 'assets/photos/templar-vino-karaba.jpg',
    notes: { hr: 'Flagship kuće. Slojevit, dubok, balsamičan. 24 mjeseca u francuskom barrique. Vino strpljenja.', en: 'The flagship. Layered, deep, balsamic. 24 months in French barrique. A wine of patience.' },
    food:  { hr: 'Svečani ručak, pečena divljač, stari sirevi. Otvoriti sat vremena prije.', en: 'Celebratory meals, roast game, aged cheese. Open an hour before serving.' },
    abv: 14.5, price: 48, flagship: true },
];

const NEWS_ITEMS = [
  { date: '2026-03-10', tag: { hr: 'BERBA', en: 'HARVEST' }, title: { hr: 'Rezidba 2026 — loza na disanju', en: '2026 pruning — the vine breathes' }, excerpt: { hr: 'Kratki rez i niska formacija — koncentracija umjesto količine.', en: 'Short cuts, low canopy — concentration over volume.' }, photo: 'assets/photos/rezidba-vinove-loze.jpg' },
  { date: '2026-01-20', tag: { hr: 'PROIZVOD', en: 'RELEASE' }, title: { hr: 'Templar 2019 — pušten u prodaju', en: 'Templar 2019 released' }, excerpt: { hr: 'Tri godine strpljenja. Pristupačan sada, spreman za dekadu naprijed.', en: 'Three years of patience. Approachable now, ready for a decade ahead.' }, photo: 'assets/photos/templar-vino-karaba.jpg' },
  { date: '2025-11-18', tag: { hr: 'DEGUSTACIJA', en: 'TASTING' }, title: { hr: 'Vertikala Plavca: 2018–2022', en: 'Plavac vertical: 2018–2022' }, excerpt: { hr: 'Pet berbi u jednoj večeri. Otvorili smo kako se godine otvaraju u boci.', en: 'Five vintages in one evening. We opened the years as they open in the bottle.' }, photo: 'assets/photos/degustacija-karaba.jpg' },
];

const AWARDS = [
  { year: 2025, event: 'Decanter World Wine Awards', product: 'Templar 2019',       medal: { hr: 'ZLATO', en: 'GOLD' } },
  { year: 2025, event: 'Vinistra',                   product: 'Crljenak 2022',      medal: { hr: 'SREBRO', en: 'SILVER' } },
  { year: 2024, event: 'Concours Mondial Bruxelles', product: 'Plavac Mali 2021',   medal: { hr: 'ZLATO', en: 'GOLD' } },
  { year: 2024, event: 'Vinocom Zagreb',             product: 'Pošip 2023',         medal: { hr: 'SREBRO', en: 'SILVER' } },
  { year: 2023, event: 'Dalmacija Wine Expo',        product: 'Syrah 2021',         medal: { hr: 'ZLATO', en: 'GOLD' } },
  { year: 2023, event: 'Sabatina',                   product: 'Maraština·Syrah 2022', medal: { hr: 'SREBRO', en: 'SILVER' } },
];

window.LangContext = LangContext;
window.PageContext = PageContext;
window.TweakContext = TweakContext;
window.LangProvider = LangProvider;
window.PageProvider = PageProvider;
window.TRANSLATIONS = TRANSLATIONS;
window.WINES = WINES;
window.NEWS_ITEMS = NEWS_ITEMS;
window.AWARDS = AWARDS;
