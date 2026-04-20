// Cart system — floating mini cart
const { useContext: useCtxCart, useState: useStCart, useCallback: useCbCart } = React;

const CartContext = createContext({
  items: [], addItem: () => {}, removeItem: () => {}, updateQuantity: () => {},
  clearCart: () => {}, getTotal: () => 0, getCount: () => 0,
});

function CartProvider({ children }) {
  const [items, setItems] = useStCart([]);

  const addItem = useCbCart((item) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCbCart((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQuantity = useCbCart((id, qty) => {
    if (qty <= 0) { removeItem(id); return; }
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  }, [removeItem]);

  const clearCart = useCbCart(() => setItems([]), []);

  const getTotal = () => items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const getCount = () => items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, getTotal, getCount }}>
      {children}
    </CartContext.Provider>
  );
}

// Add to cart button — small "+" button
function AddToCartBtn({ item, style = {} }) {
  const { addItem } = useCtxCart(CartContext);
  const [flash, setFlash] = useStCart(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(item);
    setFlash(true);
    setTimeout(() => setFlash(false), 400);
  };

  return (
    <button onClick={handleAdd} aria-label="Add to cart" style={{
      width: 36, height: 36, borderRadius: 9999,
      border: 'none',
      background: flash ? 'var(--es-olive)' : 'var(--es-wine)',
      color: 'var(--es-cream-soft)', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all 0.25s ease',
      transform: flash ? 'scale(1.2)' : 'scale(1)',
      boxShadow: '0 4px 12px -4px rgba(110,36,40,0.4)',
      ...style,
    }}>
      <window.Icon name={flash ? 'check' : 'plus'} size={16} stroke={2.4} />
    </button>
  );
}

