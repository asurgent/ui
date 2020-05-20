import React, { forwardRef, useState, useEffect } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import ThemeProvider from './DatePickerThemeProvider';
import * as C from './DatePicker.styled';

const getStartOfDay = (val) => moment(val).startOf('day').toISOString();

const DatePicker = forwardRef((props, ref) => {
  const {
    format,
    name,
    maxDate,
    maxDateMessage,
    minDate,
    minDateMessage,
  } = props;


  const [value, setValue] = useState(getStartOfDay(props.value));

  useEffect(() => {
    setValue(getStartOfDay(props.value));
  }, [props]);

  const dispatchEvent = (d) => {
    const input = ref.current;
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(input, d);
    const inputEvent = new Event('input', { bubbles: true });
    input.dispatchEvent(inputEvent);
  };

  return (
    <ThemeProvider>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <C.DatePicker
          format={format}
          fullWidth
          maxDate={maxDate}
          minDate={minDate}
          value={value}
          onChange={(momentDate) => {
            setValue(getStartOfDay(momentDate));
            dispatchEvent(getStartOfDay(momentDate));
          }}
          maxDateMessage={maxDateMessage}
          minDateMessage={minDateMessage}
          inputVariant="outlined"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          {...props.props}
        />
      </MuiPickersUtilsProvider>
      <input type="text" style={{ display: 'none' }} readOnly name={name} value={value} ref={ref} />
    </ThemeProvider>
  );
});

DatePicker.propTypes = {
  label: PropTypes.string,
  format: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  maxDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  maxDateMessage: PropTypes.string,
  minDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  minDateMessage: PropTypes.string,
  noLabel: PropTypes.bool,
  tooltip: PropTypes.string,
  props: PropTypes.instanceOf(Object),
};

DatePicker.defaultProps = {
  label: '',
  format: 'YYYY-MM-DD',
  value: getStartOfDay(moment()),
  minDate: moment('0001-01-01'),
  minDateMessage: '',
  maxDate: moment('9999-12-31'),
  maxDateMessage: '',
  noLabel: false,
  tooltip: '',
  props: {},
};

DatePicker.displayName = '@asurgent.ui.Form.Input.DatePicker';

export default DatePicker;
