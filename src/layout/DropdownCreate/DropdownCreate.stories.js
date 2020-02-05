import React, { useState, useEffect } from 'react';
import {
  withKnobs, boolean, text, number,
} from '@storybook/addon-knobs';
import {
  Dashboard, Explore, Comment, LibraryBooks,
} from '@material-ui/icons';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';
import DropdownCreate from './index';


const Translate = styled.div`
    transition: 0.5000s;
    position: absolute;
    transform: translateY(
      ${({ state }) => (state === 'entering' || state === 'entered' ? 10 : 0)}px
    );
    opacity: ${({ state }) => {
    switch (state) {
      case 'entering':
        return 1;
      case 'entered':
        return 1;
      case 'exiting':
        return 0;
      case 'exited':
        return 0;
      default:
        return 0;
    }
  }};
`;

const FadeDown = ({ translate, children }) => (
  <Transition timeout={500} in={translate}>
    {(state) => (
      <Translate state={state}>
        { state !== 'exited' && children}
      </Translate>
    )}
  </Transition>
);


export const dropdownCreate = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ height: '100vh' }}>
      <button onClick={() => setOpen(true)}>Open</button>
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
