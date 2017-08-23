import { OPEN_STALL_VIEW, CLOSE_STALL_VIEW } from '../constants/ActionTypes';

const initialState = null;

function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_STALL_VIEW:
      return action.stall;
    case CLOSE_STALL_VIEW:
      return null;
    default:
      return state;
  }
}

export default reducer;
