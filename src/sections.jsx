// Visit, News, Awards, Contact, Gallery — Karaba
const { useContext: useCtxS, useState: useStS } = React;

function VisitSection() {
  const { t, lang } = useCtxS(window.LangContext);
  return (
    <window.Section id="visit" bg="dark" pt={144} pb={144} data-screen-label="07 Home · Visit">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, alignItems: 'center' }} className="es-visit-grid">
        <window.Reveal>
          <div>
            <div className="es-eyebrow-gold" style={{ marginBottom: 22 }}>{t('visit_eyebrow')}</div>
            <h2 className="es-h1" style={{ color: 'var(--es-cream)', margin: 0 }}>
              <span>{lang==='hr' ? 'Kušaonica u ' : 'Tasting in '}</span>
              <span style={{ fontFamily: 'var(--es-font-script)', fontStyle: 'italic', color: 'var(--es-gold-light)', fontWeight: 300 }}>
                {lang==='hr' ? 'našoj konobi.' : 'our tavern.'}
              </span>
            </h2>
            <p style={{ marginTop: 24, fontFamily: 'var(--es-font-body)', fontStyle: 'italic', fontSize: '1.2rem', lineHeight: 1.55, color: 'rgba(239,230,206,0.82)', maxWidth: 520 }}>{t('visit_lede')}</p>
            <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(3,auto)', gap: 36 }} className="es-visit-stats">
              {[
                { icon: 'clock', l: t('visit_duration') },
                { icon: 'users', l: t('visit_size') },
                { icon: 'calendar', l: lang==='hr'?'po dogovoru':'by appointment' },
              ].map((x, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <window.Icon name={x.icon} size={18} color="var(--es-gold)" />
                  <span style={{ fontFamily: 'var(--es-font-mono)', fontSize: 10.5, letterSpacing: '0.22em', color: 'rgba(239,230,206,0.88)', textTransform: 'uppercase' }}>{x.l}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 44, display: 'flex', gap: 32, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div>
                <div className="es-metric" style={{ color: 'var(--es-gold-light)' }}>{t('visit_price')}</div>
                <div className="es-caption" style={{ color: 'rgba(239,230,206,0.6)', marginTop: 6 }}>{t('visit_per')}</div>
              </div>
              <a href="#contact" className="es-btn es-btn-gold">
                {t('visit_book')}
              </a>
            </div>
          </div>
        </window.Reveal>
        <window.Reveal delay={0.15}>
          <div style={{ position: 'relative' }}>
            <div style={{ overflow: 'hidden', borderRadius: 4, background: '#000' }}>
              <img src="assets/photos/kusaonica-karaba.jpg" alt="" loading="lazy" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{
              position: 'absolute', bottom: -36, left: -28,
              width: 200,
              overflow: 'hidden', borderRadius: 4,
              boxShadow: 'var(--es-shadow-lift)',
              border: '4px solid var(--es-ink)',
            }} className="es-visit-photo-card">
              <img src="assets/photos/degustacija-karaba.jpg" alt="" loading="lazy" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{
              position: 'absolute', top: -28, right: -24,
              padding: '20px 24px',
              background: 'var(--es-cream)',
              color: 'var(--es-ink)',
              borderRadius: 4,
              boxShadow: 'var(--es-shadow-lift)',
              maxWidth: 230,
            }} className="es-visit-card">
              <div className="es-caption" style={{ color: 'var(--es-wine)' }}>{lang==='hr'?'ISKUSTVO':'EXPERIENCE'}</div>
              <div style={{ fontFamily: 'var(--es-font-display)', fontStyle: 'italic', fontSize: 20, color: 'var(--es-ink)', marginTop: 8, fontWeight: 400 }}>
                {lang==='hr' ? '6 vina · sir · pršut' : '6 wines · cheese · prosciutto'}
              </div>
            </div>
          </div>
        </window.Reveal>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .es-visit-grid { grid-template-columns: 1fr !important; gap: 64px !important; }
          .es-visit-card { position: static !important; margin-bottom: 16px !important; }
          .es-visit-photo-card { display: none !important; }
          .es-visit-stats { grid-template-columns: 1fr !important; gap: 14px !important; }
        }
      `}} />
    </window.Section>
  );
}

function NewsSection() {
  const { t, lang } = useCtxS(window.LangContext);
  return (
    <window.Section id="news" bg="paper" pt={144} pb={144} data-screen-label="08 Home · News">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
        <div>
          <div className="es-eyebrow" style={{ marginBottom: 16 }}>{t('news_eyebrow')}</div>
          <h2 className="es-h1" style={{ margin: 0, maxWidth: 620 }}>
            <span>{lang==='hr'?'Iz vinograda':'From the vineyard'} </span>
            <span style={{ fontFamily: 'var(--es-font-script)', fontStyle: 'italic', color: 'var(--es-wine)', fontWeight: 300 }}>{lang==='hr'?'i podruma.':'and the cellar.'}</span>
          </h2>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }} className="es-news-grid">
        {window.NEWS_ITEMS.map((n, i) => (
          <window.Reveal key={i} delay={i * 0.08}>
            <a href="#" onClick={(e)=>e.preventDefault()} className="es-card-hover" style={{
              display: 'block', textDecoration: 'none', color: 'inherit',
              background: 'var(--es-paper)',
              border: '1px solid var(--es-border)',
              overflow: 'hidden', height: '100%',
            }}>
              <div style={{ aspectRatio: '5/3', overflow: 'hidden', background: 'var(--es-charcoal)' }}>
                <img src={n.photo} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <span style={{ padding: '4px 10px', background: 'var(--es-wine-wash)', color: 'var(--es-wine)', fontFamily: 'var(--es-font-mono)', fontSize: 9.5, letterSpacing: '0.24em', fontWeight: 500 }}>{n.tag[lang]}</span>
                  <span className="es-caption">{new Date(n.date).toLocaleDateString(lang==='hr'?'hr-HR':'en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
                <h3 className="es-h3" style={{ margin: 0, fontFamily: 'var(--es-font-display)', fontStyle: 'italic', fontWeight: 400 }}>{n.title[lang]}</h3>
                <p className="es-body-sm" style={{ marginTop: 12 }}>{n.excerpt[lang]}</p>
              </div>
            </a>
          </window.Reveal>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) { .es-news-grid { grid-template-columns: 1fr !important; } }
      `}} />
    </window.Section>
  );
}

