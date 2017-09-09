import { connect } from 'react-redux';
import { getAllPhotos, login } from '../../../actions';
import api from '../../../api';
import ImageUploader from './ImageUploader';

const mapStateToProps = state => ({
  isLoggedIn: !!state.accessTokens.api,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  uploadFiles: files => api.uploadFiles(files, ownProps.stallId).then(() => {
    dispatch(getAllPhotos(ownProps.stallId));
  }),
  login: () => dispatch(login()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageUploader);
