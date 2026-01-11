import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('MANAGER');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const requiredPassword = role === 'ADMIN' ? 'admin123' : 'manager123';
  const isPasswordCorrect = password === requiredPassword;
  const isPasswordsMatch = password === confirmPassword;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (!isPasswordCorrect) {
      setError(`Password must be "${requiredPassword}" for ${role} role`);
      return;
    }

    if (!isPasswordsMatch) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const result = await signup(name, email, password, role);

      if (result.success) {
        if (result.user.role === 'ADMIN') {
          navigate('/admin');
        } else if (result.user.role === 'MANAGER') {
          navigate('/home');
        }
      } else {
        setError(result.error || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card signup-card">
        <div className="auth-header">
          <h1>Parking Manager</h1>
          <p>Create your account</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSignup} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Role</label>
            <div className="role-selection">
              <label className={`role-option ${role === 'ADMIN' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="ADMIN"
                  checked={role === 'ADMIN'}
                  onChange={(e) => setRole(e.target.value)}
                />
                <div className="role-content">
                  <div className="role-title">Admin</div>
                  <div className="role-description">Analytics Only</div>
                </div>
              </label>

              <label className={`role-option ${role === 'MANAGER' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="MANAGER"
                  checked={role === 'MANAGER'}
                  onChange={(e) => setRole(e.target.value)}
                />
                <div className="role-content">
                  <div className="role-title">Manager</div>
                  <div className="role-description">Operations</div>
                </div>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password (Must be "{requiredPassword}")</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={requiredPassword}
              className={password ? (isPasswordCorrect ? 'valid' : 'invalid') : ''}
              required
            />
            {password && (
              <div className={`validation-message ${isPasswordCorrect ? 'valid' : 'invalid'}`}>
                {isPasswordCorrect ? 'Password correct' : 'Password incorrect'}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className={confirmPassword ? (isPasswordsMatch ? 'valid' : 'invalid') : ''}
              required
            />
            {confirmPassword && (
              <div className={`validation-message ${isPasswordsMatch ? 'valid' : 'invalid'}`}>
                {isPasswordsMatch ? 'Passwords match' : 'Passwords do not match'}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading || !isPasswordCorrect || !isPasswordsMatch}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign In
            </Link>
          </p>
        </div>

        <div className="demo-credentials">
          <h4>Required Passwords</h4>
          <div className="demo-account">
            <span className="demo-role">Admin:</span>
            <span>admin123</span>
          </div>
          <div className="demo-account">
            <span className="demo-role">Manager:</span>
            <span>manager123</span>
          </div>
        </div>
      </div>
    </div>
  );
}
