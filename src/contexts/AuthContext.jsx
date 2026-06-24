import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const AuthContext = createContext(null);
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const tokenRef = useRef(null);

  function save(data) {
    try { localStorage.setItem('pizzaplanet_auth', JSON.stringify(data)); } catch {}
  }

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    tokenRef.current = null;
    localStorage.removeItem('pizzaplanet_auth');
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pizzaplanet_auth');
      if (saved) {
        const parsed = JSON.parse(saved);
        tokenRef.current = parsed.token;
        setToken(parsed.token);
        setUser(parsed.user);
      }
    } catch (e) {}
    setLoading(false);
  }, []);

  // Verify token when it changes
  useEffect(() => {
    const currentToken = tokenRef.current;
    if (!currentToken) return;

    fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${currentToken}` } })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setUser(data.data);
          save({ user: data.data, token: currentToken });
        } else {
          setUser(null);
          setToken(null);
          tokenRef.current = null;
          localStorage.removeItem('pizzaplanet_auth');
        }
      })
      .catch(() => {});
  }, []);

  const login = useCallback(async (email, phone, password) => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email || undefined, phone: phone || undefined, password })
    });
    const data = await res.json();
    if (data.success) {
      tokenRef.current = data.data.token;
      setToken(data.data.token);
      setUser(data.data.user);
      save(data.data);
      const profile = await fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${data.data.token}` } });
      const pData = await profile.json();
      if (pData.success) { setUser(pData.data); save({ user: pData.data, token: data.data.token }); }
    }
    return data;
  }, []);

  const register = useCallback(async (name, email, phone, password) => {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email: email || undefined, phone, password })
    });
    const data = await res.json();
    if (data.success) {
      tokenRef.current = data.data.token;
      setToken(data.data.token);
      setUser(data.data.user);
      save(data.data);
      const profile = await fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${data.data.token}` } });
      const pData = await profile.json();
      if (pData.success) { setUser(pData.data); save({ user: pData.data, token: data.data.token }); }
    }
    return data;
  }, []);

  const addAddress = useCallback(async (label, address, isDefault) => {
    const currentToken = tokenRef.current;
    if (!currentToken) return { success: false, message: 'Not logged in' };
    const res = await fetch(`${API}/auth/addresses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${currentToken}` },
      body: JSON.stringify({ label, address, isDefault })
    });
    const data = await res.json();
    if (data.success) {
      const profile = await fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${currentToken}` } });
      const pData = await profile.json();
      if (pData.success) { setUser(pData.data); save({ user: pData.data, token: currentToken }); }
    }
    return data;
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, addAddress }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);