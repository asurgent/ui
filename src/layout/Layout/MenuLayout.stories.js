import React, { useEffect } from 'react';
import {
  withKnobs, boolean, text, number,
} from '@storybook/addon-knobs';
import {
  Dashboard, Explore, Comment, LibraryBooks,
} from '@material-ui/icons';
import { Main, useLayout } from './index';
import { Omnibar, LeftActions, RightActions } from '../Omnibar';

export const mainLayout = () => {
  const provider = useLayout({
    user: {
      name: 'Test User',
      email: 'test@mail.com',
    },
    navigationList: [
      {
        label: 'Dashbaord', tooltip: 'Dashbaord', active: true, icon: (<Dashboard fontSize="large" />), link: '/test',
      },
      {
        label: 'Explore', tooltip: 'Explore', icon: (<Explore fontSize="large" />), link: '/test',
      },
      {
        label: 'Tickets', tooltip: 'Tickets', icon: (<Comment fontSize="large" />), link: '/test',
      },
      {
        label: 'Docs', tooltip: 'Docs', icon: (<LibraryBooks fontSize="large" />), link: '/test',
      },
    ],
    currentLangauge: 'sv',
    avaliableLanguages: [{ value: 'en', label: 'English' }, { value: 'sv', label: 'Swedish' }],
    onLogout: () => { console.log('Logout action'); },
    onChangeLanguage: (lang) => { console.log(`Selected language: ${lang}`); },
  });

  return (
    <Main provider={provider}>
      <Omnibar>
        <LeftActions>LEFT</LeftActions>
        <RightActions>RIGHT</RightActions>
      </Omnibar>
      <h1>Random image</h1>
      <img src="https://i.picsum.photos/id/270/1000/1000.jpg" />
    </Main>
  );
};

export default {
  title: 'Layout|Main',
  decorators: [withKnobs],
};
