import { useState } from 'react';
import api, { err } from '../api';
import { Card, Msg } from '../ui';

const empty = { title: '', type: 'Internship', location: '', description: '', deadline: '', skills: '' };

export default function Post() {
  const [f, setF] = useState(empty);
  const [msg, setMsg] = useState('');
  const set = k => e => setF({ ...f, [k]: e.target.value });
  const submit = async e => {
    e.preventDefault();
    try {
      await api.post('/opportunities', { ...f, deadline: f.deadline || null, skills: f.skills.split(',').map(s => s.trim()).filter(Boolean) });
      setMsg('Opportunity posted.'); setF(empty);
    } catch (x) { setMsg(err(x)); }
  };
  return (<>
    <h1>Post Opportunity</h1>
    <Card><form onSubmit={submit}>
      <label htmlFor="t">Title</label><input id="t" required value={f.title} onChange={set('title')} />
      <label htmlFor="ty">Type</label><select id="ty" value={f.type} onChange={set('type')}><option>Internship</option><option>Job</option><option>Training</option></select>
      <label htmlFor="l">Location</label><input id="l" required value={f.location} onChange={set('location')} />
      <label htmlFor="d">Description</label><textarea id="d" rows={4} required value={f.description} onChange={set('description')} />
      <label htmlFor="s">Skills (comma separated)</label><input id="s" value={f.skills} onChange={set('skills')} />
      <label htmlFor="dl">Deadline</label><input id="dl" type="date" value={f.deadline} onChange={set('deadline')} />
      <p><button>Post</button></p><Msg text={msg} />
    </form></Card>
  </>);
}
