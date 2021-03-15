import React, {useContext} from 'react';
import {TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {hoursAndMinsString} from '../../../lib/functions/displayHoursAndMins';
import ThemeContext from '../../../lib/contexts/ThemeContext';

const MeditationModule = ({
  item,
  navigation,
  listLength,
  meditationsUnlocked,
  isFullAppPurchased,
  currentStreakStat,
}) => {
  const theme = useContext(ThemeContext);

  // Total meditation session seconds
  const seconds = item.completionTime;

  const handlePress = () => {
    // If meditation has been unlocked (if not we do nothing).
    if (item.id <= meditationsUnlocked + 1) {
      // If app's been purchased, or not purchased and the meditation is 1, 2, or 3
      if (isFullAppPurchased || (!isFullAppPurchased && item.id <= 3)) {
        // If day 1, show Intro screen, otherwise navigate to the meditation.
        item.id == '1'
          ? navigation.navigate('Intro', {currentMeditation: item})
          : navigation.navigate('Meditation', {currentMeditation: item});
      } else {
        Alert.alert(
          'Please Purchase the Full App',
          `You're doing great! Let's continue developing this habit and purchase the full app. It doesn't cost much and supports this app's development!`,
          [
            {
              text: 'Another time',
              style: 'cancel',
            },
            {
              text: `Let's do it!`,
              onPress: () => {
                navigation.navigate('Settings');
              },
            },
          ],
        );
      }
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.meditationModule,
        item.id == '1' && !currentStreakStat && {marginTop: 32},
        item.id == listLength && {marginBottom: 80},
        {backgroundColor: theme.colors.background2},
      ]}
      onPress={handlePress}>
      {item.id <= meditationsUnlocked + 1 ? (
        <>
          <Text style={{...styles.textDay, color: theme.colors.textPrimary}}>
            Day {item.id}
          </Text>
          <Text style={{...styles.textTime, color: theme.colors.textSecondary}}>
            {hoursAndMinsString(seconds)}
          </Text>
        </>
      ) : (
        <Icon name="lock-outline" size={40} color="rgba(255, 255, 255, 0.25)" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  meditationModule: {
    padding: 35,
    maxHeight: 100,
    borderRadius: 32,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDay: {
    fontSize: 20,
    margin: 4,
  },
  textTime: {
    fontSize: 18,
  },
});

export default MeditationModule;
