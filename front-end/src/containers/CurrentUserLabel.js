import { connect } from 'react-redux';
import UserLabel from '../components/UserLabel';

const mapStateToProps = (state) => ({
  name: state.currentUser.name
});

const CurrentUserLabel = connect(
  mapStateToProps
)(UserLabel);

export default CurrentUserLabel;
