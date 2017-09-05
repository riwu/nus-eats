import { connect } from 'react-redux';
import FacebookComments from './FacebookComments';

const mapStateToProps = (state) => ({
  loading: !state.isFacebookReady
});

const FacebookCommentsContainer = connect(
  mapStateToProps
)(FacebookComments);

export default FacebookCommentsContainer;
