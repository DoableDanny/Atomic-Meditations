import {createContext} from 'react';

const palette = {
  darkGreen: '#4CC94B',
  green: '#77DD76',
  lightGreen: '#9AE79C',
  blue: '#BBE3F1',
  yellow: '#FCFFC6',
  melon: '#F7B0AD',
  cetaceanBlue: '#070b34',
  spaceCadet: '#141852',
  stPatricksBlue: '#2b2f77',
  chineseViolet: '#855988',
  russianGreen: '#598865',
};

export const theme = {
  colors: {
    navBannerColor: palette.darkGreen,
    background: palette.green,
    background2: palette.lightGreen,
    primary: palette.blue,
    secondary: palette.yellow,
    danger: palette.melon,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontSize: 26,
      fontWeight: 'bold',
    },
    body: {
      fontSize: 19,
    },
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    navBannerColor: palette.cetaceanBlue,
    background: palette.spaceCadet,
    background2: palette.stPatricksBlue,
    primary: palette.chineseViolet,
    secondary: palette.russianGreen,
    danger: palette.melon,
  },
};

const ThemeContext = createContext(theme);

export default ThemeContext;
