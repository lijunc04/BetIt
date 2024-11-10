import React, { useEffect, useState } from 'react';
import { signInWithGoogle } from '../config/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';  
import "../styles/Dashboard.scss";
import { X } from 'lucide-react';
import VerifyPopup from './VerifyPopUp';
import { LogOut } from 'lucide-react';
import { logout } from '../config/auth'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [bets, setBets] = useState([]);
  const [betIndices, setBetIndices] = useState([])

  const [newBet, setNewBet] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [data, setData] = useState({});
  const [betTime, setBetTime] = useState(null);
  const [timeUnit, setTimeUnit] = useState('hrs');
  const [money, setMoney] = useState(null);

  const [score, setScore] = useState(0);
  const [balance, setBalance] = useState(0);

  const [extendNewBet, setExtendNewBet] = useState(false);

  const [verify, setVerify] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [verificationIndex, setVerificationIndex] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });
  }, []);

  const refresh_data = async () => {
    setLoading(true)
    if (user){
      await user.getIdToken().then(token=>
        fetch('http://127.0.0.1:5000/dashboard', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          }
        }).then(out=>out.json()).then(data=>setData(data.info))
      )
    }
    setLoading(false)
  }

  const invalidateBet = async (index) => {

    if (user){
      await user.getIdToken().then(token=>
        fetch('http://127.0.0.1:5000/invalidatebet', {
          method: 'PUT',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            'bet_index': index,            
          })
        })
      )

    setLoading(true)

      await refresh_data()
    setLoading(false)

    }
  }
  // fetches all data: score, balance, bets
  useEffect(()=>{
    setLoading(true)
    if (user){
      try{
         user.getIdToken().then(token=>
          fetch('http://127.0.0.1:5000/dashboard', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            
          }).then(out=>out.json()).then(data=>setData(data.info))
        )
      }catch (error) {
        console.error('Error refreshing data:', error);
      }
      console.log('finish loading')
    }
  },[user])  

  
  useEffect(()=>{
    if (data && typeof data.score !== 'undefined') {
      setScore(data.score);
      setBalance(data.balance);
      const bets_unsorted = Array.isArray(data.bets) ? data.bets : []
      const currentTime = new Date();
      bets_unsorted.every(async (e,i)=>{
        const due = new Date(e.dueBy)
        if(e.status === 'todo' && due.getTime() < currentTime.getTime() ){
          await invalidateBet(i)
        }
      })
      const order = ['todo',  'done','pastdue',];
      const betsWithIndex = bets_unsorted.map((bet, index) => ({ bet, index }));
      
      betsWithIndex.sort((a, b) => {
        return order.indexOf(a.bet.status) - order.indexOf(b.bet.status);
      });
      
      const sortedBets = betsWithIndex.map(item => item.bet);
      setBetIndices(betsWithIndex.map(item => item.index))
      
      setBets(sortedBets);
      setLoading(false)
  }
  },[data])


  const handleGoogleSignIn = async () => {
    try {
      const newUser = await signInWithGoogle();
      console.log("User signed in", newUser);
      setUser(newUser); 
    } catch (error) {
      console.error("sign in failed", error);
    }
  };

  const handleCreateBet = async ()=>{
    if(user && newBet && betTime && betTime > 0){
        try{
          const currentTime = new Date();
          const timeValue = parseInt(betTime, 10);
          
          // Validate timeValue
          if (isNaN(timeValue) || timeValue <= 0) {
            console.error('Invalid time value:', betTime);
            return;
          }
          
          let dueTime = new Date(currentTime.getTime());
          
          // Calculate milliseconds to add
          let millisecondsToAdd = 0;
          switch (timeUnit) {
            case 'hrs':
              millisecondsToAdd = timeValue * 60 * 60 * 1000;
              break;
            case 'days':
              millisecondsToAdd = timeValue * 24 * 60 * 60 * 1000;
              break;
            case 'mins':
              millisecondsToAdd = timeValue * 60 * 1000;
              break;
            default:
              console.error('Invalid time unit:', timeUnit);
              return;
          }
    
          // Add time and validate result
          const newTimestamp = dueTime.getTime() + millisecondsToAdd;
          dueTime = new Date(newTimestamp);
          const moneyVal = parseFloat(money.replace('$', ''))
          const token = await user.getIdToken()
          const res = await fetch('http://127.0.0.1:5000/bet', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
              },
              body:JSON.stringify({
                'bet': newBet,
                'createdAt': currentTime,
                'dueBy': dueTime,
                'status': 'todo', //todo, done, pastdue
                'conversation': "",
                'image': null,
                'wager': moneyVal
              })
            })
          const result = await res.json();
          setNewBet('')
          setBetTime('')
          setMoney('')
          await refresh_data();
          setExtendNewBet(false)
        }catch{
          console.log('error')
        }
    }
  }


  const completeProof = async (index)=>{
    if(user){
      await user.getIdToken().then(token=>
        fetch('http://127.0.0.1:5000/completebet', {
          method: 'PUT',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            'bet_index': betIndices[index],            
          })
        }).then(res=>console.log(res.json())))
      await refresh_data()
    }
  }
  const handleSubmitProof = async (_, index)=>{
    setVerify(true)
    setTaskName(bets[index].bet)
    setVerificationIndex(index)
  }

  const getRemainTime = (time) => {
    const currentTime = new Date();
    const dueTime = new Date(time);
    const timeLeftMillis = dueTime.getTime() - currentTime.getTime();
  
    const seconds = Math.floor(timeLeftMillis / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} left`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} left`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? 's' : ''} left`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} left`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} left`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} left`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} left`;
    }
  };

  const getPastTime = (time) => {
    const currentTime = new Date();
    const pastTime = new Date(time);
    const timePassedMillis = currentTime.getTime() - pastTime.getTime();
    if (timePassedMillis <= 0) {
      return "Just now";
    }
  
    const seconds = Math.floor(timePassedMillis / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  };
  
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {
          verify ? 
          (
            <VerifyPopup 
              taskName={taskName} 
              onClose={()=>{
                setVerify(false)
                setTaskName('')
                setVerificationIndex(null)
              }}
              onPositiveVerification={
                () =>{
                  completeProof(verificationIndex)
                }
              }
            />
          )
          :
          (
            <></>
          )
        }
        <div className="sidebar">
          {user ? (
            <div className="profile">

              <img className="profile-icon" src={user.photoURL || "https://via.placeholder.com/50"} alt="Profile Icon" />
              <div className='user-info'>
                <h3>{user.displayName}</h3>
                <p>Score: {score}</p>
                <p>Balance: ${balance}</p>
              </div>
              <LogOut 
                onClick={()=>{
                  logout()
                  navigate('/')
                }}
                className='log-out-button'
                size={24}
              />
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
              {bets.length===0  ? (
                <></>
              ) : (
                bets.map((bet, index) => (
                  <li key={index}>
                    <div className="bet-item">
                      <span 
                        className={bet.status}
                      />
                      <p>{bet.bet}</p>
                      <p>${bet.wager}</p>
                      {
                        bet.status === 'todo' ?
                        (<p>{getRemainTime(bet.dueBy)}</p>)
                        :
                        (<p>{getPastTime(bet.dueBy)}</p>)
                      }
                      {bet.status === 'todo'
                      ? (
                        <button
                          onClick={e=>handleSubmitProof(e, index)}
                          className='submit-proof-button'
                        >
                          Submit
                        </button>
                      ):(
                        
                        bet.status === 'pastdue' 
                        ?(<p>-200 score</p>)
                        :(<p>+200 score</p>)
                        
                      )}
                    </div>
                  </li>
                ))
              )}
              <li>
                <div
                className='add-bets-panel-button'
                onClick={()=>setExtendNewBet(true)}
                >
                  {bets.length === 0? 'Click here to start!' : 'Click to add more bets!'}
                </div>
              </li>
            </ul>
          )}
        </div>
        {extendNewBet && (
          <div className={`create-bet ${extendNewBet ? 'active' : ''}`}>
            <button 
              onClick={() => setExtendNewBet(false)}
              className="close-button"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <h2>Create a New Bet</h2>
            <div className="create-bet-form">
              <input
                type="text"
                value={newBet}
                onChange={(e) => setNewBet(e.target.value)}
                placeholder="Enter your bet"
              />
              <div className='bet-time-select'>
                <input
                  type="text"
                  value={betTime}
                  onChange={(e) => {
                    let newVal = e.target.value.replace(/[^\d]/g, ""); 
                    e.target.value = newVal;
                    setBetTime(e.target.value)
                  }}
                  placeholder="Time limit"
                />
                <select 
                  id="timeUnitDropdown" 
                  value={timeUnit} 
                  onChange={e => setTimeUnit(e.target.value)}
                >
                  <option value="hrs">Hrs</option>
                  <option value="days">Days</option>
                  <option value="mins">Minutes</option>
                </select>
              </div>
              <input            
                type="text"
                value={money}
                onChange={(e) => {
                  let newVal = e.target.value.replace(/[^0-9.]/g, ""); 
                  let parts = newVal.split('.');
                  if (parts.length > 1) {
                    parts[1] = parts[1].slice(0, 2);
                    newVal = parts[0] + '.' + parts[1];
                  } 
                  if(newVal.length > 0) {
                    e.target.value = '$' + newVal;
                  }
                  setMoney(e.target.value)
                }}
                placeholder="Enter your wager"
              />
              <button onClick={handleCreateBet}>Create Bet</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
