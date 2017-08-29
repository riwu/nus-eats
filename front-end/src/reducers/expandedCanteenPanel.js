import { TOGGLE_CANTEEN_PANEL } from '../constants/ActionTypes';

function reducer(state = null, action) {
  if (action.type !== TOGGLE_CANTEEN_PANEL) return state;
  return action.canteenId === state ? null : action.canteenId;
}

export default reducer;
