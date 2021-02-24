import Tooltip from './Tooltip';
import Cards from './cards';
import withAllPositions from './hoc/withAllPositions';

const {
  Primary,
  Top,
  Middle,
  Left,
  Right,
} = withAllPositions('Tooltip')(Tooltip);

export {

  Middle,
  Right,
  Left,
  Primary,
  Top,
  Cards,
};
