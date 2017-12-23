const timeoutPromise = (timeout) => (
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  })
);

export default timeoutPromise;
