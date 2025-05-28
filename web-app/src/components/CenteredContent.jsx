import React from 'react';
import TypewriterText from './TypewriterText';
import ThemeToggleButton from './ThemeToggleButton';
import './CenteredContent.css';

const CenteredContent = ({ theme, toggleTheme }) => {
  return (
    <div className="centered-content">
      <div className="typewriter-container">
        <TypewriterText text="AETHERENE" typingSpeed={150} loop={true} />
      </div>
      <div className="static-container">
        <h1 className="static-heading">Graphic Designers of Sort</h1>
        <button className="explore-button"> Explore My Work </button>
        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
};

export default CenteredContent;
