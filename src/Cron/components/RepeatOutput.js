import React from 'react';
import cronstrue from 'cronstrue';
import Cron from 'cron-converter';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as C from '../CronEditor.styled';

const propTypes = {
  startDate: PropTypes.string.isRequired,
  cronExpression: PropTypes.string.isRequired,
  withBorder: PropTypes.bool,
};

const defaultProps = {
  withBorder: false,
};

const getNextExecutionList = (expression, startDate) => {
  try {
    const cronInstance = new Cron();
    cronInstance.fromString(expression);
    const interval = cronInstance.schedule(moment(startDate).local());

    return Array.from({ length: 4 }, () => {
      try {
        return interval.next().format();
      } catch (e) {
        return null;
      }
    });
  } catch (e) {
    return [];
  }
};

const validateToString = (expression) => {
  try {
    return cronstrue.toString(expression, { use24HourTimeFormat: true });
  } catch (e) {
    return 'Invalid expression';
  }
};

const RepeatOutput = ({
  cronExpression, startDate, withBorder,
}) => (
  <C.Output withBorder={withBorder}>
    <C.Label style={{ flexDirection: 'column' }}>
      <C.Title>Will run</C.Title>
      <C.Text>
        { validateToString(cronExpression) }
      </C.Text>
      <C.Title>Next run</C.Title>
      {
            getNextExecutionList(cronExpression, startDate)
              .map((e) => (
                <C.Text key={e}>{e}</C.Text>
              ))
          }
    </C.Label>
  </C.Output>
);

RepeatOutput.propTypes = propTypes;
RepeatOutput.defaultProps = defaultProps;
RepeatOutput.displayName = '@asurgent.ui.CronEditor.RepeatOutput';

export default RepeatOutput;
