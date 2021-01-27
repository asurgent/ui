import React, { useEffect } from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import MdiIcon from '@mdi/react';
import {
  mdiCompass,
  mdiViewDashboard,
  mdiAndroidMessages,
  mdiTimerOutline,
} from '@mdi/js';
import * as Layout from '../index';
import * as Block from '../../Block';
import * as Modal from '../../Modal';
import * as Table from '../../Table';

const navigationList = (t, customerId) => [
  {
    label: t('linkDashboardLabel'),
    tooltip: t('linkDashboardTooltip'),
    active: true,
    icon: (<MdiIcon path={mdiViewDashboard} size={1.4} />),
    link: '/dashboard',
  },
  {
    label: t('linkExploreLabel'),
    tooltip: t('linkExploreTooltip'),
    icon: (<MdiIcon path={mdiCompass} size={1.4} />),
    link: `/my-environment/${customerId || ''}`,
  },
  {
    label: t('linkTicketsLabel'),
    tooltip: t('linkTicketsTooltip'),
    icon: (<MdiIcon path={mdiAndroidMessages} size={1.4} />),
    link: '/tickets',
  },
];

const avaliableLanguages = (translator, selected) => [
  { value: 'en', label: translator('english'), default: selected === 'en' },
  { value: 'sv', label: translator('swedish'), default: selected === 'sv' },
];

// createList = (translator, selected) =>
const createList = () => [
  {
    title: 'Ticket',
    description: 'create a new ticket',
    icon: (mdiAndroidMessages),
    onClick: action('create ticket'),
  },
  {
    title: 'Service window',
    description: 'setup a new service window',
    icon: (mdiTimerOutline),
    onClick: action('create ticket'),
  },
];

export const mainLayout = () => {
  const table = Table.useTableHook();
  const provider = Layout.useLayout({
    translator: (t) => t,
    navigationListConstructor: navigationList,
    avaliableLanguagesConstructor: avaliableLanguages,
    createListConstructor: createList,
    onLogout: action('Logout action'),
    onChangeLanguage: (lang) => action('Selected language')(lang),
  });

  useEffect(() => {
    provider.setCurrentLanguage('sv');
    provider.setCustomerId('1234');
    provider.setCustomerName('Asurgent AB');
    provider.setUser({
      name: 'Steve Martin',
      email: 'steve.martin@asurgent.com',
      imageLink: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
      isAdmin: true,
    });

    //  registerRowFetchCallback => (payload, onSuccess, onFail)
    table.registerRowFetchCallback((payload, onSuccess) => {
      const rowDummyData = Array.from({ length: 15 }, () => ({
        valueA: 'Cell 1',
        valueB: 'Cell 2',
        valueC: 'Cell 3',
        valueD: 'Cell 4',
      }));
      onSuccess({ result: [...rowDummyData], page: 2, total_pages: 20 });
    });

    // registerFilterFetchCallback => (payload, onSuccess, onFail)
    table.registerFilterFetchCallback((payload, onSuccess) => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout.Main provider={provider}>
      <Layout.Omnibar.Main>
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
      </Layout.Omnibar.Main>
      <Layout.Scene>
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
        </Block.Center>
        <Block.Center>
          <Table.Pagination tableHook={table} />
        </Block.Center>
      </Layout.Scene>
    </Layout.Main>

  );
};

export default {
  title: 'Layout|Main',
  decorators: [withKnobs],
};
