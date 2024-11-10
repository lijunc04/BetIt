import React from 'react';
import "../styles/LandingPage.scss";
import { signInWithGoogle } from '../config/auth';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import logo from '../assets/logo.svg'; 
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';  

const LandingPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)

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

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });
  }, []);

  return (
    <>
      <Navbar />
      <section className="landing">
        <div className="landing__content">
          <img src={logo} alt="Logo" className="landing__logo" />
          <h1 className="landing__title">BetIt</h1>
          <p className="landing__description">Put your money where your mouth is.</p>
          <button className="landing__button" onClick={handleGoogleSignIn}>
            Get Started <FaArrowRight />
          </button>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
