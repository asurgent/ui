import React from 'react';
import { darken } from 'polished';
import MdiIcon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
import withMapProps from '../../high-order-components/withMapProps';

// import withStyle from './withStyle';
import * as C from './Button.styled';
const Primary = C.Button;
/* 
withStyle((theme) => ({
  backgroundColor: theme.blue900,
  borderColor: darken(0.08, theme.blue900),
  spinnerColor: theme.white,
}))(); 
*/

/* 

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

const Accept = withStyle((theme) => ({
  backgroundColor: theme.green400,
  borderColor: darken(0.08, theme.green400),
  spinnerColor: theme.white,
}))(C.Button);

const Create = withStyle((theme) => ({
  backgroundColor: theme.blue900,
  borderColor: theme.blue900,
  spinnerColor: theme.white,
}))(C.Button);

const Hollow = withStyle((theme) => ({
  backgroundColor: 'transparent',
  borderColor: theme.blue900,
  textColor: theme.blue900,
  spinnerColor: theme.blue900,
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

const filterPropsMapper = (props) => ({
  iconRight: (<MdiIcon path={mdiChevronDown} size={1.2} />),
  ...props,
});
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
const Icon = (withMapProps(iconPropsMapper)(withStyle()(C.Icon))); */
const Plain = C.Plain;
/* const Link = withStyle()(C.Link); */

 Primary.displayName = '@asurgent.ui.Button.Primary';
 /*
Accept.displayName = '@asurgent.ui.Button.Primary';
Secondary.displayName = '@asurgent.ui.Button.Secondary';
Hollow.displayName = '@asurgent.ui.Button.Hollow'; */
Plain.displayName = '@asurgent.ui.Button.Plain';
/* Reject.displayName = '@asurgent.ui.Button.Reject';
Transparent.displayName = '@asurgent.ui.Button.Transparent';
Link.displayName = '@asurgent.ui.Button.Link';
Pill.displayName = '@asurgent.ui.Button.Pill'; */

export {
/*   withStyle,
 
  Secondary,
  Hollow, */
  Primary,
  Plain,
 /*  Reject,
  Accept,
  Icon,
  Transparent,
  Link,
  Create,
  Filter,
  Pill,
  CreateBlock,
  Stretched, */
};
