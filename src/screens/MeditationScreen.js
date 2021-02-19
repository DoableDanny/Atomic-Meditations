import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Button from '../lib/components/Button';
import {theme} from '../lib/theme/theme';

const MeditationScreen = ({navigation, route}) => {
  // state param - isTimerOn => false
  // Press begin btn => setIsTimerOn => true
  // Display time
  // If time reaches 2 mins, display "you did it!" and the done btn
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const {currentMeditation} = route.params;

  const startTimer = () => {
    setInterval(() => {
      setSeconds((prevSecs) => prevSecs + 1);
    }, 1000);
  };

  useEffect(() => {
    if (isTimerOn) {
      startTimer();
    }
  }, [isTimerOn]);

  return (
    <View style={styles.container}>
      <Text style={styles.day}>{currentMeditation.title}</Text>

      <Text style={styles.time}>00 : 00: {seconds}</Text>

      {!isTimerOn && (
        <Button title="Begin" handlePress={() => setIsTimerOn(true)} />
      )}

      {seconds >= 120 && (
        <Button title="Done" handlePress={() => navigation.navigate('Home')} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    position: 'absolute',
    top: 16,
    fontSize: 20,
  },
  time: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 60,
  },
});

export default MeditationScreen;
