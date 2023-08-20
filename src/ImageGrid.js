// src/ImageGrid.js
import React from 'react';
import images from './images';

function ImageGrid({ onImageClick }) {
  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <div
          key={index}
          className="image-item"
          style={{ backgroundImage: `url(${image})` }}
          onClick={() => onImageClick(image)}
        />
      ))}
    </div>
  );
}

export default ImageGrid;
