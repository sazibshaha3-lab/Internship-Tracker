import { useState } from 'react';
import api, { err } from '../api';
import { Card, Msg, useFetch } from '../ui';

export default function Users() {
  const { data, reload } = useFetch('/users');
  const { data: companies } = useFetch('/companies');
  const [msg, setMsg] = useState('');
  const [f, setF] = useState({ name: '', email: '', password: '', role: 'advisor', company_id: '' });
  const set = k => e => setF({ ...f, [k]: e.target.value });
  const advisors = data?.filter(u => u.role === 'advisor') || [];

  const allocate = async (u, advisor_id) => {
    try { await api.patch(`/users/${u.id}/advisor`, { advisor_id }); reload(); } catch (e) { setMsg(err(e)); }
  };
  const create = async e => {
    e.preventDefault();
    try { await api.post('/users', { ...f, company_id: f.role === 'recruiter' ? f.company_id : null }); setMsg('User created.'); reload(); }
    catch (x) { setMsg(err(x)); }
  };

  return (<>
    <h1>Users</h1><Msg text={msg} />
    <Card title="Create user">
      <form onSubmit={create} className="row">
        <input placeholder="Name" required value={f.name} onChange={set('name')} aria-label="Name" />
        <input placeholder="Email" type="email" required value={f.email} onChange={set('email')} aria-label="Email" />
        <input placeholder="Password (min 8)" type="password" minLength={8} required value={f.password} onChange={set('password')} aria-label="Password" />
        <select value={f.role} onChange={set('role')} aria-label="Role"><option>advisor</option><option>recruiter</option><option>admin</option><option>student</option></select>
        {f.role === 'recruiter' && <select required value={f.company_id} onChange={set('company_id')} aria-label="Company">
          <option value="">Company…</option>{companies?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>}
        <button>Create</button>
      </form>
    </Card>
    <Card title="All users">
      <table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Advisor</th></tr></thead>
        <tbody>{data?.map(u => (
          <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td>
            <td>{u.role === 'student'
              ? <select aria-label={`Advisor for ${u.name}`} value={u.advisor_id || ''} onChange={e => allocate(u, e.target.value)}>
                  <option value="" disabled>Unassigned</option>{advisors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</select>
              : '—'}</td></tr>))}</tbody></table>
    </Card>
  </>);
}
