import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Meeting from './Meeting';

import { toggleFeed, toggleMeetingWindow, createMeeting, login,
  updateNewMeetingDate, updateNewMeetingTime, updateNewMeetingDuration,
  updateMeetingCreatorTitle, updateMeetingCreatorTitlePlaceholder } from '../../../actions';
import Config from '../../../constants/Config';

class MeetingContainer extends React.Component {
  componentWillMount() {
    const interval = Config.TIME_PICKER_MINUTE_INTERVAL;
    const now = moment();
    now.add(interval - (now.minute() % interval), 'minutes');

    this.props.onDateUpdate(now);
    const title = Config.getDefaultTitle(now, this.props.canteenName);
    this.props.updateMeetingCreatorTitle(title);
    this.props.updateMeetingCreatorTitlePlaceholder(title);

    const recentMeetings = Object.values(this.props.meetings)
      .sort((a, b) => b.createdAt.diff(a.createdAt));

    const pickerCount = 1;
    // can not set default in reducer as duplicates must be filtered
    const timeFormat = 'HH:mm';
    const defaultTimes = ['12:00', '13:00'];
    [...new Set([now].concat(recentMeetings.map(meeting => meeting.startTime))
      .map(meeting => meeting.format(timeFormat)).concat(defaultTimes))]
      .slice(0, pickerCount).map(time => moment(time, timeFormat))
      .forEach((time, index) => this.props.onTimeUpdate(time, index));

    const defaultDurations = [30, 60, 120];
    [...new Set(recentMeetings.map(meeting => meeting.duration.asMinutes()).concat(defaultDurations))]
      .slice(0, pickerCount).map(min => moment.duration(min, 'm'))
      .forEach((duration, index) => this.props.onDurationUpdate(duration, index));
  }

  render() {
    return (
      <Meeting
        {...this.props}
      />
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const meetingCreator = state.meeting.meetingModifier;
  return ({
    meetings: state.meeting.meetings,
    canteenId: ownProps.canteenId,
    canteenName: ownProps.canteenName,
    isOpen: state.meeting.canteenId === ownProps.canteenId,
    newMeetingDate: meetingCreator.modifier[0].date,
    newMeetingTime: meetingCreator.modifier[meetingCreator.activeTimeModifierIndex].time,
    newMeetingDuration: meetingCreator.modifier[meetingCreator.activeDurationModifierIndex].duration,
    title: meetingCreator.title,
    titlePlaceholder: meetingCreator.titlePlaceholder,
    description: meetingCreator.description,
    isLoggedIn: !!(state.accessTokens || {}).api,
    userId: (state.currentUser || {}).id,
    isFeedExpanded: state.isFeedExpanded,
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleMeetingWindow: () => dispatch(toggleMeetingWindow(ownProps.canteenId)),
  createMeeting: meeting => dispatch(createMeeting(meeting)),
  login: () => dispatch(login()),
  toggleFeed: () => dispatch(toggleFeed()),
  onDateUpdate: date => dispatch(updateNewMeetingDate(date)),
  updateMeetingCreatorTitle: title => dispatch(updateMeetingCreatorTitle(title)),
  updateMeetingCreatorTitlePlaceholder: title => dispatch(updateMeetingCreatorTitlePlaceholder(title)),
  onTimeUpdate: (newTime, index) => dispatch(updateNewMeetingTime(newTime, index)),
  onDurationUpdate: (newDuration, index) => dispatch(updateNewMeetingDuration(newDuration, index)),

});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  openFeed: () => { if (!stateProps.isFeedExpanded) dispatchProps.toggleFeed(); },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MeetingContainer);
