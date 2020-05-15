import React, { forwardRef, useState, useEffect } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import { normalizeDateInput } from './helpers';
import ThemeProvider from './ThemeProvider';
import * as C from './DatePicker.styled';


import {
  Label,
  Header,
  TooltipIcon,
} from './Text.styled';
import * as Tooltip from '../../Tooltip';


const DatePicker = forwardRef((props, ref) => {
  const {
    label,
    format,
    name,
    noLabel,
    tooltip,
    maxDate,
    maxDateMessage,
    minDate,
    minDateMessage,
  } = props;

  const [val, setVal] = useState('');

  useEffect(() => {
    setVal(props.value || '');
  }, [props]);

  const handleChange = ({ target: { value } }) => {
    setVal((prevState) => normalizeDateInput(value, prevState.value));
  };

  return (
    <ThemeProvider>
      { noLabel === false && (
        <Header>
          <Label>{label || name}</Label>
          { tooltip && (
          <Tooltip.Middle tip={tooltip}>
            <TooltipIcon />
          </Tooltip.Middle>
          )}
        </Header>
      )}

      {props.props.useNative ? (
        <C.WrapperNative>
          <C.DatePickerNative
            type="text"
            name={name}
            value={val}
            maxLength={10}
            onChange={handleChange}
            ref={ref}
            {...props.props}
          />
        </C.WrapperNative>
      ) : (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <C.DatePicker
            format={format}
            defaultValue={val}
            fullWidth
            type="date"
            name={name}
            maxDate={maxDate}
            minDate={minDate}
            onChange={(dat) => setVal(dat)}
            maxDateMessage={maxDateMessage}
            minDateMessage={minDateMessage}
            ref={ref}
            inputVariant="outlined"
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            {...props.props}
          />

        </MuiPickersUtilsProvider>
      )}


    </ThemeProvider>
  );
});

DatePicker.propTypes = {
  useNative: PropTypes.bool,
  label: PropTypes.string,
  format: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  maxDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  maxDateMessage: PropTypes.string,
  minDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  minDateMessage: PropTypes.string,
  noLabel: PropTypes.bool,
  tooltip: PropTypes.string,
  props: PropTypes.instanceOf(Object),
};

DatePicker.defaultProps = {
  useNative: true,
  label: '',
  format: 'YYYY-MM-DD',
  value: moment().format('YYYY-MM-DD'),
  minDate: new Date('0001-01-01'),
  minDateMessage: '',
  maxDate: new Date('9999-12-31'),
  maxDateMessage: '',
  noLabel: false,
  tooltip: '',
  props: {},
};

DatePicker.displayName = '@asurgent.ui.Form.Input.DatePicker';

export default DatePicker;
