const makeLocalStorageController = key => ({
  get() {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return undefined;
    }
  },
  set(value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
});

export default makeLocalStorageController;
