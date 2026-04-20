# Esencija — Upgrade Promptovi za Antigravity

Svaki prompt je zaseban task. Idi redom od 1 do 8. Svaki prompt radi na POSTOJEĆEM kodu — ne stvara novi projekt.

---

## PROMPT 1: Hero overlay — čitljivost teksta

```
Trenutni problem: Hero sekcija ima full-bleed fotografiju (assets/photos/estate-aerial.png) s bijelim tekstom preko, ali tekst se slabo vidi jer slika nije dovoljno potamnjena.

Popravi hero overlay u src/hero.jsx:

1. Pojačaj gradient overlay na donji dio slike — donja trećina mora biti 80-90% tamna tako da bijeli tekst UVIJEK bude čitljiv bez obzira na sliku
2. Dodaj backdrop-filter: blur(2px) iza područja gdje je tekst — suptilan blur koji pomaže čitljivosti bez da uništava sliku
3. Dodaj text-shadow na headline i lede tekst — nešto jači nego sad (trenutno je 0 2px 24px rgba(20,14,8,0.5), pojačaj na 0 4px 32px rgba(0,0,0,0.7))
4. Eyebrow tekst na vrhu heroja (OPG ESENCIJA · POLAČA, RAVNI KOTARI) također treba bolji kontrast — dodaj mu mali tamni background pill ili jači shadow

Princip: slika se i dalje mora vidjeti, ali tekst mora biti oštar i čitljiv na BILO KOJOJ fotografiji koja se stavi kao hero.

NE MIJENJAJ ništa drugo osim hero sekcije.
```

---

## PROMPT 2: Mobile navigacija — responsive drawer

```
Trenutno stanje: Navbar u src/chrome.jsx ima hamburger button koji se pojavljuje na <960px ali NEMA mobile menu panel. Klik na hamburger ne radi ništa vidljivo.

Napravi kompletni mobile navigation:

1. Dodaj full-screen overlay menu koji se otvara kad se klikne hamburger:
   - Pozadina: var(--es-bg-dark) ili tamna s blur efektom
   - Animacija: fade-in + slide-down (0.3s ease)
   - Logo na vrhu (Logo component s dark={true})
   - Svi nav linkovi vertikalno, veliki font (es-h2 veličina), svaki s hover efektom
   - HR/EN toggle
   - CTA button "Naruči" na dnu
   - X button za zatvaranje u gornjem desnom kutu
   
2. Klik na bilo koji nav link:
   - Zatvori menu
   - Navigiraj na odgovarajuću sekciju (setPage + anchor)
   
3. Body scroll lock kad je menu otvoren (overflow: hidden na body)

4. Animacija: kad se menu otvori, linkovi se pojavljuju jedan po jedan (stagger 0.05s delay)

5. Testiraj na svim breakpointovima: 320px, 375px, 414px, 768px

Koristi postojeći state menuOpen koji već postoji u Navbar komponenti.
Stilovi idu inline (kao ostatak projekta), ne u external CSS.
```

---

## PROMPT 3: Pojačane animacije

```
Trenutno stanje: Projekt ima basic Reveal component u src/atoms.jsx koji radi fade-in + translateY na IntersectionObserver. Animacije su suptilne.

Pojačaj animacije kroz cijeli projekt:

1. REVEAL COMPONENT (src/atoms.jsx):
   - Dodaj stagger opciju: kad je parent Section, djeca Reveal-ovi se pojavljuju s progresivnim delayem
   - Dodaj scale varijantu: osim translateY, neka kartice imaju blagi scale(0.96) → scale(1) 
   - Easing: zamijeni cubic-bezier(0.2,0.7,0.2,1) s cubic-bezier(0.16,1,0.3,1) — bouncier, moderniji

2. KARTICE (wine cards, fig cards, award cards, news cards):
   - Hover: dodaj subtle 3D tilt efekt — na mouseMove rotiraj karticu max ±3 stupnja (perspective: 800px, rotateX/Y based on mouse position)
   - Hover shadow: shadow postaje jači i dobiva blagi color tint (var(--es-wine) glow za wine kartice, var(--es-olive) za oil)
   
3. SCROLL-LINKED PARALLAX:
   - Hero slika: blagi parallax (translateY: scrollY * 0.3) — slika se sporije miče od teksta
   - StatBar: blagi translateY(-20px) kad dolazi u viewport
   - Floating accent kartice (About sekcija, Visit sekcija): blagi float animacija (translateY ±6px, 4s loop)

4. COUNTER ANIMACIJA:
   - StatBar brojke (2005, 25, 12k, 100%): kad dođu u viewport, animiraj od 0 do ciljane vrijednosti (count-up efekt, 1.5s duration)
   - Koristit requestAnimationFrame, ne setInterval

5. PAGE TRANSITIONS:
   - Kad se mijenja page (home → catalog → product), dodaj fade out (0.15s) → fade in (0.3s) tranziciju

SVE animacije moraju poštivati prefers-reduced-motion — ako je uključen, sve animacije su instant (duration: 0).

NE MIJENJAJ sadržaj ni layout — samo dodaj/pojačaj animacije.
```

