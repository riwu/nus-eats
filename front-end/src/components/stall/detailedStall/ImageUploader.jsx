import React from 'react';
import { Button } from 'react-bootstrap';
import ImageUpload from './react-images-upload';
import './ImageUploader.css';

const ImageUploader = ({ onFileUpload, onSave, hasFile }) => (
  <div>
    <ImageUpload
      className="imageUploader"
      buttonClassName="button"
      labelClass="label"
      onChange={onFileUpload}
      withIcon={false}
      withLabel={false}
      maxFileSize={20000000}
      buttonText="Upload photos"
    />
    {!hasFile ? null : <Button onClick={onSave}>Save</Button>
}

  </div>
);

export default ImageUploader;
