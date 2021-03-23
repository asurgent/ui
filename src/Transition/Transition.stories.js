/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import * as Transitions from './index';

const Story = {
  title: 'Graphics/Transition',
  component: Transitions,
};
export default Story;

const content = <p>Hello</p>;

const FadeInTemplate = (args) => {
  const [hidden, setHidden] = useState(args.isVisible);
  useEffect(() => setHidden(args.isHidden), [args.isHidden]);

  return <Transitions.FadeIn isVisible={!hidden}>{content}</Transitions.FadeIn>;
};

export const FadeIn = FadeInTemplate.bind({});
FadeIn.args = {
  isHidden: false,
};

const FadeOutTemplate = (args) => {
  const [hidden, setHidden] = useState(args.isVisible);
  useEffect(() => setHidden(args.isHidden), [args.isHidden]);

  return (<Transitions.FadeOut isVisible={!hidden}>{content}</Transitions.FadeOut>);
};

export const FadeOut = FadeOutTemplate.bind({});
FadeOut.args = {
  isHidden: false,
};

const SlideDownTemplate = (args) => {
  const [hidden, setHidden] = useState(args.isVisible);
  useEffect(() => setHidden(args.isHidden), [args.isHidden]);

  return (<Transitions.FadeInSlideDown isVisible={!hidden}>{content}</Transitions.FadeInSlideDown>);
};

export const SlideDown = SlideDownTemplate.bind({});
SlideDown.args = {
  isHidden: false,
};

const SlideDownDesktipTemplate = (args) => {
  const [hidden, setHidden] = useState(args.isVisible);
  useEffect(() => setHidden(args.isHidden), [args.isHidden]);

  return (
    <Transitions.FadeInSlideDownOnDesktop
      isVisible={!hidden}
    >
      {content}
    </Transitions.FadeInSlideDownOnDesktop>
  );
};

export const SlideDownDesktop = SlideDownDesktipTemplate.bind({});
SlideDownDesktop.args = {
  isHidden: false,
};
