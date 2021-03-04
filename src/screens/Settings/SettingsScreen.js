import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import ChooseSoundSetting from './components/ChooseSoundSetting';
import {theme} from '../../lib/theme/theme';

import PurchaseFullAppSetting from './components/PurchaseFullAppSetting';
import NotificationSetting from './components/NotificationSetting';
import ResetSettings from './components/ResetSettings';

// Need a resetWholeAppBtn
// Need a resetMeditationsBtn
// Need a resetStatsBtn

const SettingsScreen = ({
  connected,
  purchase,
  currentPurchaseError,
  isFullAppPurchased,
  resetAllStats,
}) => {
  return (
    <ScrollView style={styles.container}>
      <NotificationSetting settingStyles={sharedSettingStyles} />

      <PurchaseFullAppSetting
        settingStyles={sharedSettingStyles}
        connected={connected}
        isFullAppPurchased={isFullAppPurchased}
        purchase={purchase}
        currentPurchaseError={currentPurchaseError}
      />

      <ChooseSoundSetting settingStyles={sharedSettingStyles} />

      <ResetSettings resetAllStats={resetAllStats} />
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
