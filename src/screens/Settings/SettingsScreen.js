import React, {useEffect} from 'react';
import crashlytics from '@react-native-firebase/crashlytics';

import ScreenContainer from '../../lib/components/ScreenContainer';

import {
  SoundSetting,
  PurchaseFullAppSetting,
  NotificationSetting,
  ResetSettings,
  DarkModeSetting,
} from './components/individualSettings';

const SettingsScreen = ({
  navigation,
  connected,
  purchase,
  currentPurchaseError,
  isFullAppPurchased,
  resetAllStats,
  resetAllMeditationCompletionTimes,
  meditations,
  darkMode,
  toggleDarkMode,
}) => {
  useEffect(() => {
    crashlytics().log('Settings Screen mounted');
  }, []);

  return (
    <ScreenContainer
      scrollable
      contentContainerStyle={{
        alignSelf: 'center',
      }}>
      <DarkModeSetting toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      <SoundSetting />

      <NotificationSetting />

      <PurchaseFullAppSetting
        connected={connected}
        isFullAppPurchased={isFullAppPurchased}
        purchase={purchase}
        currentPurchaseError={currentPurchaseError}
      />

      <ResetSettings
        navigation={navigation}
        resetAllStats={resetAllStats}
        resetAllMeditationCompletionTimes={resetAllMeditationCompletionTimes}
        meditations={meditations}
      />
    </ScreenContainer>
  );
};

export default SettingsScreen;
