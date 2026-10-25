import { Card, useFetch } from '../ui';

export default function Students() {
  const { data, error } = useFetch('/students');
  return (<><h1>My Students</h1>{error && <p className="error">{error}</p>}
    <Card><table><thead><tr><th>Name</th><th>Email</th><th>Department</th></tr></thead>
      <tbody>{data?.map(s => <tr key={s.id}><td>{s.name}</td><td>{s.email}</td><td>{s.department || '—'}</td></tr>)}</tbody></table>
      {data?.length === 0 && <p className="muted">No students assigned yet.</p>}</Card></>);
}
