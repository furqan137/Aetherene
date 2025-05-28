import React, { useState } from 'react';
import './SocialLinks.css';
import facebookIcon from '../assets/icons/facebook.png';
import twitterIcon from '../assets/icons/twitter.png';
import xdadikIcon from '../assets/icons/xdadik.png';
import emailIcon from '../assets/icons/email.png';

const SocialLinks = () => {
  const [activeLabel, setActiveLabel] = useState(null);
  const [showIcons, setShowIcons] = useState(false); // State to toggle visibility

  const handleMouseEnter = (label) => {
    setActiveLabel(label);
  };

  const handleMouseLeave = () => {
    setActiveLabel(null);
  };

  const toggleIcons = () => {
    setShowIcons((prev) => !prev); // Toggle the visibility of icons
  };

  return (
    <div className="social-links">
      {/* Show the "+" button only on mobile */}
      <button className="toggle-button" onClick={toggleIcons}>
        +
      </button>

      {/* Show social icons in desktop view */}
      <div className={`icons-container ${showIcons ? 'show' : ''}`}>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => handleMouseEnter('Facebook')}
          onMouseLeave={handleMouseLeave}
        >
          <img src={facebookIcon} alt="Facebook" className="social-icon" />
          {activeLabel === 'Facebook' && <span className="social-label">Facebook</span>}
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => handleMouseEnter('Twitter')}
          onMouseLeave={handleMouseLeave}
        >
          <img src={twitterIcon} alt="Twitter" className="social-icon" />
          {activeLabel === 'Twitter' && <span className="social-label">Twitter</span>}
        </a>
        <a
          href="https://xdadik.com"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => handleMouseEnter('Xdadik')}
          onMouseLeave={handleMouseLeave}
        >
          <img src={xdadikIcon} alt="Xdadik" className="social-icon" />
          {activeLabel === 'Xdadik' && <span className="social-label">Xdadik</span>}
        </a>
        <a
          href="mailto:your-email@example.com"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => handleMouseEnter('Email')}
          onMouseLeave={handleMouseLeave}
        >
          <img src={emailIcon} alt="Email" className="social-icon" />
          {activeLabel === 'Email' && <span className="social-label">Email</span>}
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
