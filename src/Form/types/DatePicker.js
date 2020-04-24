import React, { forwardRef, useState, useEffect } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import ThemeProvider from './ThemeProvider';
import * as C from './DatePicker.styled';

import {
  Label,
  Header,
  Icon,
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

  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(props.value || moment().local());
  }, [props.value]);

  return (
    <ThemeProvider>
      { noLabel === false && (
        <Header>
          <Label>{label || name}</Label>
          { tooltip && (
          <Tooltip.Middle tip={tooltip}>
            <Icon className="far fa-question-circle" />
          </Tooltip.Middle>
          )}
        </Header>
      )}

      <MuiPickersUtilsProvider utils={MomentUtils}>
        <C.DatePicker
          format={format}
          value={value}
          fullWidth
          name={name}
          maxDate={moment(maxDate).format(format)}
          minDate={moment(minDate).format(format)}
          maxDateMessage={maxDateMessage}
          minDateMessage={minDateMessage}
          inputVariant="outlined"
          inputRef={ref}
          onChange={(e) => setValue(moment(e).local())}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          {...props.props}
        />
      </MuiPickersUtilsProvider>
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
};

DatePicker.defaultProps = {
  label: '',
  format: 'YYYY-MM-DD',
  value: moment().local(),
  minDate: moment('0001-01-01').format('YYYY-MM-DD'),
  minDateMessage: '',
  maxDate: moment('9999-12-31').format('YYYY-MM-DD'),
  maxDateMessage: '',
  noLabel: false,
  tooltip: '',
};

DatePicker.displayName = '@asurgent.ui.Form.Input.DatePicker';

export default DatePicker;
