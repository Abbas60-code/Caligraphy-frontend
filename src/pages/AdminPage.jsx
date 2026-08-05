import { useState, useEffect } from 'react';
import AdminLoginPage from './AdminLoginPage';
import AdminDashboardPage from './AdminDashboardPage';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('amir_admin_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('amir_admin_token', token);
    localStorage.setItem('amir_admin_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('amir_admin_token');
    localStorage.removeItem('amir_admin_auth');
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <AdminDashboardPage onLogout={handleLogout} />
      ) : (
        <AdminLoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}
