import { RECEIVE_CANTEENS } from '../../../constants/ActionTypes';

const initialState = [];

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CANTEENS:
      return action.canteens;
    default:
      return state;
  }
}

export default reducer;
