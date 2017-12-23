import { BEGIN_LOGIN, DONE_LOGIN, LOGOUT } from '../../../constants/ActionTypes';
import makeBoolean from '../../../higher_order_reducers/boolean';

const reducer = makeBoolean(false, [BEGIN_LOGIN], [DONE_LOGIN, LOGOUT]);

export default reducer;
