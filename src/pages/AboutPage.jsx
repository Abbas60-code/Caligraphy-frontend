import { Link } from 'react-router-dom';
import { features } from '../data/products';

export default function AboutPage() {
  return (
    <div style={{ background: '#FDFAF3', minHeight: '100vh' }} className="page-enter">
      {/* Header */}
      <div style={{
        background: '#161413',
        padding: '120px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.08 }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '850px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: 'rgba(255, 255, 255, 0.45)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '20px',
          }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-[#C9A84C]">Home</Link>
            <span>/</span>
            <span style={{ color: '#C9A84C' }}>The Artist</span>
          </div>

          <p style={{
            color: '#C9A84C',
            fontSize: '11px',
            letterSpacing: '8px',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            marginBottom: '16px',
          }}>
            Atelier Biography
          </p>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '24px',
            lineHeight: 1.2,
          }}>
            A Multidisciplinary Life<br /><em>Dedicated to Fine Art.</em>
          </h1>

          <div style={{
            width: '80px',
            height: '2px',
            background: 'linear-gradient(to right, #C9A84C, #E8C97A)',
            margin: '0 auto',
          }} />
        </div>
      </div>

      {/* Main Story Section */}
      <section style={{ padding: '96px 24px' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
              borderRadius: '6px',
            }} />
            <img
              src="/artist_portrait.png"
              alt="Amir – Multidisciplinary Master Artist"
              style={{
                width: '100%',
                maxHeight: '560px',
                objectFit: 'cover',
                objectPosition: 'center 5%',
                display: 'block',
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                borderRadius: '6px',
              }}
            />
            {/* Floating quote */}
            <div className="about-floating-quote" style={{
              position: 'absolute',
              bottom: '-24px',
              right: '-16px',
              background: '#1A1A1A',
              border: '1px solid #C9A84C',
              padding: '24px',
              maxWidth: '320px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: '#ffffff',
                fontSize: '16px',
                fontStyle: 'italic',
                lineHeight: 1.6,
                margin: '0 0 10px',
              }}>
                "True art refuses to be caged in one genre. Whether carving space in cubism, releasing spirit in abstract fields, or illuminating sacred words, the canvas is an infinite horizon."
              </p>
              <p style={{
                color: '#C9A84C',
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                margin: 0,
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
              fontWeight: 600,
              marginBottom: '16px',
            }}>
              The Atelier Vision
            </p>

            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 700,
              color: '#1A1A1A',
              marginBottom: '24px',
              lineHeight: 1.25,
            }}>
              Bridging Heritage Discipline<br />and Avant-Garde Expression
            </h2>

            <div style={{
              color: '#5C5046',
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              lineHeight: 1.8,
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}>
              <p>
                Born into a family steeped in visual arts in Karachi, Amir began his artistic journey under the mentorship of celebrated modern master painter <strong>Mashqoor Raza</strong>. Studying Raza’s radical approach to figurative abstraction, bold impasto, and cubist form deconstruction gave Amir an uncompromising love for modernist aesthetics and dynamic movement.
              </p>
              <p>
                Simultaneously, Amir immersed himself in the deep discipline of classical South Asian miniature painting on handmade wasli paper, alongside formal training in traditional Ottoman Thuluth, Diwani, and Kufic calligraphy. 
              </p>
              <p>
                Over 15 years of relentless studio practice have culminated in a rare multidisciplinary portfolio: canvases that oscillate naturally between the untamed emotional energy of Abstract Expressionism, the structured intellectual rhythm of Cubism, the microscopic gold-leaf delicacy of Mughal miniatures, and the transcendent serenity of Islamic script.
              </p>
              <p>
                Today, Amir’s original works grace prestigious private residences, corporate collections, and embassies in more than 85 countries worldwide.
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
                { num: '500+', label: 'Original Works' },
                { num: '85+', label: 'Countries Shipped' },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <p style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#C9A84C',
                    margin: 0,
                  }}>{stat.num}</p>
                  <p style={{
                    color: '#8A7A6A',
                    fontSize: '11px',
                    fontFamily: 'Inter, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginTop: '4px',
                    margin: 0,
                  }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Four Disciplines of the Atelier */}
      <section style={{ padding: '96px 24px', background: '#161413', position: 'relative' }}>
        <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.06 }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{
              color: '#C9A84C',
              fontSize: '11px',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              marginBottom: '12px',
            }}>
              Core Movements
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 700,
              color: '#ffffff',
            }}>
              Four Pillars of the Atelier
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '28px',
          }}>
            {[
              {
                num: '01',
                title: 'Abstract Expressionism',
                desc: 'Heavy impasto, textured palette knives, and spontaneous emotive color fields exploring raw visual psychology.',
                accent: 'Ultramarine, Burnt Sienna & Gold Dust',
              },
              {
                num: '02',
                title: 'Modernist Cubism',
                desc: 'Deconstructing subjects into geometric planes and multifaceted perspectives inspired by 20th-century avant-garde masters.',
                accent: 'Sepia, Slate & Geometric Planes',
              },
              {
                num: '03',
                title: 'Persian & Mughal Miniature',
                desc: 'Exacting single-hair squirrel brushwork on treated wasli paper with ground lapis lazuli, malachite, and shell gold.',
                accent: 'Wasli Paper, Mineral Pigment & 24K Leaf',
              },
              {
                num: '04',
                title: 'Sacred Calligraphy',
                desc: 'Centuries of classical Thuluth, Diwani, and Kufic script mastered with meditation, devotion, and botanical inks.',
                accent: '24K Gold Leaf, Oak Gall Inks on Canvas',
              },
            ].map((pillar, i) => (
              <div key={pillar.num} style={{
                background: '#201D1A',
                border: '1px solid rgba(201,168,76,0.25)',
                padding: '36px 28px',
                borderRadius: '2px',
                opacity: 0,
                animation: `fadeInUp 0.6s ease ${i * 0.15}s forwards`,
              }}>
                <div style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#C9A84C',
                  marginBottom: '16px',
                }}>
                  {pillar.num}
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '12px',
                }}>
                  {pillar.title}
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.65)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  marginBottom: '20px',
                }}>
                  {pillar.desc}
                </p>
                <div style={{
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  paddingTop: '14px',
                  color: '#C9A84C',
                  fontSize: '11px',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  ✦ {pillar.accent}
                </div>
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
            fontWeight: 600,
            marginBottom: '12px',
          }}>
            Recognition & Exhibitions
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            color: '#1A1A1A',
            marginBottom: '48px',
          }}>
            Selected Milestones
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}>
            {[
              { year: '2010', title: 'Classical Miniature & Calligraphy Certification', org: 'Karachi Fine Arts Council' },
              { year: '2016', title: 'Contemporary Expressionism Solo Showcase', org: 'Indus Arts Gallery, Karachi' },
              { year: '2021', title: 'International Sacred Arts Recognition', org: 'Islamic Arts Foundation, Islamabad' },
              { year: '2024', title: 'Global Collectors Atelier Launch', org: 'Exhibiting in UAE, UK & North America' },
            ].map((cred) => (
              <div key={cred.year} style={{
                background: '#ffffff',
                border: '1px solid #E8DFC8',
                padding: '28px 24px',
                textAlign: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              }}>
                <p style={{
                  color: '#C9A84C',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  letterSpacing: '2px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}>{cred.year}</p>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '17px',
                  fontWeight: 700,
                  color: '#1A1A1A',
                  marginBottom: '8px',
                  lineHeight: 1.3,
                }}>{cred.title}</h3>
                <p style={{
                  color: '#8A7A6A',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  margin: 0,
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
          fontWeight: 600,
          marginBottom: '16px',
        }}>
          Commission An Original
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 700,
          color: '#1A1A1A',
          marginBottom: '20px',
        }}>
          Collaborate on a Bespoke Masterpiece
        </h2>
        <p style={{
          color: '#6B5E52',
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          lineHeight: 1.75,
          maxWidth: '620px',
          margin: '0 auto 40px',
        }}>
          Whether you seek a large-format abstract canvas for an architectural space, an analytical cubist still life, a classical royal miniature folio, or an illuminated calligraphy inscription — Amir collaborates directly with private collectors and designers.
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
              padding: '16px 40px',
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
            Inquire Commission
          </Link>
          <Link
            to="/gallery"
            style={{
              padding: '16px 40px',
              border: '1px solid #1A1A1A',
              color: '#1A1A1A',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Browse Gallery Works
          </Link>
        </div>
      </section>
    </div>
  );
}
