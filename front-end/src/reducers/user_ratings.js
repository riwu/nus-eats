import { CHANGE_RATING } from '../constants/ActionTypes';

const userRatings = (state = {}, action) => {
  if (action.type !== CHANGE_RATING) return state;
  return {
    ...state,
    [action.stallID]: action.rating,
  };
};

export default userRatings;
