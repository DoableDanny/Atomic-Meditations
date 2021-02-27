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
  LONGEST_STREAK,
} = STORAGE_KEYS;

const useStats = () => {
  const [totalSessionsStat, setTotalSessionsStat] = useState(0);
  const [totalTimeStat, setTotalTimeStat] = useState(0);
  const [lastMeditationDateStat, setLastMeditationDateStat] = useState('-');
  const [currentStreakStat, setCurrentStreakStat] = useState(0);
  const [longestStreakStat, setLongestStreakStat] = useState(0);

  // Initial loading of stats data from async storage and setting of state.
  useEffect(() => {
    getMultiple([
      TOTAL_SESSIONS,
      TOTAL_TIME,
      LAST_MEDITATION_DATE,
      CURRENT_STREAK,
      LONGEST_STREAK,
    ]).then((data) => {
      // If not null then set state.
      data[TOTAL_SESSIONS] &&
        setTotalSessionsStat(parseInt(data[TOTAL_SESSIONS]));

      data[TOTAL_TIME] && setTotalTimeStat(parseInt(data[TOTAL_TIME]));

      data[LAST_MEDITATION_DATE] &&
        setLastMeditationDateStat(data[LAST_MEDITATION_DATE]);

      // If last meditation was not today or yesterday, reset streak to 0 days.
      if (data[CURRENT_STREAK]) {
        if (shouldResetCurrentStreakStat(data[LAST_MEDITATION_DATE])) {
          console.log('Should reset');
          resetCurrentStreakStat();
        } else {
          console.log('should not reset');
          setCurrentStreakStat(parseInt(data[CURRENT_STREAK]));
        }
      }

      data[LONGEST_STREAK] &&
        setLongestStreakStat(parseInt(data[LONGEST_STREAK]));

      console.log(data);
    });
  }, []);

  const shouldResetCurrentStreakStat = (lastMeditationDateData) => {
    const today = getFormattedDate(new Date());
    const yesterday = getFormattedDate(new Date(Date.now() - 86400000));

    console.log('today', today);
    console.log('yesterday', yesterday);
    console.log('lastMedDate', lastMeditationDateData);

    if (
      lastMeditationDateData === today ||
      lastMeditationDateData === yesterday
    ) {
      return false;
    }

    return true;
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

  const resetCurrentStreakStat = () => {
    setCurrentStreakStat(0);
    storeStringData(CURRENT_STREAK, '0');
  };

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

  const updateCurrentStreakStat = (lastMeditationDate) => {
    const today = getFormattedDate(new Date());
    const yesterday = getFormattedDate(new Date(Date.now() - 86400000));

    // If lastMeditation = today => do nothing
    if (today !== lastMeditationDate) {
      // If lastMeditation = yesterday => add 1 to streak
      if (yesterday === lastMeditationDate) {
        setCurrentStreakStat((prev) => {
          storeStringData(CURRENT_STREAK, prev + 1);

          updateLongestStreakStat(prev + 1);

          return prev + 1;
        });
        // If first ever meditation or lastMeditation >= 2 days ago => setStreak to 1
      } else {
        setCurrentStreakStat(1);
        storeStringData(CURRENT_STREAK, '1');
      }
    }
  };

  const updateLongestStreakStat = (newCurrentStreak) => {
    if (newCurrentStreak > longestStreakStat) {
      setLongestStreakStat(newCurrentStreak);

      storeStringData(LONGEST_STREAK, newCurrentStreak.toString());
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
    shouldResetCurrentStreakStat,
    resetCurrentStreakStat,
    longestStreakStat,
  };
};

export default useStats;
