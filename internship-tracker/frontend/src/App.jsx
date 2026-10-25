import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Layout from './Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Opportunities from './pages/Opportunities';
import Applications from './pages/Applications';
import CvBuilder from './pages/CvBuilder';
import Interviews from './pages/Interviews';
import Notes from './pages/Notes';
import Students from './pages/Students';
import CvReview from './pages/CvReview';
import Queue from './pages/Queue';
import Users from './pages/Users';
import Companies from './pages/Companies';
import Post from './pages/Post';
import Candidates from './pages/Candidates';

function Only({ roles, children }) {
  const { user } = useAuth();
  return roles.includes(user.role) ? children : <Navigate to="/" replace />;
}
const R = (roles, el) => <Only roles={roles}>{el}</Only>;

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="opportunities" element={R(['student'], <Opportunities />)} />
        <Route path="applications" element={R(['student'], <Applications />)} />
        <Route path="cv" element={R(['student'], <CvBuilder />)} />
        <Route path="interviews" element={R(['student', 'recruiter'], <Interviews />)} />
        <Route path="notes" element={R(['student', 'advisor'], <Notes />)} />
        <Route path="students" element={R(['advisor'], <Students />)} />
        <Route path="cv-review" element={R(['advisor'], <CvReview />)} />
        <Route path="queue" element={R(['admin'], <Queue />)} />
        <Route path="users" element={R(['admin'], <Users />)} />
        <Route path="companies" element={R(['admin'], <Companies />)} />
        <Route path="post" element={R(['recruiter'], <Post />)} />
        <Route path="candidates" element={R(['recruiter'], <Candidates />)} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
