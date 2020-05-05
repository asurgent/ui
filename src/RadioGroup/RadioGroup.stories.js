
import React, { useState } from 'react';
import {
  withKnobs, boolean,
} from '@storybook/addon-knobs';
import * as RadioGroup from './index';

export default { title: 'UI Components|Radio Group', decorators: [withKnobs] };

export const radioGroup = () => {
  const [someBoolTrue, setSomeBoolTrue] = useState(false);
  const options = [
    {
      label: 'opt1',
      checked: someBoolTrue,
      onChange: () => setSomeBoolTrue(!someBoolTrue),
    },
    {
      label: 'opt2',
      checked: !someBoolTrue,
      onChange: () => setSomeBoolTrue(!someBoolTrue),
    },
  ];

  return <RadioGroup.Primary options={options} wrapRadios={boolean('Wrap radios', false)} />;
};


radioGroup.story = {
  name: 'Radio Group',
};
