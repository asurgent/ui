import React from 'react';
import {
  withKnobs, boolean,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import * as Modal from './index';
import { Block, Button } from '../index';

export default { title: 'UI Components|Modal', decorators: [withKnobs] };

export const primaryModal = () => (
  <Modal.Primary
    isOpen={boolean('is open', true)}
    fullscreen={boolean('fullscreen', false)}
    withActionbar={boolean('withActionbar', false)}
    title="Modal Title"
    onClose={action('Close action')}
    withoutHeader={boolean('withoutHeader', false)}
  >
    <p>Hello</p>
    <Modal.Actionbar>
      <Block.Right>
        <Button.Primary>
          Next
        </Button.Primary>
      </Block.Right>
    </Modal.Actionbar>
  </Modal.Primary>
);
