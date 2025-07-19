import React, { useEffect, useState } from 'react';
import '../styles/capsuleDetails.css';

const CapsuleDetails = () => {
  const [capsule, setCapsule] = useState(null);

  useEffect(() => {
    setCapsule({
      title: 'Graduation',
      moods: 'Happy',
      location: 'University Campus',
      openDate: '15-7-2025',
      tags: ['#grad', '#friends'],
      privacy: 'public',
      message: "One of the best day of my life, that day I've been waiting for…",
      image: require('../assets/graduation.jpg'), // Replace with backend image URL
      uploadedFile: {
        name: 'graduation_photo.jpg',
        url: require('../assets/graduation.jpg'), // Replace with backend file URL
      },
    });
  }, []);

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
            <img src={capsule.image} alt="capsule" className="capsule-details-image" />
          </div>
          <div className="capsule-details-info-section">
            <div className="capsule-details-row">
              <div>
                <div className="capsule-details-label">moods</div>
                <div className="capsule-details-value">{capsule.moods}</div>
              </div>
              <div>
                <div className="capsule-details-label">openDate</div>
                <div className="capsule-details-value">{capsule.openDate}</div>
              </div>
              <div>
                <div className="capsule-details-file-label">uploaded file</div>
                {capsule.uploadedFile ? (
                  <a
                    href={capsule.uploadedFile.url}
                    download={capsule.uploadedFile.name}
                    className="capsule-details-file-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {capsule.uploadedFile.name}
                  </a>
                ) : (
                  <div className="capsule-details-no-file">No file uploaded</div>
                )}
              </div>
            </div>
            <div className="capsule-details-row">
              <div>
                <div className="capsule-details-label">tags</div>
                <div className="capsule-details-value">{capsule.tags.join(' ')}</div>
              </div>
              <div>
                <div className="capsule-details-label">location</div>
                <div className="capsule-details-value">{capsule.location}</div>
              </div>
              <div>
                <div className="capsule-details-label">privacy</div>
                <div className="capsule-details-value">{capsule.privacy}</div>
              </div>
            </div>
            <div className="capsule-details-message-label">message</div>
            <div className="capsule-details-message-box">{capsule.message}</div>
            <button className="capsule-details-back-btn xsmall">go back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapsuleDetails;
