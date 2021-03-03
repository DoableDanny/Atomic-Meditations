import React, {useState, useEffect} from 'react';
import {ScrollView, Text, StyleSheet, View, Alert} from 'react-native';

import Button from '../../lib/components/Button';
import AdjustTimeModule from './components/AdjustTimeModule';
import ChooseSoundSetting from './components/ChooseSoundSetting';
import {theme} from '../../lib/theme/theme';

import PurchaseFullAppSetting from './components/PurchaseFullAppSetting';
import NotificationSetting from './components/NotificationSetting';

// Need a cancelReminderBtn

// Need a resetWholeAppBtn
// Need a resetMeditationsBtn
// Need a resetStatsBtn

const SettingsScreen = ({
  connected,
  products,
  purchase,
  isFullAppPurchased,
}) => {
  return (
    <ScrollView style={styles.container}>
      <NotificationSetting styles={styles} />

      <PurchaseFullAppSetting
        styles={styles}
        connected={connected}
        isFullAppPurchased={isFullAppPurchased}
        purchase={purchase}
      />

      <ChooseSoundSetting />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.darkGreen,
    flex: 1,
    padding: 16,
  },
  optionWrapper: {
    alignItems: 'center',
    marginVertical: 16,
  },
  heading: {
    textAlign: 'center',
    fontSize: 21,
  },
  description: {
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 16,
  },
  timesContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
});

export default SettingsScreen;
