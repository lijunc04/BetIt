import React, { useState } from 'react';
import '../styles/VerifyPopup.scss';

const VerifyPopup = ({ taskName, onClose }) => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setResult("Please upload an image to verify the task.");
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('task_description', taskName);

    try {
      const response = await fetch('http://127.0.0.1:5000/verify', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data.result)
      setResult( await data.result === 'True' ? "Verification Successful!" : "Verification Failed:/");
    } catch (error) {
      console.error('Error:', error);
      setResult("An error occurred while verifying the image.");
    }
  };

  return (
    <div className="verify-popup-overlay" onClick={onClose}>
      <div className="verify-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✕</button>
        <h2>Verify Task Completion</h2>
        <p className="task-name">Task: {taskName}</p>
        <form onSubmit={handleSubmit}>
          <label className="file-upload">
            <input type="file" onChange={handleImageChange} />
            <span>Select Image</span>
          </label>
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Uploaded Preview" />
              <p className="upload-confirmation">Image uploaded successfully!</p>
            </div>
          )}
          <button type="submit" className="verify-button">Verify</button>
        </form>
        {result && <p className="result">{result}</p>}
      </div>
    </div>
  );
};

export default VerifyPopup;
