import React, { useEffect, useState } from 'react';
import { getBetsFromFirestore, createNewBet } from '../config/firestore-congif'; 
import "../styles/Dashboard.scss";

const Dashboard = () => {
  const [bets, setBets] = useState([]);
  const [newBet, setNewBet] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const fetchedBets = await getBetsFromFirestore(); // Fetch bets from Firestore
        setBets(fetchedBets);
      } catch (error) {
        console.error("Error fetching bets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBets();
  }, []);

  // Handle creation of a new bet
  const handleCreateBet = async () => {
    if (newBet.trim()) {
      try {
        await createNewBet(newBet);  // Assuming createNewBet sends new bet to Firestore
        setNewBet('');  // Clear input field
        const updatedBets = await getBetsFromFirestore(); // Fetch updated bets
        setBets(updatedBets);
      } catch (error) {
        console.error("Error creating bet:", error);
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="sidebar">
          <div className="profile">
            <img className="profile-icon" src="https://via.placeholder.com/50" alt="Profile Icon" />
            <h3>User Name</h3>
          </div>
        </div>
        
        <div className="bets">
          <h2>Current Bets</h2>
          {loading ? (
            <p>Loading your bets...</p>
          ) : (
            <ul>
              {bets.length === 0 ? (
                <li>No current bets</li>
              ) : (
                bets.map((bet, index) => (
                  <li key={index}>
                    <div className="bet-item">
                      <p>{bet.name}</p>
                      <span>{bet.status}</span>
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        <div className="create-bet">
          <h2>Create a New Bet</h2>
          <input 
            type="text" 
            value={newBet} 
            onChange={(e) => setNewBet(e.target.value)} 
            placeholder="Enter your bet" 
          />
          <button onClick={handleCreateBet}>Create Bet</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
