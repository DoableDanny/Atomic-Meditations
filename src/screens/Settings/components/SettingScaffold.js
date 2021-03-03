import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SettingScaffold = ({title, description, children}) => {
  return (
    <View style={styles.optionWrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  optionWrapper: {
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 21,
  },
  description: {
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 16,
  },
});

export default SettingScaffold;
