import ToastManager from './components/ToastManager';
import { EVENT_TYPE } from './constants';

export const addToast = (message, type = 'info') => {
  const event = new CustomEvent(EVENT_TYPE, {
    detail: {
      message,
      type,
    },
  });
  window.dispatchEvent(event);
};

export { ToastManager as Manager };
