/* eslint-disable no-console */

import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Dashboard } from '@material-ui/icons';
import DropdownCreate from './index';


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
            icon: (Dashboard),
            onClick: () => {
              console.log('create ticket');
            },
          },
        ]}
      />
    </div>
  );
};

export default {
  title: 'Layout|Dropdown create list',
  decorators: [withKnobs],
};
