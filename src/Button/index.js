import ButtonStyleProxy from './ButtonStyleProxy';
import Icon from './ButtonIcon';
import * as Styles from './Button.styled';

const Primary = ButtonStyleProxy({ style: Styles.Primary });
const Secondary = ButtonStyleProxy({ style: Styles.Secondary });
const Hollow = ButtonStyleProxy({ style: Styles.Hollow, isHollow: true });
const Plain = ButtonStyleProxy({ style: Styles.Plain });
const Reject = ButtonStyleProxy({ style: Styles.Reject });
const Transparent = ButtonStyleProxy({ style: Styles.Transparent });

Primary.displayName = '@asurgent.ui.Button.Primary';
Secondary.displayName = '@asurgent.ui.Button.Secondary';
Hollow.displayName = '@asurgent.ui.Button.Hollow';
Plain.displayName = '@asurgent.ui.Button.Plain';
Reject.displayName = '@asurgent.ui.Button.Reject';
Transparent.displayName = '@asurgent.ui.Button.Transparent';

export {
  Primary,
  Secondary,
  Hollow,
  Plain,
  Reject,
  Icon,
  Transparent,
};
