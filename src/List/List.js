import React from 'react';
import PropTypes from 'prop-types';
import * as C from './List.styled';

const propTypes = {
  rows: PropTypes.instanceOf(Array),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

const defaultProps = {
  rows: [],
  children: null,
};

const List = ({ rows, children }) => (
  <C.Wrapper>
    { rows.map((item) => {
      if (!item) { return null; }

      const { label, value, row } = item;
      return (
        <>
          { !row && (
          <>
            <C.Title>
              { label }
            </C.Title>
            { value ? (
              <C.Value>
                { value }
              </C.Value>
            ) : (
              <C.NoValue>
                N/A
              </C.NoValue>
            )}
          </>
          )}
          { row && (<C.Row>{row}</C.Row>)}
        </>
      );
    })}
    { children }
  </C.Wrapper>
);

List.propTypes = propTypes;
List.defaultProps = defaultProps;
List.displayName = '@asurgent.ui.List.Primary';

export default List;
