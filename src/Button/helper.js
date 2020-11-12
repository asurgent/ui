export const isExternalLink = (link) => (link || '').toString().match(/^(http(s)?:\/\/)/);
export const isInteralLink = (link) => (link || '').toString().match(/^(\/)/);
export const isValidMail = (link) => (link || '').toString().match(/^(.+@.+\.[a-zAZ]+)$/);

const JSONToCSV = ({ data, delimiter = ',' }) => {
  if (!Array.isArray(data)
  || data?.length === 0
  || Object.keys(data[0])?.length === 0) {
    return null;
  }

  const cols = Object.keys(data[0]);
  const res = [
    cols.join(delimiter),
    ...data.map((obj) => cols.reduce(
      (acc, key) => `${acc}${acc.length ? delimiter : ''}"${obj[key] || ''}"`,
      '',
    )),
  ].join('\n');

  return res;
};

const stringifyData = (d) => {
  try {
    return JSON.stringify(d);
  } catch (e) {
    return '';
  }
};

const getHandledData = (data, fileExtension) => {
  if (!data) {
    return { data: 'no data', type: 'text/plain', extension: 'txt' };
  }

  switch (fileExtension) {
    case 'csv':
      return {
        data: JSONToCSV({ data }) || stringifyData(data),
        type: 'text/csv',
        extension: 'csv',
      };
    case 'json':
      return {
        data: stringifyData(data),
        type: 'application/json',
        extension: 'json',
      };
    default:
      return { data: stringifyData(data), type: 'text/plain', extension: 'txt' };
  }
};

const getHandledFileName = (fileName) => {
  const extension = fileName?.split('.').pop();
  if (['csv', 'json'].includes(extension)) {
    const nameWithoutExtension = fileName?.slice(0, fileName.length - (extension.length + 1));
    return {
      extension,
      name: nameWithoutExtension,
    };
  }
  return { extension: 'txt', name: fileName };
};

export const fileSaver = async ({ data, fileName = 'export.csv' }) => {
  const handledFileName = getHandledFileName(fileName);
  const handledData = getHandledData(data, handledFileName.extension);

  const blob = new Blob([handledData.data], { type: handledData.type });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = `${handledFileName?.name}.${handledFileName.extension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
