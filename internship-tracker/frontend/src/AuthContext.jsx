import { createContext, useContext, useEffect, useState } from 'react';
import api from './api';
const Ctx = createContext();
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!localStorage.getItem('token'));
  useEffect(() => {
    if (!localStorage.getItem('token')) return;
    api.get('/me').then(r => setUser(r.data)).catch(() => localStorage.removeItem('token')).finally(() => setLoading(false));
  }, []);
  const save = ({ token, user }) => { localStorage.setItem('token', token); setUser(user); return user; };
  const login = async (email, password) => save((await api.post('/login', { email, password })).data);
  const register = async f => save((await api.post('/register', f)).data);
  const logout = async () => { try { await api.post('/logout'); } catch {} localStorage.removeItem('token'); setUser(null); };
  return <Ctx.Provider value={{ user, loading, login, register, logout }}>{children}</Ctx.Provider>;
}
