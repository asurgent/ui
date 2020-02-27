import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as C from '../CronEditor.styled';

const propTypes = {
  repeat: PropTypes.string.isRequired,
  everyMonth: PropTypes.number.isRequired,
  monthDaysRepeat: PropTypes.instanceOf(Array).isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeTimes: PropTypes.func.isRequired,
};

const defaultProps = {};

const RepeatMonth = ({
  repeat,
  everyMonth,
  monthDaysRepeat,
  onChange,
  onChangeTimes,
}) => {
  if (repeat === 'month') {
    return (
      <>
        <C.Label>
          Every
          <TextField type="number" label="" value={everyMonth} onChange={onChange} />
          month(s) on:
        </C.Label>
        <C.MonthSlector>
          {
            Array.from({ length: 31 }, (_, i) => i + 1)
              .map((day) => (
                <C.Day
                  key={day}
                  selected={monthDaysRepeat.includes(day)}
                  onClick={() => onChangeTimes(day)}
                >
                  {day}
                </C.Day>
              ))
          }
        </C.MonthSlector>
      </>
    );
  }

  return null;
};


RepeatMonth.propTypes = propTypes;
RepeatMonth.defaultProps = defaultProps;
RepeatMonth.displayName = '@asurgent.ui.CronEditor.RepeatMonth';

export default RepeatMonth;
