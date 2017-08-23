import { TOGGLE_MUSLIM_ONLY } from '../constants/ActionTypes';
import makeBooleanReducer from '../higher_order_reducers/boolean_toggle';

const reducer = makeBooleanReducer(false, [TOGGLE_MUSLIM_ONLY]);

export default reducer;
