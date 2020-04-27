import {
  Center,
  Left,
  Right,
  Bordered,
  Plain,
  SpaceBetween,
  Wrap,
} from './Block.styled';

Center.displayName = '@asurgent.ui.Block.Center';
Left.displayName = '@asurgent.ui.Block.Left';
Right.displayName = '@asurgent.ui.Block.Right';
Bordered.displayName = '@asurgent.ui.Block.Bordered';
Plain.displayName = '@asurgent.ui.Block.Plain';
SpaceBetween.displayName = '@asurgent.ui.Block.SpaceBetween';
Wrap.displayName = '@asurgent.ui.Block.Wrap';

export {
  Center,
  Left,
  Right,
  Bordered,
  Plain,
  SpaceBetween,
  Wrap,
};

export { default as Emptystate } from './BlockEmptyState';
export {
  ErrorMessage as Error,
  WarningMessage as Warning,
  InfoMessage as Info,
} from './BlockStatusMessage';
