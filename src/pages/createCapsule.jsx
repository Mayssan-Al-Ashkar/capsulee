import { useState, useRef, useEffect } from 'react';
import Sidebar from "../components/shared/sideBar/sideBar";
import '../styles/createCapsule.css';
import axios from 'axios';


const COLORS = ['#d38d8dff', '#dedda2ff', '#b7aee7ff', '#b0e0b1ff', '#e8b1d4ff'];
const EMOJIS = ['😊', '😍', '☹️', '😭', '🤧', '🥳'];

const TimeCapsuleCreate = () => {
  
  const [color, setColor] = useState(COLORS[0]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [emoji, setEmoji] = useState('😊');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [mood, setMood] = useState('');
  const [tag, setTag] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [reveal, setReveal] = useState('');
  const [privacy, setPrivacy] = useState('private');
  const [surprise, setSurprise] = useState(false);
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => setLocation(`${data.city}, ${data.country_name}`))
      .catch(err => {
        console.error('Error fetching location:', err);
        setLocation('Location not available');
      });
  }, []);

  const handleFileChange = async (e) => {
    const filesArray = Array.from(e.target.files);
    const base64Files = await Promise.all(
      filesArray.map(file =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve({ name: file.name, base64: reader.result });
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
      )
    );
    setAttachments(prev => [...prev, ...base64Files]);
  };

  const handleFileRemove = (index) => {
    const newFiles = [...attachments];
    newFiles.splice(index, 1);
    setAttachments(newFiles);
  };

  const handleTagInput = (e) => {
    const input = e.target.value;
    if (!input.includes('#')) {
      setTag('#' + input);
    } else {
      setTag(input);
    }
  };

  const validateTags = () => {
    if (!tag) return true;
    const tags = tag.split(' ').filter(t => t.trim() !== '');
    return tags.every(t => t.startsWith('#'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formattedTags = tag
        .split(' ')
        .filter(t => t.trim() !== '')
        .map(t => t.startsWith('#') ? t.slice(1) : t);

      const payload = {
        title,
        message,
        emoji,
        color,
        reveal_date: reveal,
        privacy,
        surprise_mode: surprise,
        mood,
        tags: formattedTags,
        attachments, // already [{ name, base64 }]
      };

      const token = localStorage.getItem('token');

      const response = await axios.post('http://127.0.0.1:8000/api/user/capsules', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (response.status === 200 || response.status === 201) {
        
      }
    } catch (err) {
      console.error('Error response:', err.response?.data);
      setError(
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {})[0]?.[0] ||
        'Failed to create capsule.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="time-capsule-create-container">
      <div className="create-capsule-content">
        <h1 className="capsule-title">Create Your Capsule</h1>
        {error && <div className="error-message">{error}</div>}
        <form className="capsule-form" onSubmit={handleSubmit}>
          <div className="capsule-form-grid">
            <div className="capsule-form-left">
              <div className="form-group">
                <label className="input-label">title</label>
                <input
                  className="input"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Type your title"
                  required
                />
              </div>
              <div className="form-group">
                <label className="input-label">tags</label>
                <input
                  className="input"
                  value={tag}
                  placeholder="Add tags with # (e.g., #memory #happy)"
                  onChange={handleTagInput}
                  onBlur={() => {
                    if (tag && !validateTags()) {
                      setTag('#' + tag.replace(/#/g, ''));
                    }
                  }}
                />
              </div>
              <div className="form-group color-emoji-row">
                <div className="pickers-container">
                  <div
                    className="color-dropdown"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    tabIndex={0}
                    onBlur={() => setShowColorPicker(false)}
                  >
                    <div className="dropdown-content">
                      <span className="dropdown-label">color</span>
                      <div className="color-circle" style={{ background: color }}></div>
                      <span className="dropdown-arrow">▼</span>
                    </div>
                    {showColorPicker && (
                      <div className="color-palette">
                        {COLORS.map(c => (
                          <div
                            key={c}
                            className="color-circle palette"
                            style={{ background: c }}
                            onClick={() => {
                              setColor(c);
                              setShowColorPicker(false);
                            }}
                          ></div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div
                    className="emoji-dropdown"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    tabIndex={0}
                    onBlur={() => setShowEmojiPicker(false)}
                  >
                    <div className="dropdown-content">
                      <span className="dropdown-label">emoji</span>
                      <span className="emoji-selected">{emoji}</span>
                      <span className="dropdown-arrow">▼</span>
                    </div>
                    {showEmojiPicker && (
                      <div className="emoji-palette">
                        {EMOJIS.map(e => (
                          <span
                            key={e}
                            className="emoji-option"
                            onClick={() => {
                              setEmoji(e);
                              setShowEmojiPicker(false);
                            }}
                          >
                            {e}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="capsule-form-right">
              <div className="form-group">
                <label className="input-label">mood</label>
                <input
                  className="input"
                  value={mood}
                  onChange={e => setMood(e.target.value)}
                  placeholder="Enter your mood"
                  required
                />
              </div>
              <div className="form-group">
                <label className="input-label">reveal</label>
                <input
                  type="date"
                  className="input"
                  value={reveal}
                  onChange={e => setReveal(e.target.value)}
                  required
                />
              </div>
              <div className="form-group privacy-group">
                <span className="input-label">privacy</span>
                <div className="radio-options">
                  <label>
                    <input type="radio" name="privacy" value="private" checked={privacy === 'private'} onChange={() => setPrivacy('private')} />
                    private
                  </label>
                  <label>
                    <input type="radio" name="privacy" value="public" checked={privacy === 'public'} onChange={() => setPrivacy('public')} />
                    public
                  </label>
                </div>
              </div>
              <div className="form-group surprise-group">
                <span className="input-label">surprise</span>
                <label className="switch">
                  <input type="checkbox" checked={surprise} onChange={() => setSurprise(!surprise)} />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
          <div className="input-label">type your message</div>
          <textarea
            className="message-box"
            placeholder="message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />
          <div className="form-group file-upload-group">
            <label className="input-label">Upload files</label>
            <button type="button" className="upload-btn" onClick={() => fileInputRef.current.click()}>
              {loading ? 'Uploading...' : 'Upload'}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              style={{ display: 'none' }}
            />
            <div className="file-preview-container">
              {attachments.map((file, idx) => (
                <div key={idx} className="file-preview">
                  <span>{file.name}</span>
                  <button type="button" onClick={() => handleFileRemove(idx)}>&times;</button>
                </div>
              ))}
            </div>
          </div>
          <div className="submit-btn-row">
            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimeCapsuleCreate;
