// Wine + Vineyards sections — Karaba
const { useContext: useCtxP, useState: useStP } = React;

function WineSection() {
  const { t, lang } = useCtxP(window.LangContext);
  const { setPage } = useCtxP(window.PageContext);
  const featured = [
    window.WINES.find(w => w.id === 'templar'),
    window.WINES.find(w => w.id === 'plavac'),
    window.WINES.find(w => w.id === 'crljenak'),
    window.WINES.find(w => w.id === 'posip'),
  ].filter(Boolean);

  return (
    <window.Section id="wines" bg="cream" pt={144} pb={144} data-screen-label="03 Home · Wines">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72, flexWrap: 'wrap', gap: 32 }}>
        <window.Reveal>
          <div style={{ maxWidth: 640 }}>
            <div className="es-eyebrow" style={{ marginBottom: 18 }}>{t('wine_eyebrow')}</div>
            <h2 className="es-h1" style={{ margin: 0 }}>
              <span>{lang === 'hr' ? 'Etikete ' : 'Labels '}</span>
              <span style={{ fontStyle: 'italic', fontFamily: 'var(--es-font-script)', color: 'var(--es-wine)', fontWeight: 300 }}>
                {lang === 'hr' ? 'kuće.' : 'of the house.'}
              </span>
            </h2>
            <p className="es-lede" style={{ marginTop: 24, maxWidth: 520 }}>{t('wine_lede')}</p>
          </div>
        </window.Reveal>
        <window.Reveal delay={0.1}>
          <a href="#" onClick={(e)=>{e.preventDefault(); setPage('catalog');}} className="es-link">
            {t('wine_see_all')} ({window.WINES.length}) →
          </a>
        </window.Reveal>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }} className="es-wine-grid">
        {featured.map((w, i) => (
          <window.Reveal key={w.id} delay={i * 0.08}>
            <a href="#" onClick={(e)=>{e.preventDefault(); setPage('product:'+w.id);}} className="es-card-hover" style={{
              display: 'block',
              background: 'var(--es-paper)',
              border: '1px solid var(--es-border)',
              textDecoration: 'none',
              color: 'inherit',
              position: 'relative',
              height: '100%',
            }}>
              {w.flagship && <div style={{
                position: 'absolute', top: 16, right: 16, zIndex: 2,
                padding: '6px 12px',
                background: 'var(--es-gold)',
                color: 'var(--es-ink)',
                fontFamily: 'var(--es-font-mono)', fontSize: 9, letterSpacing: '0.28em', fontWeight: 500,
              }}>FLAGSHIP</div>}

              <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: 'var(--es-charcoal)' }}>
                <img
                  src={w.photo}
                  alt={w.name}
                  loading="lazy"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center',
                    transition: 'transform 1.2s ease',
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>

              <div style={{ padding: '24px 22px 22px' }}>
                <div className="es-caption" style={{ color: 'var(--es-gold-deep)' }}>{w.variety}</div>
                <div className="es-h3" style={{ marginTop: 10, fontFamily: 'var(--es-font-display)', fontStyle: 'italic', fontWeight: 400 }}>{w.name}</div>

                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--es-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontFamily: 'var(--es-font-mono)', fontSize: 10.5, letterSpacing: '0.14em', color: 'var(--es-muted)', display: 'flex', gap: 12 }}>
                    <span>{w.year}</span>
                    <span>{w.abv}%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontFamily: 'var(--es-font-display)', fontSize: 18, color: 'var(--es-wine)', fontStyle: 'italic' }}>{w.price} €</span>
                    <window.AddToCartBtn item={{ id: w.id, name: w.name, price: w.price, category: 'wine' }} />
                  </div>
                </div>
              </div>
            </a>
          </window.Reveal>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1000px) { .es-wine-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 520px)  { .es-wine-grid { grid-template-columns: 1fr !important; } }
      `}} />
    </window.Section>
  );
}

function FieldsSection() {
  const { t, lang } = useCtxP(window.LangContext);
  return (
    <window.Section id="fields" bg="dark" pt={144} pb={144} data-screen-label="05 Home · Vineyards" style={{ color: 'var(--es-cream)' }}>
      <window.Reveal>
        <div style={{ maxWidth: 840, margin: '0 auto 72px', textAlign: 'center' }}>
          <div className="es-eyebrow-gold" style={{ marginBottom: 18 }}>{t('fields_eyebrow')}</div>
          <h2 className="es-h1" style={{ margin: 0, color: 'var(--es-cream)' }}>
            {t('fields_title').split(' ').map((w, i, arr) => (
              <span key={i} style={{
                fontFamily: i === arr.length - 1 ? 'var(--es-font-script)' : 'var(--es-font-display)',
                fontStyle: i === arr.length - 1 ? 'italic' : 'normal',
                fontWeight: 300,
                color: i === arr.length - 1 ? 'var(--es-gold-light)' : 'var(--es-cream)',
              }}>{w}{i < arr.length - 1 ? ' ' : ''}</span>
            ))}
          </h2>
          <p className="es-lede" style={{ marginTop: 24, maxWidth: 640, margin: '24px auto 0', color: 'rgba(239,230,206,0.78)' }}>{t('fields_lede')}</p>
        </div>
      </window.Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }} className="es-fields-grid">
        <window.Reveal>
          <div style={{ overflow: 'hidden', borderRadius: 4, background: '#000' }}>
            <img src="assets/photos/vinarija-karaba-iz-zraka.jpg" alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '4/5', display: 'block' }} />
          </div>
        </window.Reveal>
        <window.Reveal delay={0.12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, height: '100%' }}>
            <div style={{ overflow: 'hidden', borderRadius: 4, background: '#000' }}>
              <img src="assets/photos/vinograd-karaba.jpg" alt="" loading="lazy" style={{ width: '100%', aspectRatio: '5/3', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ overflow: 'hidden', borderRadius: 4, background: '#000' }}>
              <img src="assets/photos/obradjivanje-vinograda-vinarija-karaba.jpg" alt="" loading="lazy" style={{ width: '100%', aspectRatio: '5/3', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </window.Reveal>
      </div>

      <div style={{
        marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 0,
        borderTop: '1px solid var(--es-border-dark-strong)',
        borderBottom: '1px solid var(--es-border-dark-strong)',
      }} className="es-land-stats">
        {[
          { k: lang==='hr'?'Bijele sorte':'Whites', v: '3', sub: lang==='hr'?'Pošip · Debit · Maraština':'Pošip · Debit · Maraština' },
          { k: lang==='hr'?'Crne sorte':'Reds',     v: '6', sub: lang==='hr'?'autohtone i klasične':'native and classic' },
          { k: lang==='hr'?'Starenje':'Ageing',     v: '24 mj.', sub: lang==='hr'?'u francuskom barriqueu':'French barrique' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: '48px 24px', textAlign: 'center',
            borderLeft: i > 0 ? '1px solid var(--es-border-dark-strong)' : 'none',
          }} className="es-land-cell">
            <div style={{ fontFamily: 'var(--es-font-mono)', fontSize: 10.5, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--es-gold)', marginBottom: 16 }}>{s.k}</div>
            <div className="es-metric" style={{ color: 'var(--es-cream)' }}>{s.v}</div>
            <div style={{ fontFamily: 'var(--es-font-body)', fontStyle: 'italic', fontSize: 14, color: 'rgba(239,230,206,0.7)', marginTop: 10 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .es-fields-grid { grid-template-columns: 1fr !important; }
          .es-land-stats { grid-template-columns: 1fr !important; }
          .es-land-cell { border-left: none !important; border-top: 1px solid var(--es-border-dark-strong); }
          .es-land-cell:first-child { border-top: none !important; }
        }
      `}} />
    </window.Section>
  );
}

// Stubs (legacy HomePage compatibility — render nothing for wine-only estate)
function OilSection()  { return null; }
function FigsSection() { return null; }

window.WineSection = WineSection;
window.FieldsSection = FieldsSection;
window.OilSection = OilSection;
window.FigsSection = FigsSection;
