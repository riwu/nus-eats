import throttle from 'lodash.throttle';
import { get as getAccessTokens, set as setAccessTokens } from './access_tokens';
import { get as getCurrentUser, set as setCurrentUser } from './current_user';

const get = () => ({
  accessTokens: getAccessTokens(),
  currentUser: getCurrentUser()
});

const set = throttle((state) => {
  setAccessTokens(state.accessTokens);
  setCurrentUser(state.currentUser);
}, 5000);


export { get, set };
