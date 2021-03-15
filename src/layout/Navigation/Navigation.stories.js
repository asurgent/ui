/* eslint-disable no-console */
import React from 'react';
import {
  mdiCompass,
  mdiViewDashboard,
  mdiAndroidMessages,
  mdiFileDocumentOutline,
} from '@mdi/js';
import Navigation from './index';

const Story = {
  title: 'Layout/Navigation',
  component: Navigation,
  argTypes: {
    activeBackground: { control: 'color' },
    activeLinkColor: { control: 'color' },
    linkColor: { control: 'color' },
  },
};
export default Story;

const NavigationTemplate = (args) => (
  <div style={{ height: '100vh', background: '#1A77A5', padding: '2rem' }}>

    <Navigation
      theme={({ white, blue800 }) => ({
        activeBackground: args.activeBackground || blue800,
        activeLinkColor: args.activeLinkColor || white,
        linkColor: args.linkColor || white,
        menuItemsSpacing: '.4rem',
        menuFontSize: '1.6rem',
      })}
      navigationList={[
        {
          label: 'Dashbaord',
          tooltip: 'Dashboard',
          active: true,
          icon: mdiViewDashboard,
          link: '/',
          // isActive => (match, location)
          isActive: () => true,
        },
        {
          label: 'Explore', tooltip: 'Explore Environment', icon: mdiCompass, link: '/test2',
        },
        {
          label: 'Tickets', tooltip: 'View tickets', icon: mdiAndroidMessages, link: '/test3',
        },
        {
          label: 'Docs', tooltip: 'Documentation', icon: mdiFileDocumentOutline, link: '/test4',
        },
      ]}
      {...args}
    />

  </div>
);

export const NavigationStory = NavigationTemplate.bind({});
NavigationStory.args = {
  onNavigate: () => console.log('navigated'),
  withLabel: false,
  activeBackground: '#9adcde',
  activeLinkColor: '#8fa9fd',
  linkColor: '#fead55',
};