// Floating cart badge
function CartBadge() {
  const { getCount } = useCtxCart(CartContext);
  const [drawerOpen, setDrawerOpen] = useStCart(false);
  const count = getCount();

  if (count === 0 && !drawerOpen) return null;

  return (
    <>
      <button onClick={() => setDrawerOpen(true)} aria-label="Open cart" style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 9998,
        width: 56, height: 56, borderRadius: 9999,
        background: 'var(--es-wine)', color: 'var(--es-cream-soft)',
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 28px -6px rgba(110,36,40,0.5)',
        transition: 'transform 0.3s ease',
        animation: count > 0 ? 'esCartBounce 0.4s ease' : 'none',
      }}>
        <window.Icon name="shopping-cart" size={22} />
        {count > 0 && (
          <div style={{
            position: 'absolute', top: -4, right: -4,
            width: 22, height: 22, borderRadius: 9999,
            background: '#E63946', color: '#fff',
            fontSize: 11, fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--es-font-mono)',
          }}>{count}</div>
        )}
      </button>
      {drawerOpen && <CartDrawer onClose={() => setDrawerOpen(false)} />}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes esCartBounce { 0% { transform: scale(1); } 30% { transform: scale(1.15); } 60% { transform: scale(0.95); } 100% { transform: scale(1); } }
        @media (max-width: 600px) {
          .es-cart-badge { bottom: 16px !important; right: 16px !important; width: 48px !important; height: 48px !important; }
        }
      `}} />
    </>
  );
}

// Cart drawer
function CartDrawer({ onClose }) {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCtxCart(CartContext);
  const { lang, t } = useCtxCart(window.LangContext);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const whatsappMsg = () => {
    const productList = items.map(i => `${i.name} x${i.quantity} (${i.price * i.quantity} €)`).join('\n');
    const total = getTotal();
    const msg = lang === 'hr'
      ? `Pozdrav! Želio bih naručiti:\n${productList}\n\nUkupno: ${total} €`
      : `Hello! I would like to order:\n${productList}\n\nTotal: ${total} €`;
    return `https://wa.me/385912345678?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 99990,
        background: 'rgba(27,20,16,0.6)',
        animation: 'esFadeIn 0.2s ease both',
      }} />
      {/* Drawer */}
      <div className="es-cart-drawer" style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 99991,
        width: 380, maxWidth: '100vw',
        background: 'var(--es-paper)',
        borderLeft: '1px solid var(--es-border)',
        boxShadow: '-12px 0 48px -24px rgba(43,36,25,0.3)',
        display: 'flex', flexDirection: 'column',
        animation: 'esSlideInRight 0.3s ease both',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 24px 20px', borderBottom: '1px solid var(--es-border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ fontFamily: 'var(--es-font-display)', fontSize: 22, color: 'var(--es-ink)' }}>
            {lang === 'hr' ? 'Košarica' : 'Cart'} ({items.length})
          </div>
          <button onClick={onClose} aria-label="Close cart" style={{
            width: 36, height: 36, borderRadius: 9999,
            border: '1px solid var(--es-border)', background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <window.Icon name="x" size={16} color="var(--es-ink)" />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {items.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '60px 0',
              fontFamily: 'var(--es-font-body)', fontSize: 16, color: 'var(--es-muted)',
              fontStyle: 'italic',
            }}>
              {lang === 'hr' ? 'Košarica je prazna.' : 'Cart is empty.'}
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '16px 0',
                borderBottom: '1px solid var(--es-border)',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--es-font-ui)', fontSize: 15, fontWeight: 700, color: 'var(--es-ink)' }}>{item.name}</div>
                  <div style={{ fontFamily: 'var(--es-font-mono)', fontSize: 12, color: 'var(--es-muted)', marginTop: 4 }}>
                    {item.price} € × {item.quantity}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity" style={{
                    width: 28, height: 28, borderRadius: 9999, border: '1px solid var(--es-border)',
                    background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><window.Icon name="minus" size={12} color="var(--es-ink)" /></button>
                  <span style={{ fontFamily: 'var(--es-font-mono)', fontSize: 13, width: 24, textAlign: 'center', color: 'var(--es-ink)' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity" style={{
                    width: 28, height: 28, borderRadius: 9999, border: '1px solid var(--es-border)',
                    background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><window.Icon name="plus" size={12} color="var(--es-ink)" /></button>
                </div>
                <button onClick={() => removeItem(item.id)} aria-label="Remove item" style={{
                  width: 28, height: 28, borderRadius: 9999,
                  border: 'none', background: 'rgba(230,57,70,0.1)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <window.Icon name="trash" size={13} color="#E63946" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--es-border)', background: 'var(--es-cream-soft)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontFamily: 'var(--es-font-ui)', fontSize: 14, color: 'var(--es-muted)' }}>
                {lang === 'hr' ? 'Ukupno:' : 'Total:'}
              </div>
              <div style={{ fontFamily: 'var(--es-font-display)', fontSize: 28, color: 'var(--es-ink)' }}>
                {getTotal()} €
              </div>
            </div>
            <a href={whatsappMsg()} target="_blank" rel="noopener noreferrer" className="es-btn" style={{
              width: '100%', justifyContent: 'center',
              background: '#25D366', color: '#fff', fontSize: 15,
              textDecoration: 'none', marginBottom: 10,
            }}>
              {lang === 'hr' ? 'Pošalji narudžbu' : 'Send order'}
              <window.Icon name="arrow-right" size={16} />
            </a>
            <button onClick={onClose} style={{
              width: '100%', padding: '12px', border: 'none',
              background: 'transparent', cursor: 'pointer',
              fontFamily: 'var(--es-font-ui)', fontSize: 14, color: 'var(--es-muted)',
              textDecoration: 'underline',
            }}>
              {lang === 'hr' ? 'Nastavi kupovati' : 'Continue shopping'}
            </button>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes esFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes esSlideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @media (max-width: 600px) {
          .es-cart-drawer { width: 100vw !important; }
        }
      `}} />
    </>
  );
}

window.CartContext = CartContext;
window.CartProvider = CartProvider;
window.AddToCartBtn = AddToCartBtn;
window.CartBadge = CartBadge;
