import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import TrackPlayer from 'react-native-track-player';

const TimerScreen = ({clockify, alarmRingSeconds, setHeaderMsg}) => {
  const [seconds, setSeconds] = useState(0);

  const startTimer = () => {
    let i = 0;
    BackgroundTimer.runBackgroundTimer(() => {
      setSeconds((prevSecs) => prevSecs + 1);
    }, 50);
  };

  const ringAlarm = () => {};

  // TrackPlayer.setupPlayer().then(() => {
  //   // The player is ready to be used
  //   console.log('Player set up');
  // });

  useEffect(() => {
    if (seconds === alarmRingSeconds) {
      // ringAlarm();

      setHeaderMsg('Goal time reached, great job!');

      setTimeout(() => {
        setHeaderMsg('Feel free to continue meditating...');
      }, 4000);

      setTimeout(() => {
        setHeaderMsg('');
      }, 8000);
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
});

export default TimerScreen;
