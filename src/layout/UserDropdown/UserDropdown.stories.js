import React from 'react';
import {
  withKnobs, boolean, text, number,
} from '@storybook/addon-knobs';
import UserDropdown from './index';


export const userDropdown = () => (
  <div style={{ height: '100vh' }}>
    <UserDropdown
      selectedLanguage="sv"
      languages={[{ value: 'en', label: 'English' }, { value: 'sv', label: 'Swedish' }]}
      name="Kalle Anka"
      email="test@mail.com"
    />
  </div>
);

export default {
  title: 'Layout|UserDropdown',
  decorators: [withKnobs],
};
