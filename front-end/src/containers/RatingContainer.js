import { connect } from 'react-redux';
import Rating from '../components/Rating';
import { changeRating } from '../actions';

const mapStateToProps = (state, ownProps) => {
  const stall = state.openedStall;
  return {
    rating: ownProps.useAvgRating ? ownProps.rating : state.userRatings[stall.id],
    readonly: ownProps.useAvgRating,
    stallID: stall ? stall.id : null,
  };
};

export default connect(mapStateToProps, { changeRating })(Rating);
