import moment from 'moment';

export const sampleData = (sampleSize) => [...Array(sampleSize)]
  .reduce((acc, _, index) => {
    // create holes in the data every X entry
    const hasNoData = Math.floor(Math.random() * 10) === 0;

    if (!hasNoData) { // !hasNoData
      const dateOffset = moment().subtract(index, 'days');
      const entry = {
        date: moment(dateOffset).format('YYYY-MM-DD'),
        value: Math.floor(Math.random() * 50),
      };
      return [...acc, entry];
    }
    return [...acc];
  }, []);

export default sampleData;
