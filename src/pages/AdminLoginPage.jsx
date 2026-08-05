import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminLoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:9000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onLogin(data.token);
      } else {
        setError(data.message || 'Invalid admin credentials. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      setError('Connection to backend failed. Please ensure Laravel backend is running.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1A1A1A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 24px',
      position: 'relative',
      overflow: 'hidden',
    }} className="page-enter">
      {/* Background image & pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/calligraphy_bismillah.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
        }}
      />
      <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.08 }} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '440px', margin: '0 auto' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{
            color: '#C9A84C',
            fontSize: '11px',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '6px',
          }}>
            بسم الله – Admin Portal
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '28px',
            fontWeight: 700,
            color: '#ffffff',
          }}>
            ArtGallery
          </h1>
        </div>

        {/* Card Container */}
        <div className="admin-login-card" style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          padding: '40px 36px',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(201, 168, 76, 0.25)',
          borderRadius: '4px',
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '22px',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '24px',
            letterSpacing: '1px'
          }}>
            Sign In to Dashboard
          </h2>

          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              padding: '12px',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '11px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                color: '#C9A84C',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '8px',
              }}>
                Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder=""
                style={{
                  width: '100%',
                  border: '1px solid rgba(201, 168, 76, 0.3)',
                  background: 'rgba(26, 26, 26, 0.6)',
                  padding: '12px 16px',
                  fontSize: '15px',
                  fontFamily: 'Inter, sans-serif',
                  color: '#ffffff',
                  boxSizing: 'border-box',
                  borderRadius: '2px',
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '11px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                color: '#C9A84C',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '8px',
              }}>
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder=""
                style={{
                  width: '100%',
                  border: '1px solid rgba(201, 168, 76, 0.3)',
                  background: 'rgba(26, 26, 26, 0.6)',
                  padding: '12px 16px',
                  fontSize: '15px',
                  fontFamily: 'Inter, sans-serif',
                  color: '#ffffff',
                  boxSizing: 'border-box',
                  borderRadius: '2px',
                }}
              />
            </div>

            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
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
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '10px',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.2s',
              }}
              className="btn-ripple"
            >
              {loading ? 'Authenticating...' : 'Access Dashboard ✦'}
            </button>
          </form>
          

        </div>

        {/* Back link */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif', fontSize: '14px', textDecoration: 'none' }} className="hover:text-[#C9A84C]">
            ← Back to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
