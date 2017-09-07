import React from 'react';
import { connect } from 'react-redux';
import { toggleFeed } from '../../actions';
import Feed from './Feed';

const FeedContainer = ({ isLoggedIn, ...props }) => {
  if (isLoggedIn) {
    return <Feed {...props} />;
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.accessTokens.api,
  expanded: state.isFeedExpanded
});

const mapDispatchToProps = (dispatch) => ({
  closeFeed: () => dispatch(toggleFeed())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedContainer);
