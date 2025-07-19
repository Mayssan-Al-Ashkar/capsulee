import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from "../components/shared/sideBar/sideBar";
import '../styles/allCapsules.css';
import graduationImg from '../assets/graduation.jpg';
import summerImg from '../assets/summer.jpg';

const capsules = [
  {
    id: 1,
    title: 'Graduation Day',
    mood: 'Happy',
    openDate: '2025-6-3',
    time: '14:00',
    tags: ['education', 'achievement'],
    isPublic: true,
    image: graduationImg,
    surprise_state: 'off',
  },
  {
    id: 2,
    title: 'Summer Vacation',
    mood: 'Excited',
    openDate: '2025-07-17',
    time: '09:30',
    tags: ['travel', 'family'],
    isPublic: false,
    image: summerImg,
    surprise_state: 'on',
  },
];

function timeUntil(dateString, timeString) {
  const now = new Date();
  const [hours, minutes] = timeString.split(':').map(Number);
  const target = new Date(dateString);
  target.setHours(hours || 0, minutes || 0, 0, 0);
  let diff = target - now;
  if (diff < 0) diff = 0;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${days}d ${hoursLeft}h ${minutesLeft}m`;
}

function isBeforeReveal(dateString, timeString) {
  const now = new Date();
  const [hours, minutes] = timeString.split(':').map(Number);
  const target = new Date(dateString);
  target.setHours(hours || 0, minutes || 0, 0, 0);
  return now < target;
}

const AllCapsules = () => {
  const [surpriseMsgId, setSurpriseMsgId] = useState(null);

  const handleSurpriseClick = (capsule) => {
    if (capsule.surprise_state === 'on') {
      setSurpriseMsgId(capsule.id);
    }
  };

  const normalCapsules = capsules.filter(c => c.surprise_state !== 'on');
  const surpriseCapsules = capsules.filter(c => c.surprise_state === 'on');

  return (
    <div className="all-capsules-container">
      <Sidebar />
      <main className="capsules-content">
        <div className="header-section">
          <h1>My Time Capsules</h1>
        </div>
        {/* Normal Capsules Section */}
        <div className="capsules-grid">
          {normalCapsules.map((capsule) => (
            <div key={capsule.id} className="capsule-card">
              <div className="capsule-image-container">
                <img 
                  src={capsule.image} 
                  alt={capsule.title} 
                  className="capsule-image"
                />
              </div>
              <div className="capsule-info">
                <h3>{capsule.title}</h3>
                <div className="capsule-meta">
                  <span className={`capsule-visibility ${capsule.isPublic ? 'public' : 'private'}`}>
                    {capsule.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
                <Link 
                  to={`/capsuleDetails/${capsule.id}`} 
                  className="details-btn"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* Surprise Capsules Section */}
        {surpriseCapsules.length > 0 && (
          <>
            <h2 className="surprise-section-title">Surprise Capsules</h2>
            <div className="capsules-grid">
              {surpriseCapsules.map((capsule) => {
                const locked = isBeforeReveal(capsule.openDate, capsule.time);
                return (
                  <div key={capsule.id} className="capsule-card">
                    <div className="capsule-info">
                      <div className="capsule-counter">open after: {timeUntil(capsule.openDate, capsule.time)}</div>
                      <div className="capsule-meta">
                        <span className={`capsule-visibility ${capsule.isPublic ? 'public' : 'private'}`}>
                          {capsule.isPublic ? 'Public' : 'Private'}
                        </span>
                      </div>
                      {locked ? (
                        <>
                          <button
                            className="details-btn"
                            onClick={() => handleSurpriseClick(capsule)}
                          >
                            View Details
                          </button>
                          {surpriseMsgId === capsule.id && (
                            <div className="surprise-message">You cannot access the details. It is a surprise message.</div>
                          )}
                        </>
                      ) : (
                        <Link
                          to={`/capsuleDetails/${capsule.id}`}
                          className="details-btn"
                        >
                          View Details
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AllCapsules;