import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import ThemeContext from '../../../lib/contexts/ThemeContext';

const SettingScaffold = ({title, description, children}) => {
  const theme = useContext(ThemeContext);
  const colors = theme.colors;

  return (
    <View style={styles.optionWrapper}>
      <Text style={{...styles.title, color: colors.primary}}>{title}</Text>
      <Text style={{...styles.description, color: colors.textPrimary}}>
        {description}
      </Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  optionWrapper: {
    alignItems: 'center',
    marginVertical: 24,
  },
  title: {
    textAlign: 'center',
    fontSize: 23,
  },
  description: {
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 17,
    lineHeight: 22,
  },
});

export default SettingScaffold;
