import moment from 'moment';

export const sampleData = (sampleSize) => [...Array(sampleSize)].reduce((acc, cur, ind) => {
  const hasNoData = Math.floor(Math.random() * 4) === 0;

  if (hasNoData) {
    const entry = {
      date: moment(moment().subtract(sampleSize - ind, 'days')).format('YYYY-MM-DD'),
      value: Math.floor(Math.random() * 50),
    };
    return [...acc, entry];
  }
  return [...acc];
}, []);

export default sampleData;
