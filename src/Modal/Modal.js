import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import MdiIcon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import * as C from './Modal.styled';
import {
  modalRoot,
  fixateBodyScroll,
  releaseBodyScroll,
} from './helpers';
import * as Transition from '../Transition';

const propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  fullscreen: PropTypes.bool,
  withActionbar: PropTypes.bool,
  onClose: PropTypes.func,
  withoutHeader: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  transparent: PropTypes.bool,
  style: PropTypes.instanceOf(Object),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

const defaultProps = {
  title: '',
  withoutHeader: false,
  withActionbar: false,
  fullscreen: false,
  onClose: () => {},
  transparent: false,
  style: {},
  children: null,
};

class Modal extends Component {
  componentDidMount() {
    fixateBodyScroll(window);
  }

  componentWillUnmount() {
    releaseBodyScroll(window);
  }

  render() {
    const {
      children,
      title,
      onClose,
      withoutHeader,
      isOpen,
      fullscreen,
      withActionbar,
      transparent,
      style,
    } = this.props;

    return ReactDOM.createPortal(
     /*  <Transition.FadeIn isVisible={isOpen} timeout={50}> */
        <C.Overlay>
          <C.Modal fullscreen={fullscreen} transparent={transparent} style={style}>
            { !withoutHeader && (
            <C.Close onClick={onClose}>
              <MdiIcon
                size={1.2}
                path={mdiClose}
              />
            </C.Close>
            )}
            {title && <C.ModalTitle>{title}</C.ModalTitle>}
            <C.Content withActionbar={withActionbar}>
              {children}
            </C.Content>
          </C.Modal>
        </C.Overlay>,
      /* </Transition.FadeIn>, */
      modalRoot,
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
Modal.displayName = '@asurgent.ui.Modal';

export default Modal;
