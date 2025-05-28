import React from 'react';
import logo from '../assets/icons/logo.svg';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo">
      <img src={logo} alt="Logo" className="logo-image" />
    </div>
  );
};

export default Logo;
