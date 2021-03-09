import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { mdiViewDashboard } from '@mdi/js';
import DropdownCreate from './index';

export default {
  title: 'Layout|Dropdown create list',
  decorators: [withKnobs],
};

export const dropdownCreate = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ height: '100vh' }}>
      <button type="button" onClick={() => setOpen(true)}>Open</button>
      <DropdownCreate
        onClose={() => setOpen(false)}
        isOpen={open}
        createActionList={[
          {
            title: 'Ticket',
            description: 'create a new ticket',
            icon: (mdiViewDashboard),
            onClick: action('create ticket'),
          },
        ]}
      />
    </div>
  );
};
