import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Users from './components/Users';
import Activities from './components/Activities';
import Teams from './components/Teams';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import logo from './logo.png';
import './App.css';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src="/octofitapp-small.png" alt="OctoFit" height="30" className="me-2" />
              OctoFit Tracker
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              <img src="/octofitapp-small.png" alt="OctoFit" height="30" className="me-2" />
              OctoFit Tracker
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/activities">Activities</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/teams">Teams</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<h1>Welcome to OctoFit Tracker!</h1>} />
        <main className="container-fluid py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6 text-center">
        <h1 className="display-4 mb-4">Welcome to OctoFit Tracker</h1>
        <p className="lead">Track your fitness activities, compete with teams, and reach your goals!</p>
        <div className="row g-3 mt-4">
          <div className="col-6 col-md-4">
            <div className="card h-100 text-center p-3">
              <div className="card-body">
                <h5 className="card-title">🏃 Activities</h5>
                <p className="card-text small">Log your workouts</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4">
            <div className="card h-100 text-center p-3">
              <div className="card-body">
                <h5 className="card-title">👥 Teams</h5>
                <p className="card-text small">Join or create teams</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4">
            <div className="card h-100 text-center p-3">
              <div className="card-body">
                <h5 className="card-title">🏆 Leaderboard</h5>
                <p className="card-text small">Compete and win</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4">
            <div className="card h-100 text-center p-3">
              <div className="card-body">
                <h5 className="card-title">💪 Workouts</h5>
                <p className="card-text small">Personalized plans</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4">
            <div className="card h-100 text-center p-3">
              <div className="card-body">
                <h5 className="card-title">👤 Users</h5>
                <p className="card-text small">Manage profiles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
