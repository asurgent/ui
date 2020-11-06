import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import * as Icon from '@material-ui/icons';
import * as List from './index';
import * as Button from '../Button/index';

export default { title: 'UI Components|List', decorators: [withKnobs] };

export const primaryList = () => (
  <>
    <List.Primary
      rows={[
        false && { label: 'Label', value: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello' },
        { label: 'Label', value: 'Hello' },
        { label: 'Label', value: 'Hello' },
        { label: 'Label', value: '' },
        { label: 'Label 123123', value: 'Hello' },
        { label: 'Label value 0', value: 0 },
        { label: 'Label value []', value: [] },
        { label: 'Label value {}', value: {} },
        { label: 'Label value null', value: null },
        { label: 'Label value undefined', value: undefined },

        { row: (<Button.Stretched link="/asd/123" iconRight={<Icon.ArrowForward fontSize="large" />}>Next</Button.Stretched>) },
      ]}
    />
  </>
);
