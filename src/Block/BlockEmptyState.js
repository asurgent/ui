import React from 'react';
import PropTypes from 'prop-types';
import IconNoTickets from '../icons/IconNoTickets';
import { Emptystate as Wrapper } from './Block.styled';

const propTyps = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

const Emptystate = ({ title, children }) => (
  <Wrapper>
    <IconNoTickets width="21.2rem" height="21.2rem" />
    <h4>{title}</h4>
    {children}
  </Wrapper>
);

Emptystate.propTypes = propTyps;

export default Emptystate;
