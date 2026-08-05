import { Link } from 'react-router-dom';
import { features } from '../data/products';

export default function AboutPage() {
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
            <span style={{ color: '#C9A84C' }}>About</span>
          </div>
          <p style={{
            color: '#C9A84C',
            fontSize: '11px',
            letterSpacing: '8px',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '16px',
          }}>
            The Story
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '24px',
            lineHeight: 1.2,
          }}>
            A Life Devoted to<br /><em>Sacred Art.</em>
          </h1>
          <div style={{
            width: '80px',
            height: '2px',
            background: 'linear-gradient(to right, #C9A84C, #E8C97A)',
            margin: '0 auto',
          }} />
        </div>
      </div>

      {/* Main Story */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '64px',
          alignItems: 'center',
        }}>
          {/* Image */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '-16px',
              left: '-16px',
              right: '16px',
              bottom: '16px',
              border: '1px solid rgba(201, 168, 76, 0.4)',
              borderRadius: '8px',
            }} />
            <img
              src="/artist_portrait.png"
              alt="Amir – Master Calligrapher"
              style={{
                width: '100%',
                maxHeight: '550px',
                objectFit: 'cover',
                objectPosition: 'center 5%',
                display: 'block',
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                borderRadius: '8px',
              }}
            />
            {/* Floating quote */}
            <div className="about-floating-quote" style={{
              position: 'absolute',
              bottom: '-24px',
              right: '-24px',
              background: '#C9A84C',
              padding: '24px',
              maxWidth: '300px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: '#1A1A1A',
                fontSize: '15px',
                fontStyle: 'italic',
                lineHeight: 1.6,
              }}>
                "Every stroke is a prayer. Every painting is a gift to the one who gazes upon it."
              </p>
              <p style={{
                color: '#1A1A1A',
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                marginTop: '12px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}>
                — Amir
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div style={{ padding: '20px 0' }}>
            <p style={{
              color: '#C9A84C',
              fontSize: '11px',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '16px',
            }}>
              My Journey
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 700,
              color: '#1A1A1A',
              marginBottom: '24px',
              lineHeight: 1.25,
            }}>
              From Karachi to the<br />World Stage
            </h2>
            <div style={{
              color: '#8A7A6A',
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              lineHeight: 1.8,
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}>
              <p>
                I was born into a family of scholars and artists in Karachi, Pakistan. My grandfather, a gifted Quranic scribe, placed a reed pen in my five-year-old hands and whispered, "The pen is mightier than the sword, and more beautiful than both."
              </p>
              <p>
                I spent my formative years studying under the legendary Artist Mashqoor Raza.
              </p>
              <p>
                After 15 years of dedicated study and practice, I returned home with one mission: to share the transcendent beauty of Islamic calligraphy with the world, not locked away in museums, but hanging in your living room, your office, your heart.
              </p>
              <p>
                Each painting I create is a devotion — a meditation — a gift. I use only the finest materials: archival canvases, 24-karat gold leaf, botanical inks ground to recipe. But it is the intention behind every stroke that truly elevates the work.
              </p>
            </div>

            {/* Stats */}
            <div className="about-stats-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginTop: '36px',
              borderTop: '1px solid #E8DFC8',
              paddingTop: '24px',
            }}>
              {[
                { num: '15+', label: 'Years of Mastery' },
                { num: '500+', label: 'Paintings Created' },
                { num: '80+', label: 'Countries Shipped' },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <p style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#C9A84C',
                  }}>{stat.num}</p>
                  <p style={{
                    color: '#8A7A6A',
                    fontSize: '11px',
                    fontFamily: 'Inter, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginTop: '4px',
                  }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '96px 24px', background: '#1A1A1A', position: 'relative' }}>
        <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.08 }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{
              color: '#C9A84C',
              fontSize: '11px',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '12px',
            }}>
              Craftsmanship
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 700,
              color: '#ffffff',
            }}>
              The Creative Process
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px',
          }}>
            {[
              { num: '01', title: 'Intention', desc: 'Every work begins with a prayer and a clear intention — this is the foundation of all sacred art.' },
              { num: '02', title: 'Design', desc: 'Weeks of sketching and refining the composition, studying classical examples, finding the perfect balance.' },
              { num: '03', title: 'Painting', desc: 'Hand-painted with the finest inks and gold leaf, using traditional reed pens and custom brushes.' },
              { num: '04', title: 'Finishing', desc: 'Each piece is sealed, framed with care, and individually inspected before it is ever offered for sale.' },
            ].map((step, i) => (
              <div key={step.num} style={{
                textAlign: 'center',
                opacity: 0,
                animation: `fadeInUp 0.6s ease ${i * 0.15}s forwards`,
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '1px solid rgba(201, 168, 76, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <span style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#C9A84C',
                  }}>{step.num}</span>
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '12px',
                }}>{step.title}</h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.7,
                }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section style={{ padding: '96px 24px', background: '#F5EFE0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            color: '#C9A84C',
            fontSize: '11px',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '12px',
          }}>
            Training & Recognition
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            color: '#1A1A1A',
            marginBottom: '48px',
          }}>
            Credentials
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}>
            {[
              { year: '2008', title: 'Traditional Calligraphy Certificate', org: 'Karachi Calligraphy Institute' },
              { year: '2013', title: 'Ottoman Thuluth Mastery', org: 'Karachi Fine Arts Academy' },
              { year: '2018', title: 'International Calligraphy Award', org: 'Islamic Arts Foundation, Islamabad' },
            ].map((cred) => (
              <div key={cred.year} style={{
                background: '#ffffff',
                border: '1px solid #E8DFC8',
                padding: '24px',
                textAlign: 'center',
              }}>
                <p style={{
                  color: '#C9A84C',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}>{cred.year}</p>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#1A1A1A',
                  marginBottom: '8px',
                }}>{cred.title}</h3>
                <p style={{
                  color: '#8A7A6A',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                }}>{cred.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '96px 24px', background: '#ffffff', textAlign: 'center' }}>
        <p style={{
          color: '#C9A84C',
          fontSize: '11px',
          letterSpacing: '6px',
          textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif',
          marginBottom: '16px',
        }}>
          Commission a Piece
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 700,
          color: '#1A1A1A',
          marginBottom: '24px',
        }}>
          Let's Create Something Beautiful
        </h2>
        <p style={{
          color: '#8A7A6A',
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          lineHeight: 1.7,
          maxWidth: '560px',
          margin: '0 auto 40px',
        }}>
          Whether for a gift, a new home, or a sacred space — I would be honored to craft a bespoke calligraphy painting just for you.
        </p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
        }}>
          <Link
            to="/contact"
            style={{
              padding: '16px 36px',
              background: '#C9A84C',
              color: '#1A1A1A',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Request Custom Order
          </Link>
          <Link
            to="/gallery"
            style={{
              padding: '16px 36px',
              border: '1px solid #1A1A1A',
              color: '#1A1A1A',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '13px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Browse Gallery
          </Link>
        </div>
      </section>
    </div>
  );
}
