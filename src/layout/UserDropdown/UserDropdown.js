
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as U from './UserDropdown.styled';
import * as UserImage from '../../UserImage';
import * as Button from '../../Button';
import * as Form from '../../Form';
import * as Shield from '../../Shield';

const parseLangauges = (langList, selectedLanguage) => langList
  .reduce((acc, item) => {
    if (item.value === selectedLanguage) {
      Object.assign(item, { default: true });
    }

    return [...acc, item];
  }, []);

const UserDropdown = ({
  name,
  email,
  languages,
  selectedLanguage,
}) => {
  const [open, setOpen] = useState(false);

  const langaugeForm = Form.useFormBuilder({
    selectLanguage: {
      type: 'select',
      label: 'Language',
      options: parseLangauges(languages, selectedLanguage),
    },
  });


  return (
    <U.Wrapper>
      <UserImage.Circle
        size="3.2rem"
        name="Kalle Anka"
        email={email}
      />
      <U.Name>
        {name}
      </U.Name>
      <Button.Icon onClick={() => setOpen(!open)} icon={<i className={`fas fa-angle-${open ? 'up' : 'down'}`} />} />
      {open && (
        <Shield.Dark onClick={() => setOpen(false)}>
          <U.Menu>
            <p>{name}</p>
            <p>{email}</p>

            <Form.Primary
              form={langaugeForm}
              onSubmit={(values) => {
                console.log(values);
              }}
            />

            <U.Logout>
              <Button.Plain iconLeft={<i className="fas fa-sign-out-alt" />}>
              Sign out
              </Button.Plain>

            </U.Logout>
          </U.Menu>
        </Shield.Dark>
      )}

    </U.Wrapper>
  );
};

export default UserDropdown;
