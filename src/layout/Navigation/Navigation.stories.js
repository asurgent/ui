import React from 'react';
import {
  withKnobs, boolean, text, number,
} from '@storybook/addon-knobs';
import {
  Dashboard, Explore, Comment, LibraryBooks,
} from '@material-ui/icons';
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
      withLabel={boolean('With labels', false)}
      navigationList={[
        {
          label: 'Dashbaord', tooltip: 'Dashboard', active: true, icon: (<Dashboard fontSize="large" />), link: '/test',
        },
        {
          label: 'Explore', tooltip: 'Explore Environment', icon: (<Explore fontSize="large" />), link: '/test',
        },
        {
          label: 'Tickets', tooltip: 'View tickets', icon: (<Comment fontSize="large" />), link: '/test',
        },
        {
          label: 'Docs', tooltip: 'Documentation', icon: (<LibraryBooks fontSize="large" />),
        },
      ]}
    />

  </div>
);

export default {
  title: 'Layout|Navigation',
  decorators: [withKnobs],
};
