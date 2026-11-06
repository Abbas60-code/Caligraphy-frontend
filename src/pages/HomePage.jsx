import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categories, testimonials, features } from '../data/products';
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
        fontWeight: 600,
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
          color: light ? 'rgba(255,255,255,0.7)' : '#6B5E52',
          fontSize: '16px',
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1.75,
          maxWidth: '580px',
          margin: '0 auto',
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Hero Section with Multi-Movement Switcher ────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [activeMovement, setActiveMovement] = useState(0);

  const heroMovements = [
    {
      name: "Abstract Expressionism",
      tagline: "Emotion, Texture & Kinetic Motion",
      image: "/art/abstract_1.jpg",
      category: "abstract",
      accent: "#C9A84C",
    },
    {
      name: "Modernist Cubism",
      tagline: "Deconstructed Planes & Architectural Rhythms",
      image: "/art/cubism_1.jpg",
      category: "cubism",
      accent: "#E5A93C",
    },
    {
      name: "Royal Miniature Art",
      tagline: "Fine Heritage Detailing on Wasli Paper",
      image: "/art/miniature_1.jpg",
      category: "miniature",
      accent: "#D4AF37",
    },
    {
      name: "Sacred Calligraphy",
      tagline: "Classical Arabic Scripts in 24K Gold Leaf",
      image: "/calligraphy_allah.png",
      category: "calligraphy",
      accent: "#C9A84C",
    },
  ];

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Auto-cycle through movement showcase every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMovement((prev) => (prev + 1) % heroMovements.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroMovements.length]);

  const current = heroMovements[activeMovement];

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      paddingTop: '60px',
      paddingBottom: '40px',
    }}>
      {/* Background Image with Cross-fade transition */}
      <div
        key={current.image}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${current.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transition: 'opacity 1.2s ease-in-out',
          animation: 'fadeIn 1.2s ease forwards',
        }}
      />

      {/* Multi-layered dark & warm vignette overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(18,18,18,0.92) 0%, rgba(24,20,18,0.82) 45%, rgba(42,28,16,0.76) 100%)',
      }} />

      {/* Subtle geometric pattern overlay */}
      <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.12 }} />

      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        padding: '0 24px',
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%',
      }}>
        {/* Eyebrow */}
        <p style={{
          color: '#C9A84C',
          fontSize: '12px',
          letterSpacing: '8px',
          textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          marginBottom: '20px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}>
          ✦ The Multi-Disciplinary Fine Art Atelier ✦
        </p>

        {/* Main Headline */}
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(34px, 6.5vw, 76px)',
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1.15,
          marginBottom: '24px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s',
        }}>
          Transcending Canvases.<br />
          <span className="gold-shimmer">Abstract · Cubism · Miniature · Calligraphy.</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          color: 'rgba(255,255,255,0.78)',
          fontSize: 'clamp(15px, 2vw, 19px)',
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1.75,
          maxWidth: '720px',
          margin: '0 auto 36px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 1s ease 0.35s, transform 1s ease 0.35s',
        }}>
          Welcome to the atelier of Amir. Explore an extraordinary visual dialogue bridging the tactile energy of Abstract Expressionism, avant-garde Cubist perspectives, the heritage precision of Mughal Miniatures, and the divine grace of Sacred Calligraphy.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
          marginBottom: '48px',
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
            boxShadow: '0 8px 24px rgba(201,168,76,0.3)',
          }}>
            Explore All Collections
          </Link>
          <Link to="/contact" id="hero-custom-btn" style={{
            padding: '16px 40px',
            border: '1px solid rgba(255,255,255,0.5)',
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(8px)',
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '13px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'border-color 0.3s, background 0.3s',
          }}>
            Commission Custom Art
          </Link>
        </div>

        {/* Interactive Movement Selector Strip */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
          maxWidth: '850px',
          margin: '0 auto',
        }}>
          {heroMovements.map((m, idx) => {
            const isActive = idx === activeMovement;
            return (
              <button
                key={m.name}
                onClick={() => setActiveMovement(idx)}
                style={{
                  background: isActive ? 'rgba(201,168,76,0.22)' : 'rgba(255,255,255,0.06)',
                  border: isActive ? '1px solid #C9A84C' : '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  padding: '10px 16px',
                  borderRadius: '2px',
                  color: isActive ? '#C9A84C' : 'rgba(255,255,255,0.75)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '10px', color: isActive ? '#C9A84C' : 'rgba(255,255,255,0.4)' }}>◈</span>
                {m.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        zIndex: 10,
      }} className="animate-bounce">
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Explore</p>
        <div style={{ width: '1px', height: '30px', background: 'linear-gradient(to bottom, #C9A84C, transparent)' }} />
      </div>
    </section>
  );
}

// ─── Movement Collections Grid ───────────────────────────────────────────────
function MovementsGrid() {
  // Filter out "all" category for the grid cards
  const displayCategories = categories.filter(c => c.id !== 'all');

  return (
    <section style={{ padding: '100px 24px', background: '#181615', position: 'relative', overflow: 'hidden' }}>
      <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.06 }} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionHeader
          eyebrow="Curated Disciplines"
          title="Explore Artistic Movements"
          subtitle="Each movement is pursued with authentic historic mastery, archival mediums, and distinctive expressive voice."
          light
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {displayCategories.map((cat, i) => (
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
                borderRadius: '2px',
                border: '1px solid rgba(201,168,76,0.2)',
                background: '#201D1A',
                transition: 'border-color 0.4s, transform 0.4s',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
                <img
                  src={getOptimizedImageUrl(cat.image, 600)}
                  alt={cat.label}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.8s ease',
                  }}
                  className="group-hover:scale-110"
                />
                {/* Vignette Overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(16,14,12,0.95) 0%, rgba(16,14,12,0.4) 60%, transparent 100%)',
                }} />

                {/* Content Box */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      color: '#C9A84C',
                      fontSize: '11px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                    }}>
                      {cat.subtitle}
                    </span>
                    <span style={{
                      color: 'rgba(255,255,255,0.4)',
                      fontSize: '11px',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      {cat.count} Pieces
                    </span>
                  </div>

                  <h3 style={{
                    color: '#ffffff',
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '22px',
                    fontWeight: 700,
                    lineHeight: 1.25,
                    margin: 0,
                  }}>
                    {cat.label}
                  </h3>

                  <p style={{
                    color: 'rgba(255,255,255,0.65)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {cat.description}
                  </p>

                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      color: '#C9A84C',
                      fontSize: '11px',
                      fontFamily: 'Inter, sans-serif',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                    }}>
                      Explore Collection →
                    </span>
                  </div>
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
    <section style={{ padding: '100px 24px', background: '#F5EFE0' }}>
      <div className="artist-grid" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '64px',
        alignItems: 'center',
      }}>
        {/* Image side */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '-14px',
            left: '-14px',
            right: '14px',
            bottom: '14px',
            border: '1px solid rgba(201,168,76,0.4)',
            borderRadius: '4px',
          }} />
          <img
            src="/artist_portrait.png"
            alt="Amir – Multidisciplinary Master Artist"
            style={{
              display: 'block',
              width: '100%',
              maxHeight: '520px',
              objectFit: 'cover',
              objectPosition: 'center 5%',
              position: 'relative',
              borderRadius: '4px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
            }}
          />
          <div style={{
            position: 'absolute', bottom: '24px', right: '24px',
            background: '#1A1A1A', padding: '20px 24px', textAlign: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          }}>
            <p style={{ color: '#C9A84C', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '36px', fontWeight: 700, margin: 0 }}>15+</p>
            <p style={{ color: '#ffffff', fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '4px', margin: 0 }}>Years of Fine Art</p>
          </div>
        </div>

        {/* Text side */}
        <div>
          <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '6px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', fontWeight: 600, marginBottom: '14px' }}>
            The Atelier & Artist
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(30px, 3.5vw, 46px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, marginBottom: '20px' }}>
            A Multidisciplinary Journey<br /><em>Across Form and Spirit.</em>
          </h2>
          <div style={{ width: '60px', height: '2px', background: 'linear-gradient(to right, #C9A84C, #E8C97A)', marginBottom: '24px' }} />

          <p style={{ color: '#5C5046', fontFamily: 'Inter, sans-serif', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
            Amir is a contemporary multidisciplinary artist and calligrapher based in Karachi. Unbounded by a single genre, his studio bridges the meticulous heritage of South Asian Mughal miniature painting, the structural geometry of analytical cubism, the emotional kinetic freedom of modern abstract expressionism, and the sacred beauty of classical Islamic calligraphy.
          </p>

          <p style={{ color: '#5C5046', fontFamily: 'Inter, sans-serif', fontSize: '15px', lineHeight: 1.75, marginBottom: '28px' }}>
            Whether grinding rare lapis lazuli for a single-hair brush miniature, laying 24-karat gold leaf upon Thuluth script, or wielding heavy palette knives in thick impasto oil, every canvas is crafted with museum-grade archival standards for discerning private collectors worldwide.
          </p>

          {/* Stats */}
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', marginBottom: '36px' }}>
            {[
              { num: '500+', label: 'Original Works' },
              { num: '85+', label: 'Countries Shipped' },
              { num: '4.9★', label: 'Collector Rating' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center', background: '#FDFAF3', padding: '14px 10px', border: '1px solid #E8DFC8' }}>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: 700, color: '#C9A84C', margin: 0 }}>{stat.num}</p>
                <p style={{ color: '#8A7A6A', fontFamily: 'Inter, sans-serif', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '4px', margin: 0 }}>{stat.label}</p>
              </div>
            ))}
          </div>

          <Link to="/about" style={{
            display: 'inline-block',
            padding: '14px 36px',
            background: '#1A1A1A',
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '12px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            Read Full Artist Biography →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Atelier Standards & Values ───────────────────────────────────────────────
function WhyUs() {
  return (
    <section style={{ padding: '96px 24px', background: '#ffffff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Our Commitment"
          title="The Atelier Standard"
          subtitle="Every artwork is a certified original, created with archival integrity to be treasured across generations."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
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
              <p style={{ color: '#6B5E52', fontFamily: 'Inter, sans-serif', fontSize: '15px', lineHeight: 1.7 }}>
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
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[active];

  return (
    <section style={{ padding: '96px 24px', background: '#1A1A1A', position: 'relative', overflow: 'hidden' }}>
      <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.08 }} />
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <SectionHeader eyebrow="Collector Reviews" title="Voices of Patrons & Curators" light />

        {/* Testimonial card */}
        <div key={active} className="animate-fadeIn">
          {/* Avatar / Initials */}
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: '#C9A84C',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '20px', fontWeight: 700, color: '#1A1A1A',
          }}>
            {current.initials}
          </div>

          {/* Stars */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '16px' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} width="18" height="18" fill="#C9A84C" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Acquired Art Type Badge */}
          {current.artType && (
            <p style={{
              color: '#C9A84C',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              marginBottom: '16px',
            }}>
              Acquired: {current.artType}
            </p>
          )}

          <blockquote style={{
            color: 'rgba(255,255,255,0.86)',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            lineHeight: 1.7,
            fontStyle: 'italic',
            marginBottom: '24px',
          }}>
            "{current.review}"
          </blockquote>

          <p style={{ color: '#C9A84C', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '15px', margin: 0 }}>{current.name}</p>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif', fontSize: '13px', marginTop: '4px' }}>{current.location}</p>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '36px' }}>
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

// ─── Newsletter / Collector Circle ───────────────────────────────────────────
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
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubmitted(true);
        setEmail('');
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.message || 'Failed to subscribe. Please try again.');
      }
    } catch {
      // Gracefully acknowledge even if backend is offline
      setSubmitted(true);
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: '96px 24px', background: '#F5EFE0', position: 'relative', overflow: 'hidden' }}>
      <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.12 }} />
      <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '6px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', fontWeight: 600, marginBottom: '12px' }}>
          Private Previews
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 700, color: '#1A1A1A', marginBottom: '16px' }}>
          Join The Collectors Circle
        </h2>
        <p style={{ color: '#6B5E52', fontFamily: 'Inter, sans-serif', fontSize: '16px', lineHeight: 1.75, marginBottom: '36px' }}>
          Receive exclusive early previews of new Abstract canvases, Cubist releases, royal Miniature folios, and custom commission availability directly to your inbox.
        </p>

        {submitted ? (
          <div style={{ padding: '28px', border: '1px solid #C9A84C', background: '#ffffff', textAlign: 'center' }}>
            <p style={{ color: '#C9A84C', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>Welcome to the Circle ✦</p>
            <p style={{ color: '#6B5E52', fontFamily: 'Inter, sans-serif', fontSize: '15px' }}>Thank you. You will receive private previews and exhibition catalog releases.</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '520px', margin: '0 auto' }}>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                style={{
                  flex: '1 1 240px',
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
                  fontSize: '12px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? 'Joining...' : 'Subscribe'}
              </button>
            </form>
            {error && <p style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>{error}</p>}
          </>
        )}

        <p style={{ color: '#8A7A6A', fontFamily: 'Inter, sans-serif', fontSize: '13px', marginTop: '16px' }}>
          Respecting collector confidentiality. Strictly no spam, unsubscribe anytime.
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
      <MovementsGrid />
      <ArtistStrip />
      <WhyUs />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
