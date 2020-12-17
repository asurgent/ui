import moment from 'moment';

const sampleSize = 30;
const sample = [...Array(sampleSize)].map((_, ind) => ({
  date: new Date(moment().subtract(sampleSize - ind, 'days')),
  value: Math.floor(Math.random() * 5) === 0 ? 0 : Math.floor(Math.random() * 50),
}));

const sortedSamples = sample.sort((a, b) => new Date(a.Date) - new Date(b.Date));

export default sortedSamples;