function AwardsSection() {
  const { t, lang } = useCtxS(window.LangContext);
  return (
    <window.Section id="awards" bg="cream" pt={144} pb={144} data-screen-label="09 Home · Awards">
      <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 72px' }}>
        <window.Reveal>
          <div className="es-eyebrow" style={{ marginBottom: 16 }}>{t('awards_eyebrow')}</div>
          <h2 className="es-h1" style={{ margin: 0 }}>
            <span>{lang==='hr'?'Vino koje govori':'Wine that speaks'} </span>
            <span style={{ fontFamily: 'var(--es-font-script)', fontStyle: 'italic', color: 'var(--es-wine)', fontWeight: 300 }}>{lang==='hr'?'izvan podruma.':'beyond the cellar.'}</span>
          </h2>
        </window.Reveal>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="es-award-grid">
        {window.AWARDS.map((a, i) => (
          <window.Reveal key={i} delay={i * 0.05}>
            <div style={{
              padding: '36px 32px',
              background: 'var(--es-paper)',
              border: '1px solid var(--es-border)',
              display: 'flex', alignItems: 'flex-start', gap: 22,
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 9999,
                background: a.medal[lang] === 'GOLD' || a.medal[lang] === 'ZLATO' ? 'var(--es-gold)' : '#B8AE95',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                color: 'var(--es-ink)',
              }}>
                <window.Icon name="award" size={22} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--es-font-mono)', fontSize: 10, letterSpacing: '0.26em', color: a.medal[lang]==='GOLD'||a.medal[lang]==='ZLATO' ? 'var(--es-gold-deep)':'var(--es-muted)', fontWeight: 500 }}>
                  {a.medal[lang]} · {a.year}
                </div>
                <div style={{ fontFamily: 'var(--es-font-display)', fontStyle: 'italic', fontSize: 21, color: 'var(--es-text)', marginTop: 8, lineHeight: 1.25, fontWeight: 400 }}>{a.event}</div>
                <div className="es-body-sm" style={{ marginTop: 6 }}>{a.product}</div>
              </div>
            </div>
          </window.Reveal>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1000px) { .es-award-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .es-award-grid { grid-template-columns: 1fr !important; } }
      `}} />
    </window.Section>
  );
}

function ContactSection() {
  const { t, lang } = useCtxS(window.LangContext);
  const [sent, setSent] = useStS(false);
  const [form, setForm] = useStS({ name: '', email: '', phone: '', message: '' });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  const field = (key, type = 'text', size = 'full') => (
    <div style={{ gridColumn: size === 'half' ? 'span 1' : 'span 2' }}>
      <label style={{ display: 'block', fontFamily: 'var(--es-font-mono)', fontSize: 10, letterSpacing: '0.26em', color: 'var(--es-muted)', textTransform: 'uppercase', marginBottom: 10 }}>
        {t('contact_' + key)}
      </label>
      {key === 'msg' ? (
        <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={5}
          style={{ width: '100%', padding: '14px 16px', fontFamily: 'var(--es-font-ui)', fontSize: 15, background: 'var(--es-paper)', border: '1px solid var(--es-border)', borderRadius: 2, color: 'var(--es-ink)', resize: 'vertical', outline: 'none', transition: 'border-color 0.2s' }}
          onFocus={e => e.target.style.borderColor = 'var(--es-wine)'}
          onBlur={e => e.target.style.borderColor = 'var(--es-border)'}
        />
      ) : (
        <input type={type} value={form[key==='name'?'name':key==='email'?'email':'phone']} onChange={e=>setForm({...form, [key==='name'?'name':key==='email'?'email':'phone']:e.target.value})}
          style={{ width: '100%', padding: '14px 16px', fontFamily: 'var(--es-font-ui)', fontSize: 15, background: 'var(--es-paper)', border: '1px solid var(--es-border)', borderRadius: 2, color: 'var(--es-ink)', outline: 'none', transition: 'border-color 0.2s' }}
          onFocus={e => e.target.style.borderColor = 'var(--es-wine)'}
          onBlur={e => e.target.style.borderColor = 'var(--es-border)'}
        />
      )}
    </div>
  );

  return (
    <window.Section id="contact" bg="paper" pt={144} pb={144} data-screen-label="10 Home · Contact">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80 }} className="es-contact-grid">
        <window.Reveal>
          <div>
            <div className="es-eyebrow" style={{ marginBottom: 16 }}>{t('contact_eyebrow')}</div>
            <h2 className="es-h1" style={{ margin: 0 }}>
              <span style={{ fontFamily: 'var(--es-font-script)', fontStyle: 'italic', color: 'var(--es-wine)', fontWeight: 300 }}>{t('contact_title')}</span>
            </h2>
            <p className="es-lede" style={{ marginTop: 22, maxWidth: 440 }}>{t('contact_lede')}</p>

            <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 22 }}>
              {[
                { icon: 'map-pin', primary: 'Pakoštane, Hrvatska', secondary: lang==='hr'?'Sjeverna Dalmacija':'Northern Dalmatia' },
                { icon: 'phone', primary: '+385 91 000 0000', secondary: lang==='hr'?'svakim radnim danom':'weekdays' },
                { icon: 'mail', primary: 'info@vinarijakaraba.hr', secondary: lang==='hr'?'odgovor u 24h':'reply within 24h' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 9999, background: 'var(--es-wine-wash)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <window.Icon name={c.icon} size={16} color="var(--es-wine)" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--es-font-display)', fontStyle: 'italic', fontSize: 18, color: 'var(--es-ink)', fontWeight: 400 }}>{c.primary}</div>
                    <div className="es-body-sm" style={{ marginTop: 2 }}>{c.secondary}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 40 }}>
              {typeof L !== 'undefined' ? <window.LeafletMap /> : (
                <div style={{ height: 280, background: 'var(--es-bg-charcoal)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(239,230,206,0.7)', fontFamily: 'var(--es-font-mono)', fontSize: 11, letterSpacing: '0.24em' }}>MAPA · PAKOŠTANI</div>
              )}
            </div>
          </div>
        </window.Reveal>

        <window.Reveal delay={0.1}>
          <form onSubmit={submit} style={{
            padding: 44,
            background: 'var(--es-cream)',
            border: '1px solid var(--es-border)',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22,
          }} className="es-contact-form">
            {field('name', 'text')}
            {field('email', 'email', 'half')}
            {field('phone', 'tel', 'half')}
            {field('msg')}
            <div style={{ gridColumn: 'span 2', display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div className="es-caption" style={{ maxWidth: 320 }}>{lang==='hr'?'Šaljući poruku pristajete na obradu podataka u skladu s GDPR-om.':'By submitting, you agree to data processing under GDPR.'}</div>
              <button type="submit" className="es-btn es-btn-primary">
                {sent ? <><window.Icon name="check" size={16} />{t('contact_sent')}</> : t('contact_send')}
              </button>
            </div>
          </form>
        </window.Reveal>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .es-contact-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
          .es-contact-form { grid-template-columns: 1fr !important; }
        }
      `}} />
    </window.Section>
  );
}

