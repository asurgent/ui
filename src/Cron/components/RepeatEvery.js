import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import * as C from '../CronEditor.styled';
import translation from '../CronEditor.translation';

const { t } = translation;

const propTypes = {
  hook: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {};

const Duration = ({ hook }) => (
  <C.Row>
    <FormControl>
      <InputLabel id="repeat-select-label">{t('repeat', 'asurgentui')}</InputLabel>
      <Select
        labelId="repeat-select-label"
        value={hook.getRepeatType()}
        onChange={hook.handleRepeatChange}
      >
        {
        hook.getRepeatTypesList()
          .map((type) => (
            <MenuItem key={type} value={type}>{t(type, 'asurgentui')}</MenuItem>
          ))
      }
      </Select>
    </FormControl>

    { hook.customRepeat() && (
      <TextField
        label={t('expression', 'asurgentui')}
        value={hook.getExpression()}
        onChange={hook.handleExpressionChange}
      />
    )}
  </C.Row>
);

Duration.propTypes = propTypes;
Duration.defaultProps = defaultProps;
Duration.displayName = '@asurgent.ui.Duration';

export default Duration;
