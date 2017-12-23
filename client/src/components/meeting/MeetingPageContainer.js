import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCanteens, getMeeting } from '../../actions';
import MeetingPage from './MeetingPage';

class MeetingPageContainer extends Component {
  componentDidMount() {
    this.props.fetchCanteens();
    this.props.fetchMeeting();
  }

  render() {
    return <MeetingPage meeting={this.props.meeting} notFound={this.props.notFound} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  let meeting = state.meeting.meetings[ownProps.match.params.id];

  if (meeting) {
    meeting = {...meeting};
    state.canteens.forEach((canteen) => {
      if (meeting.canteenId === canteen.id) {
        meeting.canteen = canteen;
      }
    });

    meeting.user = {
      id: meeting.userId
    };

    meeting.attendees = meeting.attendees.map((id) => ({id}));
  }

  return {
    meeting,
    notFound: state.meeting.notFound.findIndex((id) => id === ownProps.match.params.id) !== -1
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCanteens: () => dispatch(getAllCanteens),
  fetchMeeting: () => dispatch(getMeeting(ownProps.match.params.id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeetingPageContainer);
