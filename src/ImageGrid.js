import React from 'react';
import images from './images'; 

function ImageGrid({ onImageClick, upvotedImages, toggleUpvote }) {
  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <div
          key={index}
          className={`image-item ${upvotedImages.includes(image) ? 'upvoted' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
          onClick={() => onImageClick(image)}
        >
          <button
            className={`upvote-button ${upvotedImages.includes(image) ? 'upvoted' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleUpvote(image);
            }}
          >
            Upvote
          </button>
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;
