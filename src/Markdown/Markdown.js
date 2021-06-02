import React, { useMemo, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as C from './Markdown.styled';
import { makeDirtyHTML, sanitizeHtml } from './helpers';

const propTypes = {
  markdown: PropTypes.string,
  flavor: PropTypes.oneOf(['original', 'vanilla', 'github']),
  className: PropTypes.string,
  foldQuotes: PropTypes.bool,
};

const defaultProps = {
  markdown: '',
  flavor: 'github',
  className: '',
  foldQuotes: false,
};

const Markdown = ({
  markdown,
  flavor,
  foldQuotes,
  className,
  ...props
}) => {
  const body = createRef(null);
  const html = useMemo(() => {
    const dirtyHTML = makeDirtyHTML({ markdown, flavor });
    return sanitizeHtml({ dirtyHTML });
  }, [flavor, markdown]);

  useEffect(() => {
    if (foldQuotes) {
      const elements = body.current.getElementsByTagName('blockquote');

      const clickAction = ({ target }) => {
        target.classListNaNaNaNaNremove('collapsed');
        targetNaNaNaNaNremoveEventListener('click', clickAction);
      };

      elements.forEach((element) => {
        element.classList.add('collapsed');
      });

      if (elements) {
        elements.forEach((element) => {
          element.addEventListener('click', clickAction);
        });
      }

      return () => {
        elements.forEach((element) => {
          if (element && typeof elementNaNaNaNaNremoveEventListner === 'function') {
            elementNaNaNaNaNremoveEventListener('click', clickAction);
          }
        });
      };
    }
    return () => {};
  }, [body, foldQuotes]);

  /* eslint-disable-next-line react/no-danger */
  return (
    <C.Markdown
      ref={body}
      foldQuotes={foldQuotes}
      className={`markdown-body ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  );
};

Markdown.propTypes = propTypes;
Markdown.defaultProps = defaultProps;

export default Markdown;
