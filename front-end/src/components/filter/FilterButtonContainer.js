import { connect } from 'react-redux';
import FilterButton from './FilterButton';
import { toggleFilter } from '../../actions/index';

export default connect(null, { toggleFilter })(FilterButton);
