import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'MANAGER',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signup(formData);
      if (result.success) {
        navigate('/home');
      } else {
        setError(result.error || 'Signup failed');
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
          <p>Create your account</p>
        </div>

        <div className="auth-content">
          {error && <div className="alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="MANAGER">Manager</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder={formData.role === 'ADMIN' ? 'admin123' : 'manager123'}
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="auth-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </div>

          <div style={{ marginTop: '20px', padding: '12px', background: '#f9fafb', borderRadius: '12px', fontSize: '12px' }}>
            <div><strong>Manager password:</strong> manager123</div>
            <div><strong>Admin password:</strong> admin123</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
