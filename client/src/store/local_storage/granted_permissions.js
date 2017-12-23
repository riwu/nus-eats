const KEY = 'grantedPermissions';

const get = () => {
  try {
    const content = JSON.parse(localStorage.getItem(KEY)) || undefined;
    return new Set(content);
  } catch (e) {
    return new Set();
  }
};

const set = (value) => {
  const content = [...value];
  localStorage.setItem(KEY, JSON.stringify(content));
};

export { get, set };