---

## PROMPT 4: Proces proizvodnje — animirani scroll sekcija

```
Dodaj novu sekciju "Proces proizvodnje" u stranicu. Pozicija: IZMEĐU FieldsSection i VisitSection.

Sekcija ima TRI taba: Vino, Maslinovo ulje, Smokve. Svaki tab pokazuje animirani timeline procesa.

STRUKTURA:
- Eyebrow: "OD ZEMLJE DO PROIZVODA" / "FROM SOIL TO PRODUCT"
- Naslov: "Svaki korak, ručno." / "Every step, by hand."
- Tab bar: tri taba s ikonama (grape, leaf, leaf) — klik mijenja prikaz
- Timeline: vertikalni, lijevo-desno alternating layout

VINO (6 koraka):
1. Rezidba (veljača) — "Kratki rez za koncentriraniji rod." + ikona: scissors
2. Berba (rujan) — "Ručno, u zoru, kad je grožđe hladno." + ikona: sun
3. Sortiranje — "Svako zrno prolazi kroz ruke." + ikona: check
4. Prešanje — "Nježno, gravitacijom." + ikona: droplet
5. Fermentacija — "Kontrolirana temperatura, autohtoni kvasci." + ikona: clock
6. Starenje — "12-24 mjeseca u francuskim barrique bačvama." + ikona: diamond

MASLINOVO ULJE (4 koraka):
1. Berba (studeni) — "Kasna berba za maksimalne polifenole." + ikona: leaf
2. Prešanje — "U vlastitoj uljari, unutar 24 sata od berbe." + ikona: droplet
3. Dekantacija — "Prirodno taloženje, bez filtracije." + ikona: clock
4. Punjenje — "Tamne boce, hladno skladište, svježina zagarantirana." + ikona: check

SMOKVE (4 koraka):
1. Berba (srpanj-rujan) — "Samo potpuno zrele petrovače." + ikona: sun
2. Sušenje — "Na kamenim sušilima, kako se oduvijek radilo." + ikona: sun
3. Prerada — "Džemovi, rakija, hurmašice — svaki recept iz obitelji." + ikona: star
4. Pakiranje — "Ručno, u staklu i papiru." + ikona: check

ANIMACIJA:
- Svaki korak se otkriva kad korisnik scrolla do njega (IntersectionObserver)
- Lijeva strana: ikona + tekst, desna strana: PlaceholderImage (koristi SCENES iz atoms.jsx — npr. 'hand-harvest', 'press', 'barrels', 'cellar')
- Alternating: korak 1 tekst lijevo/slika desno, korak 2 slika lijevo/tekst desno
- Vertikalna linija povezuje sve korake (1px solid, var(--es-border))
- Aktivni korak ima accent dot na liniji (var(--es-wine) za vino, var(--es-olive) za ulje, var(--es-terracotta) za smokve)
- Neaktivni koraci su blagi (opacity 0.4), aktivni i prošli su puni

DVOJEZIČNOST:
- Sav tekst mora imati HR i EN verziju
- Dodaj ključeve u TRANSLATIONS objekt u src/data.jsx

RESPONSIVE:
- Na mobitelu: single column, sve lijevo poravnato, bez alternating

Kreiraj komponentu ProcessSection u NOVOM FAJLU src/process.jsx.
Dodaj <script type="text/babel" src="src/process.jsx"></script> u Esencija.html PRIJE src/sections.jsx.
Dodaj <window.ProcessSection /> u HomePage u Esencija.html između <window.FieldsSection /> i <window.VisitSection />.
```

---

## PROMPT 5: Leaflet interaktivna mapa

