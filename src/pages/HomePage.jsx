import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categories, testimonials, features } from '../data/products';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { getOptimizedImageUrl } from '../utils/image';

// ─── Shared section header ────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, subtitle, light = false }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
      <p style={{
        color: '#C9A84C',
        fontSize: '11px',
        letterSpacing: '6px',
        textTransform: 'uppercase',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        marginBottom: '12px',
      }}>
        {eyebrow}
      </p>
      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 'clamp(30px, 4vw, 48px)',
        fontWeight: 700,
        color: light ? '#ffffff' : '#1A1A1A',
        lineHeight: 1.2,
        marginBottom: '16px',
      }}>
        {title}
      </h2>
      {/* Gold underline */}
      <div style={{
        width: '60px',
        height: '2px',
        background: 'linear-gradient(to right, #C9A84C, #E8C97A)',
        margin: '0 auto 20px',
      }} />
      {subtitle && (
        <p style={{
          color: light ? 'rgba(255,255,255,0.65)' : '#8A7A6A',
          fontSize: '16px',
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1.7,
          maxWidth: '520px',
          margin: '0 auto',
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 120); return () => clearTimeout(t); }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* BG image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('/calligraphy_allah.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }} />
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(26,26,26,0.88) 0%, rgba(26,26,26,0.62) 50%, rgba(107,74,42,0.45) 100%)',
      }} />
      {/* Pattern overlay */}
      <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.18 }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        padding: '0 24px',
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%',
      }}>
        <p style={{
          color: '#C9A84C',
          fontSize: '11px',
          letterSpacing: '8px',
          textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          marginBottom: '24px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}>
          ✦ Handcrafted Islamic Art ✦
        </p>

        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(36px, 7vw, 84px)',
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1.15,
          marginBottom: '24px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s',
        }}>
          Timeless Islamic{' '}
          <span className="gold-shimmer">Calligraphy</span>,<br />
          Crafted with Passion.
        </h1>

        <p style={{
          color: 'rgba(255,255,255,0.72)',
          fontSize: 'clamp(15px, 2vw, 19px)',
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1.75,
          maxWidth: '580px',
          margin: '0 auto 40px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 1s ease 0.35s, transform 1s ease 0.35s',
        }}>
          Each painting is a soulful expression of faith — hand-painted with devotion, using the finest materials, destined to grace your sacred spaces.
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 1s ease 0.5s, transform 1s ease 0.5s',
        }}>
          <Link to="/gallery" id="hero-shop-btn" className="btn-ripple" style={{
            padding: '16px 40px',
            background: '#C9A84C',
            color: '#1A1A1A',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'inline-block',
          }}>
            Shop Collection
          </Link>
          <Link to="/contact" id="hero-custom-btn" style={{
            padding: '16px 40px',
            border: '1px solid rgba(255,255,255,0.5)',
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '13px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'border-color 0.3s, color 0.3s',
          }}>
            Custom Orders
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }} className="animate-bounce">
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Scroll</p>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #C9A84C, transparent)' }} />
      </div>
    </section>
  );
}

