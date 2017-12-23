import jwtDecode from 'jwt-decode';
import { RECEIVE_CURRENT_USER, RECEIVE_ACCESS_TOKENS, LOGOUT } from '../../../constants/ActionTypes';

const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ACCESS_TOKENS:
      const payload = jwtDecode(action.apiToken);

      return {
        id: payload.user.id,
        name: payload.user.name,
      };
    case RECEIVE_CURRENT_USER:
      return action.user;
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
