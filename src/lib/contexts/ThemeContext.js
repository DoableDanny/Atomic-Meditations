import {createContext} from 'react';

const palette = {
  darkGreen: '#4CC94B',
  green: '#77DD76',
  lightGreen: '#9AE79C',
  blue: '#BBE3F1',
  yellow: '#FCFFC6',
  melon: '#F7B0AD',
  white: '#fff',
  black: '#000',
  cetaceanBlue: '#070b34',
  spaceCadet: '#141852',
  cosmicCobalt: '#2E327B',
  skyBlue: '#83d1f0',
  violetBlueCrayola: '#717CE5',
  // amethyst: '#a373c7',
  persianPink: '#FD84C7',
  wisteria: '#b9a0d3',
  lavenderFloral: '#a977cc',
};

export const theme = {
  colors: {
    navBannerColor: palette.darkGreen,
    background: palette.green,
    background2: palette.lightGreen,
    primary: palette.blue,
    secondary: palette.yellow,
    danger: palette.melon,
    text: palette.black,
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
    background2: palette.cosmicCobalt,
    primary: palette.skyBlue,
    secondary: palette.violetBlueCrayola,
    danger: palette.persianPink,
    textPrimary: palette.wisteria,
    textSecondary: palette.lavenderFloral,
    white: palette.white,
  },
};

const ThemeContext = createContext(theme);

export default ThemeContext;
