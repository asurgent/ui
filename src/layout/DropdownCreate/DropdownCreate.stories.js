import React from 'react';
import { mdiViewDashboard } from '@mdi/js';
import DropdownCreate from './index';

const Story = {
  title: 'Layout/Dropdown Create',
  component: DropdownCreate,
  argTypes: {},
};
export default Story;

const DropdownCreateTemplate = (args) => (
  <div style={{ height: '100vh' }}>
    <DropdownCreate
      createActionList={[
        {
          title: 'Ticket',
          description: 'create a new ticket',
          icon: (mdiViewDashboard),
          /* eslint-disable no-console */
          onClick: () => console.log('create ticket'),
        },
      ]}
      {...args}
    />
  </div>
);

export const Dropdown = DropdownCreateTemplate.bind({});
Dropdown.args = {
  isOpen: true,
};
