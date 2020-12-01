import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import {
  Dashboard, Explore, Comment, LibraryBooks,
} from '@material-ui/icons';
import CurrentUser from './index';

export const currentUser = () => (
  <div style={{ height: '100vh', textAlign: 'center' }}>
    <p>Try in mobile view</p>

    <CurrentUser
      selectedLanguage="sv"
      navigationList={[
        {
          label: 'Dashbaord', tooltip: 'Dashboard', active: true, icon: (<Dashboard fontSize="large" />),
        },
        { label: 'Explore', tooltip: 'Explore Environment', icon: (<Explore fontSize="large" />) },
        { label: 'Tickets', tooltip: 'View tickets', icon: (<TicketIcon fontSize="large" />) },
        { label: 'Docs', tooltip: 'Documentation', icon: (<LibraryBooks fontSize="large" />) },
      ]}
      languages={[{ value: 'en', label: 'English' }, { value: 'sv', label: 'Swedish' }]}
      name="Kalle Anka"
      customerName="Google"
      email="test@mail.com"
      onChangeLanguage={(lang) => action()('Changed language', lang)}
      onLogout={action('logout action')}
    />
  </div>
);

export default {
  title: 'Layout|Current User',
  decorators: [withKnobs],
};
