import React from 'react';

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
