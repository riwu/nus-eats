import { connect } from 'react-redux';
import FilterPanel from '../components/FilterPanel';
import { toggleFilter } from '../actions';

const mapStateToProps = state => ({
  isFilterExpanded: state.isFilterExpanded,
});

export default connect(mapStateToProps)(FilterPanel);
