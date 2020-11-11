export const isExternalLink = (link) => (link || '').toString().match(/^(http(s)?:\/\/)/);
export const isInteralLink = (link) => (link || '').toString().match(/^(\/)/);
export const isValidMail = (link) => (link || '').toString().match(/^(.+@.+\.[a-zAZ]+)$/);

const JSONToCSV = ({ data = [], delimiter = ',' }) => {
  const cols = data.length > 0 ? Object.keys(data[0]) : [];

  return [
    cols.join(delimiter),
    ...data.map((obj) => Object.keys(data[0]).reduce(
      (acc, key) => `${acc}${acc.length ? delimiter : ''}"${obj[key] || ''}"`,
      '',
    )),
  ].join('\n');
};

export const fileSaver = async ({
  data = [],
  type = 'csv',
  fileName = 'export',
  overrideConfig,
}) => {
  const config = {
    type: type === 'csv' ? 'data:text/csv' : 'application/json',
    fileExtension: type,
    ...overrideConfig,
  };
  const fixedData = type === 'csv' ? JSONToCSV({ data }) : JSON.stringify(data);

  const blob = new Blob([fixedData], { type: config.type });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = `${fileName}.${config.fileExtension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
