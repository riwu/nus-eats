import { connect } from 'react-redux';
import CanteenPanel from '../components/CanteenPanel';

const mapStateToProps = (state, ownProps) => ({
  expanded: ownProps.expanded,
  header: ownProps.header,
  children: ownProps.children,
});

export default connect(mapStateToProps)(CanteenPanel);
