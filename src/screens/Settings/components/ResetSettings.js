import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import SettingScaffold from './SettingScaffold';
import Button from '../../../lib/components/Button';

const ResetSettings = ({resetAllStats}) => {
  return (
    <SettingScaffold
      title="Reset Stats"
      description="Reset all of your stats. Your meditation progress will remain.">
      <Button
        title="Reset Stats"
        btnStyle="danger"
        handlePress={resetAllStats}
      />
    </SettingScaffold>
  );
};

export default ResetSettings;
