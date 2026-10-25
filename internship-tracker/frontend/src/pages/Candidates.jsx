import { useState } from 'react';
import api, { err } from '../api';
import { Badge, Card, Msg, openCv, useFetch } from '../ui';

function Candidate({ a, onDone }) {
  const [open, setOpen] = useState(false);
  const [iv, setIv] = useState({ scheduled_at: '', mode: 'Video call', link: '' });
  const [msg, setMsg] = useState('');
  const status = async s => { try { await api.patch(`/applications/${a.id}/status`, { status: s }); onDone(); } catch (e) { setMsg(err(e)); } };
  const schedule = async e => {
    e.preventDefault();
    try { await api.post('/interviews', { application_id: a.id, ...iv }); setOpen(false); onDone(); } catch (x) { setMsg(err(x)); }
  };
  return (
    <Card>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div><b>{a.user.name}</b> · {a.user.department || 'N/A'}<br /><small>{a.opportunity.title} · CV v{a.cv.version}</small></div>
        <Badge status={a.status} />
      </div>
      <p className="row">
        <button className="sec" onClick={() => openCv(a.cv.id, setMsg)}>View CV</button>
        <button className="sec" onClick={() => status('Shortlisted')}>Shortlist</button>
        <button className="sec" onClick={() => setOpen(!open)}>Schedule interview</button>
        <button onClick={() => status('Offer')}>Make offer</button>
        <button className="sec" onClick={() => status('Rejected')}>Reject</button>
      </p>
      {open && <form onSubmit={schedule} className="row">
        <input type="datetime-local" required value={iv.scheduled_at} onChange={e => setIv({ ...iv, scheduled_at: e.target.value })} aria-label="Date and time" />
        <select value={iv.mode} onChange={e => setIv({ ...iv, mode: e.target.value })} aria-label="Mode"><option>Video call</option><option>On-site</option><option>Phone</option></select>
        <input placeholder="Meeting link (optional)" value={iv.link} onChange={e => setIv({ ...iv, link: e.target.value })} />
        <button>Confirm</button></form>}
      <Msg text={msg} />
    </Card>
  );
}

export default function Candidates() {
  const { data, error, reload } = useFetch('/candidates');
  return (<><h1>Candidates</h1><p className="muted">Only applications forwarded to your verified company appear here.</p>
    {error && <p className="error">{error}</p>}
    {data?.map(a => <Candidate key={a.id} a={a} onDone={reload} />)}
    {data?.length === 0 && <p className="muted">No forwarded candidates yet.</p>}</>);
}
