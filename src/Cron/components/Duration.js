import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Select,
  MenuItem,
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

    <TextField
      label={t('duration', 'asurgentui')}
      value={hook.getDuration()}
      onChange={hook.handleDurationChange}
    />
    <Select
      value={hook.getDurationType()}
      onChange={hook.handleDurationTypeChange}
    >
      {
        hook.getDurationTypesList()
          .map((type) => (
            <MenuItem key={type} value={type}>{t(type, 'asurgentui')}</MenuItem>
          ))
      }
    </Select>

  </C.Row>
);

Duration.propTypes = propTypes;
Duration.defaultProps = defaultProps;
Duration.displayName = '@asurgent.ui.Duration';

export default Duration;
