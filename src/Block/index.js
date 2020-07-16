import {
  Center,
  Left,
  Right,
  Bordered,
  Plain,
  SpaceBetween,
  Stretch,
  Wrap,
  WrapGrid,
} from './Block.styled';

Center.displayName = '@asurgent.ui.Block.Center';
Left.displayName = '@asurgent.ui.Block.Left';
Right.displayName = '@asurgent.ui.Block.Right';
Bordered.displayName = '@asurgent.ui.Block.Bordered';
Plain.displayName = '@asurgent.ui.Block.Plain';
SpaceBetween.displayName = '@asurgent.ui.Block.SpaceBetween';
Stretch.displayName = '@asurgent.ui.Block.Stretch';
Wrap.displayName = '@asurgent.ui.Block.Wrap';
WrapGrid.displayName = '@asurgent.ui.Block.WrapGrid';

export {
  Center,
  Left,
  Right,
  Bordered,
  Plain,
  SpaceBetween,
  Stretch,
  Wrap,
  WrapGrid,
};

export { default as Emptystate } from './BlockEmptyState';
export { default as SubnavigationBlock } from './SubnavigationBlock';
export {
  ErrorMessage as Error,
  WarningMessage as Warning,
  InfoMessage as Info,
} from './BlockStatusMessage';
