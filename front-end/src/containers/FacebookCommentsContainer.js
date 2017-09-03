import { connect } from 'react-redux';
import FacebookComments from '../components/FacebookComments';

const mapStateToProps = (state) => ({
  loading: !state.isFacebookReady
});

const FacebookCommentsContainer = connect(
  mapStateToProps
)(FacebookComments);

export default FacebookCommentsContainer;
