import React from 'react';
import { Image } from 'react-bootstrap';

const Photos = ({ photos }) => (
  <div>
    {Object.entries(photos).map(([id, photo]) => (
      <Image src={photo.url} />
    ))}
  </div>

);

export default Photos;
