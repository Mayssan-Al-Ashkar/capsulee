import { useState, useRef } from 'react';
import Sidebar from "../components/shared/sideBar/sideBar";
import '../styles/createCapsule.css';

const COLORS = ['#ff0000ff', '#fffb00ff', '#2b00ffff','#00ff08ff','#ff00a2ff'];
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
  const [location, setLocation] = useState("");
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






            {/******************************************LEFT************************************/}
            <div className="capsule-form-left">


              {/* Color Picker */}


              <div className="form-group small-group">
                <div className="color-dropdown" onClick={() => setShowColorPicker(!showColorPicker)} tabIndex={0} onBlur={() => setShowColorPicker(false)}>
                <label className="input-label inside">color</label>
                <div className="color-circle" style={{ background: color }}></div>
    <span className="color-arrow">▼</span>
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
</div>



              {/* Emoji Picker */}


              <div className="form-group small-group">
  <div
    className="emoji-dropdown"
    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
    tabIndex={0}
    onBlur={() => setShowEmojiPicker(false)}
  >
    <label className="input-label inside">emoji</label>
    <span className="emoji-selected">{emoji || '😊'}</span>
    <span className="emoji-arrow">▼</span>
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


              
              {/* Mood Dropdown */}


             <div className="form-group small-group">
  <label htmlFor="mood" className="input-label">mood</label>
  <input
    id="mood"
    type="text"
    value={mood}
    onChange={(e) => setMood(e.target.value)}
    className="mood-input"
    placeholder="Type your mood"
  />
</div>



              {/* Tag Input */}

<div className="form-group small-group">
  <label className="input-label">tag</label>
  <input
    className="tag-input"
    value={tag}
    placeholder="Type your tag"
    onFocus={() => {
      if (!tag.startsWith("#")) {
        setTag("#");
      }
    }}
    onChange={(e) => {
      const input = e.target.value;
      if (!input.startsWith("#")) return;

      setTag(input);
    }}
  />
</div>






            </div>

            {/******************************************RIGHT************************************/}
            <div className="capsule-form-right">





              <div className="form-group ">
  <label className="input-label">location</label>
  <input
    className="input"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    placeholder="Share your location"
  />
</div>




               <div className="form-group">
  <label className="input-label">reveal</label>
  <input
    type="date"                        
    className="input"
    value={reveal}
    onChange={(e) => setReveal(e.target.value)}
    placeholder="Choose the date"     
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