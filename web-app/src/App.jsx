import React, { useState, useEffect } from 'react';
import CenteredContent from './components/CenteredContent'; 
import Footer from './components/Footer'; 
import ThreeDCanvas from './components/ThreeDCanvas'; 
import AnimatedBackground from './components/AnimatedBackground'; 
import ThemeToggleButton from './components/ThemeToggleButton'; 
import Logo from './components/Logo'; 
import './App.css'; 

function App() {
  const [theme, setTheme] = useState('light');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme); 
    }
  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme); 
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const cursorHighlight = document.createElement('div');
    cursorHighlight.classList.add('cursor-highlight');
    document.body.appendChild(cursorHighlight);

    const moveCursor = (e) => {
      cursorHighlight.style.left = `${e.pageX}px`;
      cursorHighlight.style.top = `${e.pageY}px`;
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursorHighlight);
    };
  }, []);

  return (
    <div className="app">
      <Logo />
      <AnimatedBackground />
      <ThreeDCanvas />
      <CenteredContent theme={theme} toggleTheme={toggleTheme} />
      <Footer />

      {/* Heart Button */}
      <button className="heart-button" onClick={togglePopup}>
        ❤️
      </button>

      {/* Popup */}
      {isPopupVisible && (
        <div className="popup-container">
          <div className="popup-content">
            <button className="close-button" onClick={togglePopup}>✖</button>
            <p>Designed by <a href="#designer1">nitinf99</a> & <a href="#designer2">ekshana</a></p>
            <p>Thanks to <a href="#helper1">shahmirfaisal</a> & <a href="#helper2">Parcanss</a> for help</p>
            <p>Made with <span role="img" aria-label="heart">❤️</span> by Furqan</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
