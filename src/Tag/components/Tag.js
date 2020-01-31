import React from 'react';
import PropTypes from 'prop-types';
import * as Icon from '@material-ui/icons';
import * as Button from '../../Button';

const propTypes = {
  label: PropTypes.string.isRequired,
  max: PropTypes.number,
  component: PropTypes.elementType.isRequired,
  onDelete: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
};

const defaultProps = {
  onDelete: false,
  max: 0,
};

const Tag = ({
  label, component: Styled, onDelete, max,
}) => {
  let parsedLabel = label;

  if (max > 0 && label.length > max) {
    parsedLabel = `${label.substr(0, max)}...`;
  }

  return (
    <Styled>
      <div className="label">{parsedLabel}</div>
      { onDelete && (
        <Button.Icon icon={<Icon.Close />} onClick={onDelete} />
      )}
    </Styled>
  );
};

Tag.defaultProps = defaultProps;
Tag.propTypes = propTypes;
Tag.displayName = '@asurgent.ui.Tag';

export default Tag;
