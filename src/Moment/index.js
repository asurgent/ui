import React from 'react';
import * as Tooltip from '../Tooltip';
import * as m from './momentParsers';

const Component = (timeFormat) => ({ timestamp, format = '' }) => {
  if (m.isValid(timestamp)) {
    return (
      <Tooltip.Middle tip={m.full(timestamp)}>
        <span className="timestamp">
          {timeFormat(timestamp, format)}
        </span>
      </Tooltip.Middle>
    );
  }

  return timeFormat;
};

export const DateTime = Component(m.dateTime);
export const Date = Component(m.date);
export const Full = Component(m.full);
export const Ago = Component(m.ago);
export const Custom = Component(m.custom);
