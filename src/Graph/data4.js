import moment from 'moment';

export const sampleData = (sampleSize) => [...Array(sampleSize)].reduce((acc, cur, ind) => {
  const hasNoData = Math.floor(Math.random() * 3) === 0;

  if (hasNoData) {
    const entry = {
      date: new Date(moment().subtract(sampleSize - ind, 'days')),
      value: Math.floor(Math.random() * 50),
    };
    return [...acc, entry];
  }
  return [...acc];
}, []);

export default sampleData;
