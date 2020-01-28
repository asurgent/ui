import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Icon from '@material-ui/icons';
import * as U from './CurrentUser.styled';
import * as UserImage from '../../UserImage';
import * as Button from '../../Button';

const defaultProps = {
  children: (() => {}),
};

const UserDropdown = ({
  name,
  email,
  children,
}) => {
  const [open, setOpen] = useState(false);


  return (
    <U.Wrapper>
      <U.Desktop>
        <UserImage.Circle
          size="3.2rem"
          name={name}
          email={email}
        />
        <U.Name>
          {name}
        </U.Name>
        <Button.Icon
          onClick={() => setOpen(!open)}
          icon={open ? <Icon.ExpandLess fontSize="large" /> : <Icon.ExpandMore fontSize="large" />}
        />
      </U.Desktop>
      <U.Mobile>
        <Button.Icon onClick={() => setOpen(!open)} icon={<Icon.Menu fontSize="large" />} />
      </U.Mobile>

      {open && (children({ onClose: () => { setOpen(false); } }))}

    </U.Wrapper>
  );
};

UserDropdown.defaultProps = defaultProps;

export default UserDropdown;
