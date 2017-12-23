import { TOGGLE_FEED } from '../../../constants/ActionTypes';
import makeBooleanToggle from '../../../higher_order_reducers/boolean_toggle';

const reducer = makeBooleanToggle(false, [TOGGLE_FEED]);

export default reducer;
