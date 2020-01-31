import React from 'react';
import {
  withKnobs, boolean, text,
} from '@storybook/addon-knobs';
import * as Icon from '@material-ui/icons';
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
      onNavigate={() => { console.log('navigate'); }}
      withLabel={boolean('With labels', false)}
      navigationList={[
        {
          label: 'Dashbaord',
          tooltip: 'Dashboard',
          active: true,
          icon: (<Icon.Dashboard fontSize="large" />),
          link: '/',
          isActive: (match, location) => true,
        },
        {
          label: 'Explore', tooltip: 'Explore Environment', icon: (<Icon.Explore fontSize="large" />), link: '/test2',
        },
        {
          label: 'Tickets', tooltip: 'View tickets', icon: (<Icon.Comment fontSize="large" />), link: '/test3',
        },
        {
          label: 'Docs', tooltip: 'Documentation', icon: (<Icon.LibraryBooks fontSize="large" />), link: '/test4',
        },
      ]}
    />

  </div>
);

export default {
  title: 'Layout|Navigation',
  decorators: [withKnobs],
};
