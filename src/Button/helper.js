
export const isExternalLink = (link) => (link || '').toString().match(/^(http(s)?:\/\/)/);
export const isInteralLink = (link) => (link || '').toString().match(/^(\/)/);
export const isValidMail = (link) => (link || '').toString().match(/^(.+@.+\.[a-zAZ]+)$/);
