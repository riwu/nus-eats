import { connect } from 'react-redux';
import { setFbReady } from '../../actions/index';
import FacebookSDK from './FacebookSDK';

const mapStateToProps = () => ({
});

const FacebookSDKContainer = connect(
  mapStateToProps,
  { onReady: setFbReady }
)(FacebookSDK);

export default FacebookSDKContainer;
