import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const Photos = ({ photos }) => (
  <div>
    <ImageGallery
      items={photos}
      slideInterval={2000}
      onImageLoad={this.handleImageLoad}
    />
  </div>
);

export default Photos;
