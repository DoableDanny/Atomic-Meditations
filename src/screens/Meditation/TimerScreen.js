import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import KeepAwake from 'react-native-keep-awake';

import Button from '../../lib/components/Button';
import useTrackPlayer from '../../lib/custom hooks/useTrackPlayer';

// Need to add a stop sound btn

const TimerScreen = ({
  clockify,
  alarmRingSeconds,
  setHeaderMsg,
  navigation,
  currentMeditation,
  unlockNextMeditation,
  lastMeditationDateStat,
  updateTotalSessionsStat,
  updateMeditationCompletionTime,
  updateTotalTimeStat,
  updateLastMeditationDateStat,
  updateCurrentStreakStat,
}) => {
  const [seconds, setSeconds] = useState(0);
  const {playSound, stopSound, setUpTrackPlayerAndPlaySound} = useTrackPlayer();
  const [showStopSoundBtn, setShowStopSoundBtn] = useState(false);

  let headerMsgTimeOut = useRef(null);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSeconds((prevSecs) => prevSecs + 1);
    }, 20);
  };

  // Called when user presses doneBtn
  const updateUserStats = () => {
    updateTotalSessionsStat();
    updateTotalTimeStat(seconds);
    updateCurrentStreakStat(lastMeditationDateStat);
    updateLastMeditationDateStat();
  };

  useEffect(() => {
    // After 2 mins, check whether to unlock next day and unlock.
    if (seconds === 120) {
      unlockNextMeditation(currentMeditation.id);
    }

    if (seconds === alarmRingSeconds) {
      playSound();

      setHeaderMsg('Goal time reached, great job!');

      headerMsgTimeOut.current = setTimeout(() => {
        setHeaderMsg('Feel free to continue meditating...');
      }, 3000);

      headerMsgTimeOut.current = setTimeout(() => {
        setHeaderMsg('');
      }, 8000);

      setShowStopSoundBtn(true);
    }

    // Alarm sounds will be about 15 seconds
    if (seconds === alarmRingSeconds + 15) {
      // setShowStopSoundBtn(false);
    }
  }, [seconds]);

  useEffect(() => {
    startTimer();
    KeepAwake.activate();

    // Clean up
    return () => {
      BackgroundTimer.stopBackgroundTimer();
      clearTimeout(headerMsgTimeOut.current);
      KeepAwake.deactivate();
    };
  }, []);

  // Need a Stop btn to appear when alarmRingSeconds === seconds
  // OR btn appears if TrackPlayer state === 'PLAYING

  return (
    <>
      <View style={styles.timeWrapper}>
        <Text style={styles.time}>{clockify(seconds).displayHours} : </Text>
        <Text style={styles.time}>{clockify(seconds).displayMins} : </Text>
        <Text style={styles.time}>{clockify(seconds).displaySecs}</Text>
      </View>

      {showStopSoundBtn && (
        <Button
          title="Stop Sound"
          handlePress={() => {
            stopSound();
            setShowStopSoundBtn(false);
          }}
        />
      )}

      <View style={styles.doneBtnWrapper}>
        {seconds >= 120 && (
          <Button
            title="Done"
            handlePress={() => {
              updateUserStats();
              updateMeditationCompletionTime(currentMeditation, seconds);
              navigation.navigate('Home');
            }}
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
