import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getMeetings } from '../../actions';
import MeetingsList from './MeetingsList';

class MeetingsListContainer extends Component {
  componentDidMount() {
    this.props.fetchFeed();
  }

  render() {
    return <MeetingsList {...this.props} />;
  }
}

const mapStateToProps = state => ({
  meetings: Object.entries(state.meeting.meetings).filter(([id, meeting]) => {
    const startTime = moment(meeting.startTime);
    const currentUserId = (state.currentUser || {}).id;
    const over = startTime.add(meeting.duration).isAfter(state.currentTime);
    const cancelled = !!meeting.deletedAt;
    const attending = meeting.attendees.findIndex((id) => id === currentUserId) !== -1;

    return !over && (!cancelled || attending);
  }),
});

const mapDispatchToProps = dispatch => ({
  fetchFeed: () => dispatch(getMeetings),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeetingsListContainer);
