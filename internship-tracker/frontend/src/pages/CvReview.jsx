import { useState } from 'react';
import api, { err } from '../api';
import { Badge, Card, Msg, openCv, useFetch } from '../ui';

function Row({ cv, onDone }) {
  const [fb, setFb] = useState(cv.feedback || '');
  const [msg, setMsg] = useState('');
  const send = async status => {
    try { await api.patch(`/cvs/${cv.id}/review`, { status, feedback: fb }); onDone(); } catch (e) { setMsg(err(e)); }
  };
  return (
    <Card>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div><b>{cv.student.name}</b> · v{cv.version} · {cv.original_name} <Badge status={cv.status} /></div>
        <button className="sec" onClick={() => openCv(cv.id, setMsg)}>Open CV</button>
      </div>
      <label htmlFor={`f${cv.id}`}>Feedback</label>
      <textarea id={`f${cv.id}`} rows={2} value={fb} onChange={e => setFb(e.target.value)} />
      <p className="row"><button onClick={() => send('approved')}>Approve</button>
        <button className="sec" onClick={() => send('changes_requested')}>Request changes</button></p>
      <Msg text={msg} />
    </Card>
  );
}

export default function CvReview() {
  const { data, reload } = useFetch('/cvs');
  return (<><h1>CV Review</h1>{data?.map(c => <Row key={c.id} cv={c} onDone={reload} />)}
    {data?.length === 0 && <p className="muted">No CVs to review.</p>}</>);
}
