import React, {useState, useEffect} from 'react';
import {
  STORAGE_KEYS,
  getMultiple,
  storeStringData,
} from '../functions/asyncStorage';

import {meditations} from './useMeditations';

const {TOTAL_SESSIONS, TOTAL_TIME, LAST_MEDITATION_DATE} = STORAGE_KEYS;

const useStats = () => {
  const [totalSessionsStat, setTotalSessionsStat] = useState(0);
  const [totalTimeStat, setTotalTimeStat] = useState(0);
  const [lastMeditationDateStat, setLastMeditationDateStat] = useState('-');

  // Initial loading of stats data from async storage and setting of state.
  useEffect(() => {
    getMultiple([TOTAL_SESSIONS, TOTAL_TIME, LAST_MEDITATION_DATE]).then(
      (data) => {
        // If not null then set state.
        data[TOTAL_SESSIONS] &&
          setTotalSessionsStat(parseInt(data[TOTAL_SESSIONS]));

        data[TOTAL_TIME] && setTotalTimeStat(parseInt(data[TOTAL_TIME]));

        data[LAST_MEDITATION_DATE] &&
          setLastMeditationDateStat(data[LAST_MEDITATION_DATE]);

        console.log(data);
      },
    );
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

  const updateLastMeditationDateStat = () => {
    const today = new Date();

    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

    setLastMeditationDateStat(formattedDate);
    storeStringData(LAST_MEDITATION_DATE, formattedDate);
  };

  return {
    totalSessionsStat,
    updateTotalSessionsStat,
    totalTimeStat,
    updateTotalTimeStat,
    lastMeditationDateStat,
    updateLastMeditationDateStat,
  };
};

export default useStats;
