import React from 'react';
import './ThemeToggleButton.css';
import sunIcon from '../assets/icons/daymode.png';
import moonIcon from '../assets/icons/nightmode.png';

const ThemeToggleButton = ({ theme, toggleTheme }) => {
  return (
    <button onClick={toggleTheme} className={`theme-toggle-button ${theme}`}>
      <img
        src={theme === 'light' ? moonIcon : sunIcon}
        alt="Toggle Theme"
        className="theme-icon"
      />
    </button>
  );
};

export default ThemeToggleButton;
