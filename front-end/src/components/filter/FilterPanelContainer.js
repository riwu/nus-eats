import { connect } from 'react-redux';
import FilterPanel from './FilterPanel';
import { toggleMuslimOnly } from '../../actions/index';

const mapStateToProps = state => ({
  isFilterExpanded: state.isFilterExpanded,
});

export default connect(mapStateToProps, { toggleHalalOnly: toggleMuslimOnly })(FilterPanel);
