import moment from 'moment';

const nrOfEntries = 3600;
const data = Array.from(Array(nrOfEntries)).map((_, ind) => {
  const isNullValue = Math.floor(Math.random() * 5) === 0;
  const value = isNullValue ? null : Math.floor(Math.random() * 100);
  const timestamp = moment()
    .subtract(nrOfEntries / 2, 'minutes')
    .add(ind, 'minutes')
    .toISOString();
  return {
    value, timestamp, interval: 'm', dimensions: isNullValue ? null : ['provisioningState:Succeeded'],
  };
});

export default data;
