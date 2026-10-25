import { useAuth } from '../AuthContext';
import { Card, fmt, useFetch } from '../ui';

export default function Interviews() {
  const { user } = useAuth();
  const { data, error } = useFetch('/interviews');
  if (error) return <p className="error">{error}</p>;
  return (<>
    <h1>Interview Schedule</h1>
    <Card>
      <table><thead><tr><th>When</th><th>{user.role === 'student' ? 'Opportunity' : 'Candidate'}</th><th>Mode</th><th>Link</th></tr></thead>
        <tbody>{data?.map(i => (
          <tr key={i.id}><td>{fmt(i.scheduled_at)}</td>
            <td>{user.role === 'student' ? `${i.application.opportunity.title} · ${i.application.opportunity.company.name}` : `${i.application.user.name} · ${i.application.opportunity.title}`}</td>
            <td>{i.mode}</td><td>{i.link ? <a href={i.link} target="_blank" rel="noreferrer">Join</a> : '—'}</td></tr>))}</tbody></table>
      {data?.length === 0 && <p className="muted">No interviews scheduled.</p>}
    </Card>
  </>);
}
