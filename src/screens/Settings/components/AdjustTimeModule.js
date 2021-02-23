import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import AdjustTimeBtn from '../../../lib/components/AdjustTimeBtn';

const AdjustTimeModule = ({time, addOne, minusOne}) => {
  return (
    <View style={styles.timeSelectWrapper}>
      <AdjustTimeBtn iconName="keyboard-arrow-up" handlePress={addOne} />
      <Text style={styles.timeText}>{time}</Text>
      <AdjustTimeBtn iconName="keyboard-arrow-down" handlePress={minusOne} />
    </View>
  );
};

const styles = StyleSheet.create({
  timeSelectWrapper: {
    alignItems: 'center',
    margin: 4,
  },
  timeText: {
    fontSize: 18,
    marginVertical: 16,
  },
});

export default AdjustTimeModule;
