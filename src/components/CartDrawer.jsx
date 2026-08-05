import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    items, isCartOpen, setIsCartOpen,
    subtotal, discount, shipping, total,
    itemCount, removeItem, updateQuantity
  } = useCart();
  const drawerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setIsCartOpen(false); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [setIsCartOpen]);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(3px)',
          opacity: isCartOpen ? 1 : 0,
          pointerEvents: isCartOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          width: '100%',
          maxWidth: '430px',
          background: '#FDFAF3',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.18)',
          transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.45s cubic-bezier(0.77,0,0.175,1)',
        }}
      >
        {/* ── Header ── */}
        <div style={{
          flexShrink: 0,
          background: '#1A1A1A',
          borderBottom: '3px solid #C9A84C',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '22px',
              fontWeight: 700,
              color: '#fff',
              margin: 0,
            }}>
              Your Cart
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#C9A84C',
              marginTop: '4px',
            }}>
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              width: '36px', height: '36px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'transparent',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#C9A84C'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* ── Items List ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {items.length === 0 ? (
            /* Empty State */
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              height: '100%', textAlign: 'center', gap: '16px',
            }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: '#F5EFE0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.2">
                  <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: '#1A1A1A', marginBottom: '8px' }}>
                  Your cart is empty
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#8A7A6A', lineHeight: 1.6 }}>
                  Discover our handmade Islamic calligraphy paintings.
                </p>
              </div>
              <Link
                to="/gallery"
                onClick={() => setIsCartOpen(false)}
                style={{
                  marginTop: '8px',
                  padding: '12px 28px',
                  background: '#C9A84C',
                  color: '#1A1A1A',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700, fontSize: '11px',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#A07830'}
                onMouseLeave={e => e.currentTarget.style.background = '#C9A84C'}
              >
                Explore Gallery
              </Link>
            </div>
          ) : (
            /* Items */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '16px 0',
                    borderBottom: idx < items.length - 1 ? '1px solid #E8DFC8' : 'none',
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{
                    width: '72px', height: '80px',
                    flexShrink: 0,
                    background: '#fff',
                    border: '1px solid #E8DFC8',
                    padding: '4px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                  }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {/* Title row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <h4 style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#1A1A1A',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1,
                        minWidth: 0,
                      }}>
                        {item.title}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{
                          flexShrink: 0,
                          background: 'none', border: 'none',
                          color: '#B0A090', cursor: 'pointer', padding: '2px',
                          lineHeight: 1,
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                        onMouseLeave={e => e.currentTarget.style.color = '#B0A090'}
                        title="Remove"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>

                    {/* Size */}
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: '#8A7A6A',
                      margin: 0,
                    }}>
                      {item.dimensions || 'Standard Size'}
                    </p>

                    {/* Qty + Price row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                      {/* Qty controls */}
                      <div style={{
                        display: 'flex', alignItems: 'center',
                        border: '1px solid #D4C4A0',
                        background: '#fff',
                        height: '32px',
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            width: '32px', height: '100%',
                            background: 'none', border: 'none',
                            cursor: 'pointer',
                            color: '#8A7A6A',
                            fontSize: '16px', lineHeight: 1,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'background 0.15s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#F5EFE0'}
                          onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        >−</button>
                        <span style={{
                          width: '28px', textAlign: 'center',
                          fontFamily: 'Inter, sans-serif', fontSize: '13px',
                          fontWeight: 600, color: '#1A1A1A',
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            width: '32px', height: '100%',
                            background: 'none', border: 'none',
                            cursor: 'pointer',
                            color: '#8A7A6A',
                            fontSize: '16px', lineHeight: 1,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'background 0.15s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#F5EFE0'}
                          onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        >+</button>
                      </div>

                      {/* Item total */}
                      <p style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#1A1A1A',
                        margin: 0,
                      }}>
                        ${(item.price * item.quantity).toFixed(0)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Summary Footer ── */}
        {items.length > 0 && (
          <div style={{
            flexShrink: 0,
            background: '#fff',
            borderTop: '1px solid #E8DFC8',
            padding: '20px 24px',
            boxShadow: '0 -6px 20px rgba(0,0,0,0.04)',
          }}>
            {/* Price rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#8A7A6A' }}>Subtotal</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#1A1A1A', fontWeight: 500 }}>${subtotal.toFixed(0)}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#16a34a' }}>Discount</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#16a34a', fontWeight: 500 }}>−${discount.toFixed(0)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#8A7A6A' }}>Shipping</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#1A1A1A', fontWeight: 500 }}>
                  {shipping === 0 ? 'Free' : `$${shipping}`}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: '#E8DFC8', margin: '4px 0', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '40px', height: '1px', background: '#C9A84C' }} />
              </div>

              {/* Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '11px',
                  fontWeight: 700, letterSpacing: '2px',
                  textTransform: 'uppercase', color: '#1A1A1A',
                }}>
                  Total
                </span>
                <span style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '28px', fontWeight: 700, color: '#C9A84C', lineHeight: 1,
                }}>
                  ${total.toFixed(0)}
                </span>
              </div>
            </div>

            {/* Checkout button */}
            <button
              onClick={handleCheckout}
              style={{
                width: '100%',
                padding: '15px',
                background: '#1A1A1A',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700, fontSize: '12px',
                letterSpacing: '2.5px', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                transition: 'background 0.25s, color 0.25s',
                marginBottom: '10px',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#1A1A1A'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = '#fff'; }}
            >
              Proceed to Checkout
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* View full cart link */}
            <button
              onClick={() => { setIsCartOpen(false); navigate('/cart'); }}
              style={{
                width: '100%',
                padding: '10px',
                background: 'none', border: 'none',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px', letterSpacing: '1.5px',
                textTransform: 'uppercase', color: '#8A7A6A',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#1A1A1A'}
              onMouseLeave={e => e.currentTarget.style.color = '#8A7A6A'}
            >
              View Full Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
