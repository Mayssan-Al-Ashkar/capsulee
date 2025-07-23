import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from "../components/shared/sideBar/sideBar";
import '../styles/allCapsules.css';
import axios from 'axios';

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

function isBeforeReveal(dateString) {
  const now = new Date();
  const target = new Date(dateString);
  return now < target;
}

const AllCapsules = () => {
  const [capsules, setCapsules] = useState([]);
  const [surpriseMsgId, setSurpriseMsgId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/user/capsules', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setCapsules(res.data.payload || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch capsules:', err);
        setLoading(false);
      });
  }, []);

  const handleSurpriseClick = (capsule) => {
    if (capsule.surprise_mode === true) {
      setSurpriseMsgId(capsule.id);
    }
  };

  if (loading) {
    return <div>Loading capsules...</div>;
  }

  const normalCapsules = capsules.filter(c => c.surprise_mode !== true);
  const surpriseCapsules = capsules.filter(c => c.surprise_mode === true);

  return (
    <div className="all-capsules-container">
      <Sidebar />
      <main className="capsules-content">
        <div className="header-section">
          <h1>My Time Capsules</h1>
        </div>

        <div className="capsules-grid">
          {normalCapsules.map((capsule) => (
            <div key={capsule.id} className="capsule-card">
              <div className="capsule-info">
                <h3>{capsule.title}</h3>
                <div className="capsule-meta">
                  <span className={`capsule-visibility ${capsule.privacy === 'public' ? 'public' : 'private'}`}>
                    {capsule.privacy}
                  </span>
                </div>
                {capsule.attachments && capsule.attachments.length > 0 && (
                  <img
                    src={`http://127.0.0.1:8000${capsule.attachments[0]}`}
                    alt="capsule"
                    className="capsule-image"
                  />
                )}
                <Link to={`/capsules/details/${capsule.id}`} className="details-btn">View Details</Link>
              </div>
            </div>
          ))}
        </div>

        {surpriseCapsules.length > 0 && (
          <>
            <h2 className="surprise-section-title">Surprise Capsules</h2>
            <div className="capsules-grid">
              {surpriseCapsules.map((capsule) => {
                const locked = isBeforeReveal(capsule.reveal_date);
                return (
                  <div key={capsule.id} className="capsule-card">
                    <div className="capsule-info">
                      <div className="capsule-counter">
                        open after: {timeUntil(capsule.reveal_date, "00:00")}
                      </div>
                      <div className="capsule-meta">
                        <span className={`capsule-visibility ${capsule.privacy === 'public' ? 'public' : 'private'}`}>
                          {capsule.privacy}
                        </span>
                      </div>
                      {locked ? (
                        <>
                          <button className="details-btn" onClick={() => handleSurpriseClick(capsule)}>
                            View Details
                          </button>
                          {surpriseMsgId === capsule.id && (
                            <div className="surprise-message">
                              You cannot access the details. It is a surprise message.
                            </div>
                          )}
                        </>
                      ) : (
                        <Link to={`/capsuleDetails/${capsule.id}`} className="details-btn">
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
