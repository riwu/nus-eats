import { combineReducers } from 'redux';

import {
  UPDATE_NEW_MEETING_DATE,
  UPDATE_NEW_MEETING_TIME,
  UPDATE_NEW_MEETING_DURATION,
  UPDATE_TIME_MODIFIER_RADIO,
  UPDATE_DURATION_MODIFIER_RADIO,
  UPDATE_MEETING_CREATOR_TITLE,
  UPDATE_MEETING_CREATOR_DESCRIPTION,
  UPDATE_MEETING_CREATOR_TITLE_PLACEHOLDER,
} from '../../../constants/ActionTypes';

const meetingModifier = (state = [{}], action) => {
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

const title = (state = '', action) => {
  if (action.type !== UPDATE_MEETING_CREATOR_TITLE) return state;
  return action.title;
};

const titlePlaceholder = (state = '', action) => {
  if (action.type !== UPDATE_MEETING_CREATOR_TITLE_PLACEHOLDER) return state;
  return action.title;
};

const description = (state = '', action) => {
  if (action.type !== UPDATE_MEETING_CREATOR_DESCRIPTION) return state;
  return action.description;
};

const reducer = combineReducers({
  modifier: meetingModifier,
  activeTimeModifierIndex,
  activeDurationModifierIndex,
  title,
  description,
  titlePlaceholder,
});

export default reducer;
