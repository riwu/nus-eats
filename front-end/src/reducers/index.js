import { combineReducers } from 'redux';
import canteens from './canteens';
import stalls from './stalls';
import openedStall from './opened_stall';
import isFilterExpanded from './is_filter_expanded';
import toggleMuslimOnly from './toggle_muslim_only';

const reducer = combineReducers({
  canteens,
  stalls,
  openedStall,
  isFilterExpanded,
  toggleMuslimOnly
});

export default reducer;
