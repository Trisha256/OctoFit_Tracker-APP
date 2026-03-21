import React, { useState, useEffect } from 'react';

const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME || '';
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/workouts/`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setWorkouts(data);
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
      <h2>Workouts</h2>
      <p className="text-muted">API endpoint: {CODESPACE_NAME ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/workouts` : 'http://localhost:8000/api/workouts'}</p>
      <div className="row">
        {workouts.map(workout => (
          <div key={workout.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <p className="card-text">{workout.description}</p>
                <p className="card-text"><small className="text-muted">Duration: {workout.duration} minutes</small></p>
    fetch(`${API_URL}/api/workouts/`)
      .then(res => res.json())
      .then(data => { setWorkouts(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const difficultyColor = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'danger',
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">💪 Personalized Workouts</h2>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
        {workouts.map(workout => (
          <div key={workout.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span className="fw-bold">{workout.name}</span>
                <span className={`badge bg-${difficultyColor[workout.difficulty] || 'secondary'}`}>
                  {workout.difficulty}
                </span>
              </div>
              <div className="card-body">
                <p className="card-text">{workout.description}</p>
                <div className="d-flex gap-2 flex-wrap">
                  <span className="badge bg-info text-dark">🏷️ {workout.workout_type}</span>
                  <span className="badge bg-secondary">⏱️ {workout.duration} min</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {workouts.length === 0 && (
          <div className="col-12">
            <p className="text-muted">No workouts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
