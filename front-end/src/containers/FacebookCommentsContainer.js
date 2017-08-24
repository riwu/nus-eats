import { connect } from 'react-redux';
import FacebookComments from '../components/FacebookComments';

const mapStateToProps = (state) => ({
  loading: !state.isFbReady
});

const FacebookCommentsContainer = connect(
  mapStateToProps
)(FacebookComments);

export default FacebookCommentsContainer;