```
Zamijeni placeholder SVG mapu u ContactSection (src/sections.jsx) s pravom Leaflet interaktivnom mapom.

IMPLEMENTACIJA:
1. Dodaj Leaflet CSS i JS u <head> Esencija.html:
   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
   <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

2. Kreiraj MapComponent u src/atoms.jsx (ili novi fajl src/map.jsx):
   - Pozicija: Polača, Hrvatska — koordinate: 43.9378, 15.5892
   - Zoom level: 13
   - Tile layer: custom vintage/warm stil. Koristi CartoDB Positron ili Stamen Watercolor — nešto što se uklapa u warm paletu stranice. Ako nema lijepog besplatnog, koristi OpenStreetMap s CSS filterima (sepia(0.3) saturate(0.8) brightness(0.95)) da bude topliji
   
3. Marker na OPG lokaciji:
   - Custom marker ikona (ne default Leaflet plavi) — napravi SVG marker u boji var(--es-wine) ili var(--es-terracotta)
   - Popup: "OPG Esencija\nPolača 57, 23423 Polača\n+385 91 234 5678"
   - Popup stiliziran da odgovara design systemu (Bookerly font, cream pozadina, border-radius)

4. Parcele (polygon overlay):
   - Vinograd: zeleni polygon (var(--es-olive), opacity 0.2, border 2px)
   - Maslinik: olive polygon 
   - Smokvik: terracotta polygon
   - Koordinate parcela su fiktivne — stavi ih u blizini Polače, raspored da izgleda realistično
   - Hover na parcelu: tooltip s imenom ("Vinograd — 12 ha") 

5. Mapa zamjenjuje postojeći placeholder div u ContactSection koji ima style height: 180. Nova mapa: height: 280px, border-radius: 16px, overflow: hidden.

6. Disable scroll zoom (da ne interferira sa page scrollom), ali dozvoli drag i pinch zoom.

NAPOMENA: Leaflet se mountira na DOM element, ne na React virtual DOM. Koristi useEffect s useRef za inicijalizaciju. Cleanup: uništi mapu na unmount.
```

---

## PROMPT 6: Floating mini cart (e-commerce demo)

```
Dodaj floating mini cart sustav kroz cijelu stranicu. Ovo je DEMO — nema pravog paymenta, ali mora izgledati i funkcionirati kao pravi shop.

KOMPONENTE (novi fajl src/cart.jsx):

1. CART CONTEXT:
   - CartProvider wrapa cijelu App
   - State: items[] (svaki item: { id, name, price, quantity, category })
   - Funkcije: addItem, removeItem, updateQuantity, clearCart, getTotal, getCount

2. ADD TO CART BUTTONS:
   - Na svakoj wine kartici (WineSection, CatalogPage): mali "+" button u donjem desnom kutu
   - Na oil i fig karticama: isto
   - Na ProductPage: "Dodaj u košaricu" button pored "Naruči bocu"
   - Klik: dodaje item, kratka animacija (button blink zeleno + badge bounce)
   - Ako item već postoji u košarici, povećaj quantity

3. FLOATING CART BADGE:
   - Fiksiran u donjem desnom kutu (bottom: 24px, right: 24px)
   - Okrugli button, 56x56px, var(--es-wine) pozadina, cream ikona košarice
   - Badge s brojem stavki (mali krug, crveni, top-right)
   - Bounce animacija kad se doda novi item
   - Sakriven kad je košarica prazna
   - z-index: 9998 (ispod navbara, iznad svega ostalog)

4. CART DRAWER:
   - Klik na floating badge otvara drawer s desne strane
   - Slide-in animacija (0.3s ease)
   - Overlay pozadina (tamna, klik zatvara)
   - Header: "Košarica (N)" s X buttonom
   - Lista stavki:
     - Ime proizvoda
     - Cijena × količina
     - +/- buttoni za količinu
     - Trash ikona za brisanje
   - Footer:
     - Ukupno: XX €
     - "Pošalji narudžbu" button → otvara prefilled WhatsApp poruku ILI scrolls do kontakt forme s upisanim proizvodima
     - "Nastavi kupovati" link → zatvara drawer

5. WHATSAPP INTEGRACIJA:
   - "Pošalji narudžbu" generira WhatsApp link:
     https://wa.me/385912345678?text=Pozdrav! Želio bih naručiti: [popis proizvoda s količinama i cijenama]. Ukupno: XX €
   - Poruka na HR ili EN ovisno o aktivnom jeziku

RESPONSIVE:
- Na mobitelu drawer je full-width (width: 100vw umjesto 380px)
- Floating badge: bottom: 16px, right: 16px, size: 48px

STIL:
- Drawer: var(--es-paper) pozadina, border-left: 1px solid var(--es-border)
- Sve u design systemu — iste boje, fontovi, radijusi kao ostatak stranice
- Stavke u košarici imaju subtle border-bottom separator

Integriraj CartProvider u App komponentu u Esencija.html (wrapa sve ispod LangProvider).
```

---

## PROMPT 7: Pravi URL routing (hash-based)

