import * as types from '../constants/ActionTypes';
import api from '../api';

export const getAllCanteens = () => (dispatch) => {
  api.getAllCanteens((canteens) => {
    dispatch({
      type: types.RECEIVE_CANTEENS,
      canteens,
    });
  });
};

export const getAllStalls = () => (dispatch) => {
  api.getAllStalls((stalls) => {
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
