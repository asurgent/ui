import React from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close';
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
        <Button.Plain className="delete" mainIcon={<Close fontSize="small" />} onClick={onDelete} />
      )}
    </Styled>
  );
};

Tag.defaultProps = defaultProps;
Tag.propTypes = propTypes;
Tag.displayName = '@asurgent.ui.Tag';

export default Tag;
