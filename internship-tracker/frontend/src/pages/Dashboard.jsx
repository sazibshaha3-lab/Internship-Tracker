import { useAuth } from '../AuthContext';
import { Card, fmt, useFetch } from '../ui';

const STAGES = ['Applied', 'Shortlisted', 'Interview', 'Offer'];

export default function Dashboard() {
  const { user } = useAuth();
  const { data, error } = useFetch('/dashboard');
  if (error) return <p className="error">{error}</p>;
  if (!data) return <p>Loading…</p>;
  return (<>
    <h1>Welcome, {user.name}</h1>
    <p className="muted">Your {user.role} workspace at a glance.</p>
    <div className="grid4">{data.stats.map(s => <Card key={s.label}><small>{s.label}</small><div className="big">{s.value}</div></Card>)}</div>
    {data.pipeline && <Card title="Application pipeline"><div className="pipe">{STAGES.map(s => <div key={s}><small>{s}</small><b>{data.pipeline[s] ?? 0}</b></div>)}</div></Card>}
    {data.upcoming && <Card title="Upcoming interview">
      <b>{data.upcoming.application.opportunity.title}</b> · {data.upcoming.application.opportunity.company.name}<br />
      {fmt(data.upcoming.scheduled_at)} · {data.upcoming.mode}</Card>}
    <Card title="Recent activity">
      {data.alerts.length ? data.alerts.map(a => <p key={a.id}><b>{a.title}</b>{a.body && <> — {a.body}</>}<br /><small>{fmt(a.created_at)}</small></p>) : <p className="muted">Nothing yet.</p>}
    </Card>
  </>);
}
