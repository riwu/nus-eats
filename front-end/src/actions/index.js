import moment from 'moment';
import * as types from '../constants/ActionTypes';
import api from '../api';
import fb from '../fb';

export const getAllCanteens = (dispatch) => {
  api.getAllCanteens().then((canteens) => {
    dispatch({
      type: types.RECEIVE_CANTEENS,
      canteens,
    });
  });
};

export const getAllStalls = (dispatch) => {
  api.getAllStalls().then((stalls) => {
    dispatch({
      type: types.RECEIVE_STALLS,
      stalls,
    });
  });
};

export const getMeetings = (dispatch) => {
  api.getMeetings().then((meetings) => {
    dispatch({
      type: types.RECEIVE_MEETINGS,
      meetings,
    });
  });
};

export const toggleStallView = id => ({
  type: types.TOGGLE_STALL_VIEW,
  id,
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

export const getRatings = (dispatch) => {
  api.getRatings().then((ratings) => {
    dispatch({
      type: types.RECEIVE_RATINGS,
      ratings,
    });
  });
};

export const login = () => dispatch => new Promise((resolve, reject) => {
  dispatch({
    type: types.BEGIN_LOGIN,
  });

  window.FB.login((response) => {
    if (response.status === 'connected') {
      const accessToken = window.FB.getAccessToken();
      api.login(accessToken).then(({ token, facebookToken }) => {
        dispatch({
          apiToken: token,
          facebookToken,
          type: types.RECEIVE_ACCESS_TOKENS,
        });

        dispatch(getRatings);

        fb.api('me')
          .then((user) => {
            dispatch({
              user,
              type: types.RECEIVE_CURRENT_USER,
            });

            dispatch({
              type: types.DONE_LOGIN,
            });

            resolve();
          });

        fb.api('me/permissions')
          .then((response) => {
            const permissions = response.data.filter(({ status }) => status === 'granted')
                                             .map(({ permission }) => permission);

            dispatch({
              type: types.SET_GRANTED_PERMISSIONS,
              permissions: new Set(permissions),
            });
          });
      });
    } else {
      dispatch({
        type: types.DONE_LOGIN,
      });

      reject();
    }
  }, { scope: 'public_profile,user_friends' });
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const changeRating = (stallId, rating) => (dispatch) => {
  api.updateRating(stallId, rating).then((response) => {
    console.log(response);
  });
  dispatch({
    type: types.CHANGE_RATING,
    stallId,
    rating,
  });
};
export const toggleMeetingWindow = canteenId => ({
  type: types.TOGGLE_MEETING_WINDOW,
  canteenId,
});

export const toggleCanteenPanel = canteenId => ({
  type: types.TOGGLE_CANTEEN_PANEL,
  canteenId,
});

export const createMeeting = meeting => (dispatch) => {
  const tempId = moment().valueOf();
  api.createMeeting(meeting).then((result) => {
    dispatch({
      type: types.SET_MEETING_ID,
      id: result.appointment.id,
      tempId,
    });
  });
  dispatch({
    type: types.CREATE_MEETING,
    ...meeting,
    tempId,
  });
};

export const cancelMeeting = id => (dispatch) => {
  api.cancelMeeting(id).then(() => dispatch({
    type: types.CANCEL_MEETING,
    id,
  })).catch(error => alert(JSON.stringify(error)));
};

export const updateMeeting = (id, meeting) => (dispatch) => {
  api.updateMeeting(id, meeting);
  dispatch({
    type: types.UPDATE_MEETING,
    id,
    meeting,
  });
};

export const updateNewMeetingDate = date => ({
  type: types.UPDATE_NEW_MEETING_DATE,
  date,
});

export const updateNewMeetingTime = (time, index) => ({
  type: types.UPDATE_NEW_MEETING_TIME,
  time,
  index,
});

export const updateNewMeetingDuration = (duration, index) => ({
  type: types.UPDATE_NEW_MEETING_DURATION,
  duration,
  index,
});

export const getFacebookUser = userId => (dispatch) => {
  fb.api(userId)
    .then((user) => {
      dispatch({
        type: types.RECEIVE_FACEBOOK_USER,
        user,
      });
    });
};

export const joinMeeting = (id, userId) => (dispatch) => {
  dispatch({
    type: types.JOIN_MEETING,
    id,
    userId,
  });

  api
    .joinMeeting(id)
    .catch((error) => {
      console.log('Cannot join meeting', error);
      dispatch({
        type: types.UNJOIN_MEETING,
        id,
        userId,
      });
    });
};

export const unjoinMeeting = (id, userId) => (dispatch) => {
  dispatch({
    type: types.UNJOIN_MEETING,
    id,
    userId,
  });

  api
    .unjoinMeeting(id)
    .catch((error) => {
      console.log('Cannot unjoin meeting', error);
      dispatch({
        type: types.JOIN_MEETING,
        id,
        userId,
      });
    });
};
