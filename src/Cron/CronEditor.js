import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as C from './CronEditor.styled';

import StartDate from './components/StartDate';
import Duration from './components/Duration';
import RepeatOutput from './components/RepeatOutput';
import RepeatEvery from './components/RepeatEvery';
import Occurrence from './components/Occurrence';
import ThemeProvider from './components/ThemeProvider';
import useCronHook from './useCronHook';

const propTypes = {
  end: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]).isRequired,
  start: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  duration: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  expression: PropTypes.string.isRequired,
};

const defaultProps = {};

const CronEditor = ({
  end,
  start,
  duration,
  expression,
  onChange,
}) => {
  const hook = useCronHook({
    end,
    start,
    duration,
    expression,
    onChange,
  });

  return (
    <C.Columns>
      <C.Editor>
        <ThemeProvider>
          <StartDate hook={hook} />
          <Duration hook={hook} />
          <Occurrence hook={hook} />
          {
            hook.willRunMoreThanOnce() && (
            <RepeatEvery hook={hook} />)
          }
        </ThemeProvider>
      </C.Editor>
      { hook.willRunMoreThanOnce() && hook.getStartDate() && (
        <RepeatOutput
          withBorder
          startDate={hook.getStartDate()}
          cronExpression={hook.getExpression()}
        />
      )}
    </C.Columns>
  );
};

CronEditor.propTypes = propTypes;
CronEditor.defaultProps = defaultProps;

export default CronEditor;
