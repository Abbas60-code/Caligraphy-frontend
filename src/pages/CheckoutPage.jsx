import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const steps = ['Shipping', 'Payment', 'Confirmation'];

const WHATSAPP_NUMBER = '923002161412'; // 92 = Pakistan country code

export default function CheckoutPage() {
  const { items, subtotal, discount, shipping, total, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderRef] = useState(() => 'AG-' + Math.random().toString(36).substr(2, 8).toUpperCase());

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', country: '', zip: '',
    paymentMethod: 'whatsapp',
  });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleNext = (e) => {
    e.preventDefault();
    if (step < steps.length - 1) setStep((s) => s + 1);
  };

  const buildWhatsAppMessage = () => {
    const itemsList = items.map(i => `• ${i.title} × ${i.quantity} = $${(i.price * i.quantity).toFixed(0)}`).join('\n');
    const msg = `Assalamu Alaikum! 🌙\n\nI'd like to place an order:\n\n*Order Ref:* ${orderRef}\n*Items:*\n${itemsList}\n\n*Subtotal:* $${subtotal.toFixed(0)}\n*Shipping:* ${shipping === 0 ? 'Free' : '$' + shipping}\n*Total:* $${total.toFixed(0)}\n\n*Shipping To:*\n${form.firstName} ${form.lastName}\n${form.address}, ${form.city}, ${form.country}\n📧 ${form.email}\n📱 ${form.phone}\n\nPlease confirm availability and payment details. JazakAllah Khair!`;
    return encodeURIComponent(msg);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    addOrder({
      customer: `${form.firstName} ${form.lastName}`,
      email: form.email,
      total: total,
      items: items.map(item => ({ title: item.title, quantity: item.quantity, price: item.price })),
    });

    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:9000';
    try {
      await fetch(`${apiBase}/api/orders/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderRef,
          customer: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          country: form.country,
          total: total.toFixed(0),
          paymentMethod: form.paymentMethod,
          items: items.map(item => ({ title: item.title, quantity: item.quantity, price: item.price })),
        }),
      });
    } catch (err) {
      console.warn('Order notification email failed (non-blocking):', err.message);
    }

    if (form.paymentMethod === 'whatsapp') {
      // Open WhatsApp with order details then show success
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`;
      window.open(url, '_blank');
    }

    setOrderPlaced(true);
    clearCart();
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FDFAF3' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '32px', fontWeight: 700, color: '#1A1A1A', marginBottom: '16px' }}>Your cart is empty</h2>
          <Link to="/gallery" style={{ color: '#C9A84C', fontFamily: 'Inter, sans-serif', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>← Back to Gallery</Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FDFAF3', padding: '24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
          <div style={{
            width: '96px', height: '96px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #C9A84C, #E8C97E)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '40px', margin: '0 auto 32px', boxShadow: '0 8px 32px rgba(201,168,76,0.3)',
          }}>✓</div>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '6px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '12px' }}>
            Order Confirmed
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '40px', fontWeight: 700, color: '#1A1A1A', marginBottom: '8px' }}>
            JazakAllah Khair!
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#8A7A6A', letterSpacing: '2px', marginBottom: '24px' }}>
            Order Ref: <strong style={{ color: '#1A1A1A' }}>{orderRef}</strong>
          </p>

          <div style={{ height: '2px', background: 'linear-gradient(to right, transparent, #C9A84C, transparent)', marginBottom: '24px' }} />

          {form.paymentMethod === 'whatsapp' && (
            <div style={{
              background: '#f0fdf4', border: '1px solid #bbf7d0',
              borderRadius: '8px', padding: '20px', marginBottom: '24px',
              display: 'flex', alignItems: 'flex-start', gap: '12px', textAlign: 'left',
            }}>
              <span style={{ fontSize: '24px' }}>📱</span>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 700, color: '#15803d', marginBottom: '4px' }}>
                  WhatsApp Chat Opened!
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#166534', lineHeight: 1.6 }}>
                  Your order details have been sent to WhatsApp. Please complete the chat with us at <strong>0300-2161412</strong> to confirm payment.
                </p>
              </div>
            </div>
          )}

          {form.paymentMethod === 'payoneer' && (
            <div style={{
              background: '#FFF8EC', border: '1px solid #F0D98A',
              borderRadius: '8px', padding: '20px', marginBottom: '24px',
              display: 'flex', alignItems: 'flex-start', gap: '12px', textAlign: 'left',
            }}>
              <span style={{ fontSize: '24px' }}>💰</span>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 700, color: '#92400e', marginBottom: '4px' }}>
                  Payoneer Payment Pending
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#78350f', lineHeight: 1.6 }}>
                  Please send <strong>${total.toFixed(0)}</strong> via Payoneer to <strong>amircreator09@gmail.com</strong><br />
                  Use order ref <strong>{orderRef}</strong> in the note. We'll confirm once received.
                </p>
              </div>
            </div>
          )}

          {form.paymentMethod === 'cod' && (
            <div style={{
              background: '#F5EFE0', border: '1px solid #E8DFC8',
              borderRadius: '8px', padding: '20px', marginBottom: '24px',
              display: 'flex', alignItems: 'flex-start', gap: '12px', textAlign: 'left',
            }}>
              <span style={{ fontSize: '24px' }}>🚪</span>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 700, color: '#1A1A1A', marginBottom: '4px' }}>
                  Cash on Delivery Confirmed
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#5A5050', lineHeight: 1.6 }}>
                  Pay <strong>${total.toFixed(0)}</strong> when your artwork arrives. We'll contact you at <strong>{form.phone || form.email}</strong> to confirm delivery.
                </p>
              </div>
            </div>
          )}

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#8A7A6A', lineHeight: 1.7, marginBottom: '32px' }}>
            Your order has been received. We will craft your painting with devotion and care.<br />
            Confirmation sent to <strong style={{ color: '#1A1A1A' }}>{form.email || 'your email'}</strong>.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/"
              style={{
                padding: '14px 32px', background: '#1A1A1A', color: '#fff',
                fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '12px',
                letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#1A1A1A'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = '#fff'; }}
            >
              Return Home
            </Link>
            <Link
              to="/gallery"
              style={{
                padding: '14px 32px', background: 'transparent',
                border: '2px solid #1A1A1A', color: '#1A1A1A',
                fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '12px',
                letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1A1A1A'; }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FDFAF3' }}>
      {/* Header */}
      <div style={{ background: '#1A1A1A', paddingTop: '100px', paddingBottom: '40px', paddingLeft: '24px', paddingRight: '24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '40px', fontWeight: 700, color: '#fff', marginBottom: '32px' }}>
            Checkout
          </h1>
          {/* Stepper */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {steps.map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 700,
                    background: i < step ? '#C9A84C' : i === step ? '#fff' : 'rgba(255,255,255,0.2)',
                    color: i < step ? '#1A1A1A' : i === step ? '#1A1A1A' : 'rgba(255,255,255,0.5)',
                    transition: 'all 0.3s',
                  }}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '2px',
                    textTransform: 'uppercase', fontWeight: 600,
                    color: i === step ? '#fff' : 'rgba(255,255,255,0.4)',
                  }}>{s}</span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{
                    flex: 1, height: '1px', margin: '0 16px',
                    background: i < step ? '#C9A84C' : 'rgba(255,255,255,0.2)',
                    transition: 'background 0.5s',
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '32px', alignItems: 'start' }}
            className="checkout-grid">

            {/* STEP 0: Shipping */}
            <div>
              {step === 0 && (
                <form onSubmit={handleNext}>
                  <div style={{ background: '#fff', padding: '36px', border: '1px solid #E8DFC8', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
                    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: 700, color: '#1A1A1A', marginBottom: '28px' }}>
                      Shipping Information
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      {[
                        { name: 'firstName', label: 'First Name', type: 'text', required: true, full: false },
                        { name: 'lastName', label: 'Last Name', type: 'text', required: true, full: false },
                        { name: 'email', label: 'Email Address', type: 'email', required: true, full: true },
                        { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', required: false, full: true },
                        { name: 'address', label: 'Street Address', type: 'text', required: true, full: true },
                        { name: 'city', label: 'City', type: 'text', required: true, full: false },
                        { name: 'country', label: 'Country', type: 'text', required: true, full: false },
                        { name: 'zip', label: 'ZIP / Postal Code', type: 'text', required: false, full: false },
                      ].map((field) => (
                        <div key={field.name} style={{ gridColumn: field.full ? '1 / -1' : undefined }}>
                          <label style={{
                            display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '10px',
                            fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
                            color: '#8A7A6A', marginBottom: '8px',
                          }}>
                            {field.label} {field.required && <span style={{ color: '#C9A84C' }}>*</span>}
                          </label>
                          <input
                            id={`checkout-${field.name}`}
                            name={field.name}
                            type={field.type}
                            value={form[field.name]}
                            onChange={handleChange}
                            required={field.required}
                            style={{
                              width: '100%', border: '1px solid #D4C4A0', background: '#FDFAF3',
                              padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: '14px',
                              color: '#1A1A1A', outline: 'none', boxSizing: 'border-box',
                              transition: 'border-color 0.2s',
                            }}
                            onFocus={e => e.target.style.borderColor = '#C9A84C'}
                            onBlur={e => e.target.style.borderColor = '#D4C4A0'}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      type="submit"
                      style={{
                        width: '100%', padding: '16px', background: '#C9A84C', color: '#1A1A1A',
                        fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '12px',
                        letterSpacing: '3px', textTransform: 'uppercase', border: 'none',
                        cursor: 'pointer', marginTop: '28px', transition: 'all 0.3s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#A07830'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#1A1A1A'; }}
                    >
                      Continue to Payment →
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 1: Payment */}
              {step === 1 && (
                <form onSubmit={handlePlaceOrder}>
                  <div style={{ background: '#fff', padding: '36px', border: '1px solid #E8DFC8', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
                    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: 700, color: '#1A1A1A', marginBottom: '28px' }}>
                      Payment Method
                    </h2>

                    {/* Method selector */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
                      {[
                        { value: 'whatsapp', label: 'WhatsApp', icon: '💬', sub: 'Chat & Pay' },
                        { value: 'payoneer', label: 'Payoneer', icon: '💰', sub: 'Online Transfer' },
                        { value: 'cod', label: 'Cash on Delivery', icon: '🚪', sub: 'Pay at Door' },
                      ].map((method) => (
                        <label
                          key={method.value}
                          style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center', padding: '20px 12px',
                            border: `2px solid ${form.paymentMethod === method.value ? '#C9A84C' : '#D4C4A0'}`,
                            background: form.paymentMethod === method.value ? '#FFF8EC' : '#FDFAF3',
                            cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center',
                            boxShadow: form.paymentMethod === method.value ? '0 4px 16px rgba(201,168,76,0.2)' : 'none',
                          }}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.value}
                            checked={form.paymentMethod === method.value}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                          />
                          <span style={{ fontSize: '28px', marginBottom: '8px' }}>{method.icon}</span>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 700, color: '#1A1A1A', marginBottom: '2px' }}>
                            {method.label}
                          </span>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#8A7A6A', letterSpacing: '1px' }}>
                            {method.sub}
                          </span>
                        </label>
                      ))}
                    </div>

                    {/* WhatsApp Info */}
                    {form.paymentMethod === 'whatsapp' && (
                      <div style={{
                        background: '#f0fdf4', border: '1px solid #bbf7d0',
                        padding: '20px', marginBottom: '24px', display: 'flex', gap: '14px', alignItems: 'flex-start',
                      }}>
                        <span style={{ fontSize: '28px', flexShrink: 0 }}>💬</span>
                        <div>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 700, color: '#15803d', marginBottom: '6px' }}>
                            WhatsApp — 0300-2161412
                          </p>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#166534', lineHeight: 1.7 }}>
                            After placing your order, WhatsApp will open automatically with your order details pre-filled.
                            Simply send the message and we'll confirm your order and payment method directly.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Payoneer Info */}
                    {form.paymentMethod === 'payoneer' && (
                      <div style={{
                        background: '#FFF8EC', border: '1px solid #F0D98A',
                        padding: '20px', marginBottom: '24px', display: 'flex', gap: '14px', alignItems: 'flex-start',
                      }}>
                        <span style={{ fontSize: '28px', flexShrink: 0 }}>💰</span>
                        <div>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 700, color: '#92400e', marginBottom: '6px' }}>
                            Payoneer Transfer Details
                          </p>
                          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#78350f', lineHeight: 1.9 }}>
                            <p>📧 <strong>Email:</strong> amircreator09@gmail.com</p>
                            <p>💵 <strong>Amount:</strong> ${total.toFixed(0)}</p>
                            <p>📝 <strong>Note/Reference:</strong> Order Ref #{orderRef}</p>
                            <p style={{ marginTop: '8px', color: '#92400e' }}>
                              ⚠️ After payment, please WhatsApp us your transaction screenshot at <strong>0300-2161412</strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* COD Info */}
                    {form.paymentMethod === 'cod' && (
                      <div style={{
                        background: '#F5EFE0', border: '1px solid #E8DFC8',
                        padding: '20px', marginBottom: '24px', display: 'flex', gap: '14px', alignItems: 'flex-start',
                      }}>
                        <span style={{ fontSize: '28px', flexShrink: 0 }}>🚪</span>
                        <div>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 700, color: '#1A1A1A', marginBottom: '6px' }}>
                            Cash on Delivery
                          </p>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#5A5050', lineHeight: 1.7 }}>
                            Pay <strong>${total.toFixed(0)}</strong> in cash when your artwork is delivered to your door.
                            We will call/WhatsApp you at <strong>{form.phone || 'your number'}</strong> before dispatching.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setStep(0)}
                        style={{
                          flex: 1, padding: '15px', border: '1px solid #D4C4A0',
                          background: 'transparent', color: '#8A7A6A',
                          fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px',
                          letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer',
                          transition: 'all 0.3s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#1A1A1A'; e.currentTarget.style.color = '#1A1A1A'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#D4C4A0'; e.currentTarget.style.color = '#8A7A6A'; }}
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        style={{
                          flex: 2, padding: '15px', background: '#C9A84C', color: '#1A1A1A',
                          fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '12px',
                          letterSpacing: '3px', textTransform: 'uppercase', border: 'none',
                          cursor: 'pointer', transition: 'all 0.3s',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#A07830'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#1A1A1A'; }}
                      >
                        {form.paymentMethod === 'whatsapp' ? (
                          <>Place Order & Open WhatsApp <span style={{ fontSize: '16px' }}>💬</span></>
                        ) : form.paymentMethod === 'payoneer' ? (
                          <>Place Order — Pay via Payoneer <span style={{ fontSize: '16px' }}>💰</span></>
                        ) : (
                          <>Confirm Order — Cash on Delivery <span style={{ fontSize: '16px' }}>🚪</span></>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div style={{ background: '#fff', border: '1px solid #E8DFC8', padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, color: '#1A1A1A', marginBottom: '20px' }}>
                  Order Summary
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                  {items.map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ width: '52px', height: '52px', flexShrink: 0, border: '1px solid #E8DFC8', overflow: 'hidden', background: '#F5EFE0' }}>
                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: '#1A1A1A', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.title}
                        </p>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#8A7A6A' }}>Qty: {item.quantity}</p>
                      </div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 700, color: '#1A1A1A', flexShrink: 0 }}>
                        ${(item.price * item.quantity).toFixed(0)}
                      </p>
                    </div>
                  ))}
                </div>

                <div style={{ height: '1px', background: '#E8DFC8', margin: '16px 0' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8A7A6A' }}>
                    <span>Subtotal</span><span style={{ color: '#1A1A1A' }}>${subtotal.toFixed(0)}</span>
                  </div>
                  {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                      <span>Discount</span><span>−${discount.toFixed(0)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8A7A6A' }}>
                    <span>Shipping</span>
                    <span style={{ color: shipping === 0 ? '#16a34a' : '#1A1A1A', fontWeight: 600 }}>
                      {shipping === 0 ? 'Free' : `$${shipping}`}
                    </span>
                  </div>
                  <div style={{ height: '1px', background: '#E8DFC8', margin: '6px 0', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '40px', height: '1px', background: '#C9A84C' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#1A1A1A' }}>Total</span>
                    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 700, color: '#C9A84C' }}>${total.toFixed(0)}</span>
                  </div>
                </div>

                {/* Security */}
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E8DFC8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#8A7A6A' }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Secure & Trusted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive grid style */}
      <style>{`
        @media (max-width: 768px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
