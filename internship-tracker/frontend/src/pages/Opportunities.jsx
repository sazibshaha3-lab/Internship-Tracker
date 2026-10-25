import { useState } from 'react';
import api, { err } from '../api';
import { Card, Msg, useFetch } from '../ui';

export default function Opportunities() {
  const [q, setQ] = useState('');
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const { data, error, reload } = useFetch(`/opportunities?q=${encodeURIComponent(q)}&type=${type}`);

  const apply = async o => {
    const note = window.prompt('Short cover note (optional)');
    if (note === null) return;
    try { await api.post('/applications', { opportunity_id: o.id, cover_note: note }); setMsg(`Applied to ${o.title}.`); reload(); }
    catch (e) { setMsg(err(e)); }
  };

  return (<>
    <h1>Find Opportunities</h1>
    <div className="row" style={{ margin: '16px 0' }}>
      <input aria-label="Search" placeholder="Search title or location" value={q} onChange={e => setQ(e.target.value)} />
      <select aria-label="Type" value={type} onChange={e => setType(e.target.value)}>
        <option value="">All types</option><option>Internship</option><option>Job</option><option>Training</option>
      </select>
    </div>
    <Msg text={msg} />{error && <p className="error">{error}</p>}
    {data?.map(o => (
      <Card key={o.id}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div><b>{o.title}</b><br /><small>{o.company.name} · {o.type} · {o.location}{o.deadline && ` · Deadline ${o.deadline.slice(0, 10)}`}</small></div>
          <button disabled={o.applied} onClick={() => apply(o)}>{o.applied ? 'Applied' : 'Apply'}</button>
        </div>
        <p>{o.description}</p>
      </Card>))}
    {data?.length === 0 && <p className="muted">No opportunities match.</p>}
  </>);
}
