// Visual atoms — placeholder imagery, labels, logo
const { useContext: useCtxA, useCallback: useCbA } = React;

// Logo — Karaba brand mark (transparent full logo PNG)
function Logo({ size = 22, variant = 'horizontal', dark = false }) {
  const fullSrc = dark ? 'assets/logo-full-cream-removebg-preview.png' : 'assets/logo-full-removebg-preview.png';
  const iconSrc = dark ? 'assets/logo-icon-cream.png' : 'assets/logo-icon-only.png';
  // Full logo already contains the wordmark — render as single image.
  if (variant === 'icon') {
    return <img src={iconSrc} alt="Karaba" style={{ height: size * 2.2, width: 'auto', display: 'block' }} />;
  }
  if (variant === 'stack') {
    return <img src={fullSrc} alt="Karaba" style={{ height: size * 4.4, width: 'auto', display: 'block' }} />;
  }
  return <img src={fullSrc} alt="Karaba" style={{ height: size * 4.0, width: 'auto', display: 'block' }} />;
}

// Ornamental divider — hairline with small glyph
function Ornament({ glyph = 'leaf', color = 'var(--es-gold)', width = 180 }) {
  const glyphs = {
    leaf: <path d="M8 1 Q14 4 13.5 8 Q8 12 3 8 Q2.5 4 8 1 M8 1 L8 12" stroke={color} strokeWidth="0.8" fill="none" strokeLinecap="round" />,
    diamond: <path d="M8 1 L14 7 L8 13 L2 7 Z" stroke={color} strokeWidth="0.8" fill="none" />,
    sun: <g stroke={color} strokeWidth="0.8" fill="none"><circle cx="8" cy="7" r="3" /><line x1="8" y1="1" x2="8" y2="3" /><line x1="8" y1="11" x2="8" y2="13" /><line x1="2" y1="7" x2="4" y2="7" /><line x1="12" y1="7" x2="14" y2="7" /></g>,
    grape: <g fill={color} opacity="0.8"><circle cx="8" cy="3" r="1.2" /><circle cx="6" cy="5.5" r="1.2" /><circle cx="10" cy="5.5" r="1.2" /><circle cx="8" cy="8" r="1.2" /><circle cx="5" cy="8" r="1.2" /><circle cx="11" cy="8" r="1.2" /><circle cx="8" cy="11" r="1.2" /></g>,
  };
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, width }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${color}55, ${color}55)` }} />
      <svg width="16" height="14" viewBox="0 0 16 14">{glyphs[glyph]}</svg>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}55, ${color}55, transparent)` }} />
    </div>
  );
}

