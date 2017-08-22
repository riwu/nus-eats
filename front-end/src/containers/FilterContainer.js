import { connect } from 'react-redux';
import Filter from '../components/Filter';
import { toggleFilter } from '../actions';

const mapStateToProps = state => ({
  isFilterExpanded: state.isFilterExpanded,
});

export default connect(mapStateToProps, { toggleFilter })(Filter);
