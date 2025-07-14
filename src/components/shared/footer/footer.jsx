import React from 'react';
	import './footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <p>Connect with us:</p>
      <div className="social-icons">
        <a href="https://www.facebook.com/accounts/login"><i className="fab fa-facebook"></i></a>
        <a href="https://www.instagram.com/accounts/login"><i className="fab fa-instagram"></i></a>
        <a href="https://www.tweeter.com/accounts/login"><i className="fab fa-twitter"></i></a>
        <a href="timecapsulet@gmail.com"><i className="fas fa-envelope"></i></a>
      </div>
    </footer>
  );
};

export default Footer;
