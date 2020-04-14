import React from 'react';
import {
  withKnobs, boolean,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import * as Modal from './index';

export default { title: 'UI Components|Modal', decorators: [withKnobs] };

export const primaryModal = () => (
  <Modal.Primary
    isOpen={boolean('is open', true)}
    title="Modal Title"
    onClose={action('Close action')}
    withoutHeader={boolean('withoutHeader', false)}
  >
    <p>Hello</p>
  </Modal.Primary>
);
