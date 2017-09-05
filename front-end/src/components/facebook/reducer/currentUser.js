import { RECEIVE_CURRENT_USER, LOGOUT } from '../../../constants/ActionTypes';

const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.user;
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
