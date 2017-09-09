const makeLocalStorageController = key => ({
  get() {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      // prevent null from replacing default state argument in reducers,
      // but don't convert if it's false, 0, ''
      return value === null ? undefined : value;
    } catch (e) {
      return undefined;
    }
  },
  set(value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
});

export default makeLocalStorageController;
