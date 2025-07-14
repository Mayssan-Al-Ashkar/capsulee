import React from "react";
import '../styles/homePage.css';
import Navbar from "../components/shared/navbar/navbar";
import HeroSection from "../components/landing/heroSection";
import FeaturesOverview from "../components/landing/featuresOverview";
import LandingCapsulePreview from "../components/landing/capsulePreview";
import Footer from "../components/shared/footer/footer";

const HomePage = () => {
  return (
    <div className="homepage">
    <Navbar />
      <main>
        <HeroSection />
        <section id="features">
          <FeaturesOverview />
        </section>
        <section id="examples">
          <LandingCapsulePreview />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
