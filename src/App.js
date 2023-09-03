import React, { useState } from 'react';
import './App.css';
import ImageGrid from './ImageGrid';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import images from './images';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedImagesModalOpen, setUploadedImagesModalOpen] = useState(false);

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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImages((prevImages) => [...prevImages, imageUrl]);
    }
  };

  const handleCloseUploadedImagesModal = () => {
    setUploadedImagesModalOpen(false);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1); 
    setUploadedImages(updatedImages); 
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Image Gallery</h1>
        <button onClick={handleDownloadImages}>Download Random Set</button>
      </div>
      <ImageGrid onImageClick={handleImageClick} />
      {selectedImage && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal">
            <img src={selectedImage} alt="Selected" />
          </div>
        </div>
      )}
      <div className="button-container">
        <input type="file" accept="image/jpeg, image/png" onChange={handleImageUpload} />
        {uploadedImages.length > 0 && (
          <button onClick={() => handleDeleteImage(uploadedImages.length - 1)}>Delete</button>
        )}
      </div>
      <div className="uploaded-image-container">
        {uploadedImages.map((image, index) => (
          <div
            key={index}
            className="image-item uploaded-image"
            style={{ backgroundImage: `url(${image})`, width: '200px', height: '200px' }}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
