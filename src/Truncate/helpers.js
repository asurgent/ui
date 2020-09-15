export const truncateStart = ({ string, maxLength }) => {
  if (string.length > maxLength) {
    return `${string.substr(0, maxLength)}...`;
  }
  return string;
};

export const truncateCenter = ({ string, maxLength }) => {
  if (string.length > maxLength) {
    const firstPart = string.substr(0, Math.ceil(maxLength / 2));
    const lastPart = string.slice(
      Math.ceil(string.length - maxLength / 2),
      string.length,
    );
    return `${firstPart}...${lastPart}`;
  }
  return string;
};

export const truncateEnd = ({ string, maxLength }) => {
  if (string.length > maxLength) {
    return `...${string.substr(string.length - maxLength, string.length)}`;
  }
  return string;
};
