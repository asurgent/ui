import React, { forwardRef, useState, useEffect } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import ThemeProvider from './ThemeProvider';
import * as C from './Date.styled';

import {
  Label,
  Header,
  Icon,
} from './Text.styled';
import * as Tooltip from '../../Tooltip';

const Date = forwardRef((props, ref) => {
  const {
    label, format, name, noLabel, tooltip,
  } = props;

  const [value, setValue] = useState(moment().local());

  useEffect(() => {
    setValue(props.value || '');
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
          inputVariant="outlined"
          ref={ref}
          onChange={(e) => setValue(moment(e).local().utc())}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          {...props.props}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
});

Date.propTypes = {
  label: PropTypes.string,
  format: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  noLabel: PropTypes.bool,
  tooltip: PropTypes.string,
};

Date.defaultProps = {
  label: '',
  format: 'DD-MM-YYYY',
  value: '01-02-2020', // moment().local().format('YYYY-MM-DD'),
  noLabel: false,
  tooltip: '',
};

export default Date;
