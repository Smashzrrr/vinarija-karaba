// Hero + Stats + About — Karaba dark estate
const { useContext: useCtxH, useCallback: useCbH } = React;

// Cinematic crossfade slideshow with slow Ken Burns zoom.
// Inspired by San Felice / Della Vite / Fournier.
function HeroSlideshow({ images, interval = 6500 }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || images.length < 2) return;
    const id = setInterval(() => setActive(i => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {images.map((img, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          opacity: i === active ? 1 : 0,
          transition: 'opacity 1.8s ease-in-out',
        }}>
          <img
            src={img.src}
            alt={img.alt}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchpriority={i === 0 ? 'high' : 'auto'}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: img.position || 'center',
              filter: 'saturate(0.92) contrast(1.05) brightness(0.88)',
              animation: i === active ? `esKenBurns ${interval * images.length / 1000}s ease-in-out infinite` : 'none',
              transformOrigin: img.origin || 'center center',
            }}
          />
        </div>
      ))}
    </div>
  );
}

function Hero() {
  const { t, lang } = useCtxH(window.LangContext);
  const { setPage } = useCtxH(window.PageContext);

  const slides = [
    { src: 'assets/photos/vinarija-karaba-iz-zraka.jpg', alt: lang==='hr' ? 'Vinarija Karaba iz zraka' : 'Karaba winery from above',    position: 'center 55%', origin: 'center 60%' },
    { src: 'assets/photos/vinograd-karaba.jpg',          alt: lang==='hr' ? 'Vinograd' : 'Vineyard',                                      position: 'center 50%', origin: '40% 50%' },
    { src: 'assets/photos/drvene-bacve-karaba.jpg',      alt: lang==='hr' ? 'Drvene bačve u podrumu' : 'Oak barrels in the cellar',      position: 'center 50%', origin: '60% 45%' },
    { src: 'assets/photos/vinarija-karaba.webp',         alt: lang==='hr' ? 'Vinarija Karaba' : 'Karaba winery',                         position: 'center 50%', origin: '50% 50%' },
  ];

  return (
    <section id="home" data-screen-label="01 Home · Hero" style={{
      position: 'relative', overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex', alignItems: 'flex-end',
      padding: '140px 32px 96px',
      color: 'var(--es-cream)',
      background: '#14100C',
    }}>
      <HeroSlideshow images={slides} />

      {/* Dark cinematic overlay */}
      <div style={{ position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(20,16,12,0.55) 0%, rgba(20,16,12,0.20) 30%, rgba(20,16,12,0.45) 65%, rgba(20,16,12,0.85) 100%)',
      }} />
      <div style={{ position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 120%, rgba(92,26,31,0.35), transparent 60%)',
        mixBlendMode: 'multiply',
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', width: '100%' }}>
        {/* Top eyebrow */}
        <div style={{
          fontFamily: 'var(--es-font-mono)',
          fontSize: 11,
          letterSpacing: '0.38em',
          textTransform: 'uppercase',
          color: 'var(--es-gold)',
          marginBottom: 28,
          animation: 'esHeroFade 1.1s 0.1s both',
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 28, height: 1, background: 'var(--es-gold)', opacity: 0.6 }} />
            {t('hero_eyebrow')}
          </span>
        </div>

        <h1 style={{
          margin: 0,
          fontFamily: 'var(--es-font-display)',
          fontWeight: 300,
          fontSize: 'clamp(3rem, 9vw, 8.5rem)',
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          color: 'var(--es-cream)',
          textShadow: '0 6px 40px rgba(0,0,0,0.5)',
          maxWidth: 1100,
        }}>
          <span style={{ display: 'block', animation: 'esHeroFade 1.2s 0.25s both' }}>
            {t('hero_title_1')}
          </span>
          <span style={{
            display: 'block',
            fontStyle: 'italic',
            fontFamily: 'var(--es-font-script)',
            fontWeight: 300,
            color: 'var(--es-gold-light)',
            animation: 'esHeroFade 1.2s 0.45s both',
          }}>
            {t('hero_title_2')}
          </span>
          <span style={{ display: 'block', animation: 'esHeroFade 1.2s 0.65s both' }}>
            {t('hero_title_3')}
          </span>
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 60,
          alignItems: 'flex-end',
          marginTop: 56,
        }} className="es-hero-bottom">
          <p style={{
            margin: 0,
            fontFamily: 'var(--es-font-body)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.05rem, 1.25vw, 1.3rem)',
            lineHeight: 1.6,
            color: 'rgba(239,230,206,0.88)',
            maxWidth: 500,
            textShadow: '0 2px 16px rgba(0,0,0,0.5)',
            animation: 'esHeroFade 1.2s 0.85s both',
          }}>{t('hero_lede')}</p>

          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', animation: 'esHeroFade 1.2s 1.05s both' }} className="es-hero-ctas">
            <a href="#wines" className="es-btn es-btn-gold" onClick={(e)=>{e.preventDefault(); setPage('home','wines');}}>
              {t('hero_cta_1')}
            </a>
            <a href="#visit" onClick={(e)=>{e.preventDefault(); setPage('home','visit');}}
              className="es-btn es-btn-ghost-light">
              {t('hero_cta_2')}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)',
        zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        fontFamily: 'var(--es-font-mono)', fontSize: 10, letterSpacing: '0.32em',
        color: 'rgba(239,230,206,0.6)', textTransform: 'uppercase',
        animation: 'esFloat 3.5s ease-in-out infinite',
      }}>
        <div>{lang==='hr' ? 'SKROLAJTE' : 'SCROLL'}</div>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, rgba(239,230,206,0.6), transparent)' }} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes esHeroFade {
          from { opacity: 0; transform: translateY(28px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
        }
        @keyframes esFloat {
          0%,100% { transform: translate(-50%, 0); }
          50%     { transform: translate(-50%, 8px); }
        }
        @keyframes esKenBurns {
          0%   { transform: scale(1.00); }
          100% { transform: scale(1.12); }
        }
        @media (max-width: 820px) {
          .es-hero-bottom { grid-template-columns: 1fr !important; gap: 32px !important; }
          .es-hero-ctas { justify-content: flex-start; }
        }
      `}} />
    </section>
  );
}

function StatBar() {
  const { lang } = useCtxH(window.LangContext);
  const stats = [
    { num: 2000, suffix: '', label: lang==='hr' ? 'osnovano' : 'founded',    sub: lang==='hr' ? 'obiteljski projekt' : 'family project' },
    { num: 18,   suffix: '', label: lang==='hr' ? 'hektara'  : 'hectares',   sub: lang==='hr' ? 'vinograda u obradi' : 'vineyard tended' },
    { num: 30,   suffix: 'k', label: lang==='hr' ? 'boca godišnje' : 'bottles / year', sub: lang==='hr' ? 'ograničena serija' : 'limited production' },
    { num: 10,   suffix: '', label: lang==='hr' ? 'sorti' : 'varieties',     sub: lang==='hr' ? 'autohtone i klasične' : 'native and classic' },
  ];
  return (
    <window.Section id="stats" bg="paper" pt={96} pb={96} data-screen-label="01b Home · Stats">
      <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
        <div className="es-eyebrow" style={{ marginBottom: 16 }}>{lang==='hr' ? 'U BROJKAMA' : 'IN NUMBERS'}</div>
        <h2 className="es-h2" style={{ margin: 0 }}>
          <span>{lang==='hr' ? 'Karaba ' : 'Karaba '}</span>
          <span style={{ fontStyle: 'italic', fontFamily: 'var(--es-font-script)', color: 'var(--es-wine)' }}>{lang==='hr' ? 'kroz godine.' : 'through the years.'}</span>
        </h2>
      </div>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 0,
        borderTop: '1px solid var(--es-border)',
        borderBottom: '1px solid var(--es-border)',
      }} className="es-statbar">
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: '44px 20px',
            borderLeft: i > 0 ? '1px solid var(--es-border)' : 'none',
            textAlign: 'center',
          }} className="es-stat-cell">
            <div className="es-metric" style={{ color: 'var(--es-wine)' }}>
              <window.CountUp end={s.num} suffix={s.suffix} duration={1.6} />
            </div>
            <div style={{ fontFamily: 'var(--es-font-mono)', fontSize: 10.5, letterSpacing: '0.28em', color: 'var(--es-text)', textTransform: 'uppercase', marginTop: 14, fontWeight: 500 }}>{s.label}</div>
            <div style={{ fontFamily: 'var(--es-font-body)', fontStyle: 'italic', fontSize: 14, color: 'var(--es-muted)', marginTop: 8 }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 800px) {
          .es-statbar { grid-template-columns: 1fr 1fr !important; }
          .es-stat-cell { border-left: none !important; }
          .es-stat-cell:nth-child(2) { border-left: 1px solid var(--es-border) !important; }
          .es-stat-cell:nth-child(3), .es-stat-cell:nth-child(4) { border-top: 1px solid var(--es-border); }
          .es-stat-cell:nth-child(4) { border-left: 1px solid var(--es-border) !important; }
        }
      `}} />
    </window.Section>
  );
}

