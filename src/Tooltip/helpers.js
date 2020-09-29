export const positions = {
  middle: 'middle',
  right: 'right',
  left: 'left',
};

export const getCoordinates = ({ position, ref }) => {
  const {
    x, top, height, width,
  } = ref.current.getBoundingClientRect();

  const spacing = 5;

  if (position === positions.right) {
    return { left: x + width + spacing, top: top + (height / 2) };
  } if (position === positions.left) {
    return { left: x - spacing, top: top + (height / 2) };
  }
  // Middle
  return { left: x + (width / 2), top: top + height + spacing };
};
