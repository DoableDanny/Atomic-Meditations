import {useState, useEffect} from 'react';
import {
  STORAGE_KEYS,
  getMultiple,
  storeStringData,
} from '../functions/asyncStorage';

const {
  TOTAL_SESSIONS,
  TOTAL_TIME,
  LAST_MEDITATION_DATE,
  CURRENT_STREAK,
} = STORAGE_KEYS;

const useStats = () => {
  const [totalSessionsStat, setTotalSessionsStat] = useState(0);
  const [totalTimeStat, setTotalTimeStat] = useState(0);
  const [lastMeditationDateStat, setLastMeditationDateStat] = useState('-');
  const [currentStreakStat, setCurrentStreakStat] = useState(0);

  // Initial loading of stats data from async storage and setting of state.
  useEffect(() => {
    getMultiple([
      TOTAL_SESSIONS,
      TOTAL_TIME,
      LAST_MEDITATION_DATE,
      CURRENT_STREAK,
    ]).then((data) => {
      // If not null then set state.
      data[TOTAL_SESSIONS] &&
        setTotalSessionsStat(parseInt(data[TOTAL_SESSIONS]));

      data[TOTAL_TIME] && setTotalTimeStat(parseInt(data[TOTAL_TIME]));

      data[LAST_MEDITATION_DATE] &&
        setLastMeditationDateStat(data[LAST_MEDITATION_DATE]);

      const currentStreakData = parseInt(data[CURRENT_STREAK]);
      const lastMeditationDateData = data[LAST_MEDITATION_DATE];
      if (data[CURRENT_STREAK]) {
        // Check if lastMeditationDate === today or yesterday.
        const today = getFormattedDate(new Date());
        const yesterday = getFormattedDate(new Date(Date.now() - 86400000));

        console.log('today', today);
        console.log('yesterday', yesterday);
        console.log('dateLastMeditated', lastMeditationDateData);
        if (
          lastMeditationDateData === today ||
          lastMeditationDateData === yesterday
        ) {
          setCurrentStreakStat(currentStreakData);
        } else {
          // If user didn't meditate today or yesterday, then reset their streak.
          storeStringData(CURRENT_STREAK, '0');
          console.log('Reset users streak to 0');
        }
      }

      console.log(data);
    });
  }, []);

  const updateTotalSessionsStat = () => {
    setTotalSessionsStat((prev) => {
      storeStringData(TOTAL_SESSIONS, prev + 1);
      return prev + 1;
    });
  };

  const updateTotalTimeStat = (seconds) => {
    setTotalTimeStat((prev) => {
      storeStringData(TOTAL_TIME, prev + seconds);
      return prev + seconds;
    });
  };

  const updateLastMeditationDateStat = () => {
    const today = getFormattedDate(new Date());

    setLastMeditationDateStat(today);
    storeStringData(LAST_MEDITATION_DATE, today);
  };

  const getFormattedDate = (dateObj) => {
    const today = dateObj;

    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const updateCurrentStreakStat = (lastMeditationDate) => {
    const today = getFormattedDate(new Date());
    console.log('Today: ', today);
    console.log('LastMed', lastMeditationDate);

    if (today !== lastMeditationDate) {
      console.log('Adding 1 to streak...');

      setCurrentStreakStat((prev) => {
        storeStringData(CURRENT_STREAK, (prev + 1).toString());

        return prev + 1;
      });
    }
  };

  return {
    totalSessionsStat,
    updateTotalSessionsStat,
    totalTimeStat,
    updateTotalTimeStat,
    lastMeditationDateStat,
    updateLastMeditationDateStat,
    currentStreakStat,
    updateCurrentStreakStat,
  };
};

export default useStats;
