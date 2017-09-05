import { get as getAccessTokens, set as setAccessTokens } from './access_tokens';
import { get as getCurrentUser, set as setCurrentUser } from './current_user';
import { get as getGrantedPermissions, set as setGrantedPermissions } from './granted_permissions';

const get = () => ({
  accessTokens: getAccessTokens(),
  currentUser: getCurrentUser(),
  grantedPermissions: getGrantedPermissions(),
});

const set = (state) => {
  setAccessTokens(state.accessTokens);
  setCurrentUser(state.currentUser);
  setGrantedPermissions(state.grantedPermissions);
};


export { get, set };
