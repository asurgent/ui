import React, { useEffect } from 'react';
import {
  withKnobs, boolean, text, number,
} from '@storybook/addon-knobs';
import * as Icons from '@material-ui/icons';
import { Main, useLayout } from './index';
import { Omnibar, LeftActions, RightActions } from '../Omnibar';

const navigationList = (t, customerId) => [
  {
    label: t('linkDashboardLabel'),
    tooltip: t('linkDashboardTooltip'),
    active: true,
    icon: (<Icons.Dashboard fontSize="large" />),
    link: '/dashboard',
  },
  {
    label: t('linkExploreLabel'),
    tooltip: t('linkExploreTooltip'),
    icon: (<Icons.Explore fontSize="large" />),
    link: `/my-environment/${customerId || ''}`,
  },
  {
    label: t('linkTicketsLabel'),
    tooltip: t('linkTicketsTooltip'),
    icon: (<Icons.Comment fontSize="large" />),
    link: '/tickets',
  },
];

const avaliableLanguages = (translator, selected) => [
  { value: 'en', label: translator('english'), default: selected === 'en' },
  { value: 'sv', label: translator('swedish'), default: selected === 'sv' },
];

export const mainLayout = () => {
  const provider = useLayout({
    translator: (t) => t,
    navigationListConstructor: navigationList,
    avaliableLanguagesConstructor: avaliableLanguages,
    onLogout: () => { console.log('Logout action'); },
    onChangeLanguage: (lang) => { console.log(`Selected language: ${lang}`); },
  });

  useEffect(() => {
    provider.setCurrentLanguage('sv');
    provider.setCustomerId('123');
    provider.setUser({
      name: 'Test',
      email: 'test@mail.com',
      imageLink: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    });
  }, []);

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
