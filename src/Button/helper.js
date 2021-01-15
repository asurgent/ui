import queryString from 'query-string';

export const isExternalLink = (link) => (link || '').toString().match(/^(http(s)?:\/\/)/);
export const isInteralLink = (link) => (link || '').toString().match(/^(\/)/);
export const isValidMail = (link) => (link || '').toString().match(/^(.+@.+\.[a-zAZ]+)$/);

export const buildTableState = (overrideState, paramKey) => Object
  .entries(overrideState[paramKey])
  .reduce((state, [key, value]) => {
    if (key === 'search') {
      return `${state} ${encodeURIComponent(value)}`;
    }

    if (key === 'filter') {
      return `${state} ${key}:${btoa(JSON.stringify(value))}`;
    }

    return `${state} ${key}:${value}`;
  }, '').trim();

export const cleanUpSearchString = (clearStateKeys, overrideTableState, location) => {
  const search = queryString.parse(location.search);
  const paramSet = { ...search, ...overrideTableState };

  const result = Object.keys(paramSet)
    .reduce((acc, paramKey) => {
      // Logic that builds and overrides a state-key for table-state
      // It has to be returned first since its to override a existing state
      if (overrideTableState?.[paramKey]) {
        return {
          ...acc,
          [paramKey]: buildTableState(overrideTableState, paramKey),
        };
      }

      // State-keys that we want to remove from location.search
      if (Array.isArray(clearStateKeys) && clearStateKeys.includes(paramKey)) {
        return acc;
      }

      return {
        ...acc,
        [paramKey]: paramSet[paramKey],
      };
    }, {});

  return `?${queryString.stringify(result)}`;
};

const JSONToCSV = ({ data, delimiter = ',' }) => {
  if (!Array.isArray(data)
  || data?.length === 0
  || Object.keys(data[0])?.length === 0) {
    return null;
  }

  const cols = Object.keys(data[0]);
  return [
    cols.join(delimiter),
    ...data.map((obj) => cols.reduce(
      (acc, key) => `${acc}${acc.length ? delimiter : ''}"${obj[key] || ''}"`,
      '',
    )),
  ].join('\n');
};

const stringifyData = (d) => {
  try {
    return JSON.stringify(d);
  } catch (e) {
    return '';
  }
};

const getHandledData = (data, fileExtension) => {
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

const splitFileName = (fileName) => {
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
  const handledFileName = splitFileName(fileName);
  const handledData = getHandledData(data, handledFileName.extension);

  const blob = new Blob([handledData.data], { type: handledData.type });
  const href = await URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = href;
  link.download = `${handledFileName?.name}.${handledData.extension}`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
