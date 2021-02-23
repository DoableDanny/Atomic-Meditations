import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import Icon from 'react-native-vector-icons/MaterialIcons';

import AdjustTimeBtn from '../../lib/components/AdjustTimeBtn';
import Button from '../../lib/components/Button';
import {theme} from '../../lib/theme/theme';

// const AdjustTimeBtn = ({iconName, iconNum, handlePress}) => {
//   return (
//     <TouchableOpacity onPress={handlePress} style={styles.adjustTimeBtn}>
//       <Icon name={iconName} size={30} />
//       {iconNum === 2 && <Icon name={iconName} size={30} />}
//     </TouchableOpacity>
//   );
// };

const SelectSessionTimeScreen = ({
  setIsTimerOn,
  alarmRingSeconds,
  setAlarmRingSeconds,
  setHeaderMsg,
  clockify,
}) => {
  // ADJUST TIME FUNCTIONS

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
      <View style={{alignItems: 'center'}}>
        <View style={styles.adjustTimeBtnsModule}>
          <AdjustTimeBtn
            iconName="keyboard-arrow-up"
            twoArrows
            handlePress={plusTenMins}
          />
          <AdjustTimeBtn
            iconName="keyboard-arrow-up"
            handlePress={plusOneMin}
          />
        </View>

        <Text style={styles.time}>
          {alarmRingSeconds > 3540 &&
            `${clockify(alarmRingSeconds).displayHours} ${
              alarmRingSeconds < 7200 ? 'Hr' : 'Hrs'
            } : `}
          {clockify(alarmRingSeconds).displayMins}{' '}
          {clockify(alarmRingSeconds).displayMins === '01' ? 'Min' : 'Mins'}
        </Text>
        <View style={styles.adjustTimeBtnsModule}>
          <AdjustTimeBtn
            iconName="keyboard-arrow-down"
            handlePress={minusOneMin}
          />
          <AdjustTimeBtn
            iconName="keyboard-arrow-down"
            twoArrows
            handlePress={minusTenMins}
          />
        </View>
      </View>
      <View style={styles.beginBtnWrapper}>
        <Button title="Begin" handlePress={handlePressBegin} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  adjustTimeBtnsModule: {
    width: 100,
  },
  time: {
    fontSize: 30,
    textAlign: 'center',
    padding: 8,
    letterSpacing: 4,
  },

  beginBtnWrapper: {
    position: 'absolute',
    bottom: 16,
  },
});

export default SelectSessionTimeScreen;
