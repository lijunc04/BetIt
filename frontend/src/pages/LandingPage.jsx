import React from 'react';
import "../styles/LandingPage.scss";
import { signInWithGoogle } from '../config/auth';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import logo from '../assets/logo.svg'; 

const LandingPage = () => {
  const navigate = useNavigate();
  
  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("User signed in", user);
      navigate('/dashboard');
    } catch (error) {
      console.error("Sign in failed", error);
    }
  };

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
