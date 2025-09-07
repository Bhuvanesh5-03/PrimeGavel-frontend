import React from 'react';

const Footer = () => {
  return (
    <footer className="footer banner ">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} PrimeGavel. All Rights Reserved.</p>
        <ul className="footer-links">
          <li><a href="/">Home</a></li>
          <li><a href="/#about">About</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
};



export default Footer;
