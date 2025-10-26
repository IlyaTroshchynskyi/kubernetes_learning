import React, { useState, useEffect } from 'react';
import { config } from './config.ts';

type User = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  role: string;
};

const UserCard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${config.BASE_URL}/api/current-user-from-app2`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setUser(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div className="loading">Loading user...</div>;
  }

  if (error) {
    return <div className="error">Error loading user: {error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="user-card">
      <h3>Current User</h3>
      <div className="user-info">
        <div className="user-row">
          <span className="user-label">Username:</span>
          <span className="user-value">{user.username}</span>
        </div>
        <div className="user-row">
          <span className="user-label">Name:</span>
          <span className="user-value">{user.first_name} {user.last_name}</span>
        </div>
        <div className="user-row">
          <span className="user-label">Email:</span>
          <span className="user-value">{user.email}</span>
        </div>
        <div className="user-row">
          <span className="user-label">Role:</span>
          <span className="user-value">{user.role}</span>
        </div>
        <div className="user-row">
          <span className="user-label">Status:</span>
          <span className={`user-status ${user.is_active ? 'active' : 'inactive'}`}>
            {user.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
