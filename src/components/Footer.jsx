import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#1A1A1A', color: '#ffffff', padding: '64px 24px 32px', position: 'relative' }}>
      {/* Gold top border line */}
      <div style={{
        height: '2px',
        background: 'linear-gradient(to right, transparent, #C9A84C, transparent)',
        marginBottom: '64px',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '48px',
          marginBottom: '48px',
        }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '24px' }}>
              <p style={{
                fontSize: '11px',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: '#C9A84C',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '6px',
              }}>
                بسم الله الرحمن الرحيم
              </p>
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '24px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '8px',
              }}>
                ArtGallery
              </h3>
              <div style={{ height: '1px', width: '48px', background: '#C9A84C' }} />
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              lineHeight: 1.7,
            }}>
              Timeless Islamic calligraphy, crafted with passion and devotion. Each piece tells a story of faith, beauty, and tradition.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '13px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#C9A84C',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              marginBottom: '24px',
            }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Home', to: '/' },
                { label: 'Gallery', to: '/gallery' },
                { label: 'About the Artist', to: '/about' },
                { label: 'Contact Us', to: '/contact' },
                { label: 'Custom Orders', to: '/contact' },
                { label: 'Cart', to: '/cart' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '15px',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    className="hover:text-[#C9A84C]"
                  >
                    ✦ {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{
              fontSize: '13px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#C9A84C',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              marginBottom: '24px',
            }}>
              Collections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                "Allah's Names",
                "Quranic Verses",
                "Arabic Calligraphy",
                "Modern Islamic Art",
                "Custom Paintings",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/gallery"
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '15px',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    className="hover:text-[#C9A84C]"
                  >
                    ✦ {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontSize: '13px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#C9A84C',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              marginBottom: '24px',
            }}>
              Contact Info
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                <span style={{ color: '#C9A84C', fontSize: '16px' }}>✉</span>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>Email</p>
                  <a href="mailto:art@artgallery.com" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', fontFamily: 'Inter, sans-serif' }} className="hover:text-[#C9A84C]">
                    amircreator09@gmail.com
                  </a>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                <span style={{ color: '#C9A84C', fontSize: '16px' }}>✆</span>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>WhatsApp</p>
                  <a href="https://wa.me/923001234567" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', fontFamily: 'Inter, sans-serif' }} className="hover:text-[#C9A84C]">
                    +92 300 2161412
                  </a>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                <span style={{ color: '#C9A84C', fontSize: '16px' }}>◎</span>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>Studio</p>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontFamily: 'Inter, sans-serif', margin: 0 }}>Karachi, Sindh, Pakistan</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          height: '1px',
          background: '#E8DFC8',
          opacity: 0.15,
          margin: '32px 0 24px',
        }} />
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }} className="footer-bottom-flex">
          <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif', fontSize: '13px', margin: 0 }}>
            © {new Date().getFullYear()} ArtGallery. All rights reserved. Crafted with devotion.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service', 'Shipping Policy'].map((item) => (
              <a key={item} href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '13px', fontFamily: 'Inter, sans-serif' }} className="hover:text-[#C9A84C]">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 640px) {
          .footer-bottom-flex {
            flex-direction: column !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
