import React from 'react';
import {Alert} from 'react-native';

import SettingScaffold from './SettingScaffold';
import Button from '../../../lib/components/Button';

const ResetSettings = ({navigation, resetAllStats}) => {
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
          text: `I'm sure`,
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
          text: `I'm sure`,
          onPress: () =>
            navigation.navigate('Home', {resetCompletionTimes: true}),
        },
      ],
    );
  };

  const handleRelockMeditations = () => {
    Alert.alert(
      `Are you sure?`,
      `This will permanently re-lock all meditations but day 1. Your stats and completion times will remain.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: `I'm sure`,
          onPress: () => navigation.navigate('Home', {relockMeditations: true}),
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
      <SettingScaffold
        title="Re-lock Meditations"
        description="All days but day 1 will be locked. Your stats and completion times will remain saved. If you purchased the app, all days will still be unlockable.">
        <Button
          title="Re-lock Meditations"
          btnStyle="danger"
          handlePress={handleRelockMeditations}
        />
      </SettingScaffold>
    </>
  );
};

export default ResetSettings;
