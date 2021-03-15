import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const StreakBanner = ({theme, currentStreakStat}) => {
  return (
    <>
      {!!currentStreakStat && (
        <View
          style={{
            ...styles.streakWrapper,
            backgroundColor: theme.colors.background,
          }}>
          <Text
            style={{...styles.streakText, color: theme.colors.textSecondary}}>
            Streak: {currentStreakStat}{' '}
            {currentStreakStat === 1 ? 'day' : 'days'}
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  streakWrapper: {
    backgroundColor: 'red',
    padding: 8,
    alignItems: 'center',
  },
  streakText: {
    fontSize: 18,
  },
});

export default StreakBanner;
