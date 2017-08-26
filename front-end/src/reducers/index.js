import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import canteens from './canteens';
import stalls from './stalls';
import isFilterExpanded from './is_filter_expanded';
import toggleMuslimOnly from './toggle_muslim_only';
import isFbReady from './is_fb_ready';
import accessTokens from './access_tokens';
import currentUser from './current_user';
import userRatings from './user_ratings';
import meeting from './meeting';
import expandedCanteenPanels from './expanded_canteen_panels';
import facebookUsers from './facebook_users';

const reducer = combineReducers({
  canteens,
  stalls,
  isFilterExpanded,
  toggleMuslimOnly,
  isFbReady,
  accessTokens,
  currentUser,
  userRatings,
  meeting,
  expandedCanteenPanels,
  routing: routerReducer,
  facebookUsers,
});

export default reducer;
