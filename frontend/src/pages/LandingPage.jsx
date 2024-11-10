import React from 'react'
import "../styles/LandingPage.scss"
import { signInWithGoogle } from '../config/auth';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
    const handleGoogleSignIn = async () => {
        try {
          const user = await signInWithGoogle();
          console.log("User signed in", user);
          navigate('/dashboard');
        } catch (error) {
          console.error("sign in failed", error);
        }

      };

    return (
        <div className='landing'><Navbar/>
    <div className='landing-main'>
        
        <div className='landing-container'>
            <h2 className='landing-title'>BetIt</h2>
            <p className='landing-subtitle'>Put your money where your mouth is</p>
            <button className='google-signin-btn' onClick={handleGoogleSignIn}>Get Started</button>
        </div>
    </div>
    </div>
  )
}

export default LandingPage
