import React, { useEffect, useState } from 'react';
import { signInWithGoogle } from '../config/auth';
import { getBetsFromFirestore, createNewBet } from '../config/firestore-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';  
import "../styles/Dashboard.scss";

const Dashboard = () => {
  const [bets, setBets] = useState([]);
  const [newBet, setNewBet] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });
  }, []);

  useEffect(() => {
    const fetchBets = async () => {
      if (user) {
        try {
          const fetchedBets = await getBetsFromFirestore(user.uid); 
          setBets(fetchedBets);
        } catch (error) {
          console.error("Error fetching bets:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBets();
  }, [user]);

  const handleGoogleSignIn = async () => {
    try {
      const newUser = await signInWithGoogle();
      console.log("User signed in", newUser);
      setUser(newUser); 
    } catch (error) {
      console.error("sign in failed", error);
    }
  };

  const handleCreateBet = async () => {
    if (newBet.trim() && user) {
      try {
        await createNewBet(newBet, user.uid);  
        setNewBet('');
        const updatedBets = await getBetsFromFirestore(user.uid); 
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
          {user ? (
            <div className="profile">
              <img className="profile-icon" src={user.photoURL || "https://via.placeholder.com/50"} alt="Profile Icon" />
              <h3>{user.displayName}</h3>
            </div>
          ) : (
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
          )}
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
