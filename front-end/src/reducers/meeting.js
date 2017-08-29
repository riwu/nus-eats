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
  meetings: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_MEETINGS:
      return {
        ...state,
        meetings: [
          ...state.meetings,
          ...action.meetings
        ]
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
      const meetings = [...state.meetings];
      meetings.push({
        id: meetings.length + 1,
        canteenId: state.canteenId,
        date: state.date,
        time: state.time,
        isActive: true,
        attendees: [],
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
    case UPDATE_MEETING: {
      const meetings = [...state.meetings];
      if (action.newDate) meetings[action.id].date = action.newDate;
      if (action.newTime) meetings[action.id].time = action.newTime;
      return {
        ...state,
        meetings,
      };
    }
    case JOIN_MEETING: {
      const meetings = state.meetings.map((meeting) => {
        if (meeting.id !== action.meetingId) {
          return meeting;
        }

        return {
          ...meeting,
          attendees: [
            ...meeting.attendees,
            action.userId
          ]
        };
      });

      return {
        ...state,
        meetings,
      };
    }
    case UNJOIN_MEETING: {
      const meetings = state.meetings.map((meeting) => {
        if (meeting.id !== action.meetingId) {
          return meeting;
        }

        const attendees = meeting.attendees.filter((id) => id !== action.userId);

        return {
          ...meeting,
          attendees,
        };
      });

      return {
        ...state,
        meetings
      };
    }
    default:
      return state;
  }
}

export default reducer;
