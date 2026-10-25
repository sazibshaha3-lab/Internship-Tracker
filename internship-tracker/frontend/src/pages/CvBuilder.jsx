import { useState } from 'react';
import api, { err } from '../api';
import { Badge, Card, Msg, openCv, useFetch } from '../ui';

export default function CvBuilder() {
  const { data, reload } = useFetch('/cvs');
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const upload = async e => {
    e.preventDefault();
    const fd = new FormData(); fd.append('file', file);
    try { await api.post('/cvs', fd); setMsg('CV uploaded. Your advisor will review it.'); setFile(null); e.target.reset(); reload(); }
    catch (x) { setMsg(err(x)); }
  };
  return (<>
    <h1>CV Builder</h1>
    <p className="muted">Applications use your latest advisor-approved CV version.</p>
    <Card title="Upload a new version">
      <form onSubmit={upload} className="row">
        <input type="file" accept=".pdf,.doc,.docx" onChange={e => setFile(e.target.files[0])} required />
        <button disabled={!file}>Upload</button>
      </form>
      <Msg text={msg} />
    </Card>
    <Card title="Versions">
      <table><thead><tr><th>Version</th><th>File</th><th>Status</th><th>Advisor feedback</th><th /></tr></thead>
        <tbody>{data?.map(c => (
          <tr key={c.id}><td>v{c.version}</td><td>{c.original_name}</td><td><Badge status={c.status} /></td><td>{c.feedback || '—'}</td>
            <td><button className="sec" onClick={() => openCv(c.id, setMsg)}>Open</button></td></tr>))}</tbody></table>
    </Card>
  </>);
}