function About() {
  const { t, lang } = useCtxH(window.LangContext);
  const renderP = (key) => {
    const raw = t(key);
    const parts = raw.split(/\*\*(.+?)\*\*/g);
    return parts.map((p, i) => i % 2 === 1
      ? <strong key={i} style={{ color: 'var(--es-wine)', fontWeight: 400, fontFamily: 'var(--es-font-script)', fontStyle: 'italic', fontSize: '1.15em' }}>{p}</strong>
      : <React.Fragment key={i}>{p}</React.Fragment>
    );
  };
  return (
    <window.Section id="about" bg="paper" pt={144} pb={144} data-screen-label="02 Home · About">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center' }} className="es-about-grid">
        <window.Reveal>
          <div>
            <div className="es-eyebrow" style={{ marginBottom: 22 }}>{t('about_eyebrow')}</div>
            <h2 className="es-h1" style={{ margin: 0, maxWidth: 520 }}>
              {t('about_title').split(' ').map((w, i, arr) => {
                const last = i === arr.length - 1;
                return <span key={i} style={{
                  fontStyle: last ? 'italic' : 'normal',
                  fontFamily: last ? 'var(--es-font-script)' : 'var(--es-font-display)',
                  color: last ? 'var(--es-wine)' : 'var(--es-text)',
                  fontWeight: 300,
                }}>{w}{i < arr.length - 1 ? ' ' : ''}</span>;
              })}
            </h2>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p className="es-body" style={{ margin: 0 }}>{renderP('about_p1')}</p>
              <p className="es-body" style={{ margin: 0 }}>{renderP('about_p2')}</p>
              <p className="es-body" style={{ margin: 0 }}>{renderP('about_p3')}</p>
            </div>
            <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 20 }}>
              <svg width="140" height="60" viewBox="0 0 140 60" style={{ flexShrink: 0 }}>
                <path d="M10 42 Q 22 18, 32 34 T 52 30 Q 62 20, 70 38 T 92 32 Q 105 22, 115 42 Q 122 50, 130 40" stroke="var(--es-text)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M20 46 Q 60 50, 100 46" stroke="var(--es-text)" strokeWidth="0.5" fill="none" opacity="0.5" />
              </svg>
              <div>
                <div style={{ fontFamily: 'var(--es-font-display)', fontSize: 18, fontStyle: 'italic', color: 'var(--es-text)' }}>{t('about_signature')}</div>
                <div className="es-caption">{t('about_signature_sub')}</div>
              </div>
            </div>
          </div>
        </window.Reveal>

        <window.Reveal delay={0.15}>
          <div style={{ position: 'relative' }}>
            <window.PlaceholderImage
              src="assets/photos/vinarija-karaba-close-up.jpg"
              aspect="4/5" radius={4}
              hideLabel
              objectPosition="center 40%"
            />
            <window.FloatAnim offset={6} duration={4}>
              <div style={{
                position: 'absolute',
                bottom: -40, right: -30,
                padding: '24px 28px',
                background: 'var(--es-ink)',
                color: 'var(--es-cream)',
                border: '1px solid var(--es-border-dark-strong)',
                borderRadius: 4,
                boxShadow: 'var(--es-shadow-lift)',
                maxWidth: 260,
              }} className="es-float-card">
                <div className="es-caption" style={{ color: 'var(--es-gold)' }}>{lang==='hr' ? 'OBITELJSKA VINARIJA' : 'FAMILY WINERY'}</div>
                <div style={{ fontFamily: 'var(--es-font-script)', fontStyle: 'italic', fontSize: 22, fontWeight: 300, color: 'var(--es-cream)', marginTop: 10, lineHeight: 1.35 }}>
                  {lang==='hr' ? '„Vino je strpljenje u boci."' : '"Wine is patience in a bottle."'}
                </div>
              </div>
            </window.FloatAnim>
          </div>
        </window.Reveal>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .es-about-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
          .es-float-card { position: static !important; margin-top: 24px !important; }
        }
      `}} />
    </window.Section>
  );
}

window.Hero = Hero;
window.StatBar = StatBar;
window.About = About;
