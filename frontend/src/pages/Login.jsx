import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/home');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Smart Parking</h1>
          <p>Premium Parking Solution</p>
        </div>

        <div className="auth-content">
          {error && <div className="alert-error">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>

          <div style={{ marginTop: '30px', padding: '16px', background: '#f9fafb', borderRadius: '12px', fontSize: '13px' }}>
            <div style={{ marginBottom: '8px' }}><strong>Admin:</strong> password is admin123</div>
            <div><strong>Manager:</strong> password is manager123</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
