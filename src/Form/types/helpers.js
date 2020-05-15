
export const normalizeDateInput = (value, previousValue) => {
  if (!value) return value;
  const currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length;

  if (!previousValue || value.length > previousValue.length) {
    if (cvLength < 5) {
      return currentValue;
    }
    if (cvLength < 7) {
      return `${currentValue.slice(0, 4)}-${currentValue.slice(4)}`;
    }
    return `${currentValue.slice(0, 4)}-${currentValue.slice(
      4,
      6,
    )}-${currentValue.slice(6, 8)}`;
  }
  return '';
};
