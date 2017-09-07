import { connect } from 'react-redux';
import Rating from './Rating';
import { changeRating } from '../../actions';

const mapStateToProps = (state, ownProps) => ({
  value: state.userRatings[ownProps.stallId],
  readonly: false,
  stallId: ownProps.stallId,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeRating: rating => dispatch(changeRating(ownProps.stallId, rating)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rating);
