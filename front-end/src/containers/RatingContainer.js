import { connect } from 'react-redux';
import Rating from '../components/Rating';

const mapDispatchToProps = (dispatch, ownProps) => ({
  rating: ownProps.rating,
  readonly: ownProps.readonly,
});

export default connect(null, mapDispatchToProps)(Rating);
