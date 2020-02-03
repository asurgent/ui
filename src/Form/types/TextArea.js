import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Tooltip from '../../Tooltip';

import {
  Main, Wrapper, Label, Header, Icon,
} from './Text.styled';

const propTyps = {
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  noLabel: PropTypes.bool,
  props: PropTypes.instanceOf(Object),
};

const defaultProps = {
  value: '',
  label: '',
  props: {},
  noLabel: false,
};

const TextArea = forwardRef((props, ref) => {
  const {
    label,
    name,
    tooltip,
    placeholder,
    noLabel,
  } = props;

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <Main>
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
      <Wrapper>
        <textarea
          {...props.props}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={({ target }) => setValue(target.value)}
          name={name}
          ref={ref}
          autoComplete="off"
        />
      </Wrapper>
    </Main>
  );
});


TextArea.defaultProps = defaultProps;
TextArea.propTypes = propTyps;
TextArea.displayName = '@asurgent.ui.Form.Input.TextArea';

export default TextArea;
