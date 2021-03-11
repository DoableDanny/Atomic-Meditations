import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import ThemeContext from '../../../lib/contexts/ThemeContext';

const SettingScaffold = ({title, description, children}) => {
  const theme = useContext(ThemeContext);
  const colors = theme.colors;

  return (
    <View style={styles.optionWrapper}>
      <Text style={{...styles.title, color: colors.textPrimary}}>{title}</Text>
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
    maxWidth: 600,
    alignSelf: 'stretch',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 18,
    lineHeight: 24,
  },
});

export default SettingScaffold;
