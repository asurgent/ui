import React from 'react';
import {
  withKnobs, boolean, text,
} from '@storybook/addon-knobs';
import MdiIcon from '@mdi/react';
import {
  mdiCompass,
  mdiViewDashboard,
  mdiAndroidMessages,
  mdiFileDocumentOutline,
} from '@mdi/js';
import { action } from '@storybook/addon-actions';
import Navigation from './index';

export const navigation = () => (
  <div style={{ height: '100vh', background: '#1A77A5', padding: '2rem' }}>

    <Navigation
      theme={({ white, blue800 }) => ({
        activeBackground: text('theme-override | activeBackground', blue800),
        activeLinkColor: text('theme-override | activeLinkColor', white),
        linkColor: text('theme-override | linkColor', white),
        menuItemsSpacing: text('theme-override | menuItemsSpacing', '.4rem'),
        menuFontSize: text('theme-override | menuFontSize', '1.6rem'),
      })}
      onNavigate={action('navigate')}
      withLabel={boolean('With labels', false)}
      navigationList={[
        {
          label: 'Dashbaord',
          tooltip: 'Dashboard',
          active: true,
          icon: (<MdiIcon path={mdiViewDashboard} size={1.4} />),
          link: '/',
          // isActive => (match, location)
          isActive: () => true,
        },
        {
          label: 'Explore', tooltip: 'Explore Environment', icon: (<MdiIcon path={mdiCompass} size={1.4} />), link: '/test2',
        },
        {
          label: 'Tickets', tooltip: 'View tickets', icon: (<MdiIcon path={mdiAndroidMessages} size={1.4} />), link: '/test3',
        },
        {
          label: 'Docs', tooltip: 'Documentation', icon: (<MdiIcon path={mdiFileDocumentOutline} size={1.4} />), link: '/test4',
        },
      ]}
    />

  </div>
);

export default {
  title: 'Layout|Navigation',
  decorators: [withKnobs],
};
