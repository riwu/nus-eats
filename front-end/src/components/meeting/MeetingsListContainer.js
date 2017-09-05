import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMeetings } from '../actions/index';
import MeetingsList from './MeetingsList';

class MeetingsListContainer extends Component {
  componentDidMount() {
    this.props.fetchFeed();
  }

  render() {
    return <MeetingsList {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  meetings: Object.values(state.meeting.meetings)
});

const mapDispatchToProps = (dispatch) => ({
  fetchFeed: () => dispatch(getMeetings())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeetingsListContainer);