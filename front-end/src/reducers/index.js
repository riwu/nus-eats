import { RECEIVE_CANTEENS, RECEIVE_STALLS, OPEN_STALL_VIEW, CLOSE_STALL_VIEW } from '../constants/ActionTypes';

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
    case OPEN_STALL_VIEW:
      return {
        ...state,
        openedStall: action.stall,
      };
    case CLOSE_STALL_VIEW:
      return {
        ...state,
        openedStall: null,
      };
    default:
      return state;
  }
}

export default reducer;
