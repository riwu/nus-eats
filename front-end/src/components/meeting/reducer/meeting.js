import { combineReducers } from 'redux';
import moment from 'moment';

import {
  TOGGLE_MEETING_WINDOW,
  CREATE_MEETING,
  CANCEL_MEETING,
  UPDATE_MEETING,
  RECEIVE_MEETINGS,
  JOIN_MEETING,
  UNJOIN_MEETING,
  SET_MEETING_ID,
  UPDATE_NEW_MEETING_DATE,
  UPDATE_NEW_MEETING_TIME,
  UPDATE_NEW_MEETING_DURATION,
} from '../../../constants/ActionTypes';

const setCanteenId = (state = null, action) => {
  if (action.type !== TOGGLE_MEETING_WINDOW) return state;
  return state === null ? action.canteenId : null;
};

const defaultTimes = [null, '12:00', '13:00'].map(time => moment(time, 'HH:mm'));
const defaultDurations = [30, 60, 120].map(min => moment.duration(min, 'm'));
const initialMeetingModifiers = defaultTimes.map((time, index) => ({
  time,
  duration: defaultDurations[index],
}));

const meetingModifier = (state = initialMeetingModifiers, action) => {
  switch (action.type) {
    case UPDATE_NEW_MEETING_DATE: {
      const newState = [...state];
      newState[0].date = action.date;
      return newState;
    }
    case UPDATE_NEW_MEETING_TIME: {
      const newState = [...state];
      newState[action.index].time = action.time;
      return newState;
    }
    case UPDATE_NEW_MEETING_DURATION: {
      const newState = [...state];
      newState[action.index].duration = action.duration;
      return newState;
    }
    default:
      return state;
  }
};

const setMeetings = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_MEETINGS:
      return action.meetings;
    case CREATE_MEETING: {
      return {
        ...state,
        [action.tempId]: {
          canteenId: action.canteenId,
          startTime: action.startTime,
          duration: action.duration,
          isActive: true,
          attendees: [],
        },
      };
    }
    case SET_MEETING_ID: {
      const meetings = { ...state };
      meetings[action.id] = meetings[action.tempId];
      meetings[action.id].isIdSet = true;
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
          isActive: false,
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

const reducer = combineReducers({
  canteenId: setCanteenId,
  meetingModifer: meetingModifier,
  meetings: setMeetings,
});

export default reducer;
