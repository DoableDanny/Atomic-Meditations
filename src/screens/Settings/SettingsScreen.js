import {ThemeProvider} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

import {theme} from '../../lib/theme/theme';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.darkGreen,
    flex: 1,
  },
});

export default SettingsScreen;
