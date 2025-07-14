import React from 'react';
import '../../styles/capsulePreview.css';
import happyImg from '../../assets/happy.jpg';
import sadImg from '../../assets/sad.jpg';
import excitedImg from '../../assets/excited.jpg';

const examples = [
  {
    mood: 'Happy',
    emoji: '😊',
    message: 'Dear Future Me, remember the joy of this day!',
    tags: ['joy', 'sunny', 'family'],
    image: happyImg,
    color: '#FFD166' // Yellow for happy
  },
  {
    mood: 'Sad',
    emoji: '😢',
    message: 'You survived this. Keep going.',
    tags: ['growth', 'pain'],
    image: sadImg,
    color: '#6A8EAE' // Blue for sad
  },
  {
    mood: 'Excited',
    emoji: '🎉',
    message: 'yesss I won!',
    tags: ['joy', 'excited', 'competition'],
    image: excitedImg,
    color: '#EF476F' // Pink for excited
  },
];

const LandingCapsulePreview = () => {
  return (
    <div className="capsule-preview">
      <h2>Example Capsules</h2>
      <div className="capsule-grid">
        {examples.map((item, i) => (
          <div 
            className="capsule-card" 
            key={i}
            style={{ '--mood-color': item.color }}
          >
            <div className="capsule-image-container">
              <img 
                src={item.image} 
                alt={`${item.mood} capsule`} 
                className="capsule-image"
              />
              <div className="capsule-emoji">{item.emoji}</div>
            </div>
            <div className="capsule-content">
              <div className="capsule-mood">
                <span className="mood-emoji">{item.emoji}</span>
                {item.mood}
              </div>
              <p className="capsule-message">"{item.message}"</p>
              <div className="capsule-tags">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="tag">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingCapsulePreview;