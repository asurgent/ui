import withButtonStyle from './withButtonStyle';
import * as Styles from './Button.styled';

const Primary = withButtonStyle({ style: Styles.Primary });
const Secondary = withButtonStyle({ style: Styles.Secondary });
const Hollow = withButtonStyle({ style: Styles.Hollow, isHollow: true });
const Plain = withButtonStyle({ style: Styles.Plain });
const Reject = withButtonStyle({ style: Styles.Reject });

export {
  Primary,
  Secondary,
  Hollow,
  Plain,
  Reject,
};
