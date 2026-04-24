import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Activities: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Activities: fetched data', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setActivities(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-3 fs-5">Loading activities...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <i className="me-2">&#9888;</i>
        <span>Failed to load activities: {error}</span>
      </div>
    );
  }

  return (
    <div className="card octofit-card">
      <div className="card-header bg-primary text-white d-flex align-items-center justify-content-between">
        <h4 className="mb-0 fw-bold">Activities</h4>
        <span className="badge bg-light text-primary">{activities.length} records</span>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">User</th>
                <th scope="col">Activity Type</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">No activities found.</td>
                </tr>
              ) : (
                activities.map((activity, index) => (
                  <tr key={activity._id || activity.id || index}>
                    <td>{activity.user}</td>
                    <td>
                      <span className="badge bg-info text-dark">{activity.activity_type}</span>
                    </td>
                    <td>{activity.duration}</td>
                    <td>{activity.date}</td>
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

export default Activities;
