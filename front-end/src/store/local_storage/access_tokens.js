import makeLocalStorageController from '../../util/make_local_storage_controller';

const KEY = 'accessToken';

const { get, set } = makeLocalStorageController(KEY);

export { get, set };
