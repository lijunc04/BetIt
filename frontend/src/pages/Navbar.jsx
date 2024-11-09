import React from 'react';
import '../styles/Navbar.scss'; 

const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="navbar-content">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
      </nav>
    );
  };

export default Navbar;
