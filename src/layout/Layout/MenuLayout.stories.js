import React, { useEffect } from 'react';
import {
  withKnobs, boolean, text, number,
} from '@storybook/addon-knobs';
import Layout, { useLayout } from './index';
import { Omnibar, LeftActions, RightActions } from '../Omnibar';


export const mainLayout = () => {
  const provider = useLayout({
    user: {
      name: 'Test User',
      email: 'test@mail.com',
    },
    navigationList: [
      { label: 'Dashbaord', icon: (<i className="fas fa-stream" />) },
      { label: 'Notes', icon: (<i className="fas fa-th-large" />) },
      { label: 'Explore', icon: (<i className="fas fa-compass" />) },
      { label: 'Tickets', icon: (<i className="fas fa-comment-alt" />) },
      { label: 'Docs  ', icon: (<i className="fas fa-file-alt" />) },
    ],
    currentLangauge: 'sv',
    avaliableLanguages: [{ value: 'en', label: 'English' }, { value: 'sv', label: 'Swedish' }],
  });

  return (
    <Layout provider={provider}>
      <Omnibar>
        <LeftActions>LEFT</LeftActions>
        <RightActions>RIGHT</RightActions>
      </Omnibar>
      <h1>content</h1>
      <h1>content</h1>
      <h1>content</h1>
      <h1>content</h1>
      <h1>content</h1>
      <h1>content</h1>
      <h1>content</h1>
      <h1>content</h1>
      <h1>content</h1>
      <h1>content</h1>
      <h1>content</h1>
      <h1>content</h1>
      <h1>content</h1>
      <h1>content</h1>
      <h1>content</h1>
    </Layout>
  );
};

export default {
  title: 'Layout|Main',
  decorators: [withKnobs],
};
