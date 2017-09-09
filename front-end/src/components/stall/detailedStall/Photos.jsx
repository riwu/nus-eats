import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import FacebookLike from '../../facebook/FacebookLikeContainer';
import './Photos.css';

const Photos = ({ photos }) => {
  if (!photos.length) {
    return null;
  }
  return (
    <div className="Photos">
      <ImageGallery
        items={photos}
        showIndex
        showPlayButton={false}
        onSlide={(index) => { this.index = index; }}
        renderCustomControls={() => (
          <div className="facebookLike">
            <FacebookLike
              href={`${window.location.origin}/photos/${(photos[this.index || 0] || {}).uuid}`}
            />
          </div>
          )}
      />
    </div>
  );
};

export default Photos;
