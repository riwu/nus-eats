import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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
          api.uploadFiles(this.state.files);
        }}
        hasFile={this.state.files.length > 0}
      />
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  // cannot use goBack() as user might navigate to it directly with url
});

export default connect(
  null,
  mapDispatchToProps,
)(ImageUploaderContainer);
