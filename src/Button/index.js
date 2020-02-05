import withButtonStyle from './hoc/withButtonStyle';
import Icon from './ButtonIcon';
import * as Styles from './Button.styled';

const Primary = withButtonStyle({ style: Styles.Primary });
const Secondary = withButtonStyle({ style: Styles.Secondary });
const Hollow = withButtonStyle({ style: Styles.Hollow, isHollow: true });
const Plain = withButtonStyle({ style: Styles.Plain });
const Reject = withButtonStyle({ style: Styles.Reject });
const Transparent = withButtonStyle({ style: Styles.Transparent });
const Link = withButtonStyle({ style: Styles.Link });
const Create = withButtonStyle({ style: Styles.Create });

Primary.displayName = '@asurgent.ui.Button.Primary';
Secondary.displayName = '@asurgent.ui.Button.Secondary';
Hollow.displayName = '@asurgent.ui.Button.Hollow';
Plain.displayName = '@asurgent.ui.Button.Plain';
Reject.displayName = '@asurgent.ui.Button.Reject';
Transparent.displayName = '@asurgent.ui.Button.Transparent';
Link.displayName = '@asurgent.ui.Button.Link';

export {
  Primary,
  Secondary,
  Hollow,
  Plain,
  Reject,
  Icon,
  Transparent,
  Link,
  Create,
};
