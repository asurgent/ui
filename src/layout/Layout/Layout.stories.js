import React, { useEffect } from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import * as Icons from '@material-ui/icons';
import { Main, useLayout } from './index';
import * as Block from '../../Block';
import * as Modal from '../../Modal';
import * as Table from '../../Table';
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

const createList = (translator, selected) => [
  {
    title: 'Ticket',
    description: 'create a new ticket',
    icon: (Icons.ConfirmationNumber),
    onClick: () => {
      console.log('create ticket');
    },
  },
  {
    title: 'Service window',
    description: 'setup a new service window',
    icon: (Icons.Timer),
    onClick: () => {
      console.log('create ticket');
    },
  },
];

export const mainLayout = () => {
  const table = Table.useTableHook();
  const provider = useLayout({
    translator: (t) => t,
    navigationListConstructor: navigationList,
    avaliableLanguagesConstructor: avaliableLanguages,
    createListConstructor: createList,
    onLogout: () => { console.log('Logout action'); },
    onChangeLanguage: (lang) => { console.log(`Selected language: ${lang}`); },
  });

  useEffect(() => {
    provider.setCurrentLanguage('sv');
    provider.setCustomerId('123');
    provider.setCustomerName('asurgent');
    provider.setUser({
      name: 'Test',
      email: 'test@mail.com',
      imageLink: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
      isAdmin: true,
    });

    table.registerRowFetchCallback((payload, onSuccess, onFail) => {
      const rowDummyData = Array.from({ length: 15 }, () => ({
        valueA: 'Cell 1',
        valueB: 'Cell 2',
        valueC: 'Cell 3',
        valueD: 'Cell 4',
      }));
      onSuccess({ result: [...rowDummyData], page: 2, total_pages: 20 });
    });

    table.registerFilterFetchCallback((payload, onSuccess, onFail) => {
      onSuccess({
        guys: [
          { value: 'Mike(1133)' },
          { value: 'Keen(123)' },
          { value: 'Ellinor(4465)' },
          { value: 'Anton(984)' },
        ],
        pankaka: [
          { value: 'HeHe' },
          { value: '123' },
          { value: '4465' },
          { value: '984' },
        ],
      });
    });
    table.parentReady();
  }, []);


  return (
    <Main provider={provider}>
      <Omnibar>
        <Table.Controlls
          tableHook={table}
          withFilter={[
            { label: 'Guys', facetKey: 'guys', excludeable: true },
            { label: 'Pankaka', facetKey: 'pankaka', excludeable: false },
          ]}
          withSort={[
            { value: 'created', label: 'Created' },
            {
              value: 'modified', label: 'Modified', default: true, direction: 'asc',
            },
            { value: 'closed', label: 'Closed' },
            { value: 'due', label: 'Due' },
          ]}
        />
      </Omnibar>
      <Block.Center>
        <Table.Main
          withHeader
          useHistoryState
          historyStatePrefix="tickets"
          tableHook={table}
          withSearch={false}
          headerData={[
            {
              value: 'Cell 1',
              sortKey: 'sort-A',
              size: 'minmax(30rem, 1fr)',
            },
            { value: 'B', sortKey: 'sort-B' },
            { value: 'C', sortKey: 'sort-C', render: false },
            {
              value: 'D',
              sortKey: 'sort-D',
              size: 'minmax(8rem, 10rem)',
            },
          ]}
          columnConfiguration={(row) => {
            const {
              valueA, valueB, valueC, valueD,
            } = row;

            return [
              { value: valueB },
              valueA,
              () => valueC,
              () => ({ value: valueD, props: { style: { background: 'transparent' } } }),
            ];
          }}
        />
      </Block.Center>
      <Block.Center>
        <Modal.Primary isOpen={boolean('open', false)}>
          hello
        </Modal.Primary>
        <img src="https://i.picsum.photos/id/270/1000/1000.jpg" />
      </Block.Center>
    </Main>
  );
};

export default {
  title: 'Layout|Main',
  decorators: [withKnobs],
};
