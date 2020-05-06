import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as Moment from '../../Moment';
import * as C from '../CronEditor.styled';
import translation from '../CronEditor.translation';
import { getNextExecutionList, validateToString } from '../helpers';

const { t } = translation;

const propTypes = {
  startDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]).isRequired,
  cronExpression: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]).isRequired,
  withBorder: PropTypes.bool,
};

const defaultProps = {
  withBorder: false,
};


const RepeatOutput = ({
  cronExpression, startDate, withBorder,
}) => {
  const parsed = validateToString(cronExpression);
  return (
    <C.Output withBorder={withBorder}>
      <C.Label style={{ flexDirection: 'column' }}>
        <C.Title>{t('exampleRuns', 'asurgentui')}</C.Title>
        <C.Text>
          { parsed || t('invalid', 'asurgentui')}
        </C.Text>
        { parsed && (
          <>
            <C.Title>{t('nextRuns', 'asurgentui')}</C.Title>
            {
            getNextExecutionList(cronExpression, startDate)
              .map((e) => (<Moment.DateTime timestamp={e} key={e} />))
          }
          </>
        )}
      </C.Label>
    </C.Output>
  );
};

RepeatOutput.propTypes = propTypes;
RepeatOutput.defaultProps = defaultProps;
RepeatOutput.displayName = '@asurgent.ui.CronEditor.RepeatOutput';

export default RepeatOutput;
