import { SET_FB_READY } from '../constants/ActionTypes';

const reducer = (state = false, {type}) => {
  switch (type) {
    case SET_FB_READY:
      return true;
    default:
      return state;
  }
};

export default reducer;
