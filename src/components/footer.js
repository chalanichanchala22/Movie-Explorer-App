import React from 'react';
import '../App.css';

const footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} Movie Explorer. All rights reserved.</p>
      
      </div>
    </footer>
  );
};

export default footer;