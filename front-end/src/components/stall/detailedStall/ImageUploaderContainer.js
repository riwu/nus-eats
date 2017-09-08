import { connect } from 'react-redux';
import { getAllPhotos } from '../../../actions';
import api from '../../../api';
import ImageUploader from './ImageUploader';

const mapDispatchToProps = (dispatch, ownProps) => ({
  uploadFiles: files => api.uploadFiles(files, ownProps.stallId).then(() => {
    dispatch(getAllPhotos(ownProps.stallId));
  }),
});

export default connect(
  null,
  mapDispatchToProps,
)(ImageUploader);
