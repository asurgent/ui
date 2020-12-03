import React from 'react';
import PropTypes from 'prop-types';
import * as C from './Bar.styled';
import * as T from '../../../Typography';

const propTypes = {
  progress: PropTypes.number,
  showNumber: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
};
const defaultProps = {
  progress: 0,
  showNumber: true,
  width: '2px',
  height: null,
};

const Bar = ({
  progress, showNumber, width, height,
}) => (
  <C.Container height={height}>
    {showNumber && <T.P.Main style={{ margin: '0 2rem 0 0' }}>{`${progress}%`}</T.P.Main>}
    <C.ProgessBar width={width}>
      <C.FilledPart progress={progress} />
    </C.ProgessBar>
  </C.Container>
);

Bar.propTypes = propTypes;
Bar.defaultProps = defaultProps;

export default Bar;
