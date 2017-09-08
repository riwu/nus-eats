import { RECEIVE_STALL_PHOTOS } from '../../../constants/ActionTypes';

function reducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_STALL_PHOTOS:
      return action.photos;
    default:
      return state;
  }
}

export default reducer;
