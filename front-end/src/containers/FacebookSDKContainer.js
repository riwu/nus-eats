import { connect } from 'react-redux';
import { setFbReady } from '../actions';
import FacebookSDK from '../components/FacebookSDK';

const mapStateToProps = () => ({
});

const FacebookSDKContainer = connect(
  mapStateToProps,
  { onReady: setFbReady }
)(FacebookSDK);

export default FacebookSDKContainer;