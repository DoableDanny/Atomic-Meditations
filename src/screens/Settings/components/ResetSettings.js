import React from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';

import SettingScaffold from './SettingScaffold';
import Button from '../../../lib/components/Button';

const ResetSettings = ({
  navigation,
  resetAllStats,
  resetAllMeditationCompletionTimes,
  meditations,
}) => {
  const handleResetStats = () => {
    Alert.alert(
      `Are you sure?`,
      `This will permanently delete all your stats data. Your unlocked meditations will remain.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            resetAllStats();
            Alert.alert('Deleted', 'Your stats have all been reset.');
          },
        },
      ],
    );
  };

  const handleResetTimes = () => {
    Alert.alert(
      `Are you sure?`,
      `This will permanently reset all meditation completion times to 00 mins. Your unlocked meditations will remain.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () =>
            navigation.navigate('Home', {resetCompletionTimes: true}),
        },
      ],
    );
  };

  return (
    <>
      <SettingScaffold
        title="Reset Stats"
        description="Reset all of your stats. Unlocked meditations and completion times will remain.">
        <Button
          title="Reset Stats"
          btnStyle="danger"
          handlePress={handleResetStats}
        />
      </SettingScaffold>
      <SettingScaffold
        title="Reset Meditation Completion Times"
        description="All meditation completion times will be reset to 00. Unlocked meditations will remain.">
        <Button
          title="Reset Times"
          btnStyle="danger"
          handlePress={handleResetTimes}
        />
      </SettingScaffold>
    </>
  );
};

export default ResetSettings;
