// Asurgent theme colors and values

const white = '#FFFFFF';
const black = '#000000';
const gray900 = '#1c1c1c';
const gray800 = '#3C3C3C';
const gray700 = '#5b5b5b';
const gray600 = '#6e6e6e'; // PRIMARY
const gray500 = '#979797';
const gray400 = '#b7b7b7';
const gray300 = '#DADADA';
const gray200 = '#EAEAEA';
const gray100 = '#F2F2F2';
const gray50 = '#F9F9F9';
const gold800 = '#CD9F35';
const gold50 = '#F9F3E6';
const blue900 = '#104866';
const blue800 = '#1A77A5';
const blue100 = '#A6D7F1';
const blue400 = '#44ADE1';
const blue50 = '#E5F4FB';
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
  blue800,
  blue400,
  blue100,
  blue50,
  gold50,
  gold800,
  ruby400,
  ruby800,
  rgba,

  asurgentPrimaryColor: blue400,
  asurgentSecondaryColor: gold800,

  /* Overwritable company colors */
  brandPrimaryColor: blue400,
  brandSecondaryColor: gold800,
  brandTertiaryColor: gold800,
  graphColorPrimary: blue400,
  graphColorSecondary: gold800,
  graphColorTertiary: gold800,
  /* Overwritable company colors */

  infoColor: blue400,
  warningColor: gold800,
  errorColor: ruby400,
  dangerColor: ruby800,
  oliveColor: olive800,
  okColor: olive700,
  disabledColor: gray500,
  neutralColor: gray600,
  inputBgColor: gray100,
  boxShadow: '0 0.2rem 0.4rem 0 hsla(0, 0%, 0%, 0.075)',
  boxShadowDarker: '0px 4px 4px rgba(0, 0, 0, 0.1)',
  borderRadius: '5px',

  fontFamily: '"Lato", sans-serif',
  fontWeightThin: 100,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightBold: 700,
  fontWeightBlack: 900,

  breakPointMobile: 57.6,
  breakPointTablet: 76.8,
  breakPointDesktop: 102.4,
  breakPointDesktop1K: 192,
  breakPointDesktop2K: 256,
  breakPointDesktop4K: 384,
};

export default defaultTheme;
