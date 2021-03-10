import React, {useContext} from 'react';
import {Text, StyleSheet, View} from 'react-native';

import ArrowButton from '../../../lib/components/ArrowButton';
import ThemeContext from '../../../lib/contexts/ThemeContext';

const AdjustTimeModule = ({time, addOne, minusOne}) => {
  const theme = useContext(ThemeContext);

  return (
    <View style={styles.timeSelectWrapper}>
      <ArrowButton iconName="keyboard-arrow-up" handlePress={addOne} />
      <Text style={{...styles.timeText, color: theme.colors.primary}}>
        {time}
      </Text>
      <ArrowButton iconName="keyboard-arrow-down" handlePress={minusOne} />
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