// Placeholder image — labeled scene frame with tonal gradient.
// Each scene has its own warm palette so the mock actually reads.
const SCENES = {
  'vineyard-golden': { grad: 'linear-gradient(165deg, #D9A35B 0%, #A8823D 40%, #5B6B3A 100%)', icon: 'sun', label: 'VINOGRAD · ZALAZAK' },
  'vineyard-rows':   { grad: 'linear-gradient(180deg, #7B8B4E 0%, #5B6B3A 55%, #3F4C27 100%)', icon: 'grape', label: 'REDOVI LOZE' },
  'olive-grove':     { grad: 'linear-gradient(170deg, #A4A876 0%, #6B7A48 60%, #3F4C27 100%)', icon: 'leaf', label: 'MASLINIK' },
  'fig-tree':        { grad: 'linear-gradient(160deg, #B35933 0%, #8A4022 50%, #5B3518 100%)', icon: 'leaf', label: 'SMOKVA' },
  'cellar':          { grad: 'linear-gradient(180deg, #3A2E1F 0%, #241C12 100%)', icon: 'diamond', label: 'PODRUM' },
  'bottle-hero':     { grad: 'linear-gradient(170deg, #6E2428 0%, #4A1619 50%, #2B1114 100%)', icon: 'grape', label: 'ESENCIJA CUVÉE' },
  'bottle-white':    { grad: 'linear-gradient(170deg, #D9CFA8 0%, #A8A07E 60%, #6B6348 100%)', icon: 'grape', label: 'PJENUŠAC' },
  'bottle-rose':     { grad: 'linear-gradient(170deg, #E6B8A8 0%, #C48878 55%, #8A5848 100%)', icon: 'grape', label: 'ROSÉ' },
  'bottle-red':      { grad: 'linear-gradient(170deg, #8A3640 0%, #5A1F24 55%, #2F1013 100%)', icon: 'grape', label: 'CRVENO VINO' },
  'oil-bottle':      { grad: 'linear-gradient(170deg, #A4A876 0%, #6B7A48 55%, #3F4C27 100%)', icon: 'leaf', label: 'MASLINOVO ULJE' },
  'figs-dried':      { grad: 'linear-gradient(170deg, #C89F5B 0%, #8A6838 55%, #4A3820 100%)', icon: 'leaf', label: 'SUHE SMOKVE' },
  'fig-jam':         { grad: 'linear-gradient(170deg, #B35933 0%, #6E2428 100%)', icon: 'leaf', label: 'DŽEM OD SMOKVE' },
  'fig-brandy':      { grad: 'linear-gradient(170deg, #D9B07E 0%, #A8823D 100%)', icon: 'leaf', label: 'SMOKOVAČA' },
  'family-portrait': { grad: 'linear-gradient(170deg, #8A7048 0%, #5B4828 60%, #2B2419 100%)', icon: 'sun', label: 'OBITELJ BOBANOVIĆ' },
  'land-aerial':     { grad: 'linear-gradient(165deg, #D9A35B 0%, #8A9B68 40%, #5B6B3A 100%)', icon: 'sun', label: 'POLAČA · IZ ZRAKA' },
  'hand-harvest':    { grad: 'linear-gradient(170deg, #C89F5B 0%, #8A6838 60%, #2B2419 100%)', icon: 'leaf', label: 'RUČNA BERBA' },
  'stone-cellar':    { grad: 'linear-gradient(165deg, #6B5E48 0%, #3F2E1C 55%, #1F1810 100%)', icon: 'diamond', label: 'KAMENI PODRUM' },
  'tasting-table':   { grad: 'linear-gradient(170deg, #A88860 0%, #6E4828 55%, #3A2410 100%)', icon: 'grape', label: 'DEGUSTACIJA' },
  'press':           { grad: 'linear-gradient(170deg, #8A7048 0%, #3F2E1C 100%)', icon: 'sun', label: 'UTOKANJE ULJA' },
  'barrels':         { grad: 'linear-gradient(170deg, #8A4022 0%, #4A1C10 100%)', icon: 'grape', label: 'BAČVE' },
};

function PlaceholderImage({ scene = 'vineyard-golden', src, aspect = '4/3', radius = 20, label: labelOverride, caption, children, hideLabel = false, objectPosition = 'center' }) {
  const s = SCENES[scene] || SCENES['vineyard-golden'];
  const label = labelOverride || s.label;
  const hasPhoto = !!src;
  return (
    <div style={{
      position: 'relative',
      aspectRatio: aspect,
      borderRadius: radius,
      overflow: 'hidden',
      background: s.grad,
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 22px 50px -28px rgba(43,36,25,0.35)',
    }}>
      {hasPhoto && (
        <img src={src} alt={label} loading="lazy" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition,
        }} />
      )}
      {/* film grain — only on placeholder gradient, not on real photos */}
      {!hasPhoto && <>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(255,250,230,0.22), transparent 55%), radial-gradient(circle at 70% 90%, rgba(0,0,0,0.35), transparent 60%)',
          mixBlendMode: 'overlay',
        }} />
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.18,
          backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
          mixBlendMode: 'overlay',
        }} />
      </>}
      {/* caption at bottom-left */}
      {!hideLabel && (
        <div style={{
          position: 'absolute', left: 20, bottom: 16, right: 20,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, letterSpacing: '0.22em', color: 'rgba(250,245,230,0.92)',
          textTransform: 'uppercase',
          textShadow: hasPhoto ? '0 1px 4px rgba(0,0,0,0.6)' : '0 1px 2px rgba(0,0,0,0.4)',
        }}>
          <span style={{ maxWidth: '70%' }}>{label}</span>
          {caption && <span>{caption}</span>}
        </div>
      )}
      {children && <div style={{ position: 'absolute', inset: 0 }}>{children}</div>}
    </div>
  );
}

