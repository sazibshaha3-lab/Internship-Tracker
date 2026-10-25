import api from '../api';
import { Badge, Card, useFetch } from '../ui';

export default function Companies() {
  const { data, reload } = useFetch('/companies');
  const toggle = async c => { await api.patch(`/companies/${c.id}/verify`); reload(); };
  return (<><h1>Companies</h1>
    <Card><table><thead><tr><th>Name</th><th>Opportunities</th><th>Status</th><th /></tr></thead>
      <tbody>{data?.map(c => (
        <tr key={c.id}><td>{c.name}</td><td>{c.opportunities_count}</td>
          <td><Badge status={c.verified ? 'approved' : 'pending'} /></td>
          <td><button className="sec" onClick={() => toggle(c)}>{c.verified ? 'Revoke' : 'Verify'}</button></td></tr>))}</tbody></table></Card></>);
}
