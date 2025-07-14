import React from 'react';
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
    tags: ['education', 'achievement'],
    isPublic: true,
    image: graduationImg
  },
  {
    id: 2,
    title: 'Summer Vacation',
    mood: 'Excited',
    openDate: '2025-07-15',
    tags: ['travel', 'family'],
    isPublic: false,
    image: summerImg
  },
];

const AllCapsules = () => {
  return (
    <div className="all-capsules-container">
      <Sidebar />
      
      <main className="capsules-content">
        <div className="header-section">
          <h1>My Time Capsules</h1>
        </div>
        
        <div className="capsules-grid">
          {capsules.map((capsule) => (
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
                  to={`/capsule-details/${capsule.id}`} 
                  className="details-btn"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllCapsules;