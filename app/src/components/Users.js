import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = codespace
      ? `https://${codespace}-8000.app.github.dev/api/users/`
      : `${window.location.protocol}//${window.location.hostname}:8000/api/users/`;
    console.log('Fetching Users from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Users data:', data);
      })
      .catch(err => console.error('Error fetching users:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading users...</div>;

  return (
    <div>
      <h2>Users</h2>
      <ul className="list-group">
        {users.map((user, idx) => (
          <li className="list-group-item" key={user.id || idx}>
            {JSON.stringify(user)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