function GallerySection() {
  const { t, lang } = useCtxS(window.LangContext);
  const [lightbox, setLightbox] = useStS(null); // index or null
  const items = [
    { src: 'assets/photos/vinograd-karaba.jpg',                         aspect: '3/4' },
    { src: 'assets/photos/drvene-bacve-karaba.jpg',                     aspect: '4/3' },
    { src: 'assets/photos/kusaonica-karaba.jpg',                        aspect: '4/3' },
    { src: 'assets/photos/tocenje-vina-iz-bacve.jpg',                   aspect: '3/4' },
    { src: 'assets/photos/karaba-vina.jpg',                             aspect: '4/3' },
    { src: 'assets/photos/degustacija-karaba-2.jpg',                    aspect: '3/4' },
    { src: 'assets/photos/vinarija-karaba-event.jpg',                   aspect: '4/3' },
    { src: 'assets/photos/branje-grozda-karaba.jpg',                    aspect: '3/4' },
    { src: 'assets/photos/bozicni-ugodaj-karaba.jpg',                   aspect: '4/3' },
    { src: 'assets/photos/vinarija-karaba-event2.webp',                 aspect: '4/3' },
  ];

  React.useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      else if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % items.length);
      else if (e.key === 'ArrowLeft') setLightbox(i => (i - 1 + items.length) % items.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox]);

  return (
    <window.Section id="gallery" bg="cream" pt={144} pb={160} data-screen-label="11 Home · Gallery">
      <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 64px' }}>
        <div className="es-eyebrow" style={{ marginBottom: 16 }}>{t('gallery_eyebrow')}</div>
        <h2 className="es-h1" style={{ margin: 0 }}>
          <span>{lang==='hr'?'Godina':'Year'} </span>
          <span style={{ fontFamily: 'var(--es-font-script)', fontStyle: 'italic', color: 'var(--es-wine)', fontWeight: 300 }}>{lang==='hr'?'za godinom.':'after year.'}</span>
        </h2>
      </div>
      <div style={{ columnCount: 4, columnGap: 16 }} className="es-gallery">
        {items.map((it, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            aria-label={lang==='hr' ? 'Otvori sliku' : 'Open image'}
            style={{
              display: 'block', breakInside: 'avoid', width: '100%',
              marginBottom: 16, overflow: 'hidden', borderRadius: 2,
              background: 'var(--es-charcoal)',
              border: 'none', padding: 0, cursor: 'zoom-in',
              position: 'relative',
            }}
            className="es-gallery-item"
          >
            <img src={it.src} alt="" loading="lazy" style={{ width: '100%', display: 'block', aspectRatio: it.aspect, objectFit: 'cover', transition: 'transform 0.6s ease, filter 0.4s ease' }} />
          </button>
        ))}
      </div>

      {lightbox !== null && ReactDOM.createPortal((
        <div
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed', inset: 0, zIndex: 99997,
            background: 'rgba(12, 8, 6, 0.96)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '72px 32px',
            animation: 'esLightboxFade 0.3s ease both',
          }}>
          <img
            src={items[lightbox].src}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '100%', maxHeight: '100%',
              objectFit: 'contain',
              boxShadow: '0 40px 120px -40px rgba(0,0,0,0.7)',
              animation: 'esLightboxZoom 0.35s cubic-bezier(0.16,1,0.3,1) both',
              cursor: 'default',
            }}
          />
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            aria-label="Close"
            style={{
              position: 'absolute', top: 24, right: 28,
              width: 44, height: 44,
              background: 'transparent',
              border: '1px solid rgba(239,230,206,0.3)',
              color: 'var(--es-cream)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            <window.Icon name="x" size={18} color="var(--es-cream)" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(i => (i - 1 + items.length) % items.length); }}
            aria-label="Previous"
            style={{
              position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)',
              width: 52, height: 52,
              background: 'transparent',
              border: '1px solid rgba(239,230,206,0.28)',
              color: 'var(--es-cream)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            <window.Icon name="arrow-left" size={20} color="var(--es-cream)" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(i => (i + 1) % items.length); }}
            aria-label="Next"
            style={{
              position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
              width: 52, height: 52,
              background: 'transparent',
              border: '1px solid rgba(239,230,206,0.28)',
              color: 'var(--es-cream)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            <window.Icon name="arrow-right" size={20} color="var(--es-cream)" />
          </button>
          <div style={{
            position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            fontFamily: 'var(--es-font-mono)', fontSize: 11, letterSpacing: '0.3em',
            color: 'rgba(239,230,206,0.6)', textTransform: 'uppercase',
          }}>
            {String(lightbox + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </div>
        </div>
      ), document.body)}

      <style dangerouslySetInnerHTML={{ __html: `
        .es-gallery-item:hover img { transform: scale(1.035); filter: brightness(1.04); }
        @keyframes esLightboxFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes esLightboxZoom { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        @media (max-width: 1000px) { .es-gallery { column-count: 3 !important; } }
        @media (max-width: 700px) { .es-gallery { column-count: 2 !important; } }
        @media (max-width: 420px) { .es-gallery { column-count: 1 !important; } }
      `}} />
    </window.Section>
  );
}

window.VisitSection = VisitSection;
window.NewsSection = NewsSection;
window.AwardsSection = AwardsSection;
window.ContactSection = ContactSection;
window.GallerySection = GallerySection;
