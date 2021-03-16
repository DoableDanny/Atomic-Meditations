import React, {useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ThemeContext from '../../lib/contexts/ThemeContext';
import ScreenContainer from '../../lib/components/ScreenContainer';
import StatRow from './components/StatRow';
import {hoursAndMinsString} from '../../lib/functions/displayHoursAndMins';

const StatsScreen = ({
  totalSessionsStat,
  totalTimeStat,
  lastMeditationDateStat,
  currentStreakStat,
  shouldResetCurrentStreakStat,
  resetCurrentStreakStat,
  longestStreakStat,
}) => {
  const theme = useContext(ThemeContext);

  // If last meditation was not today or yesterday, reset current streak to 0
  useEffect(() => {
    if (shouldResetCurrentStreakStat(lastMeditationDateStat)) {
      resetCurrentStreakStat();
    }
  });

  return (
    <ScreenContainer>
      <View style={styles.statsBlock}>
        <StatRow statKey="Total Sessions" statValue={totalSessionsStat} />
        <StatRow
          statKey="Total Time"
          statValue={hoursAndMinsString(totalTimeStat)}
        />
        <StatRow
          statKey="Average Time"
          statValue={hoursAndMinsString(
            totalTimeStat ? totalTimeStat / totalSessionsStat : 0,
          )}
        />
      </View>
      <View style={styles.statsBlock}>
        <StatRow
          statKey="Current Streak"
          statValue={`${currentStreakStat} ${
            currentStreakStat === 1 ? 'day' : 'days'
          }`}
        />
        <StatRow
          statKey="Longest Streak"
          statValue={`${longestStreakStat} ${
            longestStreakStat === 1 ? 'day' : 'days'
          }`}
        />
        <StatRow statKey="Last Meditation" statValue={lastMeditationDateStat} />
      </View>

      <Icon
        name="stats-chart-outline"
        color={theme.colors.secondary}
        size={60}
        style={styles.icon}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  statsBlock: {
    alignItems: 'center',
    marginBottom: 32,
  },
  icon: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
});

export default StatsScreen;
