import React, {useState, useEffect} from 'react';
import {
  STORAGE_KEYS,
  getMultiple,
  storeStringData,
} from '../functions/asyncStorage';

// App.js -> useStats componentDidMount -> getAllStatsAndSetStates
// -> pass states to necessary screens

// TimerScreen time up -> add one to unlockedMeditations state and save

const {TOTAL_SESSIONS} = STORAGE_KEYS;

const useStats = () => {
  // Initially just day 1 unlocked
  const [totalSessionsStat, setTotalSessionsStat] = useState(0);

  // Initial loading of stats data from async storage and setting of state.
  useEffect(() => {
    getMultiple([TOTAL_SESSIONS]).then((data) => {
      data[TOTAL_SESSIONS] &&
        setTotalSessionsStat(parseInt(data[TOTAL_SESSIONS]));
    });
  }, []);

  const updateTotalSessionsStat = () => {
    setTotalSessionsStat((prev) => {
      storeStringData(TOTAL_SESSIONS, prev + 1);
      return prev + 1;
    });
  };

  return {
    totalSessionsStat,
    updateTotalSessionsStat,
  };
};

export default useStats;
