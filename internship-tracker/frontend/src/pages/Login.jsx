import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { err } from '../api';
import { Msg } from '../ui';

export default function Login() {
  const { login, register, logout } = useAuth();
  const nav = useNavigate();
  const [mode, setMode] = useState('login');
  const [f, setF] = useState({ name: '', email: '', password: '', role: 'student' });
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const set = k => e => setF({ ...f, [k]: e.target.value });

  const submit = async e => {
    e.preventDefault(); setBusy(true); setMsg('');
    try {
      const u = mode === 'login' ? await login(f.email, f.password) : await register(f);
      if (mode === 'login' && u.role !== f.role) { await logout(); setMsg(`This is a ${u.role} account. Select the ${u.role} workspace.`); return; }
      nav('/');
    } catch (x) { setMsg(err(x)); } finally { setBusy(false); }
  };

  return (
    <div className="login">
      <div className="hero">
        <h1>Your career journey,<br />organized in one place.</h1>
        <p>Explore careers, build skills and prepare for university-reviewed placement opportunities.</p>
        <small>STUDENT • ADMIN • ADVISOR • RECRUITER</small>
      </div>
      <div className="formwrap">
        <form onSubmit={submit}>
          <h1>{mode === 'login' ? 'Welcome back' : 'Create student account'}</h1>
          <p className="muted">Career Counselling and Placement</p>
          {mode === 'login' && (<>
            <label htmlFor="role">Select workspace role</label>
            <select id="role" value={f.role} onChange={set('role')}>
              <option value="student">Student</option><option value="advisor">Career Advisor</option>
              <option value="admin">Admin</option><option value="recruiter">Recruiter</option>
            </select></>)}
          {mode === 'register' && (<><label htmlFor="n">Full name</label><input id="n" required value={f.name} onChange={set('name')} /></>)}
          <label htmlFor="e">Email address</label>
          <input id="e" type="email" required placeholder="you@example.com" value={f.email} onChange={set('email')} />
          <label htmlFor="p">Password</label>
          <input id="p" type="password" required minLength={8} value={f.password} onChange={set('password')} />
          <Msg text={msg} />
          <p><button disabled={busy} style={{ width: '100%' }}>{busy ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Register'}</button></p>
          <p className="muted">
            {mode === 'login' ? 'New student? ' : 'Have an account? '}
            <a href="#" onClick={e => { e.preventDefault(); setMode(mode === 'login' ? 'register' : 'login'); setMsg(''); }}>{mode === 'login' ? 'Register' : 'Sign in'}</a>
          </p>
          <small>Demo (password123): student@ / advisor@ / admin@ / recruiter@demo.test</small>
        </form>
      </div>
    </div>
  );
}
