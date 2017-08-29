import {
  TOGGLE_MEETING_WINDOW,
  CHANGE_MEETING_DATE,
  CHANGE_MEETING_TIME,
  CREATE_MEETING,
  CANCEL_MEETING,
  UPDATE_MEETING,
  RECEIVE_MEETINGS,
  JOIN_MEETING,
  UNJOIN_MEETING
} from '../constants/ActionTypes';

const initialState = {
  canteenId: null,
  modalEntered: false,
  meetings: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_MEETINGS:
      return {
        ...state,
        meetings: {
          ...state.meetings,
          ...action.meetings
        }
      };
    case TOGGLE_MEETING_WINDOW:
      return {
        ...state,
        canteenId: state.canteenId === null ? action.canteenId : null,
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
      const id = Object.keys(state.meetings).length + 1;
      return {
        ...state,
        meetings: {
          ...state.meetings,
          [id]: {
            id,
            canteenId: state.canteenId,
            date: state.date,
            time: state.time,
            isActive: true,
            attendees: [],
          }
        }
      };
    }
    case CANCEL_MEETING: {
      const meeting = state.meetings[action.id];
      // use flag instead of removing from array so that id can be maintained
      // and allows referencing cancelled meetings
      return {
        ...state,
        meetings: {
          ...state.meetings,
          [meeting.id]: {
            ...meeting,
            isActive: false
          }
        }
      };
    }
    case UPDATE_MEETING: {
      const meeting = {...state.meetings[action.id]};
      if (action.newDate) meeting.date = action.newDate;
      if (action.newTime) meeting.time = action.newTime;
      return {
        ...state,
        meetings: {
          ...state.meetings,
          [meeting.id]: meeting
        }
      };
    }
    case JOIN_MEETING: {
      const meeting = state.meetings[action.id];
      return {
        ...state,
        meetings: {
          ...state.meetings,
          [meeting.id]: {
            ...meeting,
            attendees: [
              ...meeting.attendees,
              action.userId
            ]
          }
        }
      };
    }
    case UNJOIN_MEETING: {
      const meeting = state.meetings[action.id];
      return {
        ...state,
        meetings: {
          ...state.meetings,
          [meeting.id]: {
            ...meeting,
            attendees: meeting.attendees.filter((id) => id !== action.userId)
          }
        }
      };
    }
    default:
      return state;
  }
}

export default reducer;
