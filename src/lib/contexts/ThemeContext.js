import {createContext} from 'react';

const palette = {
  tuftsBlue: '#1B93E3',
  blueJeans: '#40a5e9',
  cyanProcess: '#3eb1eb',
  emeraldGreen: '#51D26D',
  lavenderBlue: '#D6D4FA',
  aliceBlue: '#f7fcfe',
  lightBlue: '#B9E5F6',
  tartOrange: '#EE5959',
  white: '#fff',
  black: '#000',
  cetaceanBlue: '#070b34',
  spaceCadet: '#141852',
  cosmicCobalt: '#2E327B',
  skyBlue: '#83d1f0',
  violetBlueCrayola: '#717CE5',
  persianPink: '#FD84C7',
  wisteria: '#b9a0d3',
  lavenderFloral: '#a977cc',
};

export const theme = {
  colors: {
    navBannerColor: palette.tuftsBlue,
    background: palette.blueJeans,
    background2: palette.cyanProcess,
    primary: palette.emeraldGreen,
    secondary: palette.lavenderBlue,
    danger: palette.tartOrange,
    textPrimary: palette.aliceBlue,
    textSecondary: palette.lightBlue,
    white: palette.white,
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
