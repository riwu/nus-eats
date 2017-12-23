import { combineReducers } from 'redux';
import {
  TOGGLE_MEETING_WINDOW,
  CREATE_MEETING,
  CANCEL_MEETING,
  UPDATE_MEETING,
  RECEIVE_MEETINGS,
  RECEIVE_MEETING,
  JOIN_MEETING,
  UNJOIN_MEETING,
  SET_MEETING_ID,
  MEETING_NOT_FOUND,
} from '../../../constants/ActionTypes';
import meetingModifier from './meetingModifier';

const setCanteenId = (state = null, action) => {
  if (action.type !== TOGGLE_MEETING_WINDOW) return state;
  return state === null ? action.canteenId : null;
};

const setMeetings = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_MEETINGS:
      return {
        ...state,
        ...action.meetings,
      };
    case RECEIVE_MEETING:
      return {
        ...state,
        [action.meeting.id]: action.meeting,
      };
    case CREATE_MEETING: {
      return {
        ...state,
        [action.tempId]: {
          id: action.tempId,
          canteenId: action.canteenId,
          startTime: action.startTime,
          duration: action.duration,
          title: action.title,
          description: action.description,
          userId: action.userId,
          isActive: true,
          attendees: [],
          createdAt: action.createdAt,
        },
      };
    }
    case SET_MEETING_ID: {
      const meetings = {
        ...state,
        [action.id]: {
          ...state[action.tempId],
          id: action.id,
        },
      };
      delete meetings[action.tempId];
      return meetings;
    }
    case CANCEL_MEETING: {
      // use flag instead of removing from array so that id can be maintained
      // and allows referencing cancelled meetings
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          deletedAt: true,
        },
      };
    }
    case UPDATE_MEETING: {
      return {
        ...state,
        [action.id]: action.meeting,
      };
    }
    case JOIN_MEETING: {
      const meeting = state[action.id];
      return {
        ...state,
        [action.id]: {
          ...meeting,
          attendees: [
            ...meeting.attendees,
            action.userId,
          ],
        },
      };
    }
    case UNJOIN_MEETING: {
      const meeting = state[action.id];
      return {
        ...state,
        [action.id]: {
          ...meeting,
          attendees: meeting.attendees.filter(id => id !== action.userId),
        },
      };
    }
    default:
      return state;
  }
};

const notFound = (state = [], action) => {
  switch (action.type) {
    case MEETING_NOT_FOUND:
      return [
        ...state,
        action.id,
      ];
    default:
      return state;
  }
};

const reducer = combineReducers({
  canteenId: setCanteenId,
  meetingModifier,
  meetings: setMeetings,
  notFound,
});

export default reducer;
