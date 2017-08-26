import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCanteens, getFacebookUser } from '../actions';
import MeetingsListItem from '../components/MeetingsListItem';

class MeetingsListItemContainer extends Component {
  componentDidMount() {
    if (this.props.canteens.length === 0) {
      this.props.getAllCanteens();
    }

    if (this.props.isFbReady) {
      this.fetchFacebookUsers();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isFbReady && this.props.isFbReady) {
      this.fetchFacebookUsers();
    }
  }

  fetchFacebookUsers() {
    const { meeting } = this.props;

    this.fetchFacebookUserIfNecessary(meeting.user_id);
    meeting.attendees.forEach((id) => {
      this.fetchFacebookUserIfNecessary(id);
    });
  }

  fetchFacebookUserIfNecessary(id) {
    if (!this.props.facebookUsers[id]) {
      this.props.getFacebookUser(id);
    }
  }

  findCanteen() {
    return this.props.canteens.find(({id}) => id === this.props.meeting.canteenID);
  }

  findFacebookUser(id) {
    return this.props.facebookUsers[id];
  }

  render() {
    const canteen = this.findCanteen() || {};
    const user = this.findFacebookUser(this.props.meeting.user_id) || {};
    const attendees = this.props.meeting.attendees.map((id) => this.findFacebookUser(id)).filter(x => !!x);
    const meeting = {
      ...this.props.meeting,
      canteen,
      user,
      attendees,
    };

    return <MeetingsListItem meeting={meeting} />;
  }
}

const mapStateToProps = (state) => ({
  canteens: state.canteens,
  isFbReady: state.isFbReady,
  facebookUsers: state.facebookUsers
});

const mapDispatchToProps = (dispatch) => ({
  getAllCanteens: () => dispatch(getAllCanteens()),
  getFacebookUser: (id) => dispatch(getFacebookUser(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeetingsListItemContainer);
