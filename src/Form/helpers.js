export const withDelayTimer = (action, timeout = 500) => {
  let timer = setTimeout(() => {}, timeout);
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      action(...args);
    }, timeout);
  };
};