// ─── Featured Products ────────────────────────────────────────────────────────
function FeaturedProducts() {
  const { products } = useProducts();
  const featured = products.filter((p) => p.featured);
  return (
    <section style={{ padding: '96px 24px', background: '#FDFAF3' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Our Masterpieces"
          title="Featured Paintings"
          subtitle="Discover our most beloved handmade artworks, each a testament to centuries of Islamic calligraphic tradition."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '24px',
        }}>
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link to="/gallery" style={{
            display: 'inline-block',
            padding: '14px 40px',
            border: '1px solid #1A1A1A',
            color: '#1A1A1A',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '13px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'background 0.3s, color 0.3s',
          }}>
            View All Works →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Categories ───────────────────────────────────────────────────────────────
function Categories() {
  const catImages = {
    'allah-names': '/calligraphy_allah.png',
    'quranic-verses': '/calligraphy_bismillah.png',
    'arabic-calligraphy': '/calligraphy_ayatul_kursi.png',
    'modern-islamic': '/calligraphy_modern.png',
    custom: '/calligraphy_allah.png',
  };

  return (
    <section style={{ padding: '96px 24px', background: '#1A1A1A', position: 'relative', overflow: 'hidden' }}>
      <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.08 }} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionHeader eyebrow="Explore Collections" title="Browse by Category" light />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/gallery?category=${cat.id}`}
              className="group"
              style={{
                display: 'block',
                textDecoration: 'none',
                opacity: 0,
                animation: `fadeInUp 0.6s ease ${i * 0.1}s forwards`,
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '3/4' }}>
                <img
                  src={getOptimizedImageUrl(catImages[cat.id], 600)}
                  alt={cat.label}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s ease' }}
                  className="group-hover:scale-110"
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)',
                }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 16px', textAlign: 'center' }}>
                  <p style={{ color: '#C9A84C', fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '22px', marginBottom: '4px' }}>
                    {cat.arabicLabel}
                  </p>
                  <h3 style={{ color: '#ffffff', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '14px', fontWeight: 700 }}>
                    {cat.label}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif', fontSize: '12px', marginTop: '4px' }}>
                    {cat.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Artist ─────────────────────────────────────────────────────────────
function ArtistStrip() {
  return (
    <section style={{ padding: '96px 24px', background: '#F5EFE0' }}>
      <div className="artist-grid" style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
        {/* Image side */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-14px', left: '-14px', right: '14px', bottom: '14px', border: '1px solid rgba(201,168,76,0.4)', borderRadius: '8px' }} />
          <img
            src="/artist_portrait.png"
            alt="Amir – Master Calligrapher"
            style={{ display: 'block', width: '100%', maxHeight: '500px', objectFit: 'cover', objectPosition: 'center 5%', position: 'relative', borderRadius: '8px' }}
          />
          <div style={{
            position: 'absolute', bottom: '24px', right: '24px',
            background: '#1A1A1A', padding: '20px 24px', textAlign: 'center',
          }}>
            <p style={{ color: '#C9A84C', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '36px', fontWeight: 700 }}>15+</p>
            <p style={{ color: '#ffffff', fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '4px' }}>Years of Mastery</p>
          </div>
        </div>

        {/* Text side */}
        <div>
          <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '6px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', fontWeight: 500, marginBottom: '16px' }}>
            The Artist
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(30px, 3.5vw, 46px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, marginBottom: '24px' }}>
            A Devotion<br /><em>Written in Ink.</em>
          </h2>
          <div style={{ width: '60px', height: '2px', background: 'linear-gradient(to right, #C9A84C, #E8C97A)', marginBottom: '28px' }} />
          <p style={{ color: '#8A7A6A', fontFamily: 'Inter, sans-serif', fontSize: '16px', lineHeight: 1.8, marginBottom: '18px' }}>
            My name is Amir, and I have spent over 15 years mastering the sacred art of Islamic calligraphy under the guidance of renowned masters in Karachi, Pakistan. Each piece I create is an act of worship — a prayer rendered in ink.
          </p>
          

          {/* Stats */}
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '36px' }}>
            {[
              { num: '500+', label: 'Works Created' },
              { num: '80+', label: 'Countries Served' },
              { num: '4.9★', label: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '30px', fontWeight: 700, color: '#C9A84C' }}>{stat.num}</p>
                <p style={{ color: '#8A7A6A', fontFamily: 'Inter, sans-serif', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '4px' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          <Link to="/about" style={{
            display: 'inline-block',
            padding: '14px 36px',
            background: '#1A1A1A',
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '13px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            Full Story →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyUs() {
  return (
    <section style={{ padding: '96px 24px', background: '#ffffff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <SectionHeader eyebrow="Our Promise" title="Why Choose Us" />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '28px',
        }}>
          {features.map((feat, i) => (
            <div
              key={feat.title}
              style={{
                padding: '36px 32px',
                border: '1px solid #E8DFC8',
                background: '#ffffff',
                opacity: 0,
                animation: `fadeInUp 0.6s ease ${i * 0.1}s forwards`,
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              className="card-hover"
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#F5EFE0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: '#C9A84C',
                marginBottom: '20px',
              }}>
                {feat.icon}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 700, color: '#1A1A1A', marginBottom: '12px' }}>
                {feat.title}
              </h3>
              <p style={{ color: '#8A7A6A', fontFamily: 'Inter, sans-serif', fontSize: '15px', lineHeight: 1.7 }}>
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[active];

  return (
    <section style={{ padding: '96px 24px', background: '#1A1A1A', position: 'relative', overflow: 'hidden' }}>
      <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.08 }} />
      <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <SectionHeader eyebrow="What Collectors Say" title="Voices of the Community" light />

        {/* Testimonial card */}
        <div key={active} className="animate-fadeIn">
          {/* Avatar */}
          <div style={{
            width: '70px', height: '70px', borderRadius: '50%',
            background: '#C9A84C',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '22px', fontWeight: 700, color: '#1A1A1A',
          }}>
            {current.initials}
          </div>

          {/* Stars */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '24px' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} width="20" height="20" fill="#C9A84C" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <blockquote style={{
            color: 'rgba(255,255,255,0.82)',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            lineHeight: 1.7,
            fontStyle: 'italic',
            marginBottom: '28px',
          }}>
            "{current.review}"
          </blockquote>

          <p style={{ color: '#C9A84C', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '15px' }}>{current.name}</p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif', fontSize: '13px', marginTop: '4px' }}>{current.location}</p>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px' }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`testimonial-dot ${i === active ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Newsletter ───────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setError('');
    
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:9000';
    try {
      const res = await fetch(`${apiBase}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setSubmitted(true);
        setEmail('');
      } else {
        setError(data.message || 'Failed to subscribe. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: '96px 24px', background: '#F5EFE0', position: 'relative', overflow: 'hidden' }}>
      <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.18 }} />
      <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '6px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', fontWeight: 500, marginBottom: '12px' }}>
          Stay Connected
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 700, color: '#1A1A1A', marginBottom: '16px' }}>
          Join Our Circle
        </h2>
        <p style={{ color: '#8A7A6A', fontFamily: 'Inter, sans-serif', fontSize: '16px', lineHeight: 1.75, marginBottom: '40px' }}>
          Subscribe to receive exclusive offers, new artwork previews, and stories of Islamic calligraphy delivered to your inbox.
        </p>

        {submitted ? (
          <div style={{ padding: '28px', border: '1px solid #C9A84C', background: '#ffffff', textAlign: 'center' }}>
            <p style={{ color: '#C9A84C', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>JazakAllah Khair ✦</p>
            <p style={{ color: '#8A7A6A', fontFamily: 'Inter, sans-serif', fontSize: '15px' }}>You've been added to our community. Welcome!</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '520px', margin: '0 auto' }}>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                style={{
                  flex: '1 1 220px',
                  padding: '14px 20px',
                  border: '1px solid #D4C4A0',
                  background: '#ffffff',
                  color: '#1A1A1A',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  outline: 'none',
                }}
              />
              <button
                id="newsletter-submit-btn"
                type="submit"
                disabled={loading}
                className="btn-ripple"
                style={{
                  padding: '14px 32px',
                  background: '#C9A84C',
                  color: '#1A1A1A',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {error && <p style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>{error}</p>}
          </>
        )}

        <p style={{ color: '#8A7A6A', fontFamily: 'Inter, sans-serif', fontSize: '13px', marginTop: '16px' }}>
          No spam, unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="page-enter">
      <Hero />
      <FeaturedProducts />
      <Categories />
      <ArtistStrip />
      <WhyUs />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
