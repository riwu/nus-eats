import { connect } from 'react-redux';
import CanteenPanel from '../components/CanteenPanel';

const mapStateToProps = (state, ownProps) => ({
  expanded: state.expandedCanteenPanels === ownProps.canteenId,
  header: ownProps.header,
  children: ownProps.children,
});

export default connect(mapStateToProps)(CanteenPanel);
