import React, { useState } from 'react';
import Sidebar from "../components/shared/sideBar/sideBar";
import '../styles/allCapsules.css';
import graduationImg from '../assets/graduation.jpg';
import summerImg from '../assets/summer.jpg';

const capsules = [
  {
    id: 1,
    title: 'Graduation Day',
    mood: 'Happy',
    location: 'University Campus',
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
    location: 'Beach Resort',
    openDate: '2025-07-17',
    time: '09:30',
    tags: ['travel', 'family'],
    isPublic: false,
    image: summerImg,
    surprise_state: 'on',
  },
  {
    id: 3,
    title: 'Birthday Celebration',
    mood: 'Happy',
    location: 'Home',
    openDate: '2025-08-15',
    time: '18:00',
    tags: ['celebration', 'family'],
    isPublic: true,
    image: graduationImg,
    surprise_state: 'off',
  },
  {
    id: 4,
    title: 'Work Achievement',
    mood: 'Proud',
    location: 'Office',
    openDate: '2025-09-20',
    time: '16:30',
    tags: ['work', 'success'],
    isPublic: true,
    image: summerImg,
    surprise_state: 'off',
  },
];

const PublicWall = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchMood, setSearchMood] = useState('');
  const [filteredCapsules, setFilteredCapsules] = useState(
    capsules.filter(c => c.isPublic && c.surprise_state !== 'on')
  );

  const handleSearch = () => {
    // This will be replaced with backend API call
    const filtered = capsules.filter(capsule => {
      const isPublic = capsule.isPublic && capsule.surprise_state !== 'on';
      const matchesLocation = !searchLocation || 
        capsule.location?.toLowerCase().includes(searchLocation.toLowerCase());
      const matchesMood = !searchMood || 
        capsule.mood?.toLowerCase().includes(searchMood.toLowerCase());
      
      return isPublic && matchesLocation && matchesMood;
    });
    
    setFilteredCapsules(filtered);
  };

  const handleClearSearch = () => {
    setSearchLocation('');
    setSearchMood('');
    setFilteredCapsules(
      capsules.filter(c => c.isPublic && c.surprise_state !== 'on')
    );
  };

  return (
    <div className="all-capsules-container">
      <Sidebar />
      <main className="capsules-content">
        <div className="header-section">
          <h1>Public Wall</h1>
          
          {/* Search Section */}
          <div className="search-section">
            <div className="search-inputs">
              <input
                type="text"
                placeholder="Search by location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="search-input"
              />
              <input
                type="text"
                placeholder="Search by mood..."
                value={searchMood}
                onChange={(e) => setSearchMood(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="search-buttons">
              <button onClick={handleSearch} className="search-btn">
                Search
              </button>
              <button onClick={handleClearSearch} className="clear-btn">
                Clear
              </button>
            </div>
          </div>
        </div>
        
        <div className="capsules-grid">
          {filteredCapsules.map((capsule) => (
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
                <a href={`/capsuleDetails/${capsule.id}`} className="details-btn">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {filteredCapsules.length === 0 && (
          <div className="no-results">
            <p>No capsules found matching your search criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PublicWall;

