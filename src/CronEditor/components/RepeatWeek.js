import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as C from '../CronEditor.styled';

export const weekList = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const propTypes = {
  repeat: PropTypes.string.isRequired,
  everyWeek: PropTypes.number.isRequired,
  weekDaysRepeat: PropTypes.instanceOf(Array).isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeTimes: PropTypes.func.isRequired,
};

const defaultProps = {};


const RepeatWeek = ({
  repeat,
  everyWeek,
  weekDaysRepeat,
  onChange,
  onChangeTimes,
}) => {
  if (repeat === 'week') {
    return (
      <>
        <C.Label>
            Every
          <TextField label="" type="number" value={everyWeek} onChange={onChange} />
            week(s) on:
        </C.Label>

        <C.WeekSelector>
          {
            weekList
              .map((day) => (
                <C.Day
                  key={day}
                  selected={weekDaysRepeat.includes(day)}
                  onClick={() => onChangeTimes(day)}
                >
                  {day[0]}
                </C.Day>
              ))
            }
        </C.WeekSelector>
      </>
    );
  }

  return null;
};


RepeatWeek.propTypes = propTypes;
RepeatWeek.defaultProps = defaultProps;
RepeatWeek.displayName = '@asurgent.ui.CronEditor.RepeatWeek';

export default RepeatWeek;
