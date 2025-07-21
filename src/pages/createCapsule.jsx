import { useState, useRef, useEffect } from 'react';
import Sidebar from "../components/shared/sideBar/sideBar";
import '../styles/createCapsule.css';

const COLORS = ['#d38d8dff', '#dedda2ff', '#b7aee7ff','#b0e0b1ff','#e8b1d4ff'];
const EMOJIS = ['😊', '😍', '☹️', '😭', '🤧', '🥳'];
const MOODS = ['Happy','Sad','Angry','Anxious','Excited','Calm']

const TimeCapsuleCreate = () => {
  const [color, setColor] = useState(COLORS[0]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [mood, setMood] = useState('');
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [tag, setTag] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  // Get user's location from IP
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        setLocation(`${data.city}, ${data.country_name}`);
      })
      .catch(error => {
        console.error('Error fetching location:', error);
        setLocation('Location not available');
      });
  }, []);
  const [reveal, setReveal] = useState("");

  const [privacy, setPrivacy] = useState('private');
  const [surprise, setSurprise] = useState(false);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };
  const handleFileRemove = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  const handleTagInput = (e) => {
    setTag(e.target.value.replace(/^#+/, ''));
  };
  const handleTagBlur = () => {
    setShowTagInput(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submission logic here
  };

  return (
    <div className="time-capsule-create-container">
      <div className="create-capsule-content">
        <h1 className="capsule-title">Create Your Capsule</h1>
        <form className="capsule-form" onSubmit={handleSubmit}>
          <div className="capsule-form-grid">
            {/* LEFT COLUMN */}
            <div className="capsule-form-left">
              {/* Title Input */}
              <div className="form-group">
                <label className="input-label">title</label>
                <input
                  className="input"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Type your title"
                />
              </div>
              {/* Tag Input */}
              <div className="form-group">
                <label className="input-label">tag</label>
                <input
                  className="input"
                  value={tag}
                  placeholder="Type your tag"
                  onFocus={() => {
                    if (!tag.startsWith("#")) {
                      setTag("#");
                    }
                  }}
                  onChange={e => {
                    const input = e.target.value;
                    if (!input.startsWith("#")) return;
                    setTag(input);
                  }}
                />
              </div>
              {/* Color and Emoji Pickers Side by Side */}
              <div className="form-group color-emoji-row">
                <div className="pickers-container">
                {/* Color Picker */}
                <div className="color-dropdown" onClick={() => setShowColorPicker(!showColorPicker)} tabIndex={0} onBlur={() => setShowColorPicker(false)}>
                    <div className="dropdown-content">
                      <span className="dropdown-label">color</span>
                  <div className="color-circle" style={{ background: color }}></div>
                      <span className="dropdown-arrow">▼</span>
                    </div>
                  {showColorPicker && (
                    <div className="color-palette">
                      {COLORS.map((c) => (
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
                {/* Emoji Picker */}
                <div
                  className="emoji-dropdown"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  tabIndex={0}
                  onBlur={() => setShowEmojiPicker(false)}
                >
                    <div className="dropdown-content">
                      <span className="dropdown-label">emoji</span>
                  <span className="emoji-selected">{emoji || '😊'}</span>
                      <span className="dropdown-arrow">▼</span>
                    </div>
                  {showEmojiPicker && (
                    <div className="emoji-palette">
                      {EMOJIS.map((e) => (
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
            {/* RIGHT COLUMN */}
            <div className="capsule-form-right">
              {/* Mood Input */}
              <div className="form-group">
                <label className="input-label">mood</label>
                <input
                  className="input"
                  value={mood}
                  onChange={e => setMood(e.target.value)}
                  placeholder="Enter your mood"
                />
              </div>
              {/* Reveal Date */}
              <div className="form-group">
                <label className="input-label">reveal</label>
                <input
                  type="date"
                  className="input"
                  value={reveal}
                  onChange={e => setReveal(e.target.value)}
                  placeholder="Choose the date"
                />
              </div>
              {/* Privacy */}
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
              {/* Surprise */}
              <div className="formm-group surprise-group">
                <span className="input-label">surprise</span>
                <label className="switch">
                  <input type="checkbox" checked={surprise} onChange={() => setSurprise(!surprise)} />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
          <div className="input-label">type your message</div>
          <textarea className="message-box" placeholder="message" value={message} onChange={e => setMessage(e.target.value)} />
          <div className="form-group file-upload-group">
            <label className="input-label">Upload files</label>
            <button type="button" className="upload-btn" onClick={() => fileInputRef.current.click()}>Upload</button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple style={{ display: 'none' }} />
            <div className="file-preview-container">
              {files.map((file, idx) => (
                <div key={idx} className="file-preview">
                  <span>{file.name}</span>
                  <button type="button" onClick={() => handleFileRemove(idx)}>&times;</button>
                </div>
              ))}
            </div>
          </div>
          <div className="submit-btn-row">
            <button className="submit-btn" type="submit">submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimeCapsuleCreate;