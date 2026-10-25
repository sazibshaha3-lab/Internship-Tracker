import { Badge, Card, useFetch } from '../ui';

export default function Applications() {
  const { data, error } = useFetch('/applications');
  if (error) return <p className="error">{error}</p>;
  if (!data) return <p>Loading…</p>;
  return (<>
    <h1>My Applications</h1>
    <Card>
      <table>
        <thead><tr><th>Opportunity</th><th>Company</th><th>University review</th><th>Forwarded</th><th>Status</th></tr></thead>
        <tbody>{data.map(a => (
          <tr key={a.id}><td>{a.opportunity.title}</td><td>{a.opportunity.company.name}</td>
            <td><Badge status={a.admin_review} /></td><td>{a.forwarded_at ? 'Yes' : 'Not yet'}</td><td><Badge status={a.status} /></td></tr>))}
        </tbody>
      </table>
      {!data.length && <p className="muted">No applications yet. Find an opportunity to apply.</p>}
    </Card>
  </>);
}
