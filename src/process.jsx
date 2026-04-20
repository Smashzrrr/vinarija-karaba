// Process Section — "Od loze do boce" wine timeline (Karaba)
const { useContext: useCtxPr } = React;

const PROCESS_STEPS = [
  { icon: 'scissors', title: { hr: 'Rezidba',      en: 'Pruning' },      time: { hr: 'siječanj–veljača', en: 'January–February' },
    desc: { hr: 'Kratki rez, niska formacija. Koncentracija prije količine.', en: 'Short cuts, low canopy. Concentration before quantity.' },
    photo: 'assets/photos/rezidba-vinove-loze.jpg' },
  { icon: 'sun',      title: { hr: 'Berba',        en: 'Harvest' },      time: { hr: 'rujan',            en: 'September' },
    desc: { hr: 'Ručno, u zoru, dok je grožđe hladno i čvrsto.', en: 'By hand, at dawn, while the grapes are cool and firm.' },
    photo: 'assets/photos/branje-grozda-karaba.jpg' },
  { icon: 'check',    title: { hr: 'Sortiranje',   en: 'Sorting' },      time: { hr: '', en: '' },
    desc: { hr: 'Svako zrno prolazi kroz ruke prije ulaska u podrum.', en: 'Every berry passes through hands before entering the cellar.' },
    photo: 'assets/photos/Sortiranje-grozdja-800x449.jpg' },
  { icon: 'droplet',  title: { hr: 'Fermentacija', en: 'Fermentation' }, time: { hr: '', en: '' },
    desc: { hr: 'Kontrolirana temperatura, autohtoni kvasci, bez žurbe.', en: 'Controlled temperature, native yeasts, no haste.' },
    photo: 'assets/photos/tocenje-vina-iz-bacve.jpg' },
  { icon: 'diamond',  title: { hr: 'Starenje',     en: 'Ageing' },       time: { hr: '12 – 24 mjeseca', en: '12 – 24 months' },
    desc: { hr: 'Francuski barrique, mirno disanje hrasta.', en: 'French barrique, the quiet breath of oak.' },
    photo: 'assets/photos/drvene-bacve-karaba.jpg' },
  { icon: 'book-open', title: { hr: 'Punjenje',    en: 'Bottling' },     time: { hr: '', en: '' },
    desc: { hr: 'Ručno etiketiranje, mala serija, brojevna boca.', en: 'Hand-labelled, small batch, numbered bottles.' },
    photo: 'assets/photos/karaba-vina.jpg' },
];

function ProcessSection() {
  const { t, lang } = useCtxPr(window.LangContext);

  return (
    <window.Section id="cellar" bg="paper" pt={144} pb={144} data-screen-label="04 Home · Cellar">
      <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 88px' }}>
        <window.Reveal>
          <div className="es-eyebrow" style={{ marginBottom: 18 }}>{t('cellar_eyebrow')}</div>
          <h2 className="es-h1" style={{ margin: 0 }}>
            <span>{lang === 'hr' ? 'Svaki korak, ' : 'Every step, '}</span>
            <span style={{ fontFamily: 'var(--es-font-script)', fontStyle: 'italic', color: 'var(--es-wine)', fontWeight: 300 }}>
              {lang === 'hr' ? 'ručno.' : 'by hand.'}
            </span>
          </h2>
        </window.Reveal>
      </div>

      <div style={{ position: 'relative', maxWidth: 1000, margin: '0 auto' }}>
        <div className="es-process-line" style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1,
          background: 'var(--es-border-strong)', transform: 'translateX(-50%)',
        }} />

        {PROCESS_STEPS.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <window.Reveal key={i} delay={i * 0.08}>
              <div className="es-process-step" style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gap: 40,
                marginBottom: i < PROCESS_STEPS.length - 1 ? 56 : 0,
                alignItems: 'center',
              }}>
                <div className="es-process-left" style={{ textAlign: isLeft ? 'right' : 'left', order: isLeft ? 0 : 2 }}>
                  {isLeft ? (
                    <div style={{ padding: '0 32px 0 0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'flex-end' }}>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontFamily: 'var(--es-font-display)', fontStyle: 'italic', fontSize: 22, fontWeight: 400, color: 'var(--es-text)' }}>{step.title[lang]}</div>
                          {step.time[lang] && <div className="es-caption" style={{ marginTop: 4 }}>{step.time[lang]}</div>}
                        </div>
                        <div style={{
                          width: 40, height: 40, borderRadius: 9999,
                          background: 'var(--es-wine-wash)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <window.Icon name={step.icon} size={17} color="var(--es-wine)" />
                        </div>
                      </div>
                      <p className="es-body-sm" style={{ marginTop: 10, marginBottom: 0 }}>{step.desc[lang]}</p>
                    </div>
                  ) : (
                    <div style={{ overflow: 'hidden', borderRadius: 4 }}>
                      <img src={step.photo} alt={step.title[lang]} loading="lazy" style={{ width: '100%', aspectRatio: '5/3', objectFit: 'cover', display: 'block' }} />
                    </div>
                  )}
                </div>

                <div className="es-process-dot" style={{
                  width: 14, height: 14, borderRadius: 9999,
                  background: 'var(--es-wine)', border: '3px solid var(--es-paper)',
                  boxShadow: '0 0 0 1px var(--es-wine)',
                  position: 'relative', zIndex: 2, flexShrink: 0,
                }} />

                <div className="es-process-right" style={{ order: isLeft ? 2 : 0, textAlign: isLeft ? 'left' : 'right' }}>
                  {isLeft ? (
                    <div style={{ overflow: 'hidden', borderRadius: 4 }}>
                      <img src={step.photo} alt={step.title[lang]} loading="lazy" style={{ width: '100%', aspectRatio: '5/3', objectFit: 'cover', display: 'block' }} />
                    </div>
                  ) : (
                    <div style={{ padding: '0 0 0 32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 9999,
                          background: 'var(--es-wine-wash)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <window.Icon name={step.icon} size={17} color="var(--es-wine)" />
                        </div>
                        <div>
                          <div style={{ fontFamily: 'var(--es-font-display)', fontStyle: 'italic', fontSize: 22, fontWeight: 400, color: 'var(--es-text)' }}>{step.title[lang]}</div>
                          {step.time[lang] && <div className="es-caption" style={{ marginTop: 4 }}>{step.time[lang]}</div>}
                        </div>
                      </div>
                      <p className="es-body-sm" style={{ marginTop: 10, marginBottom: 0 }}>{step.desc[lang]}</p>
                    </div>
                  )}
                </div>
              </div>
            </window.Reveal>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .es-process-step { grid-template-columns: auto 1fr !important; gap: 18px !important; }
          .es-process-left { display: none !important; }
          .es-process-right { order: 1 !important; text-align: left !important; }
          .es-process-right > div { padding: 0 !important; }
          .es-process-line { left: 7px !important; transform: none !important; }
          .es-process-dot { order: 0 !important; }
        }
      `}} />
    </window.Section>
  );
}

window.ProcessSection = ProcessSection;
