import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Icon from '@material-ui/icons';
import * as U from './CurrentUser.styled';
import * as UserImage from '../../UserImage';
import * as Button from '../../Button';

const propTypes = {
  children: PropTypes.func,
  imageLink: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  customerName: PropTypes.string,
};

const defaultProps = {
  children: (() => {}),
  imageLink: '',
  name: '',
  email: '',
  customerName: '',
};

const UserDropdown = ({
  name,
  email,
  imageLink,
  children,
  customerName,
}) => {
  const [open, setOpen] = useState(false);


  return (
    <U.Wrapper>
      <U.Desktop>
        <UserImage.Circle
          size="3.2rem"
          name={name}
          email={email}
          href={imageLink}
        />
        <U.Name>
          <b>{name}</b>
          <small>{customerName}</small>
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

UserDropdown.propTypes = propTypes;
UserDropdown.defaultProps = defaultProps;
UserDropdown.displayName = '@asurgent.ui.layout.UserDropdown';

export default UserDropdown;
