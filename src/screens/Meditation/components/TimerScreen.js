import React, {useState, useEffect, useRef, useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import KeepAwake from 'react-native-keep-awake';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';

import Button from '../../../lib/components/Button';
import useTrackPlayer from '../../../lib/custom hooks/useTrackPlayer';
import ThemeContext from '../../../lib/contexts/ThemeContext';

const TimerScreen = ({
  clockify,
  alarmRingSeconds,
  setHeaderMsg,
  navigation,
  currentMeditation,
  unlockNextMeditation,
  lastMeditationDateStat,
  updateMeditationCompletionTime,
  updateAllStats,
}) => {
  const [seconds, setSeconds] = useState(117);
  const [showStopSoundBtn, setShowStopSoundBtn] = useState(false);

  const {playTrack, stopTrack, trackDuration} = useTrackPlayer();

  let headerMsgTimeOut = useRef(null);

  useEffect(() => {
    if (seconds === 3) setHeaderMsg('');
    // After 2 mins, check whether to unlock next day and unlock.
    else if (seconds === 120) {
      crashlytics().log('2 mins reached');

      // Remove back btn from navigation header.
      navigation.setOptions({headerLeft: () => null});

      unlockNextMeditation(currentMeditation.id);
    }

    if (seconds === alarmRingSeconds) {
      crashlytics().log('Alarm ring time reached');

      playTrack();

      setShowStopSoundBtn(true);

      updateHeaderMessages();

      // When track ends, remove stopSoundBtn
    } else if (seconds === alarmRingSeconds + trackDuration) {
      crashlytics().log(
        `Alarm sound finished playing. Track duration: ${trackDuration} secs.`,
      );

      setShowStopSoundBtn(false);
    }
  }, [seconds]);

  useEffect(() => {
    crashlytics().log('Timer component mounted');
    startTimer();
    KeepAwake.activate();

    // Clean up
    return () => {
      BackgroundTimer.stopBackgroundTimer();
      clearTimeout(headerMsgTimeOut.current);
      KeepAwake.deactivate();
    };
  }, []);

  const startTimer = () => {
    crashlytics().log('startTimer function called');

    BackgroundTimer.runBackgroundTimer(() => {
      setSeconds((prevSecs) => prevSecs + 1);
    }, 1000);
  };

  // Messages for when user reaches their goal time.
  const updateHeaderMessages = () => {
    crashlytics().log('updateHeaderMessages function called');

    setHeaderMsg('Goal time reached, great job!');

    headerMsgTimeOut.current = setTimeout(() => {
      setHeaderMsg('Feel free to continue meditating...');
    }, 3000);

    headerMsgTimeOut.current = setTimeout(() => {
      setHeaderMsg('');
    }, 8000);
  };

  return (
    <>
      <View style={styles.timeWrapper}>
        <TimeText time={clockify(seconds).displayHours + ' : '} />
        <TimeText time={clockify(seconds).displayMins + ' : '} />
        <TimeText time={clockify(seconds).displaySecs} />
      </View>

      <View style={styles.btnsWrapper}>
        <View style={{marginBottom: 32}}>
          {showStopSoundBtn && (
            <Button
              title="Stop Sound"
              btnStyle="secondary"
              handlePress={() => {
                crashlytics().log('Stop Sound Button pressed');

                stopTrack();
                setShowStopSoundBtn(false);
              }}
            />
          )}
        </View>
        {seconds >= 120 && (
          <Button
            title="Done"
            handlePress={() => {
              crashlytics().log('Done button pressed');

              analytics().logEvent(`Day_${currentMeditation.id}_done`, {
                alarmRingMins: Math.round(alarmRingSeconds / 60),
                completionMins: Math.round(seconds / 60),
              });

              updateAllStats(seconds, lastMeditationDateStat);
              updateMeditationCompletionTime(currentMeditation, seconds);
              navigation.navigate('Home');
            }}
          />
        )}
      </View>
    </>
  );
};

const TimeText = ({time}) => {
  const theme = useContext(ThemeContext);

  return (
    <Text style={{...styles.time, color: theme.colors.textPrimary}}>
      {time}
    </Text>
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
  btnsWrapper: {
    position: 'absolute',
    bottom: 16,
  },
});

export default TimerScreen;
