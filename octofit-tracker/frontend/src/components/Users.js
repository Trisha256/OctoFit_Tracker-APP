import React, { useState, useEffect } from 'react';

const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME || '';
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/users/`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setUsers(data);
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
      <h2>Users</h2>
      <p className="text-muted">API endpoint: {CODESPACE_NAME ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/users` : 'http://localhost:8000/api/users'}</p>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    fetch(`${API_URL}/api/users/`)
      .then(res => res.json())
      .then(data => { setUsers(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Users</h2>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {users.map(user => (
          <div key={user.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">👤 {user.username}</h5>
                <p className="card-text text-muted">{user.email}</p>
              </div>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div className="col-12">
            <p className="text-muted">No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
