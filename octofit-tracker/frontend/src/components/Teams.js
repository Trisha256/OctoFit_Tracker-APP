import React, { useState, useEffect } from 'react';

const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME || '';
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/teams/`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setTeams(data);
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
      <h2>Teams</h2>
      <p className="text-muted">API endpoint: {CODESPACE_NAME ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/teams` : 'http://localhost:8000/api/teams'}</p>
      <div className="row">
        {teams.map(team => (
          <div key={team.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">
                  Members: {team.members?.map(m => m.username).join(', ') || 'No members'}
                </p>
    fetch(`${API_URL}/api/teams/`)
      .then(res => res.json())
      .then(data => { setTeams(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Teams</h2>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {teams.map(team => (
          <div key={team.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">👥 {team.name}</h5>
              </div>
              <div className="card-body">
                <h6>Members ({team.members ? team.members.length : 0})</h6>
                <ul className="list-unstyled mb-0">
                  {team.members && team.members.map(member => (
                    <li key={member.id} className="d-flex align-items-center mb-1">
                      <span className="me-2">👤</span> {member.username}
                    </li>
                  ))}
                  {(!team.members || team.members.length === 0) && (
                    <li className="text-muted">No members yet</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
        {teams.length === 0 && (
          <div className="col-12">
            <p className="text-muted">No teams found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
