import React from 'react';
import PropTypes from 'prop-types';
import IconNoTickets from '../icons/IconNoTickets';
import { Emptystate as Wrapper } from './Block.styled';

const propTyps = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const Emptystate = ({ title, description }) => (
  <Wrapper>
    <IconNoTickets width="21.2rem" height="21.2rem" />
    <h4>{title}</h4>
    <p>{description}</p>
  </Wrapper>
);

Emptystate.propTypes = propTyps;

export default Emptystate;
