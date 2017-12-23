import { connect } from 'react-redux';
import UserLabel from './UserLabel';

const mapStateToProps = (state) => ({
  name: state.currentUser.name
});

const CurrentUserLabel = connect(
  mapStateToProps
)(UserLabel);

export default CurrentUserLabel;
