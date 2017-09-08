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
    return startTime.add(meeting.duration).isAfter(state.currentTime);
  }),
});

const mapDispatchToProps = dispatch => ({
  fetchFeed: () => dispatch(getMeetings),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeetingsListContainer);
