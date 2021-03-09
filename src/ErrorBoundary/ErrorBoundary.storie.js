import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import ErrorBoundary from './index';

export default { title: 'UI Components|Error Boundary', decorators: [withKnobs] };

const FaulthyComponent = () => {
  throw new Error('Break');
};

const Fallback = () => (
  <p>Im the fallback component that renders if a causes an error</p>
);

export const fallback = () => (
  <ErrorBoundary fallback={<Fallback />}>
    { boolean('Cause component to crash', false) && (
      <FaulthyComponent />
    )}
    <p>I will render untill sibling fails</p>
  </ErrorBoundary>
);
