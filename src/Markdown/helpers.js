import dompurify from 'dompurify';
import showdown from 'showdown';

const ALLOWED_TAGS = ['b', 'br', 'table', 'tbody', 'thead', 'tr', 'th', 'td', 'a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre', 'img', 'div'];
const ALLOWED_ATTR = ['href', 'colspan', 'mailto', 'style'];

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
