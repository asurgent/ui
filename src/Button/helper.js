export const isExternalLink = (link) => (link || '').toString().match(/^(http(s)?:\/\/)/);
export const isInteralLink = (link) => (link || '').toString().match(/^(\/)/);
export const isValidMail = (link) => (link || '').toString().match(/^(.+@.+\.[a-zAZ]+)$/);

export const fileSaver = async (data, filename, overrideConfig) => {
  const config = {
    type: 'application/json',
    fileExtension: 'json',
    ...overrideConfig,
  };

  const fileName = filename || 'export';
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: config.type });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = `${fileName}.${config.fileExtension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
