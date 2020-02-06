import { darken } from 'polished';
import withMapProps from 'high-order-components/withMapProps';
import withStyle from './withStyle';
import * as C from './Button.styled';

const Primary = withStyle((theme) => ({
  backgroundColor: theme.blue400,
  borderColor: darken(0.08, theme.blue400),
  spinnerColor: theme.white,
}))(C.Button);

const Secondary = withStyle((theme) => ({
  backgroundColor: theme.gold800,
  borderColor: darken(0.05, theme.gold800),
  spinnerColor: theme.white,
}))(C.Button);

const Reject = withStyle((theme) => ({
  backgroundColor: theme.ruby400,
  borderColor: darken(0.08, theme.ruby400),
  spinnerColor: theme.white,
}))(C.Button);

const Create = withStyle((theme) => ({
  backgroundColor: '#13be69',
  borderColor: darken(0.08, '#13be69'),
  spinnerColor: theme.white,
}))(C.Button);

const Hollow = withStyle((theme) => ({
  backgroundColor: 'transparent',
  borderColor: theme.blue400,
  textColor: theme.blue400,
  spinnerColor: theme.blue400,
}))(C.Button);

const Transparent = withStyle((theme) => ({
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  textColor: theme.black,
  spinnerColor: theme.black,
}))(C.Button);

const Plain = withStyle()(C.Plain);
const Link = withStyle()(C.Link);
const mapper = ({
  icon,
  iconLeft,
  iconRight,
  mainIcon,
  ...rest
}) => ({ mainIcon: icon, ...rest });
const Icon = (withMapProps(mapper)(withStyle()(C.Icon)));

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
