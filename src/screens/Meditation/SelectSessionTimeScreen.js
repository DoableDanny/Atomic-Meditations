import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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

const SelectSessionTimeScreen = ({
  setIsTimerOn,
  alarmRingSeconds,
  setAlarmRingSeconds,
  setHeaderMsg,
  clockify,
}) => {
  // First screen => timerOn = false
  // Select time for alarm => setAlarmSeconds

  // Begin Button pressed => timerOn = true
  // Display seconds left, counting up
  // When seconds left = 2 mins, display done btn
  // "Day 2 is now unlocked, good job."
  // When seconds left = alarm seconds, ring alarm
  // "Session complete, but feel free to continue..."

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

  // Start meditation session
  const handlePressBegin = () => {
    setIsTimerOn(true);
    setHeaderMsg('Let it flow...');

    setTimeout(() => {
      setHeaderMsg('');
    }, 3000);
  };

  return (
    <>
      <View style={styles.timeWrapper}>
        <View style={styles.timeAndSelectWrapper}>
          <AdjustTimeBtn title="+" handlePress={plusOneHour} />
          <Text style={styles.time}>
            {clockify(alarmRingSeconds).displayHours} Hrs
          </Text>
          <AdjustTimeBtn title="-" handlePress={minusOneHour} />
        </View>
        <View style={styles.timeAndSelectWrapper}>
          <Text style={styles.time}>:</Text>
        </View>
        <View style={styles.timeAndSelectWrapper}>
          <AdjustTimeBtn title="++" handlePress={plusTenMins} />
          <AdjustTimeBtn title="+" handlePress={plusOneMin} />
          <Text style={styles.time}>
            {clockify(alarmRingSeconds).displayMins} Mins
          </Text>
          <AdjustTimeBtn title="-" handlePress={minusOneMin} />
          <AdjustTimeBtn title="--" handlePress={minusTenMins} />
        </View>
      </View>

      <View style={styles.beginBtnWrapper}>
        <Button title="Begin" handlePress={handlePressBegin} />
      </View>

      {/* {seconds >= 120 && (
        <Button title="Done" handlePress={() => navigation.navigate('Home')} />
      )} */}
    </>
  );
};

const styles = StyleSheet.create({
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

export default SelectSessionTimeScreen;
