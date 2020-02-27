import React from 'react';
import cronstrue from 'cronstrue';
import PropTypes from 'prop-types';
import * as C from '../CronEditor.styled';

const propTypes = {
  repeat: PropTypes.string.isRequired,
  cronExpression: PropTypes.string.isRequired,
};

const defaultProps = {};

const validateToString = (expression) => {
  try {
    return cronstrue.toString(expression, { use24HourTimeFormat: true });
  } catch (e) {
    return 'Invalid expression';
  }
};

const RepeatOutput = ({
  repeat, cronExpression,
}) => {
  if (repeat !== 'never') {
    return (
      <C.Label style={{ flexDirection: 'column' }}>
        { validateToString(cronExpression) }
      </C.Label>
    );
  }

  return null;
};

RepeatOutput.propTypes = propTypes;
RepeatOutput.defaultProps = defaultProps;
RepeatOutput.displayName = '@asurgent.ui.CronEditor.RepeatOutput';

export default RepeatOutput;
