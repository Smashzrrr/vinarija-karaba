// Navbar + Footer — Karaba
const { useContext: useCtxN, useState: useStN, useEffect: useEfN } = React;

function Navbar() {
  const { lang, t, setLang } = useCtxN(window.LangContext);
  const { page, setPage } = useCtxN(window.PageContext);
  const [scrolled, setScrolled] = useStN(false);
  const [menuOpen, setMenuOpen] = useStN(false);

  useEfN(() => {
    const h = () => setScrolled(window.scrollY > 40);
    h();
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEfN(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = [
    { id: 'wines',    label: t('nav_wine'),      page: 'home' },
    { id: 'fields',   label: t('nav_vineyards'), page: 'home' },
    { id: 'cellar',   label: t('nav_cellar'),    page: 'home' },
    { id: 'visit',    label: t('nav_visit'),     page: 'home' },
    { id: 'news',     label: t('nav_news'),      page: 'home' },
    { id: 'contact',  label: t('nav_contact'),   page: 'home' },
  ];

  const hero = !scrolled && page === 'home';

  const handleNavClick = (item) => {
    setMenuOpen(false);
    setPage(item.page, item.page === 'home' ? item.id : null);
  };

  return (
    <>
      <header role="navigation" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, padding: hero ? '18px 32px 0' : '10px 32px 0', transition: 'all 0.4s ease' }}>
        <div style={{
          maxWidth: 1400, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: hero ? 92 : 76,
          padding: '0 8px',
          transition: 'all 0.4s ease',
          background: hero ? 'transparent' : 'rgba(20, 16, 12, 0.88)',
          backdropFilter: hero ? 'none' : 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: hero ? 'none' : 'blur(20px) saturate(140%)',
          borderBottom: hero ? '1px solid transparent' : '1px solid rgba(239,230,206,0.08)',
        }}>
          <a href="#home" onClick={(e)=>{e.preventDefault(); setMenuOpen(false); setPage('home');}} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <window.Logo size={hero ? 18 : 15} dark />
          </a>

          <nav className="es-nav-links" style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            {navItems.filter(i => i.id !== 'contact').map(item => (
              <a key={item.id} href={`#${item.id}`}
                onClick={(e)=>{e.preventDefault(); handleNavClick(item);}}
                style={{
                  fontFamily: 'var(--es-font-mono)',
                  fontSize: 11,
                  fontWeight: 500,
                  color: 'rgba(239,230,206,0.85)',
                  textDecoration: 'none',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  transition: 'color 0.25s',
                }}
                onMouseOver={e => e.currentTarget.style.color = 'var(--es-gold-light)'}
                onMouseOut={e => e.currentTarget.style.color = 'rgba(239,230,206,0.85)'}
              >{item.label}</a>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="es-lang-toggle-desktop" style={{
              display: 'inline-flex',
              fontFamily: 'var(--es-font-mono)',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.14em',
            }}>
              {['hr','en'].map((l, i) => (
                <React.Fragment key={l}>
                  {i > 0 && <span style={{ color: 'rgba(239,230,206,0.35)', padding: '0 6px' }}>·</span>}
                  <button onClick={()=>setLang(l)} style={{
                    padding: 0,
                    border: 'none',
                    cursor: 'pointer',
                    background: 'transparent',
                    color: lang === l ? 'var(--es-gold-light)' : 'rgba(239,230,206,0.55)',
                    transition: 'color 0.2s',
                  }}>{l.toUpperCase()}</button>
                </React.Fragment>
              ))}
            </div>
            <a href="#contact" onClick={(e)=>{e.preventDefault(); setPage('home','contact');}}
              className="es-cta-desktop"
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '10px 22px',
                background: 'transparent',
                border: '1px solid rgba(239,230,206,0.35)',
                color: 'var(--es-cream)',
                fontFamily: 'var(--es-font-mono)', fontSize: 11, letterSpacing: '0.22em', fontWeight: 500,
                textTransform: 'uppercase', textDecoration: 'none',
                transition: 'all 0.3s',
              }}
              onMouseOver={e => { e.currentTarget.style.background = 'var(--es-gold)'; e.currentTarget.style.borderColor = 'var(--es-gold)'; e.currentTarget.style.color = 'var(--es-ink)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(239,230,206,0.35)'; e.currentTarget.style.color = 'var(--es-cream)'; }}
            >{t('cta_order')}</a>
            <button
              onClick={()=>setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="es-mobile-btn"
              style={{
                display: 'none', width: 40, height: 40,
                border: '1px solid rgba(239,230,206,0.3)', background: 'transparent', cursor: 'pointer',
                alignItems: 'center', justifyContent: 'center',
              }}>
              <window.Icon name={menuOpen ? 'x' : 'menu'} size={18} color="var(--es-cream)" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          background: 'rgba(12, 8, 6, 0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          display: 'flex', flexDirection: 'column',
          animation: 'esMobileDrawerIn 0.4s ease both',
          overflowY: 'auto',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 32px 0' }}>
            <window.Logo size={14} dark />
            <button onClick={()=>setMenuOpen(false)} aria-label="Close menu" style={{
              width: 44, height: 44,
              border: '1px solid rgba(239,230,206,0.2)', background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <window.Icon name="x" size={20} color="var(--es-cream)" />
            </button>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, padding: '40px 32px' }}>
            {navItems.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(item); }}
                style={{
                  fontFamily: 'var(--es-font-display)',
                  fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'var(--es-cream)',
                  textDecoration: 'none',
                  textAlign: 'center',
                  letterSpacing: '-0.015em',
                  padding: '8px 0',
                  transition: 'color 0.2s',
                  animation: `esMobileStagger 0.4s ${0.08 + i * 0.05}s both`,
                }}
                onMouseOver={e => { e.currentTarget.style.color = 'var(--es-gold-light)'; }}
                onMouseOut={e => { e.currentTarget.style.color = 'var(--es-cream)'; }}
              >{item.label}</a>
            ))}
          </div>

          <div style={{ padding: '0 32px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, animation: `esMobileStagger 0.4s ${0.08 + navItems.length * 0.05}s both` }}>
            <div style={{ display: 'inline-flex', gap: 8, fontFamily: 'var(--es-font-mono)', fontSize: 12, letterSpacing: '0.22em' }}>
              {['hr','en'].map(l => (
                <button key={l} onClick={()=>setLang(l)} style={{
                  padding: '8px 18px',
                  border: '1px solid rgba(239,230,206,0.18)',
                  cursor: 'pointer',
                  background: lang === l ? 'var(--es-gold)' : 'transparent',
                  color: lang === l ? 'var(--es-ink)' : 'rgba(239,230,206,0.6)',
                  transition: 'all 0.2s',
                }}>{l.toUpperCase()}</button>
              ))}
            </div>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); setMenuOpen(false); setPage('home','contact'); }}
              className="es-btn es-btn-gold"
              style={{ width: '100%', maxWidth: 320, justifyContent: 'center' }}
            >{t('cta_order')}</a>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 960px) {
          .es-nav-links { display: none !important; }
          .es-mobile-btn { display: inline-flex !important; }
          .es-cta-desktop { display: none !important; }
          .es-lang-toggle-desktop { display: none !important; }
        }
        @keyframes esMobileDrawerIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes esMobileStagger { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </>
  );
}

