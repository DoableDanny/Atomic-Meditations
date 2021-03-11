import React, {useContext} from 'react';
import {Text, StyleSheet, View} from 'react-native';

import ArrowButton from '../../../lib/components/ArrowButton';
import ThemeContext from '../../../lib/contexts/ThemeContext';

const AdjustTimeModule = ({time, addOne, minusOne}) => {
  const theme = useContext(ThemeContext);

  return (
    <View style={styles.timeSelectWrapper}>
      <ArrowButton direction="up" handlePress={addOne} />
      <Text style={{...styles.timeText, color: theme.colors.textPrimary}}>
        {time}
      </Text>
      <ArrowButton direction="down" handlePress={minusOne} />
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
    fontWeight: 'bold',
  },
});

export default AdjustTimeModule;
