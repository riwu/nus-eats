import { connect } from 'react-redux';
import FilterButton from './FilterButton';
import { toggleFilter } from '../../actions';

export default connect(null, { toggleFilter })(FilterButton);
