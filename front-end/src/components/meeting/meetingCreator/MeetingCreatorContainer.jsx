import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { updateNewMeetingDate, updateNewMeetingTime, updateNewMeetingDuration,
  updateTimeModifierRadio, updateDurationModifierRadio, updateMeetingCreatorTitle, updateMeetingCreatorDescription } from '../../../actions';
import MeetingCreator from './MeetingCreator';

import Config from '../../../constants/Config';

class MeetingCreatorContainer extends React.Component {

  getMealName(time) {
    const hour = time.hour();
    switch (true) {
      case (hour < 9):
        return 'Breakfast';
      case (hour < 15):
        return 'Lunch';
      case (hour < 20):
        return 'Dinner';
      default:
        return 'Supper';
    }
  }

  componentWillMount() {
    const interval = Config.TIME_PICKER_MINUTE_INTERVAL;
    const now = moment();
    now.add(interval - (now.minute() % interval), 'minutes');

    this.props.onDateUpdate(now);

    const mealName = this.getMealName(now);
    this.props.updateMeetingCreatorTitle(`${mealName} at ${this.props.canteenName}`);

    const recentMeetings = Object.values(this.props.meetings)
      .sort((a, b) => now.diff(a.startTime) - now.diff(b.startTime));

    // can not set default in reducer as duplicates must be filtered
    const timeFormat = 'HH:mm';
    const defaultTimes = ['12:00', '13:00'];
    [...new Set([now].concat(recentMeetings.map(meeting => meeting.startTime))
      .map(meeting => meeting.format(timeFormat)).concat(defaultTimes))]
      .slice(0, 3).map(time => moment(time, timeFormat))
      .forEach((time, index) => this.props.onTimeUpdate(time, index));

    const defaultDurations = [30, 60, 120];
    [...new Set(recentMeetings.map(meeting => meeting.duration.asMinutes()).concat(defaultDurations))]
      .slice(0, 3).map(min => moment.duration(min, 'm'))
      .forEach((duration, index) => this.props.onDurationUpdate(duration, index));
  }

  render() {
    return (
      <MeetingCreator
        meetings={this.props.meetingModifier}
        updateTimeModifierRadio={this.props.updateTimeModifierRadio}
        updateDurationModifierRadio={this.props.updateDurationModifierRadio}
        activeTimeModifierIndex={this.props.activeTimeModifierIndex}
        activeDurationModifierIndex={this.props.activeDurationModifierIndex}
        title={this.props.title}
        description={this.props.description}
        updateMeetingCreatorTitle={this.props.updateMeetingCreatorTitle}
        updateMeetingCreatorDescription={this.props.updateMeetingCreatorDescription}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const meetingCreator = state.meeting.meetingModifier;
  return {
    meetings: state.meeting.meetings,
    meetingModifier: meetingCreator.modifier,
    activeTimeModifierIndex: meetingCreator.activeTimeModifierIndex,
    activeDurationModifierIndex: meetingCreator.activeDurationModifierIndex,
    title: meetingCreator.title,
    description: meetingCreator.description,
    canteenName: ownProps.canteenName,
  };
};

const mapDispatchToProps = dispatch => ({
  onDateUpdate: date => dispatch(updateNewMeetingDate(date)),
  onTimeUpdate: (newTime, index) => dispatch(updateNewMeetingTime(newTime, index)),
  onDurationUpdate: (newDuration, index) => dispatch(updateNewMeetingDuration(newDuration, index)),
  updateTimeModifierRadio: index => dispatch(updateTimeModifierRadio(index)),
  updateDurationModifierRadio: index => dispatch(updateDurationModifierRadio(index)),
  updateMeetingCreatorTitle: title => dispatch(updateMeetingCreatorTitle(title)),
  updateMeetingCreatorDescription: description => dispatch(updateMeetingCreatorDescription(description)),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  meetingModifier: stateProps.meetingModifier.map((meeting, index) => ({
    ...meeting,
    onDateUpdate: dispatchProps.onDateUpdate,
    onTimeUpdate: newTime => dispatchProps.onTimeUpdate(newTime, index),
    onDurationUpdate: newDuration => dispatchProps.onDurationUpdate(newDuration, index),
  })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(MeetingCreatorContainer);
