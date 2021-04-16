/* eslint-disable no-console */
import React, { useEffect } from 'react';
import {
  mdiCompass,
  mdiViewDashboard,
  mdiAndroidMessages,
  mdiTimerOutline,
  mdiExitRun,
  mdiAlienOutline,
} from '@mdi/js';
import * as Layout from '../index';
import * as Block from '../../Block';
import * as Modal from '../../Modal';
import * as Table from '../../Table';

const Story = {
  title: 'Layout/Layout',
  component: Layout.Main,
  argTypes: {
    provider: { control: false },
    children: { control: false },
  },
};
export default Story;

const navigationList = () => [
  {
    label: 'DashboardLabel',
    tooltip: 'DashboardTooltip',
    active: true,
    icon: mdiViewDashboard,
    link: '/dashboard',
  },
  {
    label: 'ExploreLabel',
    tooltip: 'ExploreTooltip',
    icon: mdiCompass,
    link: `/my-environment/${1234 || ''}`,
  },
  {
    label: 'TicketsLabel',
    tooltip: 'TicketsTooltip',
    icon: mdiAndroidMessages,
    link: '/tickets',
  },
  {
    label: 'Gå ut',
    tooltip: 'Gå ut',
    icon: mdiExitRun,
    link: '/irl',
    isDropdownItem: true,
  },
  {
    label: 'Aliens',
    tooltip: 'Aliens',
    icon: mdiAlienOutline,
    link: '/area51',
    isDropdownItem: true,
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
    onClick: () => console.log('create ticket'),
  },
  {
    title: 'Service window',
    description: 'setup a new service window',
    icon: (mdiTimerOutline),
    onClick: () => console.log('create ticket'),
  },
];

const MainLayoutTemplate = (args) => {
  const table = Table.useTableHook();
  const provider = Layout.useLayout({
    translator: (t) => t,
    navigationListConstructor: navigationList,
    avaliableLanguagesConstructor: avaliableLanguages,
    createListConstructor: createList,
    onLogout: () => console.log('Logout action'),
    onChangeLanguage: (lang) => console.log('Selected language', lang),
  });

  useEffect(() => {
    provider.setNavigationList(navigationList());
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
          { value: 'Mike(1133)', count: 123 },
          { value: 'Keen(123)', count: 123 },
          { value: 'Ellinor(4465)', count: 123 },
          { value: 'Anton(984)', count: 123 },
        ],
        pankaka: [
          { value: 'HeHe', count: 123 },
          { value: '123', count: 123 },
          { value: '4465', count: 123 },
          { value: '984', count: 123 },
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
            {...args}
          />
        </Block.Center>
        <Block.Center>
          <Modal.Primary {...args}>
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

export const MainLayout = MainLayoutTemplate.bind({});
MainLayout.args = {
  isOpen: false,
  withSearch: false,
};
