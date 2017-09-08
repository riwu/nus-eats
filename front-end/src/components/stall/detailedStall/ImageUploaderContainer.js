import React from 'react';
import ImageUploader from './ImageUploader';
import api from '../../../api';

class ImageUploaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  render() {
    return (
      <ImageUploader
        onFileUpload={files => this.setState({ files })}
        onSave={() => {
          console.log(this.state.files);
          api.uploadFiles(this.state.files, this.props.stallId);
        }}
        hasFile={this.state.files.length > 0}
      />
    );
  }
}

export default ImageUploaderContainer;
