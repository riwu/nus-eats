import { TOGGLE_MEETING_WINDOW } from '../constants/ActionTypes';

function reducer(state = null, action) {
  if (action.type !== TOGGLE_MEETING_WINDOW) return state;
  return state === null ? action.canteenID : null;
}

export default reducer;
