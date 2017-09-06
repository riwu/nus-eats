import { combineReducers } from 'redux';
import moment from 'moment';

import {
  UPDATE_NEW_MEETING_DATE,
  UPDATE_NEW_MEETING_TIME,
  UPDATE_NEW_MEETING_DURATION,
  UPDATE_TIME_MODIFIER_RADIO,
  UPDATE_DURATION_MODIFIER_RADIO,
} from '../../../constants/ActionTypes';

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

const activeTimeModifierIndex = (state = 0, action) => {
  if (action.type !== UPDATE_TIME_MODIFIER_RADIO) return state;
  return action.index;
};

const activeDurationModifierIndex = (state = 0, action) => {
  if (action.type !== UPDATE_DURATION_MODIFIER_RADIO) return state;
  return action.index;
};


const reducer = combineReducers({
  modifier: meetingModifier,
  activeTimeModifierIndex,
  activeDurationModifierIndex,
});

export default reducer;