```
Trenutno stanje: Navigacija koristi React state + localStorage za "routing". URL se nikad ne mijenja, linkovi nisu djeljivi, browser back/forward ne radi.

Implementiraj hash-based routing:

1. HASH ROUTER:
   - Zamijeni PageContext logiku u src/data.jsx
   - URL format: #/ (home), #/katalog (catalog), #/proizvod/crljenak (product detail), #/vina (scroll to wines section na homeu)
   - Slušaj hashchange event
   - Kad se promijeni page kroz setPage(), updateaj window.location.hash
   - Kad se stranica refresha, čitaj hash i postavi initial page

2. ANCHOR LINKOVI:
   - Svi nav linkovi u Navbar koriste href="#/wines", href="#/oil" itd.
   - Klik: updateaj hash + smooth scroll do sekcije
   - Na homepageu: #/vina scrolls do wines sekcije, #/kontakt scrolls do contact
   - Na catalog/product stranicama: puni hash (#/katalog, #/proizvod/rose)

3. BROWSER NAVIGATION:
   - Back/Forward buttoni moraju raditi
   - popstate event listener

4. DEEP LINKING:
   - Netko otvori link esencija.hr#/proizvod/cuvee → direktno otvori ProductPage za Cuvée
   - Netko otvori link esencija.hr#/katalog → direktno otvori CatalogPage

5. SCROLL RESTORATION:
   - Kad se vrati na home s back buttona, scroll position se ne resetira na vrh (ostaje gdje je bio)
   - Kad se ide FORWARD na novu stranicu, scroll ide na vrh

Ukloni localStorage za page state (ostavi za lang i tweaks).
NE MIJENJAJ vizualni izgled — samo routing logiku.
```

---

## PROMPT 8: Finalni polish i performance

```
Finalni prolaz kroz cijeli projekt — polish i optimizacije:

1. RESPONSIVE AUDIT:
   - Prođi SVAKU sekciju na 375px širini (iPhone SE)
   - Hero: tekst ne smije izlaziti iz ekrana, CTA buttoni stack vertikalno
   - StatBar: 2x2 grid na mobitelu (već postoji, provjeri)
   - Wine/Fig kartice: single column na <520px
   - Contact forma: single column na mobitelu
   - Footer: single column na <500px
   - Gallery: 2 kolone na tabletu, 1 na mobitelu
   - Sve padding/margin: smanjiti na mobitelu (24px umjesto 128px za section padding)
   
2. FONT LOADING:
   - Dodaj font-display: swap na sve @font-face deklaracije (već postoji, provjeri)
   - Dodaj preconnect za Google Fonts u <head>:
     <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

3. IMAGE OPTIMIZATION:
   - Sve img tagove: dodaj loading="lazy" (osim hero slike koja je above the fold)
   - Hero slika: dodaj fetchpriority="high"
   - Dodaj width i height atribute na sve slike (sprečava layout shift)

4. ACCESSIBILITY:
   - Provjeri da svi buttoni imaju aria-label ako nemaju vidljiv tekst
   - Skip to content link na vrhu stranice (visually hidden, vidljiv na focus)
   - Provjeri heading hijerarhiju: h1 samo u hero, h2 za section naslove, h3 za kartice
   - Focus visible stilovi (već postoje u tokens.css, provjeri da rade)
   - Alt tekst na svim slikama (provjeri PlaceholderImage)
   - Aria-expanded na hamburger menu button
   - Role="navigation" na navbar
   - Lang atribut na <html> se mijenja kad se promijeni jezik

5. META TAGS:
   Dodaj u <head> Esencija.html:
   - <meta name="description" content="OPG Esencija — vrhunska vina, ekstra djevičansko maslinovo ulje i prerađevine od smokava iz Polače, Ravni kotari. Od 2005.">
   - <meta property="og:title" content="Esencija — Vino, maslinovo ulje i smokve iz Polače">
   - <meta property="og:description" content="Od 2005. na 25 hektara ekološki obrađenih površina. Vrhunska vina, ulje i smokve iz srca Ravnih kotara.">
   - <meta property="og:type" content="website">
   - <meta property="og:locale" content="hr_HR">
   - <meta name="theme-color" content="#B35933">
   - Favicon link (ako postoji logo-icon.png, koristi ga)

6. PRINT STYLES:
   Ne treba. Ovo je demo.

7. SMOOTH SCROLL:
   - html { scroll-behavior: smooth } već postoji u tokens.css
   - Provjeri da radi s hash routingom

8. CONSOLE CLEANUP:
   - Ukloni sve console.log pozive
   - Provjeri da nema React warnings u konzoli

Ovo je zadnji prompt — nakon ovoga stranica mora izgledati i funkcionirati kao production-ready demo.
```

---

## REDOSLIJED IZVRŠAVANJA

1. **Hero overlay** — brzi fix, 5 min
2. **Mobile nav** — kritično za demo (rodbina će gledati na mobitelu)
3. **Pojačane animacije** — wow faktor
4. **Proces proizvodnje** — nova sekcija, storytelling
5. **Leaflet mapa** — zamjena za placeholder
6. **Mini cart** — e-commerce demo
7. **URL routing** — profesionalnost
8. **Finalni polish** — sve skupa zaokružiti

Svaki prompt je self-contained — možeš ih raditi jedan po jedan bez da prethodni mora biti gotov (osim #8 koji ide zadnji).
