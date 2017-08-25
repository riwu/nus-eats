import makeLocalStorageController from '../../util/make_local_storage_controller';

const KEY = 'currentUser';

const { get, set } = makeLocalStorageController(KEY);

export { get, set };
