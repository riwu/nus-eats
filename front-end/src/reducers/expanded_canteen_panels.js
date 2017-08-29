import { TOGGLE_CANTEEN_PANEL } from '../constants/ActionTypes';

function reducer(state = new Set(), action) {
  if (action.type !== TOGGLE_CANTEEN_PANEL) return state;

  const expanded = new Set(state);
  if (expanded.has(action.canteenId)) {
    expanded.delete(action.canteenId);
  } else {
    expanded.add(action.canteenId);
  }
  return expanded;
}

export default reducer;
