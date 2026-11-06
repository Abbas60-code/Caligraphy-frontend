import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const {
    items, subtotal, discount, shipping, total, coupon,
    applyCoupon, removeCoupon, removeItem, updateQuantity, clearCart,
  } = useCart();
  const navigate = useNavigate();
  const [couponVal, setCouponVal] = useState('');
  const [couponError, setCouponError] = useState('');
  const [removing, setRemoving] = useState(null);

  const handleCoupon = () => {
    if (couponVal.trim().toUpperCase() === 'BLESSED10') {
      applyCoupon('BLESSED10');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code.');
    }
  };

  const handleRemove = (id) => {
    setRemoving(id);
    setTimeout(() => { removeItem(id); setRemoving(null); }, 350);
  };

  /* ─────────── EMPTY STATE ─────────── */
  if (items.length === 0) {
    return (
      <div style={{ background: '#FDFAF3', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{
            width: '120px', height: '120px', borderRadius: '50%',
            border: '2px solid rgba(201,168,76,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 32px',
            background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          }}>
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '5px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '16px', fontWeight: 700 }}>
            Your Atelier
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '36px', fontWeight: 700, color: '#1A1A1A', marginBottom: '12px', lineHeight: 1.2 }}>
            Your Cart is Empty
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#8A7A6A', lineHeight: 1.8, marginBottom: '36px' }}>
            Discover handcrafted masterpieces — sacred calligraphy, abstract expressionism, and cubist brilliance.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/gallery"
              style={{
                padding: '14px 36px', background: '#1A1A1A', color: '#fff',
                fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '11px',
                letterSpacing: '2.5px', textTransform: 'uppercase', textDecoration: 'none',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#1A1A1A'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = '#fff'; }}
            >
              Explore Gallery
            </Link>
            <Link
              to="/"
              style={{
                padding: '14px 36px', background: 'transparent', color: '#8A7A6A',
                border: '1px solid #D4C4A0',
                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px',
                letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#C9A84C'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#D4C4A0'; e.currentTarget.style.color = '#8A7A6A'; }}
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ─────────── MAIN CART ─────────── */
  return (
    <div style={{ background: '#FDFAF3', minHeight: '100vh', color: '#1A1A1A', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Hero Header ── */}
      <div style={{
        paddingTop: '100px', paddingBottom: '48px', paddingLeft: '24px', paddingRight: '24px',
        borderBottom: '1px solid #E8DFC8',
        background: '#1A1A1A',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px', fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
            >Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
            <Link to="/gallery" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
            >Gallery</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
            <span style={{ color: '#C9A84C' }}>Cart</span>
          </div>

          <div className="cart-header-row" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <p style={{ fontSize: '10px', letterSpacing: '5px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '8px', fontWeight: 700 }}>
                Your Selection
              </p>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(26px, 5vw, 52px)', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
                Shopping Cart
                <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif', fontWeight: 400, marginLeft: '12px' }}>
                  ({items.length} {items.length === 1 ? 'piece' : 'pieces'})
                </span>
              </h1>
            </div>
            <button
              onClick={clearCart}
              style={{
                background: 'transparent', border: '1px solid rgba(239,68,68,0.4)',
                color: 'rgba(239,68,68,0.7)', padding: '10px 20px',
                fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '1.5px',
                textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'; e.currentTarget.style.color = 'rgba(239,68,68,0.7)'; }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="cart-content-padding" style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
        <div className="cart-layout">

          {/* ── LEFT: Items ── */}
          <div style={{ minWidth: 0, width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="cart-item-card"
                  style={{
                    background: removing === item.id ? '#fff5f5' : '#fff',
                    border: '1px solid #E8DFC8',
                    borderLeft: '3px solid #C9A84C',
                    padding: '24px',
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'flex-start',
                    transition: 'all 0.35s ease',
                    opacity: removing === item.id ? 0 : 1,
                    transform: removing === item.id ? 'translateX(20px)' : 'translateX(0)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Artwork Image */}
                  <Link to={`/product/${item.id}`} style={{ flexShrink: 0 }}>
                    <div className="cart-item-image" style={{
                      width: '100px', height: '120px',
                      border: '1px solid #E8DFC8',
                      overflow: 'hidden', background: '#F5EFE0',
                      position: 'relative',
                    }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '16px', height: '16px', borderTop: '2px solid #C9A84C', borderLeft: '2px solid #C9A84C' }} />
                      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '16px', height: '16px', borderBottom: '2px solid #C9A84C', borderRight: '2px solid #C9A84C' }} />
                    </div>
                  </Link>

                  {/* Item Info */}
                  <div className="cart-item-info" style={{ flex: 1, minWidth: 0 }}>
                    <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                      <h3
                        className="cart-item-title"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: '18px', fontWeight: 600, color: '#1A1A1A',
                          marginBottom: '6px', lineHeight: 1.3, transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
                        onMouseLeave={e => e.currentTarget.style.color = '#1A1A1A'}
                      >
                        {item.title}
                      </h3>
                    </Link>
                    <p style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A7A6A', marginBottom: '16px' }}>
                      {item.dimensions || 'Original Canvas'} · {item.availability || 'In Stock'}
                    </p>

                    {/* Qty + Price */}
                    <div className="cart-qty-price" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                      {/* Qty Stepper */}
                      <div style={{
                        display: 'flex', alignItems: 'center',
                        border: '1px solid #D4C4A0', background: '#FDFAF3',
                        height: '42px',
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            width: '42px', height: '100%', background: 'transparent',
                            border: 'none', color: '#8A7A6A', fontSize: '20px',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#F5EFE0'; e.currentTarget.style.color = '#1A1A1A'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8A7A6A'; }}
                        >−</button>
                        <span style={{ width: '44px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 700, color: '#1A1A1A' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            width: '42px', height: '100%', background: 'transparent',
                            border: 'none', color: '#8A7A6A', fontSize: '20px',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#F5EFE0'; e.currentTarget.style.color = '#1A1A1A'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8A7A6A'; }}
                        >+</button>
                      </div>

                      {/* Price */}
                      <div style={{ textAlign: 'right' }}>
                        <p className="cart-item-price" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 700, color: '#1A1A1A', lineHeight: 1 }}>
                          ${(item.price * item.quantity).toFixed(0)}
                        </p>
                        {item.quantity > 1 && (
                          <p style={{ fontSize: '11px', color: '#8A7A6A', marginTop: '4px' }}>
                            ${item.price} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    title="Remove"
                    style={{
                      background: 'transparent', border: 'none',
                      color: '#D4C4A0', cursor: 'pointer',
                      padding: '4px', flexShrink: 0,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                    onMouseLeave={e => e.currentTarget.style.color = '#D4C4A0'}
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* ── Coupon Box ── */}
            <div style={{
              marginTop: '24px',
              background: '#fff', border: '1px solid #E8DFC8',
              padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 700 }}>
                  Promo Code
                </span>
              </div>

              {coupon ? (
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 18px', background: '#f0fdf4', border: '1px solid #bbf7d0',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span style={{ color: '#16a34a', fontWeight: 700, letterSpacing: '1px' }}>{coupon}</span>
                    <span style={{ color: '#15803d', fontSize: '12px' }}>— 10% off applied</span>
                  </div>
                  <button onClick={removeCoupon} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <div className="coupon-flex" style={{ display: 'flex', gap: '0' }}>
                    <input
                      value={couponVal}
                      onChange={e => { setCouponVal(e.target.value); setCouponError(''); }}
                      onKeyDown={e => e.key === 'Enter' && handleCoupon()}
                      type="text"
                      placeholder="Enter promo code (try BLESSED10)"
                      style={{
                        flex: 1, padding: '13px 18px',
                        background: '#FDFAF3', border: '1px solid #D4C4A0',
                        borderRight: 'none',
                        color: '#1A1A1A', fontFamily: 'Inter, sans-serif', fontSize: '13px',
                        outline: 'none',
                        minWidth: 0,
                      }}
                      onFocus={e => e.target.style.borderColor = '#C9A84C'}
                      onBlur={e => e.target.style.borderColor = '#D4C4A0'}
                    />
                    <button
                      onClick={handleCoupon}
                      style={{
                        padding: '13px 24px', background: '#1A1A1A', color: '#fff',
                        border: 'none', fontFamily: 'Inter, sans-serif', fontWeight: 700,
                        fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
                        cursor: 'pointer', transition: 'all 0.3s', flexShrink: 0,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#1A1A1A'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = '#fff'; }}
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px' }}>{couponError}</p>
                  )}
                </div>
              )}
            </div>

            {/* ── Continue Shopping ── */}
            <Link
              to="/gallery"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                marginTop: '24px', color: '#8A7A6A',
                fontFamily: 'Inter, sans-serif', fontSize: '11px',
                letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
              onMouseLeave={e => e.currentTarget.style.color = '#8A7A6A'}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className="cart-summary-sticky" style={{ position: 'sticky', top: '100px', width: '100%' }}>
            <div style={{
              background: '#fff', border: '1px solid #E8DFC8',
              borderTop: '3px solid #C9A84C',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              boxSizing: 'border-box',
            }}>
              {/* Summary Header */}
              <div style={{ padding: '24px 28px', borderBottom: '1px solid #E8DFC8' }}>
                <p style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '4px', fontWeight: 700 }}>
                  Order Summary
                </p>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 700, color: '#1A1A1A' }}>
                  {items.length} {items.length === 1 ? 'Artwork' : 'Artworks'}
                </h2>
              </div>

              {/* Mini Item List */}
              <div style={{ padding: '20px 28px', borderBottom: '1px solid #E8DFC8', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '56px', flexShrink: 0, border: '1px solid #E8DFC8', overflow: 'hidden', background: '#F5EFE0' }}>
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '12px', fontWeight: 600, color: '#1A1A1A', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.title}
                      </p>
                      <p style={{ fontSize: '11px', color: '#8A7A6A' }}>Qty {item.quantity}</p>
                    </div>
                    <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', color: '#C9A84C', flexShrink: 0, fontWeight: 700 }}>
                      ${(item.price * item.quantity).toFixed(0)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div style={{ padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#8A7A6A' }}>Subtotal</span>
                  <span style={{ color: '#1A1A1A', fontWeight: 500 }}>${subtotal.toFixed(0)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#16a34a' }}>Discount (10%)</span>
                    <span style={{ color: '#16a34a', fontWeight: 600 }}>−${discount.toFixed(0)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#8A7A6A' }}>Shipping</span>
                  {shipping === 0 ? (
                    <span style={{ color: '#16a34a', fontWeight: 600, fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Complimentary</span>
                  ) : (
                    <span style={{ color: '#1A1A1A' }}>${shipping}</span>
                  )}
                </div>

                {shipping > 0 && (
                  <div style={{
                    marginTop: '4px', padding: '10px 14px',
                    background: '#FFF8EC', border: '1px solid #F0D98A',
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p style={{ fontSize: '11px', color: '#92400e' }}>
                      Add <strong style={{ color: '#1A1A1A' }}>${200 - subtotal > 0 ? (200 - subtotal).toFixed(0) : 0}</strong> more for free shipping
                    </p>
                  </div>
                )}

                {/* Divider */}
                <div style={{ position: 'relative', height: '1px', background: '#E8DFC8', margin: '8px 0' }}>
                  <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '40px', height: '1px', background: '#C9A84C' }} />
                </div>

                {/* Total */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#1A1A1A' }}>Total</span>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '36px', fontWeight: 700, color: '#C9A84C', lineHeight: 1 }}>
                    ${total.toFixed(0)}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div style={{ padding: '0 28px 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={() => navigate('/checkout')}
                  style={{
                    width: '100%', height: '56px',
                    background: '#1A1A1A',
                    color: '#fff', border: 'none',
                    fontFamily: 'Inter, sans-serif', fontWeight: 800,
                    fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all 0.3s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    position: 'relative', overflow: 'hidden',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#1A1A1A'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = '#fff'; }}
                >
                  Proceed to Checkout
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <a
                  href={`https://wa.me/923002161412?text=${encodeURIComponent(`Assalamu Alaikum! 🌙\n\nI'd like to inquire about:\n${items.map(i => `• ${i.title} × ${i.quantity} = $${(i.price * i.quantity).toFixed(0)}`).join('\n')}\n\nTotal: $${total.toFixed(0)}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '100%', height: '48px',
                    background: '#f0fdf4', border: '1px solid #bbf7d0',
                    color: '#16a34a',
                    fontFamily: 'Inter, sans-serif', fontWeight: 700,
                    fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all 0.3s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    textDecoration: 'none', boxSizing: 'border-box',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#dcfce7'; e.currentTarget.style.borderColor = '#86efac'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#f0fdf4'; e.currentTarget.style.borderColor = '#bbf7d0'; }}
                >
                  <svg width="16" height="16" fill="#16a34a" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Order via WhatsApp
                </a>
              </div>

              {/* Trust Badges */}
              <div style={{ padding: '20px 28px', borderTop: '1px solid #E8DFC8', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {[
                  { icon: '🛡️', label: '30-Day Return' },
                  { icon: '📦', label: 'Secure Pack' },
                  { icon: '🌍', label: 'Global Ship' },
                ].map(b => (
                  <div key={b.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', marginBottom: '6px' }}>{b.icon}</div>
                    <p style={{ fontSize: '9px', color: '#8A7A6A', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700 }}>{b.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        .cart-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .cart-layout {
            grid-template-columns: 1fr 300px;
            gap: 20px;
          }
        }
        @media (max-width: 768px) {
          .cart-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .cart-content-padding {
            padding: 24px 16px !important;
          }
          .cart-item-card {
            padding: 18px 16px !important;
            gap: 16px !important;
          }
          .cart-summary-sticky {
            position: static !important;
            top: auto !important;
          }
        }
        @media (max-width: 480px) {
          .cart-content-padding {
            padding: 20px 12px !important;
          }
          .cart-item-card {
            padding: 14px 12px !important;
            gap: 12px !important;
          }
          .cart-item-image {
            width: 72px !important;
            height: 88px !important;
          }
          .cart-item-title {
            font-size: 15px !important;
            margin-bottom: 4px !important;
          }
          .cart-item-price {
            font-size: 20px !important;
          }
          .cart-item-info {
            min-width: 0 !important;
          }
          .cart-qty-price {
            gap: 8px !important;
          }
          .coupon-flex {
            flex-direction: column !important;
          }
          .coupon-flex input {
            border-right: 1px solid #D4C4A0 !important;
            border-bottom: none !important;
            border-radius: 0 !important;
          }
          .coupon-flex button {
            width: 100% !important;
          }
          .cart-header-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
