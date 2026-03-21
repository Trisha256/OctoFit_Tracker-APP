import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
