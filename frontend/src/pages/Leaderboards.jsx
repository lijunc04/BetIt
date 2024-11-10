import React, { useState, useEffect } from 'react';
import '../styles/Leaderboards.scss';
import Navbar from './Navbar';

const Leaderboards = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/leaderboard');
        const data = await response.json();
        setLeaderboard(data.leaderboard || []);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
    
    fetchLeaderboard();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="leaderboards">
      <h1 className="leaderboards__title">Leaderboard</h1>
      <div className="leaderboards__table-container">
        <table className="leaderboards__table">
          <thead>
            <tr>
              <th className="leaderboards__table-header">Rank</th>
              <th className="leaderboards__table-header">Name</th>
              <th className="leaderboards__table-header">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={index} className="leaderboards__table-row">
                <td>{user.rank}</td>
                <td>{user.name}</td>
                <td>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Leaderboards;
