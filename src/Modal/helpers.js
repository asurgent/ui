export const fixateBodyScroll = (windowRef) => {
  if (windowRef) {
    const { document } = window;
    const { body } = document;
    const scrollY = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
  }
};

export const releaseBodyScroll = (windowRef) => {
  if (windowRef) {
    const { document } = window;
    const { body } = document;
    const scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt((scrollY || '0'), 10) * -1);
  }
};

export const modalRoot = document.getElementById('modal-root');
