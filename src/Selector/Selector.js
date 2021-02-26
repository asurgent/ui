import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as C from './Selector.styled';

const propTypes = {
  entries: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  onSelect: PropTypes.func,
};

const defaultProps = {
  entries: [],
  onSelect: () => null,
};

const Selector = ({ entries, onSelect }) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const initialSelection = entries?.findIndex((ent) => ent.default);
    setSelected(initialSelection || 0);
  }, [entries]);

  return (
    <C.Container>
      {entries?.map((ent, ind) => (
        <C.Year
          key={ent.label || ind}
          selected={selected === ind}
          onClick={() => {
            setSelected(ind);
            onSelect(ent.value);
          }}
        >
          <C.Label selected={selected === ind}>{ent.label}</C.Label>
        </C.Year>
      ))}
    </C.Container>
  );
};

Selector.propTypes = propTypes;
Selector.defaultProps = defaultProps;

export default Selector;
