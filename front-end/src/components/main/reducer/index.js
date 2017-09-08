import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import canteens from '../../canteen/reducer/canteens';
import stalls from '../../stall/reducer/stalls';
import stallPhotos from '../../stall/reducer/stallPhotos';
import isFilterExpanded from '../../filter/reducer/isFilterExpanded';
import toggleHalalOnly from '../../filter/reducer/toggleHalalOnly';
import isFacebookReady from '../../facebook/reducer/isFacebookReady';
import accessTokens from '../../facebook/reducer/accessTokens';
import currentUser from '../../facebook/reducer/currentUser';
import userRatings from '../../stall/reducer/userRatings';
import meeting from '../../meeting/reducer/meeting';
import facebookUsers from '../../facebook/reducer/facebookUsers';
import isLoggingIn from '../../facebook/reducer/isLoggingIn';
import grantedPermissions from '../../facebook/reducer/grantedPermissions';
import isFeedExpanded from './isFeedExpanded';
import geolocation from './geolocation';

const reducer = combineReducers({
  canteens,
  stalls,
  stallPhotos,
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
  isFeedExpanded,
  geolocation,
});

export default reducer;
