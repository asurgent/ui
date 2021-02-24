import EntityTooltipCard from './EntityTooltipCard';
import withAllPositions from '../../hoc/withAllPositions';

const {
  Primary,
  Top,
  Middle,
  Left,
  Right,
} = withAllPositions('Tooltip')(EntityTooltipCard);

export {
  Primary,
  Top,
  Middle,
  Left,
  Right,
};
