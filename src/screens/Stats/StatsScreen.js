import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {theme} from '../../lib/theme/theme';
import {hoursAndMinsString} from '../../lib/functions/displayHoursAndMins';

// Need to add streak and longest streak stats

const StatRow = ({statKey, statValue}) => {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statKey}>
        {statKey}: <Text style={styles.statValue}>{statValue}</Text>
      </Text>
    </View>
  );
};

const SettingsScreen = ({
  totalSessionsStat,
  totalTimeStat,
  lastMeditationDateStat,
}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.statsBlock}>
        <StatRow statKey="Total Sessions" statValue={totalSessionsStat} />
        <StatRow
          statKey="Total Time"
          statValue={hoursAndMinsString(totalTimeStat)}
        />
        <StatRow
          statKey="Average Time"
          statValue={hoursAndMinsString(totalTimeStat / totalSessionsStat)}
        />
      </View>
      <View style={styles.statsBlock}>
        <StatRow statKey="Current Streak" statValue="1 day" />
        <StatRow statKey="Longest Streak" statValue="3 days" />
        <StatRow statKey="Last Meditation" statValue={lastMeditationDateStat} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkGreen,
    padding: 16,
  },
  statsBlock: {
    alignItems: 'center',
    marginBottom: 24,
  },
  statRow: {
    paddingTop: 16,
  },
  statKey: {
    fontSize: 20,
    color: 'black',
  },
  statValue: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
});

export default SettingsScreen;
