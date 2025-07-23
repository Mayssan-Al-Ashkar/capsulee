import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../components/shared/sideBar/sideBar";
import '../styles/allCapsules.css';

const PublicWall = () => {
  const [capsules, setCapsules] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchMood, setSearchMood] = useState('');
  const [filteredCapsules, setFilteredCapsules] = useState([]);

  useEffect(() => {
  axios.get('http://127.0.0.1:8000/api/capsules/public', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(response => {
      const capsulesData = response.data.payload || [];

      setCapsules(capsulesData);
      setFilteredCapsules(capsulesData);
    })
    .catch(error => {
      console.error("Error fetching public capsules:", error);
    });
}, []);


  const handleSearch = () => {
    const filtered = capsules.filter(capsule => {
      const matchesLocation = !searchLocation || 
        capsule.location?.city?.toLowerCase().includes(searchLocation.toLowerCase());
      const matchesMood = !searchMood || 
        capsule.mood?.toLowerCase().includes(searchMood.toLowerCase());
      
      return matchesLocation && matchesMood;
    });

    setFilteredCapsules(filtered);
  };

  const handleClearSearch = () => {
    setSearchLocation('');
    setSearchMood('');
    setFilteredCapsules(capsules);
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
  src={
    capsule.attachments?.length > 0
      ? `http://127.0.0.1:8000${capsule.attachments[0]}`
      : 'https://via.placeholder.com/150'
  } 
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
