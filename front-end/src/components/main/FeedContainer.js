import { connect } from 'react-redux';
import { toggleFeed } from '../../actions';
import Feed from './Feed';

const mapStateToProps = (state) => ({
  expanded: state.isFeedExpanded
});

const mapDispatchToProps = (dispatch) => ({
  closeFeed: () => dispatch(toggleFeed())
});

const FeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);

export default FeedContainer;
