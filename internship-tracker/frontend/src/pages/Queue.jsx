import { useState } from 'react';
import api, { err } from '../api';
import { Badge, Card, Msg, useFetch } from '../ui';

export default function Queue() {
  const [filter, setFilter] = useState('pending');
  const { data, reload } = useFetch(`/queue?review=${filter}`);
  const [msg, setMsg] = useState('');
  const act = async (id, path, body) => {
    try { await api.patch(`/applications/${id}/${path}`, body); setMsg(''); reload(); } catch (e) { setMsg(err(e)); }
  };
  return (<>
    <h1>Application Queue</h1>
    <p className="muted">Each application is reviewed independently. Approval and forwarding to the company are separate actions.</p>
    <select aria-label="Filter" value={filter} onChange={e => setFilter(e.target.value)} style={{ maxWidth: 220 }}>
      <option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option><option value="">All</option>
    </select>
    <Msg text={msg} />
    <Card><table>
      <thead><tr><th>Student</th><th>Opportunity</th><th>CV</th><th>Review</th><th>Actions</th></tr></thead>
      <tbody>{data?.map(a => (
        <tr key={a.id}><td>{a.user.name}<br /><small>{a.user.email}</small></td>
          <td>{a.opportunity.title}<br /><small>{a.opportunity.company.name}</small></td><td>v{a.cv.version}</td>
          <td><Badge status={a.admin_review} /><br /><small>{a.forwarded_at ? 'Forwarded' : ''}</small></td>
          <td className="row">
            {a.admin_review === 'pending' && <><button onClick={() => act(a.id, 'review', { decision: 'approved' })}>Approve</button>
              <button className="sec" onClick={() => act(a.id, 'review', { decision: 'rejected' })}>Reject</button></>}
            {a.admin_review === 'approved' && !a.forwarded_at && <button onClick={() => act(a.id, 'forward')}>Forward to company</button>}
          </td></tr>))}</tbody></table>
      {data?.length === 0 && <p className="muted">Nothing in this queue.</p>}</Card>
  </>);
}
