import { SET_CURRENT_TIME } from '../../../constants/ActionTypes';

const reducer = (state = null, action) => {
  switch (action.type) {
    case SET_CURRENT_TIME:
      return action.currentTime;
    default:
      return state;
  }
};

export default reducer;
