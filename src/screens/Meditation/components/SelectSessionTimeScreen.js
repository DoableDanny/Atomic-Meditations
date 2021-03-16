import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

import ThemeContext from '../../../lib/contexts/ThemeContext';
import ArrowButton from '../../../lib/components/ArrowButton';
import Button from '../../../lib/components/Button';

const SelectSessionTimeScreen = ({
  setIsTimerOn,
  alarmRingSeconds,
  setAlarmRingSeconds,
  setHeaderMsg,
  clockify,
}) => {
  const theme = useContext(ThemeContext);
  const colors = theme.colors;

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
    crashlytics().log('Begin Meditation Button pressed');
    setIsTimerOn(true);
    setHeaderMsg('Let it flow...');
  };

  return (
    <>
      <View style={{alignItems: 'center'}}>
        <View style={styles.arrowButton}>
          <ArrowButton direction="up" double handlePress={plusTenMins} />
          <ArrowButton direction="up" handlePress={plusOneMin} />
        </View>

        <Text style={{...styles.time, color: colors.textPrimary}}>
          {alarmRingSeconds > 3540 &&
            `${clockify(alarmRingSeconds).displayHours} ${
              alarmRingSeconds < 7200 ? 'Hr' : 'Hrs'
            } : `}
          {clockify(alarmRingSeconds).displayMins}{' '}
          {clockify(alarmRingSeconds).displayMins === '01' ? 'Min' : 'Mins'}
        </Text>
        <View style={styles.arrowButton}>
          <ArrowButton direction="down" handlePress={minusOneMin} />
          <ArrowButton direction="down" double handlePress={minusTenMins} />
        </View>
      </View>
      <View style={styles.beginBtnWrapper}>
        <Button title="Begin" handlePress={handlePressBegin} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  arrowButton: {
    width: 100,
  },
  time: {
    fontSize: 30,
    textAlign: 'center',
    padding: 8,
    letterSpacing: 4,
    color: '#F4C602',
  },

  beginBtnWrapper: {
    position: 'absolute',
    bottom: 16,
  },
});

export default SelectSessionTimeScreen;
