import React, {useEffect, useState} from 'react';
import '../styles/Navbar.scss';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../config/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';  



const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)


  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });
  }, []);

  const handleGoogleSignIn = async () => {
    if(!user){
      try {
        const user = await signInWithGoogle();
        console.log("User signed in", user);
        navigate('/dashboard');
      } catch (error) {
        console.error("Sign in failed", error);
      }
    }else{
      navigate('/dashboard')
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__content">
        <div className="navbar__logo">BetIt</div>
        <ul className="navbar__links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/leaderboards">Leaderboards</a></li>
        </ul>
        <button className="navbar__button" onClick={handleGoogleSignIn}>
          {
            !user ?
            "Sign in with Google"
            :
            "Dashboard"
          }
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
