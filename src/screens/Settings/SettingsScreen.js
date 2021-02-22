import {ThemeProvider} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Button} from 'react-native';

import {theme} from '../../lib/theme/theme';
import {localNotificationSchedule} from '../../lib/functions/pushNotification';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button title="Notify" onPress={localNotificationSchedule} />
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
