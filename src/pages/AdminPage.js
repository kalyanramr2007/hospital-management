import { useState, useEffect } from "react";
import AdminDashboard from "../components/AdminDashboard";
import { ADMIN_CREDENTIALS } from "../utils/constants";
import { useToast } from "../context/ToastContext";
import "./PageLayout.css";
import "./AdminPage.css";

const AUTH_KEY = "hospital-admin-auth";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    const auth = sessionStorage.getItem(AUTH_KEY);
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      credentials.username === ADMIN_CREDENTIALS.username &&
      credentials.password === ADMIN_CREDENTIALS.password
    ) {
      sessionStorage.setItem(AUTH_KEY, "true");
      setIsAuthenticated(true);
      setLoginError("");
      showToast("Welcome, Admin!", "success");
    } else {
      setLoginError("Invalid username or password");
      showToast("Login failed", "error");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    showToast("Logged out successfully", "info");
  };

  if (!isAuthenticated) {
    return (
      <div className="page container">
        <div className="admin-login card">
          <div className="admin-login__icon">🔐</div>
          <h1>Admin Login</h1>
          <p>Enter credentials to access the hospital queue dashboard.</p>
          <form onSubmit={handleLogin} className="admin-login__form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials((c) => ({ ...c, username: e.target.value }))}
                placeholder="admin"
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials((c) => ({ ...c, password: e.target.value }))}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            {loginError && <p className="admin-login__error">{loginError}</p>}
            <button type="submit" className="btn btn--primary btn--block">
              Sign In
            </button>
          </form>
          <p className="admin-login__hint">
            Demo: username <code>admin</code> / password <code>admin123</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page container">
      <header className="page-header page-header--row">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage patient queue, call next patient, and view statistics.</p>
        </div>
        <button type="button" className="btn btn--outline" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div className="page-content">
        <AdminDashboard />
      </div>
    </div>
  );
}
