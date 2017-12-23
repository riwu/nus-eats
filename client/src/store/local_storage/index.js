import { get as getAccessTokens, set as setAccessTokens } from './access_tokens';
import { get as getCurrentUser, set as setCurrentUser } from './current_user';
import { get as getGrantedPermissions, set as setGrantedPermissions } from './granted_permissions';
import { get as getNotFirstTimeVisit, set as setNotFirstTimeVisit } from './notFirstTimeVisit';

let previousState = {};

const get = () => {
  const accessTokens = getAccessTokens();
  const currentUser = getCurrentUser();
  const grantedPermissions = getGrantedPermissions();
  const notFirstTimeVisit = getNotFirstTimeVisit();

  previousState = {
    accessTokens,
    currentUser,
    grantedPermissions,
    notFirstTimeVisit,
  };

  return previousState;
};

const set = (state) => {
  if (state.accessTokens !== previousState.accessTokens) {
    setAccessTokens(state.accessTokens);
  }

  if (state.currentUser !== previousState.currentUser) {
    setCurrentUser(state.currentUser);
  }

  if (state.grantedPermissions !== previousState.grantedPermissions) {
    setGrantedPermissions(state.grantedPermissions);
  }
  if (state.notFirstTimeVisit !== previousState.notFirstTimeVisit) {
    setNotFirstTimeVisit(state.notFirstTimeVisit);
  }

  previousState = state;
};


export { get, set };
