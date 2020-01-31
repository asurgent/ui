import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as C from './Modal.styled';
import {
  modalRoot,
  fixateBodyScroll,
  releaseBodyScroll,
} from './helpers';

const propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  withoutHeader: PropTypes.bool,
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
    } = this.props;

    return ReactDOM.createPortal(
      <C.Overlay>
        <C.Modal>
          { !withoutHeader && (
            <C.Close onClick={onClose}>
              <i className="fa fa-times" aria-hidden="true" />
            </C.Close>
          )}
          {title && <C.ModalTitle>{title}</C.ModalTitle>}
          <C.Content>
            {children}
          </C.Content>
        </C.Modal>
      </C.Overlay>,
      modalRoot,
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
Modal.displayName = '@asurgent.ui.Modal';

export default Modal;
