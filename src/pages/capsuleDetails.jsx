import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/capsuleDetails.css';

const CapsuleDetails = () => {
  const [capsule, setCapsule] = useState(null);
  const { id } = useParams();  // <-- get the ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://127.0.0.1:8000/api/capsules/details/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCapsule(response.data.payload);
      } catch (error) {
        console.error('Error fetching capsule:', error);
      }
    };

    fetchCapsule();
  }, [id]);


  if (!capsule) return <div className="capsule-details-wrapper">Loading...</div>;

  return (
    <div className="capsule-details-bg">
      <div className="capsule-details-container">
        <div className="capsule-details-header-row">
          <div className="capsule-details-brand-left">
            <span className="capsule-details-logo" />
            <span className="capsule-details-brand">MESCARD</span>
          </div>
          <div className="capsule-details-title-centered">{capsule.title}</div>
        </div>
        <div className="capsule-details-content">
          <div className="capsule-details-image-section moved-down">
            {capsule.attachments?.length > 0 && (
              <img
                src={`http://127.0.0.1:8000${capsule.attachments[0]}`}
                alt="capsule"
                className="capsule-details-image"
              />
            )}
          </div>
          <div className="capsule-details-info-section">
            <div className="capsule-details-row">
              <div>
                <div className="capsule-details-label">moods</div>
                <div className="capsule-details-value">{capsule.mood}</div>
              </div>
              <div>
                <div className="capsule-details-label">openDate</div>
                <div className="capsule-details-value">{capsule.reveal_date}</div>
              </div>
              <div>
                <div className="capsule-details-file-label">uploaded file</div>
                {capsule.attachments?.length > 0 ? (
                  <a
                    href={`http://127.0.0.1:8000${capsule.attachments[0]}`}
                    download
                    className="capsule-details-file-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {capsule.attachments[0].split('/').pop()}
                  </a>
                ) : (
                  <div className="capsule-details-no-file">No file uploaded</div>
                )}
              </div>
            </div>
            <div className="capsule-details-row">
              <div>
                <div className="capsule-details-label">tags</div>
                <div className="capsule-details-value">{capsule.tags?.join(' ')}</div>
              </div>
              <div>
                <div className="capsule-details-label">location</div>
                <div className="capsule-details-value">
                  {capsule.location?.city || 'Unknown'}
                </div>
              </div>
              <div>
                <div className="capsule-details-label">privacy</div>
                <div className="capsule-details-value">{capsule.privacy}</div>
              </div>
            </div>
            <div className="capsule-details-message-label">message</div>
            <div className="capsule-details-message-box">{capsule.message}</div>
            <button
              className="capsule-details-back-btn xsmall"
              onClick={() => navigate(-1)}
            >
              go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapsuleDetails;
