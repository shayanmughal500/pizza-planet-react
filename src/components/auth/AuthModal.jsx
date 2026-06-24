import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';

export default function AuthModal({ open, onClose, initialMode = 'login' }) {
  const { login, register } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let result;
    if (mode === 'login') {
      result = await login(form.email || null, form.phone || null, form.password);
    } else {
      result = await register(form.name, form.email || null, form.phone, form.password);
    }
    setLoading(false);
    if (result.success) {
      success(mode === 'login' ? 'Logged in! Welcome back 🍕' : 'Account created! Welcome 🎉');
      onClose();
      if (result.data?.user?.role === 'admin') {
        navigate('/admin');
      }
    } else {
      error(result.message || 'Something went wrong');
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setForm({ name: '', email: '', phone: '', password: '' });
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-modal__close" onClick={onClose}>✕</button>
        <div className="auth-modal__header">
          <div className="auth-modal__icon">🍕</div>
          <h2>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{mode === 'login' ? 'Log in to your Pizza Planet account' : 'Join Pizza Planet for exclusive deals'}</p>
        </div>
        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" name="name" className="input" placeholder="John Doe" value={form.name} onChange={handleChange} required />
            </div>
          )}
          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label">Email (optional)</label>
              <input type="email" name="email" className="input" placeholder="john@email.com" value={form.email} onChange={handleChange} />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input type="tel" name="phone" className="input" placeholder="03XX-XXXXXXX" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="input" placeholder="••••••••" value={form.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn--primary btn--block btn--lg" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        <p className="auth-modal__switch">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={switchMode} className="auth-modal__switch-btn">
            {mode === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </p>
        <p className="auth-modal__guest">
          <button onClick={onClose} className="auth-modal__guest-btn">Continue as Guest →</button>
        </p>
      </div>
    </div>
  );
}