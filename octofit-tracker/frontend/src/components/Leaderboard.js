import React, { useState, useEffect } from 'react';

function rankBadgeClass(index) {
  if (index === 0) return 'rank-badge gold';
  if (index === 1) return 'rank-badge silver';
  if (index === 2) return 'rank-badge bronze';
  return 'rank-badge';
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setLeaderboard(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-3 fs-5">Loading leaderboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <i className="me-2">&#9888;</i>
        <span>Failed to load leaderboard: {error}</span>
      </div>
    );
  }

  return (
    <div className="card octofit-card">
      <div className="card-header bg-warning text-dark d-flex align-items-center justify-content-between">
        <h4 className="mb-0 fw-bold">&#127942; Leaderboard</h4>
        <span className="badge bg-dark text-warning">{leaderboard.length} entries</span>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col" style={{ width: '5%' }}>Rank</th>
                <th scope="col">User</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-4">No entries yet.</td>
                </tr>
              ) : (
                leaderboard.map((entry, index) => (
                  <tr key={entry._id || entry.id || index}>
                    <td className="text-center">
                      <span className={rankBadgeClass(index)}>{index + 1}</span>
                    </td>
                    <td className="fw-semibold">{entry.user}</td>
                    <td>
                      <span className="badge bg-success fs-6">{entry.score}</span>
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

export default Leaderboard;
