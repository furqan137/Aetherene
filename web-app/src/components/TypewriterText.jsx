import React, { useState, useEffect, useRef } from 'react';
import './TypewriterText.css'; // Ensure you import your CSS

const TypewriterText = ({ text, typingSpeed = 200, loop = false }) => { // Adjusted the default typingSpeed to 200 for slower effect
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);
  const typingDirectionRef = useRef(true);

  useEffect(() => {
    const typeText = () => {
      setDisplayedText((prev) => text.slice(0, indexRef.current));
      indexRef.current += typingDirectionRef.current ? 1 : -1;

      if (indexRef.current > text.length) {
        if (loop) {
          typingDirectionRef.current = false;
          setTimeout(() => {
            indexRef.current = text.length;
          }, 1000);
        } else {
          clearInterval(interval);
        }
      } else if (indexRef.current < 0) {
        typingDirectionRef.current = true;
      }
    };

    const interval = setInterval(typeText, typingSpeed);
    return () => clearInterval(interval);
  }, [text, typingSpeed, loop]);

  return <h2 className={`typewriter-text`}>{displayedText}</h2>;
};

export default TypewriterText;
