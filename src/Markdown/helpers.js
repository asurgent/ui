import dompurify from 'dompurify';
import showdown from 'showdown';

const ALLOWED_TAGS = [
  'a',
  'b',
  'blockquote',
  'br',
  'code',
  'div',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'i',
  'img',
  'li',
  'p',
  'pre',
  'strong',
  'table',
  'tbody',
  'td',
  'th',
  'thead',
  'tr',
  'ul',
];
const ALLOWED_ATTR = ['href', 'colspan', 'mailto'];

export const makeDirtyHTML = ({ markdown, flavor }) => {
  const converter = new showdown.Converter();
  converter.setFlavor(flavor);
  const dirtyHTML = converter.makeHtml(markdown);
  return dirtyHTML;
};

export const sanitizeHtml = ({ dirtyHTML }) => {
  const cleanHTML = dompurify.sanitize(dirtyHTML, { ALLOWED_TAGS, ALLOWED_ATTR });
  return cleanHTML;
};
