import React from 'react';
import Tooltip from '../Tooltip';
import * as m from './momentParsers';

const Component = (timeFormat) => ({ timestamp, format = '' }) => {
  if (m.isValid(timestamp)) {
    return (
      <Tooltip tip={m.full(timestamp)}>
        <span className="timestamp">
          {timeFormat(timestamp, format)}
        </span>
      </Tooltip>
    );
  }

  return timeFormat;
};

export const DateTime = Component(m.dateTime);
export const Date = Component(m.date);
export const Full = Component(m.full);
export const Ago = Component(m.ago);
export const Custom = Component(m.custom);
