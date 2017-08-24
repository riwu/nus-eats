import { RECEIVE_ACCESS_TOKENS } from '../constants/ActionTypes';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ACCESS_TOKENS:
      return {
        api: action.apiToken,
        facebook: action.facebookToken
      };
    default:
      return state;
  }
};

export default reducer;
