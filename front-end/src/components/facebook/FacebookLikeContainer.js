import { connect } from 'react-redux';
import FacebookLike from './FacebookLike';

const mapStateToProps = state => ({
  loading: !state.isFacebookReady,
});

const FacebookLikeContainer = connect(
  mapStateToProps,
)(FacebookLike);

export default FacebookLikeContainer;
