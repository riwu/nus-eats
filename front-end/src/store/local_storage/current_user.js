import jwtDecode from 'jwt-decode';
import makeLocalStorageController from '../../util/make_local_storage_controller';
import { get as getAccessTokens } from './access_tokens';

const KEY = 'currentUser';

const getFromAccessTokens = () => {
  const accessTokens = getAccessTokens() || {};
  const apiToken = accessTokens.api;

  if (!apiToken) {
    return undefined;
  }

  const payload = jwtDecode(apiToken);
  return {
    id: payload.user.id,
    name: payload.user.name,
  };
};

const get = () => {
  try {
    const output = JSON.parse(localStorage.getItem(KEY));

    if (output) {
      return output;
    } else {
      return getFromAccessTokens();
    }
  } catch (e) {
    return undefined;
  }
};

const { set } = makeLocalStorageController(KEY);

export { get, set };
