// Leaflet Map Component

function LeafletMap() {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const { lang } = useContext(window.LangContext);

  useEffect(() => {
    if (!containerRef.current || typeof L === 'undefined') return;
    if (mapRef.current) return; // Already initialized

    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
      zoomControl: true,
      dragging: true,
    }).setView([43.9378, 15.5892], 13);

    // Tile layer with warm filter
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 18,
    }).addTo(map);

    // Custom marker
    const markerIcon = L.divIcon({
      html: '<div style="width:32px;height:32px;background:var(--es-terracotta,#B35933);border-radius:9999px 9999px 9999px 0;transform:rotate(-45deg);border:3px solid #F5EFE0;box-shadow:0 4px 12px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center"><div style="transform:rotate(45deg);color:#F5EFE0;font-size:14px;font-weight:bold">E</div></div>',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
      className: '',
    });

    const marker = L.marker([43.9378, 15.5892], { icon: markerIcon }).addTo(map);
    marker.bindPopup(
      '<div style="font-family:Georgia,serif;padding:4px 2px">'
      + '<strong style="font-size:14px;color:#2B2419">OPG Esencija</strong><br>'
      + '<span style="font-size:12px;color:#6B5E48">Polača 57, 23423 Polača</span><br>'
      + '<span style="font-size:12px;color:#6B5E48">+385 91 234 5678</span>'
      + '</div>',
      { className: 'es-popup' }
    );

    // Parcel polygons
    const vineyardCoords = [[43.942, 15.583], [43.944, 15.585], [43.943, 15.590], [43.940, 15.589], [43.939, 15.585]];
    const oliveCoords = [[43.935, 15.592], [43.937, 15.594], [43.936, 15.599], [43.933, 15.597]];
    const figCoords = [[43.938, 15.580], [43.939, 15.583], [43.937, 15.584], [43.936, 15.581]];

    L.polygon(vineyardCoords, { color: '#5B6B3A', fillColor: '#5B6B3A', fillOpacity: 0.15, weight: 2 })
      .addTo(map).bindTooltip(lang === 'hr' ? 'Vinograd — 12 ha' : 'Vineyard — 12 ha', { sticky: true });
    L.polygon(oliveCoords, { color: '#8A9B68', fillColor: '#8A9B68', fillOpacity: 0.15, weight: 2 })
      .addTo(map).bindTooltip(lang === 'hr' ? 'Maslinik — 10 ha' : 'Olive grove — 10 ha', { sticky: true });
    L.polygon(figCoords, { color: '#B35933', fillColor: '#B35933', fillOpacity: 0.15, weight: 2 })
      .addTo(map).bindTooltip(lang === 'hr' ? 'Smokvik — 3 ha' : 'Fig orchard — 3 ha', { sticky: true });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div ref={containerRef} style={{
        height: 280, borderRadius: 16, overflow: 'hidden',
        border: '1px solid var(--es-border)',
        filter: 'sepia(0.2) saturate(0.85) brightness(0.97)',
      }} />
      <style dangerouslySetInnerHTML={{ __html: `
        .es-popup .leaflet-popup-content-wrapper { background: #FBF7EC; border-radius: 14px; box-shadow: 0 12px 32px -12px rgba(43,36,25,0.3); border: 1px solid rgba(43,36,25,0.12); }
        .es-popup .leaflet-popup-tip { background: #FBF7EC; }
      `}} />
    </>
  );
}

window.LeafletMap = LeafletMap;
