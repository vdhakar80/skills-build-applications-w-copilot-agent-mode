import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Teams: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Teams: fetched data', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setTeams(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-3 fs-5">Loading teams...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <i className="me-2">&#9888;</i>
        <span>Failed to load teams: {error}</span>
      </div>
    );
  }

  return (
    <div className="card octofit-card">
      <div className="card-header bg-success text-white d-flex align-items-center justify-content-between">
        <h4 className="mb-0 fw-bold">Teams</h4>
        <span className="badge bg-light text-success">{teams.length} teams</span>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">Team Name</th>
                <th scope="col">Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan="2" className="text-center text-muted py-4">No teams found.</td>
                </tr>
              ) : (
                teams.map((team, index) => (
                  <tr key={team._id || team.id || index}>
                    <td className="fw-semibold">{team.name}</td>
                    <td>
                      {Array.isArray(team.members)
                        ? team.members.map((m, i) => (
                            <span key={i} className="badge bg-secondary me-1">{m}</span>
                          ))
                        : <span className="badge bg-secondary">{team.members}</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Teams;
