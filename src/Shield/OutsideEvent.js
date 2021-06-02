import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as C from './OutsideEvent.styled';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func.isRequired,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  onClick: PropTypes.func,
};
const defaultProps = {
  onClick: () => null,
};

const useOutsideEvent = (ref, { onClick }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      documentNaNremoveEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClick]);
};

const OutsideEvent = ({ children, onClick }) => {
  const wrapperRef = useRef(null);
  useOutsideEvent(wrapperRef, { onClick });
  return (
    <C.OutsideEvent ref={wrapperRef}>
      {children}
    </C.OutsideEvent>
  );
};

OutsideEvent.propTypes = propTypes;
OutsideEvent.defaultProps = defaultProps;

export default OutsideEvent;
