import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import canteens from './canteens';
import stalls from './stalls';
import isFilterExpanded from './isFilterExpanded';
import toggleHalalOnly from './toggleHalalOnly';
import isFacebookReady from './isFacebookReady';
import accessTokens from './accessTokens';
import currentUser from './currentUser';
import userRatings from './userRatings';
import meeting from './meeting';
import facebookUsers from './facebookUsers';
import isLoggingIn from './isLoggingIn';
import grantedPermissions from './grantedPermissions';

const reducer = combineReducers({
  canteens,
  stalls,
  isFilterExpanded,
  toggleHalalOnly,
  isFacebookReady,
  accessTokens,
  currentUser,
  userRatings,
  meeting,
  routing: routerReducer,
  facebookUsers,
  isLoggingIn,
  grantedPermissions,
});

export default reducer;
