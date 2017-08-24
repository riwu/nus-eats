import { TOGGLE_STALL_VIEW } from '../constants/ActionTypes';

function reducer(state = null, action) {
  if (action.type !== TOGGLE_STALL_VIEW) return state;
  return state === null ? action.stall : null;
}

export default reducer;
