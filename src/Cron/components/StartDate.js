import React from 'react';
import PropTypes from 'prop-types';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import * as C from '../CronEditor.styled';
import translation from '../CronEditor.translation';

const { t } = translation;

const propTypes = {
  hook: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {};

const CronEditor = ({ hook }) => (
  <C.Row>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        label={t('startDate', 'asurgentui')}
        format="DD-MM-YYYY"
        value={hook.getStartDate()}
        onChange={hook.handleStartDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
      <KeyboardTimePicker
        ampm={false}
        minutesStep={5}
        label={t('startTime', 'asurgentui')}
        value={hook.getStartDate()}
        onChange={hook.handleStartDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
      />
    </MuiPickersUtilsProvider>
  </C.Row>
);

CronEditor.propTypes = propTypes;
CronEditor.defaultProps = defaultProps;
CronEditor.displayName = '@asurgent.ui.CronEditor';

export default CronEditor;
