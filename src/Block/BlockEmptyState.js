import React from 'react';
import PropTypes from 'prop-types';
import IconNoTickets from '../icons/IconNoTickets';
import { Emptystate as Wrapper } from './Block.styled';

const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

const defaultProps = {
  children: null,
};

const Emptystate = ({ title, children }) => (
  <Wrapper>
    <IconNoTickets width="21.2rem" height="21.2rem" />
    <h4>{title}</h4>
    {children}
  </Wrapper>
);

Emptystate.propTypes = propTypes;
Emptystate.defaultProps = defaultProps;
Emptystate.displayName = '@asurgent.ui.Block.Emptystate';

export default Emptystate;
