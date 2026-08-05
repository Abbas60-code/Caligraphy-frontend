import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  // Close user dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  // Get initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 1000,
        background: scrolled || menuOpen ? 'rgba(26, 26, 26, 0.95)' : 'rgba(26, 26, 26, 0.75)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(201, 168, 76, 0.15)',
        padding: scrolled ? '14px 24px' : '20px 24px',
        transition: 'all 0.3s ease',
      }}>
        <div className="navbar-container" style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
            <span style={{
              fontSize: '11px', letterSpacing: '5px', textTransform: 'uppercase',
              color: '#C9A84C', fontFamily: 'Inter, sans-serif', fontWeight: 500, lineHeight: 1.2,
            }}>
              بسم الله
            </span>
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '22px', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, marginTop: '2px',
            }}>
              ArtGallery
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="nav-desktop-links">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600,
                  letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none',
                  color: isActive(link.to) ? '#C9A84C' : 'rgba(255, 255, 255, 0.85)',
                  position: 'relative', padding: '6px 0', transition: 'color 0.2s',
                }}
                className="nav-link-hover"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

            {/* ── Auth Section ── */}
            {isLoggedIn ? (
              /* User Avatar + Dropdown */
              <div ref={userMenuRef} style={{ position: 'relative' }} className="nav-desktop-login">
                <button
                  id="navbar-user-btn"
                  onClick={() => setUserMenuOpen(v => !v)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '4px 8px',
                    borderRadius: '24px',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  {/* Avatar */}
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #C9A84C' }}
                    />
                  ) : (
                    <div style={{
                      width: '34px', height: '34px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #C9A84C, #E8C97E)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '13px', color: '#1A1A1A',
                    }}>
                      {getInitials(user?.name)}
                    </div>
                  )}
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '13px',
                    fontWeight: 600, color: 'rgba(255,255,255,0.85)',
                    maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {user?.name?.split(' ')[0]}
                  </span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: '#C9A84C', transition: 'transform 0.2s', transform: userMenuOpen ? 'rotate(180deg)' : 'none' }}>
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Dropdown */}
                {userMenuOpen && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                    background: '#1A1A1A', border: '1px solid rgba(201,168,76,0.25)',
                    borderRadius: '6px', minWidth: '200px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                    overflow: 'hidden', zIndex: 9999,
                  }}>
                    {/* User info */}
                    <div style={{
                      padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)',
                      background: 'rgba(201,168,76,0.05)',
                    }}>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                        {user?.name}
                      </p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>
                        {user?.email}
                      </p>
                    </div>

                    {/* Menu items */}
                    {[
                      { icon: '📦', label: 'My Orders', action: () => navigate('/') },
                      { icon: '👤', label: 'My Profile', action: () => navigate('/') },
                    ].map(item => (
                      <button
                        key={item.label}
                        onClick={item.action}
                        style={{
                          width: '100%', background: 'none', border: 'none',
                          padding: '12px 16px', cursor: 'pointer', textAlign: 'left',
                          display: 'flex', alignItems: 'center', gap: '10px',
                          fontFamily: 'Inter, sans-serif', fontSize: '13px',
                          color: 'rgba(255,255,255,0.75)', transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.color = '#C9A84C'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
                      >
                        <span>{item.icon}</span> {item.label}
                      </button>
                    ))}

                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />

                    {/* Logout */}
                    <button
                      id="navbar-logout-btn"
                      onClick={handleLogout}
                      style={{
                        width: '100%', background: 'none', border: 'none',
                        padding: '12px 16px', cursor: 'pointer', textAlign: 'left',
                        display: 'flex', alignItems: 'center', gap: '10px',
                        fontFamily: 'Inter, sans-serif', fontSize: '13px',
                        color: '#ff6b6b', transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,107,107,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    >
                      <span>🚪</span> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login Button */
              <Link
                to="/login"
                style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 700,
                  letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none',
                  color: '#1A1A1A', background: '#C9A84C',
                  padding: '8px 18px', borderRadius: '2px',
                  transition: 'all 0.2s',
                }}
                className="nav-desktop-login"
                onMouseEnter={e => e.currentTarget.style.background = '#E8C97E'}
                onMouseLeave={e => e.currentTarget.style.background = '#C9A84C'}
              >
                Sign In
              </Link>
            )}

            {/* Cart Icon */}
            <button
              id="navbar-cart-btn"
              onClick={() => setIsCartOpen(true)}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                position: 'relative', color: 'rgba(255, 255, 255, 0.85)', padding: '6px',
              }}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                />
              </svg>
              {itemCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-2px', right: '-2px',
                  background: '#C9A84C', color: '#1A1A1A', fontSize: '11px', fontWeight: 700,
                  width: '18px', height: '18px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {itemCount}
                </span>
              )}
            </button>

            {/* Hamburger (Mobile) */}
            <button
              id="navbar-menu-btn"
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                display: 'none', flexDirection: 'column', gap: '5px', padding: '6px',
              }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="nav-mobile-hamburger"
            >
              <span style={{ display: 'block', width: '22px', height: '2px', background: '#ffffff' }} />
              <span style={{ display: 'block', width: '22px', height: '2px', background: '#ffffff' }} />
              <span style={{ display: 'block', width: '22px', height: '2px', background: '#ffffff' }} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div style={{
            marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px',
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600,
                  letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none',
                  color: isActive(link.to) ? '#C9A84C' : 'rgba(255, 255, 255, 0.85)',
                }}
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn ? (
              <>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                  Logged in as <strong style={{ color: '#C9A84C' }}>{user?.name}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'none', border: '1px solid rgba(255,107,107,0.4)',
                    color: '#ff6b6b', padding: '10px 16px', cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif', fontSize: '13px', borderRadius: '3px',
                    textAlign: 'left',
                  }}
                >
                  🚪 Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600,
                  letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none',
                  color: '#C9A84C',
                }}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links, .nav-desktop-login {
            display: none !important;
          }
          .nav-mobile-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