// Section wrapper — consistent vertical rhythm
function Section({ id, bg = 'cream', children, style = {}, pt = 96, pb = 96, 'data-screen-label': dsl }) {
  const bgs = {
    cream: { background: 'var(--es-bg-cream)', color: 'var(--es-ink)' },
    paper: { background: 'var(--es-bg-paper)', color: 'var(--es-ink)' },
    dark:  { background: 'var(--es-bg-dark)',  color: 'var(--es-cream-soft)' },
    olive: { background: 'var(--es-bg-olive)', color: 'var(--es-cream-soft)' },
    wine:  { background: 'var(--es-bg-wine)',  color: 'var(--es-cream-soft)' },
  };
  return (
    <section id={id} data-screen-label={dsl} style={{ position: 'relative', padding: `${pt}px 24px ${pb}px`, ...bgs[bg], ...style }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        {children}
      </div>
    </section>
  );
}

// Fade/slide-in on intersection — ENHANCED with scale, better easing, stagger
function Reveal({ children, delay = 0, y = 20, scale: useScale = false }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setVisible(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dur = prefersReduced ? '0s' : '0.85s';
  const scaleVal = useScale ? (visible ? 'scale(1)' : 'scale(0.96)') : '';
  return (
    <div ref={ref} style={{
      transform: visible ? `translateY(0) ${scaleVal}` : `translateY(${y}px) ${useScale ? 'scale(0.96)' : ''}`,
      opacity: visible ? 1 : 0,
      transition: `transform ${dur} cubic-bezier(0.16,1,0.3,1) ${delay}s, opacity ${dur} ease ${delay}s`,
    }}>{children}</div>
  );
}

// 3D tilt card wrapper for hover effect
function TiltCard({ children, style = {}, className = '', glowColor }) {
  const ref = useRef(null);
  const handleMouseMove = useCbA((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    if (glowColor) {
      el.style.boxShadow = `0 36px 80px -42px ${glowColor}44, 0 8px 24px -8px ${glowColor}22`;
    }
  }, [glowColor]);
  const handleMouseLeave = useCbA(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
    el.style.boxShadow = '';
  }, []);
  return (
    <div ref={ref} className={className} style={{ ...style, transition: 'transform 0.4s ease, box-shadow 0.4s ease' }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
}

// Animated count-up component for stat numbers
function CountUp({ end, suffix = '', duration = 1.5 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState('0');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setDisplay(end + suffix); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        setStarted(true);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    // Parse numeric part
    const numStr = String(end).replace(/[^0-9.]/g, '');
    const numEnd = parseFloat(numStr) || 0;
    const hasSuffix2 = String(end).replace(numStr, '');
    const startTime = performance.now();
    const dur = duration * 1000;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / dur, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentNum = Math.round(eased * numEnd);
      setDisplay(currentNum + hasSuffix2 + suffix);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started]);

  return <span ref={ref}>{display}</span>;
}

// Floating animation wrapper
function FloatAnim({ children, offset = 6, duration = 4 }) {
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return <>{children}</>;
  return (
    <div style={{
      animation: `esFloatUpDown ${duration}s ease-in-out infinite`,
    }}>
      {children}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes esFloatUpDown { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-${offset}px); } }
      `}} />
    </div>
  );
}

// Simple icon set (lucide-like)
function Icon({ name, size = 18, color = 'currentColor', stroke = 1.6 }) {
  const paths = {
    'arrow-right': 'M5 12h14M13 6l6 6-6 6',
    'arrow-left': 'M19 12H5M11 18l-6-6 6-6',
    'chevron-down': 'M6 9l6 6 6-6',
    'chevron-right': 'M9 6l6 6-6 6',
    'menu': 'M4 6h16M4 12h16M4 18h16',
    'x': 'M6 6l12 12M18 6L6 18',
    'phone': 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z',
    'mail': 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 0l8 8 8-8',
    'map-pin': 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z',
    'instagram': 'M2 6a4 4 0 014-4h12a4 4 0 014 4v12a4 4 0 01-4 4H6a4 4 0 01-4-4V6zm5 6a5 5 0 1010 0 5 5 0 00-10 0zm11-7.5a1 1 0 100 2 1 1 0 000-2z',
    'facebook': 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
    'star': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    'award': 'M12 15a7 7 0 100-14 7 7 0 000 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12',
    'leaf': 'M6 20c6-10 12-10 18-10 0 6-4 14-14 14-4 0-4-4-4-4zM6 20l10-10',
    'grape': 'M12 3c0 3-2 4-5 4s-5 1-5 4 3 5 5 5 3-2 5-2 3 2 5 2 5-2 5-5-2-4-5-4-5-1-5-4z',
    'sun': 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41M12 7a5 5 0 100 10 5 5 0 000-10z',
    'droplet': 'M12 2s6 7 6 12a6 6 0 01-12 0c0-5 6-12 6-12z',
    'clock': 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2',
    'users': 'M17 20v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 20v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 11a4 4 0 100-8 4 4 0 000 8z',
    'calendar': 'M3 4h18v18H3zM3 10h18M8 2v4M16 2v4',
    'check': 'M20 6L9 17l-5-5',
    'book-open': 'M2 3h7a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-7a4 4 0 00-4 4v14a3 3 0 013-3h8z',
    'external': 'M15 3h6v6M10 14L21 3M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5',
    'minus': 'M5 12h14',
    'plus': 'M12 5v14M5 12h14',
    'scissors': 'M6 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zM20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12',
    'diamond': 'M12 2L2 12l10 10 10-10L12 2z',
    'shopping-cart': 'M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2z',
    'trash': 'M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6',
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d={paths[name] || paths['leaf']} />
    </svg>
  );
}

// Little bottle SVG for wine cards — visual anchor w/o real photography
function BottleSVG({ color = '#6E2428', label = 'E', year, variant = 'wine' }) {
  const isMagnum = variant === 'magnum';
  const w = isMagnum ? 90 : 72;
  const h = 280;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      {/* bottle body */}
      <defs>
        <linearGradient id={`bg-${label}-${color.replace('#','')}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={color} stopOpacity="0.72" />
          <stop offset="0.5" stopColor={color} stopOpacity="1" />
          <stop offset="1" stopColor={color} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path d={`
        M${w/2 - 7} 10
        L${w/2 - 7} 60
        Q${w/2 - 7} 80 ${w/2 - (isMagnum ? 32 : 25)} 100
        Q${w/2 - (isMagnum ? 34 : 27)} 115 ${w/2 - (isMagnum ? 34 : 27)} 135
        L${w/2 - (isMagnum ? 34 : 27)} 260
        Q${w/2 - (isMagnum ? 34 : 27)} 272 ${w/2 - (isMagnum ? 24 : 18)} 272
        L${w/2 + (isMagnum ? 24 : 18)} 272
        Q${w/2 + (isMagnum ? 34 : 27)} 272 ${w/2 + (isMagnum ? 34 : 27)} 260
        L${w/2 + (isMagnum ? 34 : 27)} 135
        Q${w/2 + (isMagnum ? 34 : 27)} 115 ${w/2 + (isMagnum ? 32 : 25)} 100
        Q${w/2 + 7} 80 ${w/2 + 7} 60
        L${w/2 + 7} 10 Z
      `} fill={`url(#bg-${label}-${color.replace('#','')})`} />
      {/* capsule */}
      <rect x={w/2 - 8} y="0" width="16" height="18" fill="#1B1410" rx="2" />
      {/* label */}
      <rect x={w/2 - (isMagnum ? 28 : 22)} y="150" width={isMagnum ? 56 : 44} height={isMagnum ? 90 : 75} fill="#EFE6CE" opacity="0.96" />
      <rect x={w/2 - (isMagnum ? 28 : 22)} y="150" width={isMagnum ? 56 : 44} height={isMagnum ? 90 : 75} fill="none" stroke="#14100C" strokeWidth="0.4" opacity="0.3" />
      <text x={w/2} y="170" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="6" fill="#5C1A1F" letterSpacing="2.5">KARABA</text>
      <line x1={w/2 - 14} y1="175" x2={w/2 + 14} y2="175" stroke="#B8985A" strokeWidth="0.5" />
      <text x={w/2} y="195" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize={isMagnum ? 18 : 15} fill="#14100C" fontWeight="400" fontStyle="italic">{label}</text>
      {year && <text x={w/2} y={isMagnum ? 230 : 218} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="5" fill="#6E5F48" letterSpacing="1.5">{year}</text>}
    </svg>
  );
}

