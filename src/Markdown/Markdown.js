import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';
import dompurify from 'dompurify';
import * as C from './Markdown.styled';

const propTypes = {
  markdown: PropTypes.string,
  flavor: PropTypes.oneOf(['original', 'vanilla', 'github']),
};

const defaultProps = {
  markdown: '',
  flavor: 'github',
};

const Markdown = ({ markdown, flavor, ...props }) => {
  const converter = new showdown.Converter({
    tables: true,
    strikethrough: true,
  });

  const html = useMemo(() => {
    converter.setFlavor(flavor);
    const dirtyHTML = converter.makeHtml(markdown);

    return dompurify.sanitize(dirtyHTML);
  }, [converter, flavor, markdown]);
  /* eslint-disable-next-line react/no-danger */
  return (<C.Markdown className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} {...props} />);
};

Markdown.propTypes = propTypes;
Markdown.defaultProps = defaultProps;

export default Markdown;
