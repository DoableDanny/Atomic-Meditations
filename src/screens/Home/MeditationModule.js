import React from 'react';
import {FlatList, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {theme} from '../../lib/theme/theme';
import {hoursAndMinsString} from '../../lib/functions/displayHoursAndMins';

const MeditationModule = ({
  item,
  navigation,
  listLength,
  meditationsUnlocked,
}) => {
  // Total meditation session seconds
  const seconds = item.completionTime;

  // const clockify = (seconds) => {
  //   const hours = Math.floor(seconds / 60 / 60);
  //   const mins = Math.round((seconds / 60) % 60);

  //   let displayHours = null;
  //   if (hours > 0) {
  //     displayHours = hours < 10 ? `0${hours}` : hours;
  //   }

  //   const displayMins = mins < 10 ? `0${mins}` : mins;

  //   return {
  //     displayHours,
  //     displayMins,
  //   };
  // };

  // // Convert to hours & mins to display
  // const hours = clockify(item.completionTime).displayHours;
  // const mins = clockify(item.completionTime).displayMins;
  return (
    <TouchableOpacity
      style={[
        styles.meditationModule,
        item.id == listLength && {marginBottom: 80},
      ]}
      onPress={() =>
        item.id <= meditationsUnlocked + 1 &&
        navigation.navigate('Meditation', {currentMeditation: item})
      }>
      {item.id <= meditationsUnlocked + 1 ? (
        <>
          <Text style={styles.text}>Day {item.id}</Text>
          <Text>{hoursAndMinsString(seconds)}</Text>
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
  text: {
    fontSize: 20,
  },
});

export default MeditationModule;