function Footer() {
  const { t, lang, setLang } = useCtxN(window.LangContext);
  const { setPage } = useCtxN(window.PageContext);
  const renderP = (key) => {
    const raw = t(key);
    const parts = raw.split(/\*\*(.+?)\*\*/g);
    return parts.map((p, i) => i % 2 === 1
      ? <strong key={i} style={{ color: 'var(--es-gold-light)', fontWeight: 400, fontFamily: 'var(--es-font-script)', fontStyle: 'italic', fontSize: '1.15em' }}>{p}</strong>
      : <React.Fragment key={i}>{p}</React.Fragment>
    );
  };
  return (
    <footer style={{ background: 'var(--es-bg-dark)', color: 'var(--es-cream)', padding: '112px 24px 40px', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(239,230,206,0.08)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 60, marginBottom: 80 }} className="es-footer-grid">
          <div>
            <window.Logo size={20} dark />
            <p style={{ marginTop: 26, maxWidth: 360, fontFamily: 'var(--es-font-body)', fontStyle: 'italic', fontSize: 16, lineHeight: 1.7, color: 'rgba(239,230,206,0.7)' }}>
              {t('footer_tagline')}
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 32 }}>
              {['instagram','facebook'].map(s => (
                <a key={s} href="#" aria-label={s} style={{
                  width: 40, height: 40,
                  border: '1px solid rgba(239,230,206,0.16)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(239,230,206,0.7)', textDecoration: 'none',
                  transition: 'all 0.25s',
                }}
                onMouseOver={e => { e.currentTarget.style.background = 'var(--es-gold)'; e.currentTarget.style.color = 'var(--es-ink)'; e.currentTarget.style.borderColor = 'var(--es-gold)'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(239,230,206,0.7)'; e.currentTarget.style.borderColor = 'rgba(239,230,206,0.16)'; }}
                >
                  <window.Icon name={s} size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--es-font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--es-gold)', marginBottom: 22 }}>
              {t('footer_nav')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[['home','nav_home'],['wines','nav_wine'],['fields','nav_vineyards'],['cellar','nav_cellar'],['visit','nav_visit']].map(([id,k]) => (
                <a key={id} href={`#${id}`} onClick={(e)=>{e.preventDefault(); setPage('home', id === 'home' ? null : id);}}
                  style={{ fontSize: 13.5, color: 'rgba(239,230,206,0.72)', textDecoration: 'none', fontFamily: 'var(--es-font-ui)' }}>
                  {t(k)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--es-font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--es-gold)', marginBottom: 22 }}>
              {t('footer_contact')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontFamily: 'var(--es-font-ui)', fontSize: 13.5, color: 'rgba(239,230,206,0.72)', lineHeight: 1.65 }}>
              <div>{lang==='hr'?'Dalmacija, Hrvatska':'Dalmatia, Croatia'}</div>
              <a href="tel:+385910000000" style={{ color: 'rgba(239,230,206,0.88)', textDecoration: 'none' }}>+385 91 000 0000</a>
              <a href="mailto:info@vinarijakaraba.hr" style={{ color: 'rgba(239,230,206,0.88)', textDecoration: 'none' }}>info@vinarijakaraba.hr</a>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--es-font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--es-gold)', marginBottom: 22 }}>
              {lang==='hr' ? 'RADNO VRIJEME' : 'HOURS'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'var(--es-font-ui)', fontSize: 13.5, color: 'rgba(239,230,206,0.72)', lineHeight: 1.6 }}>
              <div>{lang==='hr' ? 'Pon–Pet' : 'Mon–Fri'}  &nbsp; 09:00 – 18:00</div>
              <div>{lang==='hr' ? 'Subota' : 'Saturday'}  &nbsp; 10:00 – 14:00</div>
              <div>{lang==='hr' ? 'Nedjelja' : 'Sunday'}  &nbsp; {lang==='hr' ? 'po dogovoru' : 'by appointment'}</div>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 32, borderTop: '1px solid rgba(239,230,206,0.1)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, fontFamily: 'var(--es-font-mono)', fontSize: 10.5, color: 'rgba(239,230,206,0.5)', letterSpacing: '0.18em' }}>
          <div>{t('footer_rights')}</div>
          <div>{t('footer_builtby')}</div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 820px) {
          .es-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 500px) {
          .es-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </footer>
  );
}

window.Navbar = Navbar;
window.Footer = Footer;