// Oil bottle
function OilBottleSVG() {
  return (
    <svg width="70" height="260" viewBox="0 0 70 260" fill="none">
      <defs>
        <linearGradient id="og" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5B6B3A" stopOpacity="0.7"/>
          <stop offset="0.5" stopColor="#5B6B3A" stopOpacity="1"/>
          <stop offset="1" stopColor="#5B6B3A" stopOpacity="0.55"/>
        </linearGradient>
      </defs>
      <path d="M31 4 L31 50 Q31 60 26 70 Q20 85 20 100 L20 240 Q20 252 28 252 L42 252 Q50 252 50 240 L50 100 Q50 85 44 70 Q39 60 39 50 L39 4 Z" fill="url(#og)"/>
      <rect x="28" y="-2" width="14" height="16" fill="#2B2419" rx="1"/>
      <rect x="20" y="135" width="30" height="90" fill="#F5EFE0" opacity="0.96"/>
      <text x="35" y="155" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="4.5" fill="#5B6B3A" letterSpacing="1.5">ESENCIJA</text>
      <line x1="25" y1="160" x2="45" y2="160" stroke="#C89F5B" strokeWidth="0.4"/>
      <text x="35" y="180" textAnchor="middle" fontFamily="'BookerlyDisplay', Georgia, serif" fontSize="10" fill="#2B2419">Ulje</text>
      <text x="35" y="200" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="4" fill="#6B5E48" letterSpacing="1.2">EKSTRA DJEV.</text>
      <text x="35" y="218" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="3.8" fill="#6B5E48" letterSpacing="1">500 ML</text>
    </svg>
  );
}

