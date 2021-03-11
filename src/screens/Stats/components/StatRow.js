import React, {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import ThemeContext from '../../../lib/contexts/ThemeContext';

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

const styles = StyleSheet.create({
  statRow: {
    paddingTop: 24,
  },
  statKey: {
    fontSize: 21,
  },
});

export default StatRow;
