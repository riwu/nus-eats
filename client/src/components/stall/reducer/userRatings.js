import { CHANGE_RATING, RECEIVE_RATINGS } from '../../../constants/ActionTypes';

const userRatings = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_RATINGS:
      return action.ratings.reduce((obj, rating) => ({
        ...obj,
        [rating.stallId]: rating.value,
      }), {});
    case CHANGE_RATING:
      return {
        ...state,
        [action.stallId]: action.rating,
      };
    default:
      return state;
  }
};

export default userRatings;
