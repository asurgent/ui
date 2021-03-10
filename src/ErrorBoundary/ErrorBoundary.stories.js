import React from 'react';
import ErrorBoundary from './index';

const Story = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  argTypes: {
    crash: { control: 'boolean' },
    children: { control: false },
    fallback: { control: false }
  },
};
export default Story;

const FaultyComponent = () => {
  throw new Error('Break');
};

const FallbackComponent = () => (
  <p>Im the fallback component that renders if a causes an error</p>
);

export const Fallback = (args) => (
  <ErrorBoundary fallback={<FallbackComponent />}>
    { args.crash && (<FaultyComponent />)}
    <p>I will render untill sibling fails</p>
  </ErrorBoundary>
);
Fallback.args = {
  crash: false
}
