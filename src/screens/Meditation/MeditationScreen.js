import React, {useState, useContext, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

import ThemeContext from '../../lib/contexts/ThemeContext';
import ScreenContainer from '../../lib/components/ScreenContainer';
import SelectSessionTimeScreen from './components/SelectSessionTimeScreen';
import TimerScreen from './components/TimerScreen';

const MeditationScreen = ({
  navigation,
  route,
  unlockNextMeditation,
  updateMeditationCompletionTime,
  lastMeditationDateStat,
  updateAllStats,
}) => {
  const [isTimerOn, setIsTimerOn] = useState(false);
  // User input session time
  const [alarmRingSeconds, setAlarmRingSeconds] = useState(120);
  const [headerMsg, setHeaderMsg] = useState(
    'I would like the alarm to ring in...',
  );

  const theme = useContext(ThemeContext);
  const colors = theme.colors;

  const {currentMeditation} = route.params;

  useEffect(() => {
    crashlytics().log('Meditation Screen mounted');
  }, []);

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
        <Text style={{...styles.headerTitle, color: colors.textSecondary}}>
          Day {currentMeditation.id}
        </Text>
        <Text style={{...styles.headerBody, color: colors.textPrimary}}>
          {headerMsg}
        </Text>
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
          updateMeditationCompletionTime={updateMeditationCompletionTime}
          lastMeditationDateStat={lastMeditationDateStat}
          updateAllStats={updateAllStats}
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
