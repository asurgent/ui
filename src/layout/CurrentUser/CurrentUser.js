import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiChevronDown, mdiMenu } from '@mdi/js';
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
        <Button.Plain onClick={() => setOpen(!open)}>
          <UserImage.Circle
            size="2rem"
            name={name}
            email={email}
            href={imageLink}
          />
          <U.Name>
            <b>{name}</b>
            <small>{customerName}</small>
          </U.Name>
          <Button.Icon
            style={{ margin: '0 0.25rem' }}
            icon={(
              <MdiIcon
                size={1.4}
                path={mdiChevronDown}
                rotate={open ? 180 : 0}
              />
            )}
          />
        </Button.Plain>
      </U.Desktop>
      <U.Mobile>
        <Button.Icon
          onClick={() => setOpen(true)}
          icon={(
            <MdiIcon
              size={1.2}
              path={mdiMenu}
              rotate={open ? 180 : 0}
            />
            )}
        />
      </U.Mobile>
      {(children({ isOpen: open, onClose: () => { setOpen(false); } }))}
    </U.Wrapper>
  );
};

UserDropdown.propTypes = propTypes;
UserDropdown.defaultProps = defaultProps;

export default UserDropdown;
