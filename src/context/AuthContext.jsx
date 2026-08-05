import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const API_BASE = 'http://localhost:9000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('amir_customer');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('amir_customer_token') || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Persist user + token
  useEffect(() => {
    if (user) {
      localStorage.setItem('amir_customer', JSON.stringify(user));
    } else {
      localStorage.removeItem('amir_customer');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('amir_customer_token', token);
    } else {
      localStorage.removeItem('amir_customer_token');
    }
  }, [token]);

  const clearError = () => setError(null);

  /** ── Register ──────────────────────────────── */
  const register = useCallback(async ({ name, email, password, password_confirmation }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/customer/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, password, password_confirmation }),
      });
      const data = await res.json();
      if (!data.success) {
        const msg = data.errors
          ? Object.values(data.errors).flat().join(' ')
          : data.message || 'Registration failed.';
        setError(msg);
        return false;
      }
      setUser(data.user);
      setToken(data.token);
      return true;
    } catch {
      setError('Network error. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /** ── Login ─────────────────────────────────── */
  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/customer/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || 'Invalid credentials.');
        return false;
      }
      setUser(data.user);
      setToken(data.token);
      return true;
    } catch {
      setError('Network error. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /** ── Social Login ───────────────────────────── */
  const socialLogin = useCallback(async ({ provider, provider_id, name, email, avatar }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/customer/social-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ provider, provider_id, name, email, avatar }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || 'Social login failed.');
        return false;
      }
      setUser(data.user);
      setToken(data.token);
      return true;
    } catch {
      setError('Network error. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /** ── Logout ────────────────────────────────── */
  const logout = useCallback(async () => {
    if (token) {
      try {
        await fetch(`${API_BASE}/customer/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      } catch {
        // Ignore network errors on logout
      }
    }
    setUser(null);
    setToken(null);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        isLoggedIn: !!user,
        register,
        login,
        socialLogin,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
