import React, {useContext} from 'react';
import {TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {theme} from '../../../lib/theme/theme';
import {hoursAndMinsString} from '../../../lib/functions/displayHoursAndMins';
import ThemeContext from '../../../lib/contexts/ThemeContext';

const MeditationModule = ({
  item,
  navigation,
  listLength,
  meditationsUnlocked,
  isFullAppPurchased,
}) => {
  const theme = useContext(ThemeContext);

  // Total meditation session seconds
  const seconds = item.completionTime;

  const handlePress = () => {
    // If meditation has been unlocked (if not we do nothing).
    if (item.id <= meditationsUnlocked + 1) {
      // If app's been purchased, or not purchased and the meditation is 1, 2, or 3
      if (isFullAppPurchased || (!isFullAppPurchased && item.id <= 3)) {
        // Then navigate to it.
        navigation.navigate('Meditation', {currentMeditation: item});
      } else if (!isFullAppPurchased && item.id > 3) {
        Alert.alert('Please purchase full app');
      }
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.meditationModule,
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
        <Icon name="lock-outline" size={40} color="rgba(0, 0, 0, 0.5)" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  meditationModule: {
    backgroundColor: theme.lightGreen,
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
