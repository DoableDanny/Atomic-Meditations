import React from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';

import SettingScaffold from './SettingScaffold';
import Button from '../../../lib/components/Button';

const ResetSettings = ({resetAllStats}) => {
  const handleResetStats = () => {
    Alert.alert(
      `Are you sure?`,
      `This will permanently delete all your stats data. Your unlocked meditations will remain.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Delete', onPress: resetAllStats},
      ],
    );
  };

  return (
    <SettingScaffold
      title="Reset Stats"
      description="Reset all of your stats. Your meditation progress will remain.">
      <Button
        title="Reset Stats"
        btnStyle="danger"
        handlePress={handleResetStats}
      />
    </SettingScaffold>
  );
};

export default ResetSettings;
