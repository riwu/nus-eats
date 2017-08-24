import { TOGGLE_CANTEEN_PANEL } from '../constants/ActionTypes';

function reducer(state = new Set(), action) {
  if (action.type !== TOGGLE_CANTEEN_PANEL) return state;

  const expanded = new Set(state);
  if (expanded.has(action.canteenID)) {
    expanded.delete(action.canteenID);
  } else {
    expanded.add(action.canteenID);
  }
  return expanded;
}

export default reducer;
