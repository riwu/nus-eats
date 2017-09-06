import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { updateNewMeetingDate, updateNewMeetingTime, updateNewMeetingDuration } from '../../../actions';
import MeetingCreator from './MeetingCreator';

import Config from '../../../constants/Config';

class MeetingCreatorContainer extends React.Component {
  componentWillMount() {
    const interval = Config.TIME_PICKER_MINUTE_INTERVAL;
    const now = moment();
    now.add(interval - (now.minute() % interval), 'minutes');

    this.props.onDateUpdate(now);

    const recentMeetings = Object.values(this.props.meetings)
      .sort((a, b) => now.diff(a.startTime) - now.diff(b.startTime));

    const timeFormat = 'HH:mm';
    [...new Set([now].concat(recentMeetings.map(meeting => meeting.startTime))
      .map(meeting => meeting.format(timeFormat)))]
      .slice(0, 3).map(time => moment(time, timeFormat))
      .forEach((time, index) => this.props.onTimeUpdate(time, index));

    [...new Set(recentMeetings.map(meeting => meeting.duration.asMinutes()))]
      .slice(0, 3).map(min => moment.duration(min, 'm'))
      .forEach((duration, index) => this.props.onDurationUpdate(duration, index));
  }

  render() {
    return (
      <MeetingCreator
        meetings={this.props.meetingModifier}
      />
    );
  }
}

const mapStateToProps = state => ({
  meetings: state.meeting.meetings,
  meetingModifier: state.meeting.meetingModifier.modifier,
});

const mapDispatchToProps = dispatch => ({
  onDateUpdate: date => dispatch(updateNewMeetingDate(date)),
  onTimeUpdate: (newTime, index) => dispatch(updateNewMeetingTime(newTime, index)),
  onDurationUpdate: (newDuration, index) => dispatch(updateNewMeetingDuration(newDuration, index)),
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
