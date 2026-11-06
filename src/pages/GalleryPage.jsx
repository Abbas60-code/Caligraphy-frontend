import { Link } from 'react-router-dom';
import { categories } from '../data/products';

export default function GalleryPage() {
  return (
    <div style={{ background: '#FDFAF3', minHeight: '100vh' }} className="page-enter">

      {/* Page Header */}
      <div style={{
        background: '#161413',
        padding: '120px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.08 }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

          {/* Breadcrumb */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: 'rgba(255,255,255,0.45)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '24px',
          }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span style={{ color: '#C9A84C' }}>Fine Art Collections</span>
          </div>

          <p style={{
            color: '#C9A84C',
            fontSize: '11px',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            marginBottom: '16px',
          }}>
            The Multi-Disciplinary Atelier
          </p>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '20px',
            lineHeight: 1.15,
          }}>
            The Fine Art Gallery
          </h1>

          <div style={{
            width: '60px',
            height: '2px',
            background: 'linear-gradient(to right, #C9A84C, #E8C97A)',
            margin: '0 auto 24px',
          }} />

          <p style={{
            color: 'rgba(255,255,255,0.72)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '17px',
            lineHeight: 1.75,
            maxWidth: '680px',
            margin: '0 auto',
          }}>
            Curated original canvases spanning Abstract Expressionism, Modernist Cubism,
            fine Persian & Mughal Miniature painting, and Sacred Islamic Calligraphy.
          </p>
        </div>
      </div>

      {/* Art Movements Section */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 24px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{
            color: '#C9A84C',
            fontSize: '11px',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            marginBottom: '12px',
          }}>
            Curated Disciplines
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            color: '#1A1A1A',
            marginBottom: '16px',
          }}>
            Explore Artistic Movements
          </h2>
          <div style={{
            width: '60px', height: '2px',
            background: 'linear-gradient(to right, #C9A84C, #E8C97A)',
            margin: '0 auto 20px',
          }} />
          <p style={{
            color: '#6B5E52',
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            lineHeight: 1.75,
            maxWidth: '560px',
            margin: '0 auto',
          }}>
            Each movement is pursued with authentic historic mastery, archival mediums,
            and a distinctive expressive voice.
          </p>
        </div>

        {/* Category Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '28px',
          marginBottom: '72px',
        }}>
          {categories.filter(c => c.id !== 'all').map((cat, i) => (
            <div
              key={cat.id}
              style={{
                background: '#ffffff',
                border: '1px solid #E8DFC8',
                padding: '40px 32px',
                textAlign: 'center',
                opacity: 0,
                animation: `fadeInUp 0.6s ease ${i * 0.1}s forwards`,
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              className="card-hover"
            >
              <div style={{
                width: '60px', height: '60px',
                borderRadius: '50%',
                background: '#F5EFE0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '26px',
              }}>
                {cat.id === 'calligraphy' ? '✍️' :
                 cat.id === 'abstract' ? '🎨' :
                 cat.id === 'cubism' ? '◈' :
                 cat.id === 'miniature' ? '🖌️' : '✨'}
              </div>
              <p style={{
                color: '#C9A84C',
                fontSize: '10px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                marginBottom: '10px',
              }}>
                {cat.arabic}
              </p>
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '22px',
                fontWeight: 700,
                color: '#1A1A1A',
                marginBottom: '12px',
              }}>
                {cat.label}
              </h3>
              <div style={{
                width: '40px', height: '1px',
                background: '#C9A84C',
                margin: '0 auto 16px',
              }} />
              <p style={{
                color: '#8A7A6A',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                lineHeight: 1.7,
                marginBottom: '24px',
              }}>
                {cat.id === 'calligraphy'
                  ? 'Sacred Arabic scripts rendered in 24-karat gold leaf, mineral inks, and classical Thuluth & Diwani styles.'
                  : cat.id === 'abstract'
                  ? 'Gestural, expressive canvases capturing emotion, texture, and kinetic energy through bold pigment and palette knife.'
                  : cat.id === 'cubism'
                  ? 'Structural deconstruction of form through multifaceted planes, rhythmic geometry, and chiaroscuro depth.'
                  : cat.id === 'miniature'
                  ? 'Heritage-faithful Mughal & Persian miniatures painted with single-hair brushes on treated wasli paper.'
                  : 'Contemporary fusion bridging traditional eastern aesthetics with modern expressive techniques.'}
              </p>
              <Link
                to="/contact"
                style={{
                  display: 'inline-block',
                  padding: '11px 28px',
                  background: '#1A1A1A',
                  color: '#ffffff',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'background 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#C9A84C'}
                onMouseLeave={e => e.currentTarget.style.background = '#1A1A1A'}
              >
                Inquire →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Commission CTA */}
      <div style={{
        background: '#1A1A1A',
        padding: '80px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.08 }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{
            color: '#C9A84C',
            fontSize: '11px',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            marginBottom: '16px',
          }}>
            Bespoke Atelier
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '20px',
            lineHeight: 1.2,
          }}>
            Commission Your Original Artwork
          </h2>
          <div style={{
            width: '60px', height: '2px',
            background: 'linear-gradient(to right, #C9A84C, #E8C97A)',
            margin: '0 auto 24px',
          }} />
          <p style={{
            color: 'rgba(255,255,255,0.72)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            lineHeight: 1.75,
            marginBottom: '36px',
          }}>
            Every artwork can be commissioned to your preferred dimensions, colour palette,
            and spiritual or aesthetic vision. Contact Amir directly to begin.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-block',
                padding: '16px 44px',
                background: '#C9A84C',
                color: '#1A1A1A',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(201,168,76,0.25)',
              }}
            >
              Commission Artwork →
            </Link>
            <a
              href="https://wa.me/923002161412"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 36px',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#ffffff',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#25D366'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
