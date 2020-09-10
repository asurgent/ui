import React from 'react';
import { darken } from 'polished';
import withMapProps from 'high-order-components/withMapProps';
import ExpandMore from '@material-ui/icons/ExpandMore';
import withStyle from './withStyle';
import * as C from './Button.styled';

const Primary = withStyle((theme) => ({
  backgroundColor: theme.blue900,
  borderColor: darken(0.08, theme.blue900),
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
  backgroundColor: theme.blue900,
  borderColor: theme.blue900,
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

const Pill = withStyle((theme) => ({
  textColor: theme.black,
  spinnerColor: theme.black,
}))(C.Pill);

const filterPropsMapper = (props) => ({ iconRight: <ExpandMore />, ...props });
const Filter = withMapProps(filterPropsMapper)(withStyle(() => ({
  backgroundColor: '#eff3f6',
  borderColor: darken(0.1, '#eff3f6'),
  textColor: '#24292e',
}))(C.Filter));

const CreateBlock = withStyle((theme) => ({
  textColor: theme.blue900,
  spinnerColor: theme.blue900,
}))(C.CreateBlock);

const Stretched = withStyle((theme) => ({
  textColor: theme.blue900,
  spinnerColor: theme.blue900,
}))(C.Stretched);

const iconPropsMapper = ({
  icon,
  iconLeft,
  iconRight,
  mainIcon,
  ...rest
}) => ({ mainIcon: icon, ...rest });
const Icon = (withMapProps(iconPropsMapper)(withStyle()(C.Icon)));
const Plain = withStyle()(C.Plain);
const Link = withStyle()(C.Link);

Primary.displayName = '@asurgent.ui.Button.Primary';
Secondary.displayName = '@asurgent.ui.Button.Secondary';
Hollow.displayName = '@asurgent.ui.Button.Hollow';
Plain.displayName = '@asurgent.ui.Button.Plain';
Reject.displayName = '@asurgent.ui.Button.Reject';
Transparent.displayName = '@asurgent.ui.Button.Transparent';
Link.displayName = '@asurgent.ui.Button.Link';
Link.displayName = '@asurgent.ui.Button.Pill';

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
  Filter,
  Pill,
  CreateBlock,
  Stretched,
};
