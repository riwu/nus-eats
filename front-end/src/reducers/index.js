import { RECEIVE_CANTEENS, RECEIVE_STALLS } from '../constants/ActionTypes';

const initialState = {
  canteens: [],
  stalls: [],
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CANTEENS:
      return {
        ...state,
        canteens: action.canteens,
      };
    case RECEIVE_STALLS:
      return {
        ...state,
        stalls: action.stalls,
      };
    default:
      return state;
  }
}

export default reducer;
