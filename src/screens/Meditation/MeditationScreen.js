import React, {useState} from 'react';

import {Text, View, StyleSheet} from 'react-native';

import {theme} from '../../lib/theme/theme';
import ScreenContainer from '../../lib/components/ScreenContainer';
import SelectSessionTimeScreen from './SelectSessionTimeScreen';
import TimerScreen from './TimerScreen';

const MeditationScreen = ({
  navigation,
  route,
  unlockNextMeditation,
  updateTotalSessionsStat,
  updateMeditationCompletionTime,
  updateTotalTimeStat,
  updateLastMeditationDateStat,
  updateCurrentStreakStat,
  lastMeditationDateStat,
}) => {
  const [isTimerOn, setIsTimerOn] = useState(false);
  // User input session time
  const [alarmRingSeconds, setAlarmRingSeconds] = useState(120);
  const [headerMsg, setHeaderMsg] = useState(
    'I would like the alarm to ring in...',
  );

  const {currentMeditation} = route.params;

  const clockify = (inputSeconds) => {
    const hours = Math.floor(inputSeconds / 60 / 60);
    const mins = Math.floor((inputSeconds / 60) % 60);
    const secs = Math.floor(inputSeconds % 60);

    const displayHours = hours < 10 ? `0${hours}` : hours;
    const displayMins = mins < 10 ? `0${mins}` : mins;
    const displaySecs = secs < 10 ? `0${secs}` : secs;

    return {
      displayHours,
      displayMins,
      displaySecs,
    };
  };

  return (
    <ScreenContainer extraStyles={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Day {currentMeditation.id}</Text>
        <Text style={styles.headerBody}>{headerMsg}</Text>
      </View>

      {!isTimerOn ? (
        <SelectSessionTimeScreen
          alarmRingSeconds={alarmRingSeconds}
          setAlarmRingSeconds={setAlarmRingSeconds}
          setIsTimerOn={setIsTimerOn}
          clockify={clockify}
          setHeaderMsg={setHeaderMsg}
        />
      ) : (
        <TimerScreen
          clockify={clockify}
          alarmRingSeconds={alarmRingSeconds}
          setHeaderMsg={setHeaderMsg}
          navigation={navigation}
          currentMeditation={currentMeditation}
          unlockNextMeditation={unlockNextMeditation}
          updateTotalSessionsStat={updateTotalSessionsStat}
          updateMeditationCompletionTime={updateMeditationCompletionTime}
          updateTotalTimeStat={updateTotalTimeStat}
          updateLastMeditationDateStat={updateLastMeditationDateStat}
          updateCurrentStreakStat={updateCurrentStreakStat}
          lastMeditationDateStat={lastMeditationDateStat}
        />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontSize: 19,
  },
});

export default MeditationScreen;
