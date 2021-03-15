import React from 'react';
import MdiIcon from '@mdi/react';
import {
  mdiCompass,
  mdiViewDashboard,
  mdiAndroidMessages,
  mdiBookOpenVariant,
} from '@mdi/js';

import CurrentUser from './index';


const Story = {
  title: 'Layout/Current User',
  component: CurrentUser,
  argTypes: {},
};
export default Story;

const UserTemplate = (args) => {
  return (
    <div style={{ height: '100vh', textAlign: 'center' }}>
      <p>Try in mobile view</p>
      <CurrentUser
        navigationList={[
          {
            label: 'Dashbaord', tooltip: 'Dashboard', active: true, icon: (<MdiIcon path={mdiViewDashboard} size={1.4} />),
          },
          { label: 'Explore', tooltip: 'Explore Environment', icon: (<MdiIcon path={mdiCompass} size={1.4} />) },
          { label: 'Tickets', tooltip: 'View tickets', icon: (<MdiIcon path={mdiAndroidMessages} size={1.4} />) },
          { label: 'Docs', tooltip: 'Documentation', icon: (<MdiIcon path={mdiBookOpenVariant} size={1.4} />) },
        ]}
        onChangeLanguage={(lang) => console.log('Changed language', lang)}
        onLogout={() => console.log('logout action')}
        {...args}
      />
    </div>
  )
}

export const User = UserTemplate.bind({});
User.args = {
  selectedLanguage: "sv",
  languages: [{ value: 'en', label: 'English' }, { value: 'sv', label: 'Swedish' }],
  name: "Kalle Anka",
  customerName: "Google",
  email: "test@mail.com"
}
