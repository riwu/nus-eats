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
