import { RECEIVE_ACCESS_TOKENS, LOGOUT } from '../constants/ActionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ACCESS_TOKENS:
      return {
        api: action.apiToken,
        facebook: action.facebookToken
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
