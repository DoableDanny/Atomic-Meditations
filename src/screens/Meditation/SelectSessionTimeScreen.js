import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '../../lib/components/Button';
import {theme} from '../../lib/theme/theme';

const AdjustTimeBtn = ({iconName, iconNum, handlePress}) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.adjustTimeBtn}>
      <Icon name={iconName} size={30} />
      {iconNum === 2 && <Icon name={iconName} size={30} />}
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
        {/* <View style={styles.timeAndSelectWrapper}>
          <Text style={styles.time}>
            {clockify(alarmRingSeconds).displayHours} Hrs
          </Text>
        </View>
        <View style={styles.timeAndSelectWrapper}>
          <Text style={styles.time}>:</Text>
        </View> */}
        <View style={styles.timeAndSelectWrapper}>
          <AdjustTimeBtn
            iconName="keyboard-arrow-up"
            iconNum={2}
            handlePress={plusTenMins}
          />
          <AdjustTimeBtn
            iconName="keyboard-arrow-up"
            handlePress={plusOneMin}
          />
          <Text style={styles.time}>
            {alarmRingSeconds > 3540 &&
              `${clockify(alarmRingSeconds).displayHours} ${
                alarmRingSeconds < 7200 ? 'Hr' : 'Hrs'
              } : `}
            {clockify(alarmRingSeconds).displayMins}{' '}
            {clockify(alarmRingSeconds).displayMins === '01' ? 'Min' : 'Mins'}
          </Text>
          <AdjustTimeBtn
            iconName="keyboard-arrow-down"
            handlePress={minusOneMin}
          />
          <AdjustTimeBtn
            iconName="keyboard-arrow-down"
            iconNum={2}
            handlePress={minusTenMins}
          />
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
    marginBottom: 32,
  },
  time: {
    fontSize: 30,
    textAlign: 'center',
    padding: 8,
    letterSpacing: 4,
  },
  adjustTimeBtn: {
    margin: 8,
    backgroundColor: theme.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    borderRadius: 8,
  },
  beginBtnWrapper: {
    position: 'absolute',
    bottom: 16,
  },
});

export default SelectSessionTimeScreen;
