import React from 'react';
import {
  withKnobs, boolean, text, number,
} from '@storybook/addon-knobs';
import {
  Dashboard, Explore, Comment, LibraryBooks,
} from '@material-ui/icons';
import CurrentUser from './index';

export const currentUser = () => (
  <div style={{ height: '100vh' }}>
    <CurrentUser
      selectedLanguage="sv"
      navigationList={[
        {
          label: 'Dashbaord', tooltip: 'Dashboard', active: true, icon: (<Dashboard fontSize="large" />),
        },
        { label: 'Explore', tooltip: 'Explore Environment', icon: (<Explore fontSize="large" />) },
        { label: 'Tickets', tooltip: 'View tickets', icon: (<Comment fontSize="large" />) },
        { label: 'Docs', tooltip: 'Documentation', icon: (<LibraryBooks fontSize="large" />) },
      ]}
      languages={[{ value: 'en', label: 'English' }, { value: 'sv', label: 'Swedish' }]}
      name="Kalle Anka"
      email="test@mail.com"
      onChangeLanguage={(lang) => console.log(lang)}
      onLogout={() => console.log('logout action')}
    />
  </div>
);

export default {
  title: 'Layout|Current User',
  decorators: [withKnobs],
};
