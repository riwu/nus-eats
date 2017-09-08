import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import ImageUpload from 'react-file-reader-input';
import './ImageUploader.css';
import api from '../../../api';

const ImageUploader = ({ stallId }) => (
  <div className="ImageUpload">
    <ImageUpload
      onChange={(e, results) =>
        api.uploadFiles(results.map(([ignore, file]) => file), stallId)
      }
    >
      <Button bsStyle="primary">
        <Glyphicon glyph="upload" className="uploadGlyph" />
        Upload Photos
      </Button>
    </ImageUpload>
  </div>
);

export default ImageUploader;
