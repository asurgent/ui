import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as C from './Markdown.styled';
import { makeDirtyHTML, sanitizeHtml } from './helpers';

const propTypes = {
  markdown: PropTypes.string,
  flavor: PropTypes.oneOf(['original', 'vanilla', 'github']),
  className: PropTypes.string,
};

const defaultProps = {
  markdown: '',
  flavor: 'github',
  className: '',
};

const Markdown = ({
  markdown, flavor, className, ...props
}) => {
  const html = useMemo(() => {
    const dirtyHTML = makeDirtyHTML({ markdown, flavor });
    return sanitizeHtml({ dirtyHTML });
  }, [flavor, markdown]);
  /* eslint-disable-next-line react/no-danger */
  return (<C.Markdown className={`markdown-body ${className}`} dangerouslySetInnerHTML={{ __html: html }} {...props} />);
};

Markdown.propTypes = propTypes;
Markdown.defaultProps = defaultProps;

export default Markdown;
