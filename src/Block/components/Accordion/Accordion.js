import React, { useState } from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import * as C from './Accordion.styled';
import * as Transition from '../../../Transition';
import * as Tooltip from '../../../Tooltip';
import translation from './Accordion.translation';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func.isRequired,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
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
  const { t } = translation;
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
        <Tooltip.Middle tip={t('details', 'asurgentui')}>
          <KeyboardArrowDown fontSize="large" />
        </Tooltip.Middle>
      </C.Arrow>
      <Transition.FadeInAndOut isVisible={isOpen} timeout={80} className="content">
        <C.Content>
          { isOpen && (typeof children === 'function' ? children() : children) }
        </C.Content>
      </Transition.FadeInAndOut>
    </C.Wrapper>
  );
};

Accordion.propTypes = propTypes;
Accordion.defaultProps = defaultProps;
Accordion.displayName = '@asurgent.ui.Block.Accordion';

export default Accordion;
