import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import FacebookLike from '../../facebook/FacebookLikeContainer';
import './Photos';

const Photos = ({ photos }) => (
  <div>
    <ImageGallery
      items={photos}
      slideInterval={2000}
      showBullets
      showIndex
      onSlide={(index) => { this.index = index; }}
      renderCustomControls={() => (
        <FacebookLike href={`${window.location.origin}/photos/${(photos[this.index || 0] || {}).id}`} />
      )}
    />
  </div>
);

export default Photos;
