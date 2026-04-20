// Catalog + Product detail — wine-only (Karaba)
const { useContext: useCtxC, useState: useStC } = React;

function CatalogPage() {
  const { t, lang } = useCtxC(window.LangContext);
  const { setPage } = useCtxC(window.PageContext);
  const [filter, setFilter] = useStC('all');

  const categories = [
    { id: 'all',    label: lang==='hr'?'Sve':'All' },
    { id: 'white',  label: lang==='hr'?'Bijela':'White' },
    { id: 'red',    label: lang==='hr'?'Crna':'Red' },
    { id: 'flag',   label: lang==='hr'?'Flagship':'Flagship' },
  ];

  const items = window.WINES.filter(w => {
    if (filter === 'all') return true;
    if (filter === 'flag') return !!w.flagship;
    return w.type === filter;
  });

  return (
    <>
      <section style={{ padding: '180px 24px 56px', background: 'var(--es-bg-cream)', textAlign: 'center' }}>
        <div className="es-eyebrow" style={{ marginBottom: 16 }}>{t('nav_shop')}</div>
        <h1 className="es-h1" style={{ margin: 0 }}>
          <span>{lang==='hr'?'Naša ':'Our '}</span>
          <span style={{ fontFamily: 'var(--es-font-script)', fontStyle: 'italic', color: 'var(--es-wine)', fontWeight: 300 }}>{lang==='hr'?'vina.':'wines.'}</span>
        </h1>
        <p className="es-lede" style={{ maxWidth: 560, margin: '22px auto 0' }}>
          {lang==='hr'
            ? 'Sve etikete kuće — od svježih bijelih do flagship cuvéea Templar. Za narudžbu nas kontaktirajte.'
            : 'The full house — from fresh whites to the flagship Templar cuvée. Contact us to order.'}
        </p>

        <div style={{ marginTop: 44, display: 'inline-flex', gap: 0, border: '1px solid var(--es-border)' }}>
          {categories.map((c, i) => (
            <button key={c.id} onClick={()=>setFilter(c.id)} style={{
              padding: '12px 26px',
              borderLeft: i > 0 ? '1px solid var(--es-border)' : 'none',
              border: 0,
              cursor: 'pointer',
              background: filter === c.id ? 'var(--es-ink)' : 'transparent',
              color: filter === c.id ? 'var(--es-cream)' : 'var(--es-muted)',
              fontFamily: 'var(--es-font-mono)', fontSize: 11, letterSpacing: '0.24em', fontWeight: 500,
              textTransform: 'uppercase',
              transition: 'all 0.25s',
            }}>{c.label}</button>
          ))}
        </div>
      </section>

      <section style={{ padding: '32px 24px 144px', background: 'var(--es-bg-cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }} className="es-cat-grid">
          {items.map(w => (
            <a key={w.id} href="#" onClick={(e)=>{e.preventDefault(); setPage('product:'+w.id);}} className="es-card-hover" style={{
              background: 'var(--es-paper)',
              border: '1px solid var(--es-border)',
              textDecoration: 'none', color: 'inherit',
              display: 'flex', flexDirection: 'column',
              cursor: 'pointer',
              position: 'relative',
            }}>
              {w.flagship && <div style={{
                position: 'absolute', top: 14, right: 14, zIndex: 2,
                padding: '5px 11px',
                background: 'var(--es-gold)', color: 'var(--es-ink)',
                fontFamily: 'var(--es-font-mono)', fontSize: 9, letterSpacing: '0.26em', fontWeight: 500,
              }}>FLAGSHIP</div>}
              <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: 'var(--es-charcoal)' }}>
                <img src={w.photo} alt={w.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ padding: '22px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="es-caption" style={{ color: 'var(--es-gold-deep)' }}>{w.variety}</div>
                <div className="es-h3" style={{ marginTop: 8, fontFamily: 'var(--es-font-display)', fontStyle: 'italic', fontWeight: 400, minHeight: '2.4em', fontSize: 17 }}>{w.name}</div>
                <div style={{ marginTop: 'auto', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="es-caption">{w.year}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontFamily: 'var(--es-font-display)', fontSize: 17, fontStyle: 'italic', color: 'var(--es-wine)' }}>{w.price} €</span>
                    <window.AddToCartBtn item={{ id: w.id, name: w.name, price: w.price, category: 'wine' }} style={{ width: 30, height: 30 }} />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 1000px) { .es-cat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 520px) { .es-cat-grid { grid-template-columns: 1fr !important; } }
        `}} />
      </section>
    </>
  );
}

function ProductPage({ id }) {
  const { t, lang } = useCtxC(window.LangContext);
  const { setPage } = useCtxC(window.PageContext);
  const w = window.WINES.find(x => x.id === id);
  if (!w) return null;

  return (
    <>
      <section style={{ padding: '140px 24px 40px', background: 'var(--es-bg-cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <button onClick={()=>setPage('catalog')} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 0', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'var(--es-font-mono)', fontSize: 11, letterSpacing: '0.26em', color: 'var(--es-muted)', textTransform: 'uppercase' }}>
            <window.Icon name="arrow-left" size={14} />
            {lang==='hr'?'Katalog':'Catalogue'}
          </button>
        </div>
      </section>
      <section style={{ padding: '24px 24px 144px', background: 'var(--es-bg-cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 80, alignItems: 'flex-start' }} className="es-product-grid">
          <div style={{ position: 'relative', overflow: 'hidden', background: '#000', borderRadius: 2 }}>
            <img src={w.photo} alt={w.name} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }} />
            {w.flagship && <div style={{ position: 'absolute', top: 24, right: 24, padding: '8px 16px', background: 'var(--es-gold)', color: 'var(--es-ink)', fontFamily: 'var(--es-font-mono)', fontSize: 10, letterSpacing: '0.28em', fontWeight: 500 }}>FLAGSHIP</div>}
          </div>
          <div style={{ position: 'sticky', top: 120 }}>
            <div className="es-eyebrow">{w.variety} · {w.year}</div>
            <h1 className="es-h1" style={{ margin: '16px 0 0' }}>
              <span>Karaba </span>
              <span style={{ fontFamily: 'var(--es-font-script)', fontStyle: 'italic', color: 'var(--es-wine)', fontWeight: 300 }}>{w.name.replace('Karaba ','')}</span>
            </h1>
            <div style={{ marginTop: 32, display: 'flex', gap: 40, paddingBottom: 28, borderBottom: '1px solid var(--es-border)', flexWrap: 'wrap' }}>
              {[
                { l: lang==='hr'?'Berba':'Vintage', v: w.year },
                { l: lang==='hr'?'Alkohol':'ABV', v: w.abv + '%' },
                { l: lang==='hr'?'Volumen':'Volume', v: '0,75 L' },
                { l: lang==='hr'?'Cijena':'Price', v: w.price + ' €' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="es-caption">{s.l}</div>
                  <div style={{ fontFamily: 'var(--es-font-display)', fontStyle: 'italic', fontSize: 26, color: 'var(--es-ink)', marginTop: 6, fontWeight: 400 }}>{s.v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32 }}>
              <div className="es-eyebrow-gold">{lang==='hr'?'Note':'Tasting notes'}</div>
              <p className="es-body" style={{ marginTop: 12, fontSize: 17, lineHeight: 1.75 }}>{w.notes[lang]}</p>
            </div>
            <div style={{ marginTop: 28 }}>
              <div className="es-eyebrow-gold">{lang==='hr'?'Uz hranu':'Food pairing'}</div>
              <p className="es-body" style={{ marginTop: 12 }}>{w.food[lang]}</p>
            </div>
            <div style={{ marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <window.AddToCartBtn item={{ id: w.id, name: w.name, price: w.price, category: 'wine' }} style={{ width: 48, height: 48, borderRadius: 0 }} />
              <a href="#" onClick={(e)=>{e.preventDefault(); setPage('contact');}} className="es-btn es-btn-primary">
                {t('wine_buy')}
              </a>
              <a href="#" onClick={(e)=>{e.preventDefault(); setPage('catalog');}} className="es-btn es-btn-ghost">
                {lang==='hr'?'Druga vina':'Other wines'}
              </a>
            </div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 900px) { .es-product-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
        `}} />
      </section>
    </>
  );
}

window.CatalogPage = CatalogPage;
window.ProductPage = ProductPage;
