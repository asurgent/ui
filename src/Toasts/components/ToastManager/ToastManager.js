import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as C from './ToastManager.styled';
import Toast from '../Toast';
import { EVENT_TYPE } from '../../constants';

const modalRoot = document.getElementById('tooltip-root');
const removedToastIds = [];

const ToastManager = () => {
  const [toasts, setToast] = useState([]);
  const update = useState(0)[1];

  const getToasts = () => toasts.filter(({ id }) => !removedToastIds.includes(id));

  useEffect(() => {
    window.addEventListener(EVENT_TYPE, ({ detail }) => {
      const { message, type } = detail;
      toasts.push({
        message,
        type,
        id: `id:${Math.random()}`,
      });
      setToast(getToasts());
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRemove = (id) => {
    removedToastIds.push(id);
    update({ key: Math.random() });
  };

  return ReactDOM.createPortal(
    <C.Toasts>
      { getToasts()
        .map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onRemove={() => onRemove(toast.id)}
          />
        ))}
    </C.Toasts>,
    modalRoot,
  );
};

export default ToastManager;
