import { TOGGLE_MEETING_WINDOW, CHANGE_MEETING_DATE, CHANGE_MEETING_TIME,
  CREATE_MEETING, CANCEL_MEETING } from '../constants/ActionTypes';

const initialState = {
  canteenID: null,
  modalEntered: false,
  meetings: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MEETING_WINDOW:
      return {
        ...state,
        canteenID: state.canteenID === null ? action.canteenID : null,
      };
    case CHANGE_MEETING_DATE:
      return {
        ...state,
        date: action.date,
      };
    case CHANGE_MEETING_TIME:
      return {
        ...state,
        time: action.time,
      };
    case CREATE_MEETING: {
      const meetings = [...state.meetings];
      meetings.push({
        id: meetings.length,
        canteenID: state.canteenID,
        date: state.date,
        time: state.time,
        isActive: true,
      });
      return {
        ...state,
        meetings,
      };
    }
    case CANCEL_MEETING: {
      const meetings = [...state.meetings];
      // use flag instead of removing from array so that id can be maintained
      // and allows referencing cancelled meetings
      meetings[action.id].isActive = false;
      return {
        ...state,
        meetings,
      };
    }
    default:
      return state;
  }
}

export default reducer;
