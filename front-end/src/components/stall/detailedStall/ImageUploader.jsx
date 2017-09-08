import React from 'react';
import ImageUpload from 'react-images-upload';
import { Button } from 'react-bootstrap';

const ImageUploader = ({ onFileUpload, onSave, hasFile }) => (
  <div>
    <ImageUpload
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
