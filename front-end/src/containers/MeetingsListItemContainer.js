import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash.isequal';
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
    if (
      (!prevProps.isFbReady && this.props.isFbReady) ||
      (!isEqual(prevProps.meeting.attendees, this.props.meeting.attendees))
    ) {
      this.fetchFacebookUsers();
    }
  }

  fetchFacebookUsers() {
    const { meeting } = this.props;

    this.fetchFacebookUserIfNecessary(meeting.userId);
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
    return this.props.canteens.find(({id}) => id === this.props.meeting.canteenId);
  }

  findFacebookUser(id) {
    return this.props.facebookUsers[id];
  }

  render() {
    const canteen = this.findCanteen() || {};
    const user = this.findFacebookUser(this.props.meeting.userId) || {};
    const attendees = this.props.meeting.attendees.map((id) => this.findFacebookUser(id)).filter(x => !!x);
    const meeting = {
      ...this.props.meeting,
      canteen,
      user,
      attendees,
    };

    return <MeetingsListItem meeting={meeting} currentUserId={this.props.currentUserId} />;
  }
}

const mapStateToProps = (state) => ({
  canteens: state.canteens,
  isFbReady: state.isFbReady,
  facebookUsers: state.facebookUsers,
  currentUserId: state.currentUser.id
});

const mapDispatchToProps = (dispatch) => ({
  getAllCanteens: () => dispatch(getAllCanteens()),
  getFacebookUser: (id) => dispatch(getFacebookUser(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeetingsListItemContainer);
