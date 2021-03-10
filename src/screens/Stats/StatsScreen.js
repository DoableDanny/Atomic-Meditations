import React, {useEffect, useContext} from 'react';
import {Text, StyleSheet, View} from 'react-native';

import ThemeContext from '../../lib/contexts/ThemeContext';
import ScreenContainer from '../../lib/components/ScreenContainer';
import {hoursAndMinsString} from '../../lib/functions/displayHoursAndMins';

const StatRow = ({statKey, statValue}) => {
  const theme = useContext(ThemeContext);
  const colors = theme.colors;

  return (
    <View style={styles.statRow}>
      <Text style={{...styles.statKey, color: colors.textSecondary}}>
        {statKey}:{' '}
        <Text style={{...styles.statValue, color: colors.textPrimary}}>
          {statValue}
        </Text>
      </Text>
    </View>
  );
};

const StatsScreen = ({
  totalSessionsStat,
  totalTimeStat,
  lastMeditationDateStat,
  currentStreakStat,
  shouldResetCurrentStreakStat,
  resetCurrentStreakStat,
  longestStreakStat,
}) => {
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
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  statsBlock: {
    alignItems: 'center',
    marginBottom: 24,
  },
  statRow: {
    paddingTop: 16,
  },
  statKey: {
    fontSize: 21,
  },
});

export default StatsScreen;
