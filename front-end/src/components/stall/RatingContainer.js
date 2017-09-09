import { connect } from 'react-redux';
import Rating from './Rating';
import { changeRating, login } from '../../actions';

const mapStateToProps = (state, ownProps) => ({
  value: state.userRatings[ownProps.stallId],
  readonly: false,
  stallId: ownProps.stallId,
  isLoggedIn: !!(state.accessTokens || {}).api,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeRating: rating => dispatch(changeRating(ownProps.stallId, rating)),
  login: () => dispatch(login()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Rating);
