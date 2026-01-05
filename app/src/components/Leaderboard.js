import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = codespace
      ? `https://${codespace}-8000.app.github.dev/api/leaderboards/`
      : `${window.location.protocol}//${window.location.hostname}:8000/api/leaderboards/`;
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
        console.log('Leaderboard data:', data);
      })
      .catch(err => console.error('Error fetching leaderboard:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {leaderboard.map((entry, idx) => (
          <li className="list-group-item" key={entry.id || idx}>
            {JSON.stringify(entry)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
