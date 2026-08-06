import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';



/* ─── Input Component ─────────────────────────────────────── */
function AuthInput({ id, label, type = 'text', name, value, onChange, placeholder, required }) {
  const [focused, setFocused] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const isPassword = type === 'password';
  const resolvedType = isPassword ? (showPwd ? 'text' : 'password') : type;

  return (
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
        {label} {required && <span style={{ color: '#C9A84C' }}>*</span>}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          id={id}
          name={name}
          type={resolvedType}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            border: focused ? '1.5px solid #C9A84C' : '1px solid #D4C4A0',
            background: focused ? '#FFFDF5' : '#FDFAF3',
            padding: isPassword ? '12px 44px 12px 16px' : '12px 16px',
            fontSize: '15px',
            fontFamily: 'Inter, sans-serif',
            color: '#1A1A1A',
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'all 0.2s',
            borderRadius: '2px',
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPwd(v => !v)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#8A7A6A',
              fontSize: '13px',
              padding: 0,
            }}
          >
            {showPwd ? '🙈' : '👁️'}
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export default function LoginPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot' | 'reset'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', code: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const [localError, setLocalError] = useState('');

  const { login, register, socialLogin, forgotPassword, resetPassword, loading, error, clearError, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);



  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    clearError();
    setLocalError('');
  };

  const switchMode = (m) => {
    setMode(m);
    setForm({ name: '', email: '', password: '', confirm: '', code: '' });
    clearError();
    setLocalError('');
    setSuccessMsg('');
  };

  /* ── Form Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccessMsg('');

    if (mode === 'signup') {
      if (form.password !== form.confirm) {
        setLocalError('Passwords do not match.');
        return;
      }
      if (form.password.length < 6) {
        setLocalError('Password must be at least 6 characters.');
        return;
      }
      const ok = await register({
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.confirm,
      });
      if (ok) {
        setSuccessMsg('Account created! Welcome to ArtGallery.');
        setTimeout(() => navigate('/'), 1500);
      }
    } else if (mode === 'login') {
      const ok = await login({ email: form.email, password: form.password });
      if (ok) {
        setSuccessMsg('Welcome back!');
        setTimeout(() => navigate('/'), 1000);
      }
    } else if (mode === 'forgot') {
      const ok = await forgotPassword({ email: form.email });
      if (ok) {
        setSuccessMsg('Verification code sent to your email.');
        setTimeout(() => {
          setMode('reset');
          setSuccessMsg('');
        }, 1500);
      }
    } else if (mode === 'reset') {
      if (form.password !== form.confirm) {
        setLocalError('Passwords do not match.');
        return;
      }
      if (form.password.length < 6) {
        setLocalError('Password must be at least 6 characters.');
        return;
      }
      const ok = await resetPassword({
        email: form.email,
        code: form.code,
        password: form.password,
        password_confirmation: form.confirm,
      });
      if (ok) {
        setSuccessMsg('Password reset successful! Please sign in.');
        setTimeout(() => {
          switchMode('login');
        }, 2000);
      }
    }
  };



  const displayError = localError || error;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1A1A1A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      position: 'relative',
      overflow: 'hidden',
    }} className="page-enter">

      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('/calligraphy_bismillah.png')`,
        backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18,
      }} />
      <div className="arabic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.1 }} />

      {/* Floating gold orbs */}
      <div style={{
        position: 'absolute', top: '15%', left: '8%',
        width: '200px', height: '200px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
        animation: 'pulse 4s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '5%',
        width: '280px', height: '280px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)',
        animation: 'pulse 5s ease-in-out infinite',
      }} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '460px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Link to="/" style={{ display: 'inline-block', textDecoration: 'none' }}>
            <p style={{
              color: '#C9A84C', fontSize: '11px', letterSpacing: '6px',
              textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginBottom: '6px',
            }}>بسم الله</p>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '32px', fontWeight: 700, color: '#ffffff', margin: 0,
            }}>ArtGallery</h1>
          </Link>
          <p style={{
            color: 'rgba(255,255,255,0.4)', fontSize: '13px',
            fontFamily: 'Inter, sans-serif', marginTop: '8px',
          }}>
            {mode === 'login' ? 'Welcome back, sign in to your account' : mode === 'signup' ? 'Create your free account' : mode === 'forgot' ? 'Enter your email to request a reset code' : 'Enter the code and set your new password'}
          </p>
        </div>

        {/* Card */}
        <div className="auth-card" style={{
          background: '#ffffff',
          padding: '40px 36px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
          border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: '4px',
        }}>

          {/* Tabs */}
          {['login', 'signup'].includes(mode) && (
            <div style={{ display: 'flex', marginBottom: '32px', borderBottom: '1px solid #E8DFC8' }}>
              {['login', 'signup'].map(tab => (
                <button
                  key={tab}
                  id={`${tab}-tab`}
                  onClick={() => switchMode(tab)}
                  style={{
                    flex: 1,
                    paddingBottom: '12px',
                    background: 'transparent', border: 'none',
                    borderBottom: mode === tab ? '2px solid #C9A84C' : '2px solid transparent',
                    color: mode === tab ? '#C9A84C' : '#8A7A6A',
                    fontFamily: 'Inter, sans-serif', fontWeight: 700,
                    fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all 0.25s',
                  }}
                >
                  {tab === 'login' ? 'Sign In' : 'Register'}
                </button>
              ))}
            </div>
          )}

          {/* Title for Forgot/Reset */}
          {['forgot', 'reset'].includes(mode) && (
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
              <h2 style={{
                fontFamily: "Georgia, serif",
                fontSize: '20px',
                color: '#1A1A1A',
                margin: 0,
              }}>
                {mode === 'forgot' ? 'Forgot Password' : 'Set New Password'}
              </h2>
            </div>
          )}

          {/* Success Message */}
          {successMsg && (
            <div style={{
              background: 'linear-gradient(135deg, #d4edda, #c3e6cb)',
              border: '1px solid #28a745', borderRadius: '4px',
              padding: '12px 16px', marginBottom: '20px',
              color: '#155724', fontFamily: 'Inter, sans-serif', fontSize: '14px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span>✓</span> {successMsg}
            </div>
          )}

          {/* Error Message */}
          {displayError && (
            <div style={{
              background: 'linear-gradient(135deg, #fde8e8, #fcd0d0)',
              border: '1px solid #dc3545', borderRadius: '4px',
              padding: '12px 16px', marginBottom: '20px',
              color: '#721c24', fontFamily: 'Inter, sans-serif', fontSize: '14px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span>✕</span> {displayError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {mode === 'signup' && (
              <AuthInput
                id="signup-name" name="name" label="Full Name"
                value={form.name} onChange={handleChange}
                placeholder="Your full name" required
              />
            )}

            {(mode === 'signup' || mode === 'login' || mode === 'forgot' || mode === 'reset') && (
              <AuthInput
                id="auth-email" name="email" type="email" label="Email Address"
                value={form.email} onChange={handleChange}
                placeholder="you@example.com" required
                disabled={mode === 'reset'}
              />
            )}

            {mode === 'reset' && (
              <AuthInput
                id="auth-code" name="code" type="text" label="Verification Code"
                value={form.code} onChange={handleChange}
                placeholder="6-digit code" required
              />
            )}

            {(mode === 'signup' || mode === 'login' || mode === 'reset') && (
              <AuthInput
                id="auth-password" name="password" type="password" label={mode === 'reset' ? 'New Password' : 'Password'}
                value={form.password} onChange={handleChange}
                placeholder="••••••••" required
              />
            )}

            {(mode === 'signup' || mode === 'reset') && (
              <AuthInput
                id="signup-confirm" name="confirm" type="password" label="Confirm Password"
                value={form.confirm} onChange={handleChange}
                placeholder="••••••••" required
              />
            )}

            {mode === 'login' && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-8px' }}>
                <a href="#" onClick={(e) => { e.preventDefault(); switchMode('forgot'); }} style={{
                  fontSize: '13px', fontFamily: 'Inter, sans-serif',
                  color: '#C9A84C', textDecoration: 'none',
                }}>
                  Forgot password?
                </a>
              </div>
            )}

            {['forgot', 'reset'].includes(mode) && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-8px' }}>
                <a href="#" onClick={(e) => { e.preventDefault(); switchMode('login'); }} style={{
                  fontSize: '13px', fontFamily: 'Inter, sans-serif',
                  color: '#C9A84C', textDecoration: 'none',
                }}>
                  Back to Sign In
                </a>
              </div>
            )}

            <button
              id="auth-submit-btn"
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '16px',
                background: loading ? '#D4C4A0' : '#C9A84C',
                color: '#1A1A1A',
                fontFamily: 'Inter, sans-serif', fontWeight: 700,
                fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase',
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '6px', borderRadius: '2px',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: '16px', height: '16px', border: '2px solid #1A1A1A',
                    borderTopColor: 'transparent', borderRadius: '50%',
                    display: 'inline-block', animation: 'spin 0.8s linear infinite',
                  }} />
                  {mode === 'login' ? 'Signing In...' : mode === 'signup' ? 'Creating Account...' : mode === 'forgot' ? 'Sending Code...' : 'Resetting Password...'}
                </>
              ) : (
                mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : mode === 'forgot' ? 'Send Code' : 'Reset Password'
              )}
            </button>
          </form>



          {/* Terms */}
          {mode === 'signup' && (
            <p style={{
              textAlign: 'center', marginTop: '20px',
              fontSize: '12px', fontFamily: 'Inter, sans-serif', color: '#8A7A6A',
              lineHeight: '1.6',
            }}>
              By creating an account, you agree to our{' '}
              <a href="#" style={{ color: '#C9A84C', textDecoration: 'none' }}>Terms of Service</a>
              {' '}and{' '}
              <a href="#" style={{ color: '#C9A84C', textDecoration: 'none' }}>Privacy Policy</a>.
            </p>
          )}
        </div>

        {/* Back link */}
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <Link to="/" style={{
            color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif',
            fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
