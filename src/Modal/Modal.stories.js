
import React from 'react';
import {
  withKnobs, boolean,
} from '@storybook/addon-knobs';
import * as Modal from './index';

export default { title: 'UI Components|Modal', decorators: [withKnobs] };

export const primaryModal = () => (
  <>
    <Modal.Primary
      isOpen={boolean('is open', true)}
      title="Modal Title"
      onClose={() => console.log('Close action')}
      withoutHeader={boolean('withoutHeader', false)}
    >
      <p>Hello</p>
    </Modal.Primary>
  </>
);
