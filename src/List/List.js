import React from 'react';
import PropTypes from 'prop-types';
import * as C from './List.styled';
import { hasValue } from './helpers';

const propTypes = {
  style: PropTypes.instanceOf(Object),
  rows: PropTypes.instanceOf(Array),
  borderBottom: PropTypes.bool,
  borderTop: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  compact: PropTypes.bool,
};

const defaultProps = {
  style: {},
  rows: [],
  children: null,
  borderBottom: false,
  borderTop: false,
  compact: false,
};

const List = ({
  rows,
  style,
  children,
  borderBottom,
  borderTop,
  compact,
}) => (
  <C.Wrapper style={style} borderBottom={borderBottom} borderTop={borderTop} compact={compact}>
    { rows.map((item, index) => {
      if (!item) { return null; }

      const { label, value, row } = item;
      return (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={`${value}${label}${index}-key`}>
          { !row && (
          <>
            <C.Title>
              { label }
            </C.Title>
            { hasValue(value) ? (
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
          { row && (
            <C.Row>{row}</C.Row>
          )}
        </React.Fragment>
      );
    })}
    { children }
  </C.Wrapper>
);

List.propTypes = propTypes;
List.defaultProps = defaultProps;
List.displayName = '@asurgent.ui.List.Primary';

export default List;
