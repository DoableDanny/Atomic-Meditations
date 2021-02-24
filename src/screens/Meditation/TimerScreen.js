import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

import Button from '../../lib/components/Button';
import useTrackPlayer from '../../lib/custom hooks/useTrackPlayer';

// Need to add a stop sound btn

const TimerScreen = ({
  clockify,
  alarmRingSeconds,
  setHeaderMsg,
  navigation,
  currentMeditation,
  meditationsUnlocked,
  unlockNextMeditation,
  totalMeditationsInApp,
  updateTotalSessionsStat,
}) => {
  const [seconds, setSeconds] = useState(0);
  const {playSound, stopSound, setUpTrackPlayer} = useTrackPlayer();

  console.log('totalmedsinapp', totalMeditationsInApp);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSeconds((prevSecs) => prevSecs + 1);
    }, 8);
  };

  const setUpTrackPlayerAndPlaySound = async () => {
    await setUpTrackPlayer;
    playSound();
  };

  useEffect(() => {
    if (seconds === alarmRingSeconds) {
      try {
        playSound();
      } catch (e) {
        console.log(e);
        // Track player may need re-setting up if long meditation (just to be safe)
        setUpTrackPlayerAndPlaySound();
      }

      // setHeaderMsg('Goal time reached, great job!');

      // setTimeout(() => {
      //   setHeaderMsg('Feel free to continue meditating...');
      // }, 4000);

      // setTimeout(() => {
      //   setHeaderMsg('');
      // }, 8000);

      // Check if should unlock next meditation
      if (
        parseInt(currentMeditation.id) > meditationsUnlocked &&
        meditationsUnlocked < totalMeditationsInApp - 1
      ) {
        unlockNextMeditation(currentMeditation.id);
      }

      updateTotalSessionsStat();
    }
  }, [seconds]);

  useEffect(() => {
    startTimer();

    // Clean up
    return () => BackgroundTimer.stopBackgroundTimer();
  }, []);

  return (
    <>
      <View style={styles.timeWrapper}>
        <Text style={styles.time}>{clockify(seconds).displayHours} : </Text>
        <Text style={styles.time}>{clockify(seconds).displayMins} : </Text>
        <Text style={styles.time}>{clockify(seconds).displaySecs}</Text>
      </View>

      <View style={styles.doneBtnWrapper}>
        {seconds >= 120 && (
          <Button
            title="Done"
            handlePress={() => navigation.navigate('Home')}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timeWrapper: {
    flexDirection: 'row',
  },
  time: {
    fontSize: 45,
    textAlign: 'center',
    padding: 8,
    letterSpacing: 4,
  },
  doneBtnWrapper: {
    position: 'absolute',
    bottom: 16,
  },
});

export default TimerScreen;
