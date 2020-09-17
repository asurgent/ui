import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { truncateStart, truncateCenter, truncateEnd } from './helpers';

const defaultProps = {
  string: '',
  maxLength: 140,
};

const propTypes = {
  string: PropTypes.string,
  maxLength: PropTypes.number,
};
export const Start = ({ string, maxLength }) => {
  const truncatedString = useMemo(() => truncateStart({ string, maxLength }), [string, maxLength]);

  return <span>{truncatedString}</span>;
};

Start.propTypes = propTypes;
Start.defaultProps = defaultProps;

export const Center = ({ string, maxLength }) => {
  const truncatedString = useMemo(() => truncateCenter({ string, maxLength }), [string, maxLength]);

  return <span>{truncatedString}</span>;
};

Center.propTypes = propTypes;
Center.defaultProps = defaultProps;

export const End = ({ string, maxLength }) => {
  const truncatedString = useMemo(() => truncateEnd({ string, maxLength }), [string, maxLength]);

  return <span>{truncatedString}</span>;
};

End.propTypes = propTypes;
End.defaultProps = defaultProps;
