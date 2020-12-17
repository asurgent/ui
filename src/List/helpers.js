export const hasValue = (val) => {
  // empty array
  if (Array.isArray(val) && val.length === 0) {
    return false;
  }
  // empty object
  if (val?.constructor === Object && Object.entries(val).length === 0) {
    return false;
  }
  // null/undefined/empty-string
  if (val === null || val === undefined || val === '') {
    return false;
  }
  return true;
};
