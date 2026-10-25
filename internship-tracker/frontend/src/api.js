import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api' });
api.interceptors.request.use(c => {
  const t = localStorage.getItem('token');
  if (t) c.headers.Authorization = `Bearer ${t}`;
  c.headers.Accept = 'application/json';
  return c;
});
api.interceptors.response.use(r => r, e => {
  if (e.response?.status === 401 && location.pathname !== '/login') { localStorage.removeItem('token'); location.href = '/login'; }
  return Promise.reject(e);
});
export const err = e => e.response?.data?.message || Object.values(e.response?.data?.errors || {})[0]?.[0] || 'Something went wrong.';
export default api;
