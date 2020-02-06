import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as Icon from '@material-ui/icons';
import * as C from './Modal.styled';
import {
  modalRoot,
  fixateBodyScroll,
  releaseBodyScroll,
} from './helpers';
import * as Transition from '../Transition';


const propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  withoutHeader: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

const defaultProps = {
  title: '',
  withoutHeader: false,
  onClose: () => {},
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
    } = this.props;

    return ReactDOM.createPortal(
      <Transition.FadeIn isVisible={isOpen} timeout={50}>
        <C.Overlay>
          <C.Modal>
            { !withoutHeader && (
            <C.Close onClick={onClose}>
              <Icon.Close fontSize="large" />
            </C.Close>
            )}
            {title && <C.ModalTitle>{title}</C.ModalTitle>}
            <C.Content>
              {children}
            </C.Content>
          </C.Modal>
        </C.Overlay>
      </Transition.FadeIn>,
      modalRoot,
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
Modal.displayName = '@asurgent.ui.Modal';

export default Modal;
