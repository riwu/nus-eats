import { SET_GRANTED_PERMISSIONS, LOGOUT } from '../../../constants/ActionTypes';

const initialState = new Set();

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GRANTED_PERMISSIONS: {
      return action.permissions;
    }
    case LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};

export default reducer;
