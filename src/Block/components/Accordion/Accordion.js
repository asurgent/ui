import React, { useState } from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import * as C from './Accordion.styled';
import * as Transition from '../../../Transition';

const propTypes = {
  children: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  open: PropTypes.bool,
};

const defaultProps = {
  title: null,
  description: null,
  open: false,
};

const Accordion = ({
  title, description, open, children,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <C.Wrapper onClick={() => setIsOpen(true)}>
      <C.Text isOpen={isOpen}>
        <C.Title>
          {title}
        </C.Title>
        <C.Description>
          {description}
        </C.Description>
      </C.Text>
      <C.Arrow
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        isOpen={isOpen}
      >
        <KeyboardArrowDown fontSize="large" />
      </C.Arrow>
      <Transition.FadeOutAndOut isVisible={isOpen} timeout={80} className="content">
        <C.Content>
          { isOpen && typeof children === 'function' ? children() : children }
        </C.Content>
      </Transition.FadeOutAndOut>
    </C.Wrapper>
  );
};

Accordion.propTypes = propTypes;
Accordion.defaultProps = defaultProps;
Accordion.displayName = '@asurgent.ui.Block.Accordion';

export default Accordion;
