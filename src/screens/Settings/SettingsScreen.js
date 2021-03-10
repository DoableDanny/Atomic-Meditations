import React from 'react';

import ScreenContainer from '../../lib/components/ScreenContainer';

import ChooseSoundSetting from './components/ChooseSoundSetting';
import PurchaseFullAppSetting from './components/PurchaseFullAppSetting';
import NotificationSetting from './components/NotificationSetting';
import ResetSettings from './components/ResetSettings';
import DarkModeSetting from './components/DarkModeSetting';

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
    <ScreenContainer scrollable>
      <PurchaseFullAppSetting
        connected={connected}
        isFullAppPurchased={isFullAppPurchased}
        purchase={purchase}
        currentPurchaseError={currentPurchaseError}
      />

      <NotificationSetting />

      <DarkModeSetting toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      <ChooseSoundSetting />

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
