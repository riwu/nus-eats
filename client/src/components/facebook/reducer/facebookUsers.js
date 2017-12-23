import { RECEIVE_FACEBOOK_USER } from '../../../constants/ActionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_FACEBOOK_USER:
      return {
        ...state,
        [action.user.id]: action.user
      };
    default:
      return state;
  }
};

export default reducer;
