import React, {useState, useEffect} from 'react';
import {
  STORAGE_KEYS,
  getMultiple,
  storeStringData,
} from '../functions/asyncStorage';

import {meditations} from './useMeditations';

const {TOTAL_SESSIONS, TOTAL_TIME} = STORAGE_KEYS;

const useStats = () => {
  const [totalSessionsStat, setTotalSessionsStat] = useState(0);
  const [totalTimeStat, setTotalTimeStat] = useState(0);

  // Initial loading of stats data from async storage and setting of state.
  useEffect(() => {
    getMultiple([TOTAL_SESSIONS, TOTAL_TIME]).then((data) => {
      // If not null then set state.
      data[TOTAL_SESSIONS] &&
        setTotalSessionsStat(parseInt(data[TOTAL_SESSIONS]));

      data[TOTAL_TIME] && setTotalTimeStat(parseInt(data[TOTAL_TIME]));

      console.log(data);
    });
  }, []);

  const updateTotalSessionsStat = () => {
    setTotalSessionsStat((prev) => {
      storeStringData(TOTAL_SESSIONS, prev + 1);
      return prev + 1;
    });
  };

  const updateTotalTimeStat = (id, seconds) => {
    setTotalTimeStat((prev) => {
      console.log('totalTime: ', prev);

      storeStringData(TOTAL_TIME, prev + seconds);
      return prev + seconds;
    });
  };

  return {
    totalSessionsStat,
    updateTotalSessionsStat,
    totalTimeStat,
    updateTotalTimeStat,
  };
};

export default useStats;
