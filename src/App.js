import React, { useState } from 'react';
import './App.css';
import ImageGrid from './ImageGrid';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <h1>Image Gallery</h1>
      <ImageGrid onImageClick={handleImageClick} />
      {selectedImage && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal">
            <img src={selectedImage} alt="Selected" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
