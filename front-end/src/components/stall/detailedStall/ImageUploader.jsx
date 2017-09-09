import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import ImageUpload from 'react-file-reader-input';
import './ImageUploader.css';

const ImageUploader = ({ uploadFiles, isLoggedIn, login }) => (
  <div className="ImageUpload">
    <ImageUpload
      onChange={(e, results) => {
        const getFileType = file => file.name.substring(file.name.lastIndexOf('.') + 1);
        const acceptedFileTypes = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
        const invalidResult = results.find(([ignore, file]) => !acceptedFileTypes
            .includes(getFileType(file).toLowerCase()));
        if (invalidResult) {
          alert(`Invalid file type: ${getFileType(invalidResult[1])}. Only ${acceptedFileTypes.join(', ')} are accepted.`);
          return;
        }
        uploadFiles(results.map(([ignore, file]) => file));
      }}
      accept="image/*"
      multiple
    >
      <Button
        bsStyle="primary"
        onClick={() => {
          if (isLoggedIn) return;
          login();
        }}
      >
        <Glyphicon glyph="upload" className="uploadGlyph" />
        {isLoggedIn ? 'Upload Photos' : 'Login to upload'}
      </Button>
    </ImageUpload>
  </div>
);

export default ImageUploader;
