import React, {useContext} from 'react';
import {ScrollView, Button, StyleSheet, Switch} from 'react-native';

import ThemeContext from '../../lib/contexts/ThemeContext';
import ScreenContainer from '../../lib/components/ScreenContainer';

import ChooseSoundSetting from './components/ChooseSoundSetting';
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

  return (
    <ScreenContainer scrollable>
      <NotificationSetting />

      <PurchaseFullAppSetting
        connected={connected}
        isFullAppPurchased={isFullAppPurchased}
        purchase={purchase}
        currentPurchaseError={currentPurchaseError}
      />

      <ChooseSoundSetting />

      {/* Use a Switch */}
      <Button title="Toggle Dark Mode" onPress={toggleDarkMode} />

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
