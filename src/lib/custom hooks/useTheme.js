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

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      storeStringData(DARK_MODE, !prev.toString());
      console.log('darkMode: ', !prev);
      return !prev;
    });
  };

  return {
    darkMode,
    toggleDarkMode,
  };
};

export default useTheme;
