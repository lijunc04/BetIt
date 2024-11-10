import React, { useState } from 'react';
import '../styles/VerifyPopup.scss';

const VerifyPopup = ({ taskName }) => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setResult("Please upload an image to verify the task.");
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('task_description', taskName); // Use taskName directly

    try {
      const response = await fetch('http://127.0.0.1:5000/verify', {
        
        method: 'POST',
        body: formData,
      });
      console.log("HERE")
      const data = await response.json();
      setResult(data.result); // Should return "true" or "false"
      console.log(data.result)
    } catch (error) {
      console.error('Error:', error);
      setResult("An error occurred while verifying the image.");
    }
  };

  return (
    <div className="verify-popup">
      <div className="verify-popup-content">
        {/*<button className="close-button" onClick={onClose}>✕</button>*/}
        <h2>Verify Task Completion</h2>
        <p className="task-name">Task: {taskName}</p>
        <form onSubmit={handleSubmit}>
          <label>
            Upload Image
            <input type="file" onChange={handleImageChange} />
          </label>
          <button type="submit">Verify</button>
        </form>
        {result && <p className="result">{result}</p>}
      </div>
    </div>
  );
};

export default VerifyPopup;
