import React from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import * as Button from '../../Button';

const propTypes = {
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  component: PropTypes.elementType.isRequired,
  onDelete: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
};

const defaultProps = {
  onDelete: false,
  maxLength: 0,
};

const Tag = ({
  label, component: Styled, onDelete, maxLength,
}) => {
  let parsedLabel = label;

  if (maxLength > 0 && label.length > maxLength) {
    parsedLabel = `${label.substr(0, maxLength)}...`;
  }

  return (
    <Styled>
      <div className="label">{parsedLabel}</div>
      { onDelete && (
        <Button.Plain
          className="delete"
          onClick={onDelete}
          mainIcon={<MdiIcon size={0.8} path={mdiClose} />}
        />
      )}
    </Styled>
  );
};

Tag.defaultProps = defaultProps;
Tag.propTypes = propTypes;
Tag.displayName = '@asurgent.ui.Tag';

export default Tag;
