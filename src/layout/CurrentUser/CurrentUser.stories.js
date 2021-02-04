import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import MdiIcon from '@mdi/react';
import {
  mdiCompass,
  mdiViewDashboard,
  mdiAndroidMessages,
  mdiBookOpenVariant,
} from '@mdi/js';

import CurrentUser from './index';

export const currentUser = () => (
  <div style={{ height: '100vh', textAlign: 'center' }}>
    <p>Try in mobile view</p>

    <CurrentUser
      selectedLanguage="sv"
      navigationList={[
        {
          label: 'Dashbaord', tooltip: 'Dashboard', active: true, icon: (<MdiIcon path={mdiViewDashboard} size={1.4} />),
        },
        { label: 'Explore', tooltip: 'Explore Environment', icon: (<MdiIcon path={mdiCompass} size={1.4} />) },
        { label: 'Tickets', tooltip: 'View tickets', icon: (<MdiIcon path={mdiAndroidMessages} size={1.4} />) },
        { label: 'Docs', tooltip: 'Documentation', icon: (<MdiIcon path={mdiBookOpenVariant} size={1.4} />) },
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
