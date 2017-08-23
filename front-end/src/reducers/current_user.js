import { RECEIVE_CURRENT_USER } from '../constants/ActionTypes';

const reducer = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.user;
    default:
      return state;
  }
};

export default reducer;
