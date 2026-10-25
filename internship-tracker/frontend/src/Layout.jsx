import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const NAV = {
  student: [['/', 'Dashboard'], ['/opportunities', 'Find Opportunities'], ['/applications', 'Applications'], ['/cv', 'CV Builder'], ['/interviews', 'Interviews'], ['/notes', 'Notes']],
  advisor: [['/', 'Dashboard'], ['/students', 'My Students'], ['/cv-review', 'CV Review'], ['/notes', 'Notes']],
  admin: [['/', 'Dashboard'], ['/queue', 'Application Queue'], ['/users', 'Users'], ['/companies', 'Companies']],
  recruiter: [['/', 'Dashboard'], ['/post', 'Post Opportunity'], ['/candidates', 'Candidates'], ['/interviews', 'Interviews']],
};

export default function Layout() {
  const { user, loading, logout } = useAuth();
  if (loading) return <p className="pad">Loading…</p>;
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="shell">
      <aside>
        <div className="brand"><b>CAREER</b><span>COUNSELLING &amp; PLACEMENT</span></div>
        <nav>{NAV[user.role].map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}</nav>
        <button className="ghost" onClick={logout}>Sign out</button>
      </aside>
      <main>
        <header><span className="role">{user.role.toUpperCase()} WORKSPACE</span><span>{user.name}</span></header>
        <div className="content"><Outlet /></div>
      </main>
    </div>
  );
}
