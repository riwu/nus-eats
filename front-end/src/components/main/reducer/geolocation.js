import { combineReducers } from 'redux';
import {
  SET_GEOLOCATION_PERMISSION,
  SET_LOCATION,
} from '../../../constants/ActionTypes';

const isAvailable = (state = ('geolocation' in navigator), action) => {
  return state;
};

const permission = (state = 'unknown', action) => {
  switch (action.type) {
    case SET_GEOLOCATION_PERMISSION:
      return action.permission;
    default:
      return state;
  }
};

const coordinates = (state = null, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        latitude: action.coordinates.latitude,
        longitude: action.coordinates.longitude
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  isAvailable,
  permission,
  coordinates,
});

export default reducer;
