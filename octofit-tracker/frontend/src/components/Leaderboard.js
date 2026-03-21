import React, { useState, useEffect } from 'react';

const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME || '';
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/leaderboard/`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setEntries(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <p className="text-muted">API endpoint: {CODESPACE_NAME ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/leaderboard` : 'http://localhost:8000/api/leaderboard'}</p>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry.id}>
              <td>{index + 1}</td>
              <td>{entry.user?.username}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    fetch(`${API_URL}/api/leaderboard/`)
      .then(res => res.json())
      .then(data => { setLeaderboard(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <h2 className="mb-4">🏆 Leaderboard</h2>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-warning">
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.sort((a, b) => a.rank - b.rank).map(entry => (
                  <tr key={entry.id}>
                    <td>
                      {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                    </td>
                    <td>{entry.user ? entry.user.username : 'Unknown'}</td>
                    <td><span className="badge bg-success fs-6">{entry.score}</span></td>
                  </tr>
                ))}
                {leaderboard.length === 0 && (
                  <tr><td colSpan="3" className="text-center text-muted">No leaderboard data found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
