import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        {/* ── Navigation ── */}
        <nav className="navbar navbar-expand-lg navbar-dark octofit-navbar">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              <img
                src="/octofitapp-small.png"
                alt="OctoFit logo"
                className="brand-logo"
              />
              Octo<span className="brand-accent">Fit</span> Tracker
            </NavLink>

            {/* Mobile hamburger */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNav"
              aria-controls="mainNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mainNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {[
                  { to: '/users',       label: 'Users' },
                  { to: '/teams',       label: 'Teams' },
                  { to: '/activities',  label: 'Activities' },
                  { to: '/workouts',    label: 'Workouts' },
                  { to: '/leaderboard', label: 'Leaderboard' },
                ].map(({ to, label }) => (
                  <li className="nav-item" key={to}>
                    <NavLink
                      className={({ isActive }) =>
                        'nav-link' + (isActive ? ' active' : '')
                      }
                      to={to}
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {/* ── Page content ── */}
        <main className="container py-4">
          <Routes>
            <Route path="/"            element={<Users />} />
            <Route path="/users"       element={<Users />} />
            <Route path="/teams"       element={<Teams />} />
            <Route path="/activities"  element={<Activities />} />
            <Route path="/workouts"    element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>

        {/* ── Footer ── */}
        <footer className="octofit-footer text-center py-3 mt-auto">
          &copy; {new Date().getFullYear()} OctoFit Tracker
        </footer>
      </div>
    </Router>
  );
}

export default App;
