import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Button from '../../lib/components/Button';
import {theme} from '../../lib/theme/theme';

const AdjustTimeBtn = ({title, handlePress}) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.adjustTimeBtn}>
      <Text style={styles.adjustTimePlusOrMinus}>{title}</Text>
    </TouchableOpacity>
  );
};

const MeditationScreen = ({navigation, route}) => {
  // First screen => timerOn = false
  // Select time for alarm => setAlarmSeconds

  // Begin Button pressed => timerOn = true
  // Display seconds left, counting up
  // When seconds left = 2 mins, display done btn
  // "Day 2 is now unlocked, good job."
  // When seconds left = alarm seconds, ring alarm
  // "Session complete, but feel free to continue..."

  const [isTimerOn, setIsTimerOn] = useState(false);
  const [alarmRingSeconds, setAlarmRingSeconds] = useState(120);
  const [seconds, setSeconds] = useState(0);

  const {currentMeditation} = route.params;

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setAlarmRingSeconds((prevSecs) => {
        if (prevSecs > 0) return prevSecs - 1;
        else return 0;
      });
    }, 1000);
  };

  const clockify = () => {
    const hours = Math.floor(alarmRingSeconds / 60 / 60);
    const mins = Math.floor((alarmRingSeconds / 60) % 60);
    const secs = Math.floor(alarmRingSeconds % 60);

    const displayHours = hours < 10 ? `0${hours}` : hours;
    const displayMins = mins < 10 ? `0${mins}` : mins;
    const displaySecs = secs < 10 ? `0${secs}` : secs;

    return {
      displayHours,
      displayMins,
      displaySecs,
    };
  };

  // ADJUST TIME FUNCTIONS
  const plusOneHour = () => {
    setAlarmRingSeconds((prevSecs) => prevSecs + 3600);
  };
  const minusOneHour = () => {
    setAlarmRingSeconds((prevSecs) => {
      if (prevSecs > 3600) return prevSecs - 3600;

      return prevSecs;
    });
  };

  const plusOneMin = () => {
    setAlarmRingSeconds((prevSecs) => prevSecs + 60);
  };
  const minusOneMin = () => {
    setAlarmRingSeconds((prevSecs) => {
      if (prevSecs > 120) return prevSecs - 60;

      return prevSecs;
    });
  };

  const plusTenMins = () => {
    setAlarmRingSeconds((prevSecs) => prevSecs + 600);
  };
  const minusTenMins = () => {
    setAlarmRingSeconds((prevSecs) => {
      if (prevSecs > 660) return prevSecs - 600;

      return prevSecs;
    });
  };

  useEffect(() => {
    if (isTimerOn) {
      startTimer();
    }
  }, [isTimerOn]);

  useEffect(() => {
    if (alarmRingSeconds === 0) {
      BackgroundTimer.stopBackgroundTimer();
    }
  }, [alarmRingSeconds]);

  // Clean up
  useEffect(() => {
    return () => BackgroundTimer.stopBackgroundTimer();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{currentMeditation.title}</Text>
        <Text style={styles.headerBody}>
          I would like the alarm to ring in...
        </Text>
      </View>

      <View style={styles.timeWrapper}>
        <View style={styles.timeAndSelectWrapper}>
          <AdjustTimeBtn title="+" handlePress={plusOneHour} />
          <Text style={styles.time}>{clockify().displayHours} Hrs</Text>
          <AdjustTimeBtn title="-" handlePress={minusOneHour} />
        </View>
        <View style={styles.timeAndSelectWrapper}>
          <Text style={styles.time}>:</Text>
        </View>
        <View style={styles.timeAndSelectWrapper}>
          <AdjustTimeBtn title="++" handlePress={plusTenMins} />
          <AdjustTimeBtn title="+" handlePress={plusOneMin} />
          <Text style={styles.time}>{clockify().displayMins} Mins</Text>
          <AdjustTimeBtn title="-" handlePress={minusOneMin} />
          <AdjustTimeBtn title="--" handlePress={minusTenMins} />
        </View>
      </View>

      {!isTimerOn && (
        <View style={styles.beginBtnWrapper}>
          <Button title="Begin" handlePress={() => setIsTimerOn(true)} />
        </View>
      )}

      {/* {seconds >= 120 && (
        <Button title="Done" handlePress={() => navigation.navigate('Home')} />
      )} */}
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
  header: {
    position: 'absolute',
    top: 16,
    fontSize: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 23,
    marginBottom: 16,
  },
  headerBody: {
    fontSize: 20,
  },
  timeWrapper: {
    flexDirection: 'row',
  },
  timeAndSelectWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'pink',
    marginBottom: 32,
  },
  time: {
    fontSize: 30,
    textAlign: 'center',
    // backgroundColor: 'red',
    padding: 8,
    letterSpacing: 4,
  },
  adjustTimeBtn: {
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // backgroundColor: theme.lightGreen,
  },
  adjustTimePlusOrMinus: {
    fontSize: 25,
    letterSpacing: 4,
  },
  beginBtnWrapper: {
    position: 'absolute',
    bottom: 16,
  },
});

export default MeditationScreen;
