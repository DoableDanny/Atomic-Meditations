import {useState, useEffect} from 'react';

import {
  STORAGE_KEYS,
  getStringData,
  storeStringData,
} from '../functions/asyncStorage';

const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  const {DARK_MODE} = STORAGE_KEYS;

  // Load users preferred theme.
  useEffect(() => {
    getStringData(DARK_MODE).then((data) => {
      if (data && data !== 'false') {
        setDarkMode(true);
      }
    });
  }, []);

  const updateDarkMode = (boolean) => {
    setDarkMode(DARK_MODE);
    storeStringData(boolean.toString());
  };

  return {
    darkMode,
    updateDarkMode,
  };
};

export default useTheme;
