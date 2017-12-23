import { connect } from 'react-redux';
import FacebookLike from './FacebookLike';

const mapStateToProps = (state, ownProps) => ({
  loading: !state.isFacebookReady,
  href: ownProps.href,
});

const FacebookLikeContainer = connect(
  mapStateToProps,
)(FacebookLike);

export default FacebookLikeContainer;
