import React from 'react';
import PropTypes from 'prop-types';
import { Errorstate as Wrapper } from './Block.styled';

const propTyps = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const Emptystate = ({ title, children, ...props }) => (
  <Wrapper {...props}>
    {title && <b className="title">{title}</b>}
    <p>{children}</p>
  </Wrapper>
);

Emptystate.propTypes = propTyps;

export default Emptystate;
