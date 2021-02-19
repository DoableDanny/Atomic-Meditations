/**
 * Color theme: https://www.schemecolor.com/pastel-green-blue-yellow.php
 */

import React from 'react';

import {theme, ThemeContext} from './src/lib/theme/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <ThemeContext.Provider value={theme}>
      <HomeScreen />
    </ThemeContext.Provider>
  );
};

export default App;
