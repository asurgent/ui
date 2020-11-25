import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as C from './Year.styled';

const propTypes = {
  entries: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  onSelect: PropTypes.func,
};

const defaultProps = {
  entries: [],
  onSelect: () => null,
};

const Year = ({ entries, onSelect }) => {
  const [selected, setSelected] = useState(0);
  return (
    entries.map((el, ind) => (
      <C.Year
        key={el}
        selected={selected === ind}
        onClick={() => {
          setSelected(ind);
          onSelect(el);
        }}
      >
        <p>{el}</p>
      </C.Year>
    ))
  );
};

Year.propTypes = propTypes;
Year.defaultProps = defaultProps;

export default Year;
