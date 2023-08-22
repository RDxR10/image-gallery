import React, { useState } from 'react';
import './App.css';
import ImageGrid from './ImageGrid';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import images from './images';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleDownloadImages = async () => {
    const zip = new JSZip();

    const promises = images.map(async (image, index) => {
      const response = await fetch(image);
      const blob = await response.blob();
      zip.file(`image-${index + 1}.jpg`, blob);
    });

    await Promise.all(promises);

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'images.zip');
    });
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
      <button onClick={handleDownloadImages}>Download Random Set</button>
    </div>
  );
}

export default App;
