import {ThemeProvider} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {theme} from '../../lib/theme/theme';

const StatRow = ({statKey, statValue}) => {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statKey}>
        {statKey}: <Text style={styles.statValue}>{statValue}</Text>
      </Text>
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.statsBlock}>
        <StatRow statKey="Total Sessions" statValue="18" />
        <StatRow statKey="Total Time" statValue="18 hours" />
        <StatRow statKey="Average Time" statValue="6 mins" />
      </View>
      <View style={styles.statsBlock}>
        <StatRow statKey="Current Streak" statValue="1 day" />
        <StatRow statKey="Longest Streak" statValue="3 days" />
        <StatRow statKey="Last Meditation" statValue="Wed Sep 30 2020" />
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
