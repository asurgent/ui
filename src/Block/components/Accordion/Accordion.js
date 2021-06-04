import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
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
  override: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  compact: PropTypes.bool,
  open: PropTypes.bool,
  btnTooltip: PropTypes.string,
};

const defaultProps = {
  title: null,
  description: null,
  open: false,
  compact: false,
  override: null,
  btnTooltip: null,
};

const Accordion = ({
  title, description, open, children, compact, override, btnTooltip,
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const { t } = translation;
  return (
    <C.Wrapper onClick={() => setIsOpen(true)} compact={compact}>
      <C.Text isOpen={isOpen} hasOverride={override}>
        {!override ? (
          <>
            <C.Title>
              {title}
            </C.Title>
            <C.Description>
              {description}
            </C.Description>
          </>
        ) : override(isOpen)}
      </C.Text>
      <C.Arrow
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        isOpen={isOpen}
      >
        <Tooltip.Middle tip={btnTooltip || t('details', 'asurgentui')}>
          <MdiIcon path={mdiChevronDown} size={1.4} />
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

export default Accordion;
