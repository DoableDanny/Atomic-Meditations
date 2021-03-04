import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import ChooseSoundSetting from './components/ChooseSoundSetting';
import {theme} from '../../lib/theme/theme';

import PurchaseFullAppSetting from './components/PurchaseFullAppSetting';
import NotificationSetting from './components/NotificationSetting';

// Need a cancelReminderBtn

// Need a resetWholeAppBtn
// Need a resetMeditationsBtn
// Need a resetStatsBtn

const SettingsScreen = ({
  connected,
  purchase,
  currentPurchaseError,
  isFullAppPurchased,
}) => {
  return (
    <ScrollView style={styles.container}>
      <NotificationSetting styles={sharedSettingStyles} />

      <PurchaseFullAppSetting
        styles={sharedSettingStyles}
        connected={connected}
        isFullAppPurchased={isFullAppPurchased}
        purchase={purchase}
        currentPurchaseError={currentPurchaseError}
      />

      <ChooseSoundSetting />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.darkGreen,
    flex: 1,
    padding: 16,
  },
});

const sharedSettingStyles = StyleSheet.create({
  message: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
  },
});

export default SettingsScreen;
