import { RECEIVE_STALLS } from '../constants/ActionTypes';

const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_STALLS:
      return action.stalls;
    default:
      return state;
  }
}

export default reducer;
