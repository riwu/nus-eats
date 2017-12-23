import { TOGGLE_FILTER } from '../../../constants/ActionTypes';
import makeBooleanToggle from '../../../higher_order_reducers/boolean_toggle';

const reducer = makeBooleanToggle(false, [TOGGLE_FILTER]);

export default reducer;
