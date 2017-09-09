import { SET_NOT_FIRST_TIME_VISIT } from '../../../constants/ActionTypes';

const notFirstTimeVisit = (state = false, action) => {
  switch (action.type) {
    case SET_NOT_FIRST_TIME_VISIT:
      return true;
    default:
      return state;
  }
};

export default notFirstTimeVisit;
