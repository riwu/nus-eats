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
      onImageLoad={this.handleImageLoad}
      showBullets
      showIndex
      onClick={e => console.log(e.target)}
      renderCustomControls={() => <FacebookLike />}
    />
  </div>
);

export default Photos;
