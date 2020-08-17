// Asurgent theme colors and values

const white = '#FFFFFF';
const black = '#000000';
const gray900 = '#1c1c1c';
const gray800 = '#3C3C3C';
const gray700 = '#5b5b5b';
const gray600 = '#6e6e6e';
const gray500 = '#979797';
const gray400 = '#b7b7b7';
const gray300 = '#DADADA';
const gray200 = '#EAEAEA';
const gray100 = '#F2F2F2';
const gray50 = '#F9F9F9';

const gold900 = '#b48b2c';
const gold800 = '#cd9f35';
const gold700 = '#d0a543';
const gold600 = '#d7b25e';
const gold500 = '#debf79';
const gold400 = '#e5cc94';
const gold300 = '#edb9b0';
const gold200 = '#f2e6cb';
const gold100 = '#f5edd8';
const gold50 = '#F9F3E6';

const blue900 = '#153B5C';
const blue800 = '#20557C';
const blue700 = '#1A77A5';
const blue400 = '#44ADE1';
const blue100 = '#A6D7F1';
const blue50 = '#E5F4FB';

const ruby100 = '#f8bfbe';
const ruby400 = '#EF6461';
const ruby800 = '#C62929';

const olive700 = '#A3B551';
const olive800 = '#85943F';

const rgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
};


const defaultTheme = {
  white,
  black,
  gray900,
  gray800,
  gray700,
  gray600,
  gray500,
  gray400,
  gray300,
  gray200,
  gray100,
  gray50,
  blue900,
  blue700,
  blue800,
  blue400,
  blue100,
  blue50,
  gold900,
  gold800,
  gold700,
  gold600,
  gold500,
  gold400,
  gold300,
  gold200,
  gold100,
  gold50,
  ruby800,
  ruby400,
  ruby100,
  olive800,
  olive700,
  rgba,
  breakPointMobile: 57.6,
  breakPointTablet: 76.8,
  breakPointDesktop: 102.4,
  breakPointDesktop1K: 192,
  breakPointDesktop2K: 256,
  breakPointDesktop4K: 384,
};

export default defaultTheme;
