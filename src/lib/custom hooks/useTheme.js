import {useState, useEffect} from 'react';

import {
  STORAGE_KEYS,
  getStringData,
  storeBooleanData,
} from '../functions/asyncStorage';

const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  const {DARK_MODE} = STORAGE_KEYS;

  // Load users preferred theme.
  useEffect(() => {
    getStringData(DARK_MODE).then((data) => {
      console.log('Dark_MODE: ', data);
      if (data && data !== 'false') {
        setDarkMode(true);
      }
    });
  }, []);

  // Sets state & saves to storage.
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      console.log('prev: ', !prev);
      storeBooleanData(DARK_MODE, !prev);
      return !prev;
    });
  };

  return {
    darkMode,
    toggleDarkMode,
  };
};

export default useTheme;
