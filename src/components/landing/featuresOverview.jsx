import React from 'react';
import '../../styles/featuresOverview.css';

const features = [
  { icon: '📅', title: 'Set Reveal Date' },
  { icon: '🔒', title: 'Choose Privacy' },
  { icon: '📍', title: 'Attach Location' },
  { icon: '🎧', title: 'Add Audio or Image' },
];

const FeaturesOverview = () => {
  return (
    <div className="features">
      <h2>Features</h2>
      <div className="features-grid">
        {features.map((f, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-title">{f.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesOverview;
