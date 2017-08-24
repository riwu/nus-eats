import * as types from '../constants/ActionTypes';
import api from '../api';

export const getAllCanteens = () => (dispatch) => {
  api.getAllCanteens().then((canteens) => {
    dispatch({
      type: types.RECEIVE_CANTEENS,
      canteens,
    });
  });
};

export const getAllStalls = () => (dispatch) => {
  api.getAllStalls().then((stalls) => {
    dispatch({
      type: types.RECEIVE_STALLS,
      stalls,
    });
  });
};

export const openStoreView = dispatch => stall => dispatch({
  type: types.OPEN_STALL_VIEW,
  stall,
});

export const closeStoreView = () => ({
  type: types.CLOSE_STALL_VIEW,
});

export const toggleFilter = () => ({
  type: types.TOGGLE_FILTER,
});

export const toggleMuslimOnly = () => ({
  type: types.TOGGLE_MUSLIM_ONLY,
});

export const setFbReady = () => ({
  type: types.SET_FB_READY,
});

export const login = () => dispatch => new Promise((resolve, reject) => {
  window.FB.login((response) => {
    if (response.status === 'connected') {
      const accessToken = window.FB.getAccessToken();
      api.login(accessToken).then(({ token, facebookToken }) => {
        dispatch({
          apiToken: token,
          facebookToken,
          type: types.RECEIVE_ACCESS_TOKENS,
        });

        window.FB.api('me', { access_token: facebookToken }, (user) => {
          dispatch({
            user,
            type: types.RECEIVE_CURRENT_USER,
          });
        });
      });
    } else {
      reject();
    }
  }, { scope: 'public_profile,user_friends,email' });
});

export const changeRating = (stallID, rating) => ({
  type: types.CHANGE_RATING,
  stallID,
  rating,
});
