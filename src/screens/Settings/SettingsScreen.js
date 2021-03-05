import React, {useContext} from 'react';
import {ScrollView, Button, StyleSheet} from 'react-native';

import ThemeContext from '../../lib/contexts/ThemeContext';
import ChooseSoundSetting from './components/ChooseSoundSetting';
// import {theme} from '../../lib/theme/theme';

import PurchaseFullAppSetting from './components/PurchaseFullAppSetting';
import NotificationSetting from './components/NotificationSetting';
import ResetSettings from './components/ResetSettings';

const SettingsScreen = ({
  navigation,
  connected,
  purchase,
  currentPurchaseError,
  isFullAppPurchased,
  resetAllStats,
  resetAllMeditationCompletionTimes,
  meditations,
  toggleDarkMode,
}) => {
  const theme = useContext(ThemeContext);

  console.log('theme: ', theme);

  return (
    <ScrollView
      style={{...styles.container, backgroundColor: theme.colors.background}}>
      <NotificationSetting settingStyles={sharedSettingStyles} />

      <PurchaseFullAppSetting
        settingStyles={sharedSettingStyles}
        connected={connected}
        isFullAppPurchased={isFullAppPurchased}
        purchase={purchase}
        currentPurchaseError={currentPurchaseError}
      />

      <ChooseSoundSetting settingStyles={sharedSettingStyles} />

      <Button title="Toggle Dark Mode" onPress={toggleDarkMode} />

      <ResetSettings
        navigation={navigation}
        resetAllStats={resetAllStats}
        resetAllMeditationCompletionTimes={resetAllMeditationCompletionTimes}
        meditations={meditations}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
