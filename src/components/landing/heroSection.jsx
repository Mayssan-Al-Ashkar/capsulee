import React from 'react';
import '../../styles/heroSection.css';
import heroImage from '../../assets/hero.jpg';

const HeroSection = () => {
  return (
    <section className="hero">
      <img src={heroImage} alt="Time capsule concept" className="hero-img" />
      <div className="hero-text">
        <h1>Preserve Your Precious Moments</h1>
        <p>Send a message to your future self with media, mood, and more.</p>
      </div>
    </section>
  );
};

export default HeroSection;