// Jar for fig products
function JarSVG({ label = 'Džem', color = '#B35933' }) {
  return (
    <svg width="80" height="240" viewBox="0 0 80 240" fill="none">
      <rect x="20" y="10" width="40" height="16" fill="#3F2E1C" rx="1"/>
      <rect x="18" y="24" width="44" height="4" fill="#C89F5B"/>
      <rect x="15" y="28" width="50" height="200" fill={color} rx="4"/>
      <rect x="15" y="28" width="50" height="200" fill="url(#jarShine)" rx="4"/>
      <defs>
        <linearGradient id="jarShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.25"/>
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0"/>
          <stop offset="1" stopColor="#000000" stopOpacity="0.2"/>
        </linearGradient>
      </defs>
      <rect x="20" y="90" width="40" height="100" fill="#F5EFE0" opacity="0.95"/>
      <text x="40" y="110" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="5" fill={color} letterSpacing="1.6">ESENCIJA</text>
      <line x1="28" y1="116" x2="52" y2="116" stroke="#C89F5B" strokeWidth="0.4"/>
      <text x="40" y="140" textAnchor="middle" fontFamily="'BookerlyDisplay', Georgia, serif" fontSize="11" fill="#2B2419">{label}</text>
      <text x="40" y="170" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="4" fill="#6B5E48" letterSpacing="1.2">RUČNO RAĐENO</text>
    </svg>
  );
}

window.Logo = Logo;
window.Ornament = Ornament;
window.PlaceholderImage = PlaceholderImage;
window.Section = Section;
window.Reveal = Reveal;
window.TiltCard = TiltCard;
window.CountUp = CountUp;
window.FloatAnim = FloatAnim;
window.Icon = Icon;
window.BottleSVG = BottleSVG;
window.OilBottleSVG = OilBottleSVG;
window.JarSVG = JarSVG;
window.SCENES = SCENES;
