import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

export default function ContactPage() {
  const { addMessage } = useProducts();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage(form);
    setSubmitted(true);
  };

  const WHATSAPP_NUMBER = '923002161412';

  const getWhatsAppMsg = () => {
    const name = form.name || 'Collector';
    const subject = form.subject || 'Atelier Inquiry';
    const message = form.message || 'Hello Amir! I would like to inquire about an original painting / custom art commission.';
    return encodeURIComponent(
      `Hello Amir! 🎨\n\nMy name is *${name}*\nSubject: *${subject}*\n\n${message}\n\n📧 ${form.email || ''}`
    );
  };

  return (
    <div style={{ background: '#FDFAF3', minHeight: '100vh' }} className="page-enter">
      {/* Header */}
      <div style={{
        background: '#1A1A1A',
        padding: '120px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.1 }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: 'rgba(255, 255, 255, 0.4)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '24px',
          }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-[#C9A84C]">Home</Link>
            <span>/</span>
            <span style={{ color: '#C9A84C' }}>Contact</span>
          </div>
          <p style={{
            color: '#C9A84C',
            fontSize: '11px',
            letterSpacing: '8px',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '16px',
          }}>
            Get in Touch
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '24px',
            lineHeight: 1.2,
          }}>
            We'd Love to Hear<br /><em className="gold-shimmer">From You.</em>
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '48px',
        }}>
          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <p style={{
                color: '#C9A84C',
                fontSize: '11px',
                letterSpacing: '6px',
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '12px',
              }}>
                Contact Details
              </p>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '32px',
                fontWeight: 700,
                color: '#1A1A1A',
                marginBottom: '20px',
              }}>
                Reach Out to Us
              </h2>
              <p style={{
                color: '#8A7A6A',
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                lineHeight: 1.7,
              }}>
                Whether you have a question about an artwork, want to commission a custom piece, or simply wish to share your appreciation — we are always happy to hear from you.
              </p>
            </div>

            {/* Contact cards */}
            {[
              {
                icon: '✉',
                label: 'Email',
                value: 'amircreator09@gmail.com',
                href: 'mailto:art@artgallery.com',
                description: 'Response within 24 hours',
              },
              {
                icon: '📱',
                label: 'WhatsApp',
                value: '+92 300 2161412',
                href: `https://wa.me/923002161412?text=${encodeURIComponent('Assalamu Alaikum! I would like to inquire about a custom calligraphy painting.')}`,
                description: 'For quick inquiries & custom orders',
              },
              {
                icon: '◎',
                label: 'Studio Location',
                value: 'Karachi, Sindh, Pakistan',
                href: '#map',
                description: 'Visit by appointment only',
              },
              {
                icon: '🕐',
                label: 'Working Hours',
                value: '24/7 Available',
                href: null,
              },
            ].map((item) => (
              <div key={item.label} style={{
                display: 'flex',
                alignItems: 'start',
                gap: '16px',
                padding: '20px',
                background: '#ffffff',
                border: '1px solid #E8DFC8',
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: '#F5EFE0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#C9A84C',
                  fontSize: '20px',
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{
                    color: '#8A7A6A',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '4px',
                  }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} style={{
                      color: '#1A1A1A',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      fontSize: '15px',
                      textDecoration: 'none',
                    }} className="hover:text-[#C9A84C]">
                      {item.value}
                    </a>
                  ) : (
                    <p style={{
                      color: '#1A1A1A',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      fontSize: '15px',
                    }}>{item.value}</p>
                  )}
                  <p style={{
                    color: '#8A7A6A',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    marginTop: '2px',
                  }}>{item.description}</p>
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              id="contact-whatsapp-btn"
              href={`https://wa.me/923002161412?text=${getWhatsAppMsg()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-pulse"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                width: '100%',
                padding: '16px',
                background: '#22c55e',
                color: '#ffffff',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#16a34a'}
              onMouseLeave={e => e.currentTarget.style.background = '#22c55e'}
            >
              <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div className="contact-form-card" style={{ background: '#ffffff', border: '1px solid #E8DFC8', padding: '32px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }} className="animate-fadeInUp">
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#C9A84C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '24px',
                  margin: '0 auto 24px',
                }}>
                  ✓
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#1A1A1A',
                  marginBottom: '12px',
                }}>
                  Message Sent!
                </h3>
                <p style={{
                  color: '#8A7A6A',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                }}>
                  JazakAllah Khair for reaching out. We will reply within 24 hours, InshaAllah.
                </p>
              </div>
            ) : (
              <>
                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#1A1A1A',
                  marginBottom: '8px',
                }}>
                  Send a Message
                </h2>
                <p style={{
                  color: '#8A7A6A',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  marginBottom: '32px',
                }}>
                  Fill in the form below and we'll get back to you as soon as possible.
                </p>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '11px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        color: '#8A7A6A',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '8px',
                      }}>
                        Full Name <span style={{ color: '#C9A84C' }}>*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        style={{
                          width: '100%',
                          border: '1px solid #D4C4A0',
                          background: '#FDFAF3',
                          padding: '12px 16px',
                          fontSize: '15px',
                          fontFamily: 'Inter, sans-serif',
                          color: '#1A1A1A',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '11px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        color: '#8A7A6A',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '8px',
                      }}>
                        Email Address <span style={{ color: '#C9A84C' }}>*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        style={{
                          width: '100%',
                          border: '1px solid #D4C4A0',
                          background: '#FDFAF3',
                          padding: '12px 16px',
                          fontSize: '15px',
                          fontFamily: 'Inter, sans-serif',
                          color: '#1A1A1A',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '11px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      color: '#8A7A6A',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '8px',
                    }}>
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        border: '1px solid #D4C4A0',
                        background: '#FDFAF3',
                        padding: '12px 16px',
                        fontSize: '15px',
                        fontFamily: 'Inter, sans-serif',
                        color: '#1A1A1A',
                        cursor: 'pointer',
                        boxSizing: 'border-box',
                      }}
                    >
                      <option value="">Select an inquiry topic</option>
                      <option value="Commission - Abstract Art">Commission: Abstract Expressionism Canvas</option>
                      <option value="Commission - Cubism">Commission: Modernist Cubism Artwork</option>
                      <option value="Commission - Miniature">Commission: Persian / Mughal Miniature Painting</option>
                      <option value="Commission - Calligraphy">Commission: Sacred Islamic Calligraphy</option>
                      <option value="Architectural / Interior Design">Interior Design / Corporate Collection</option>
                      <option value="Artwork Inquiry">Inquiry About Existing Gallery Piece</option>
                      <option value="Order & Shipping">Order Status & Insured Shipping</option>
                      <option value="Private Exhibition">Private Exhibition / Gallery Representation</option>
                      <option value="Other">Other Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '11px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      color: '#8A7A6A',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '8px',
                    }}>
                      Message <span style={{ color: '#C9A84C' }}>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your inquiry, custom request, or question..."
                      style={{
                        width: '100%',
                        border: '1px solid #D4C4A0',
                        background: '#FDFAF3',
                        padding: '12px 16px',
                        fontSize: '15px',
                        fontFamily: 'Inter, sans-serif',
                        color: '#1A1A1A',
                        resize: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="btn-ripple"
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: '#C9A84C',
                      color: '#1A1A1A',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      fontSize: '13px',
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Send Message ✦
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Map placeholder */}
        <div id="map" style={{
          marginTop: '64px',
          background: '#1A1A1A',
          height: '240px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.1 }} />
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
            <p style={{ color: '#C9A84C', fontSize: '24px', marginBottom: '8px' }}>◎</p>
            <p style={{
              color: '#ffffff',
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '4px',
            }}>
              Karachi, Sindh, Pakistan
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
