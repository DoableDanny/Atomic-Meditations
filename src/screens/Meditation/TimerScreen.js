import React, {useState, useEffect, useRef, useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import KeepAwake from 'react-native-keep-awake';

import Button from '../../lib/components/Button';
import useTrackPlayer from '../../lib/custom hooks/useTrackPlayer';
import ThemeContext from '../../lib/contexts/ThemeContext';

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
  const [seconds, setSeconds] = useState(116);
  const [showStopSoundBtn, setShowStopSoundBtn] = useState(false);
  // Track length ranges from 26-46 seconds so the time the stopSoundBtn is shown will depend on the track.
  const [trackDuration, setTrackDuration] = useState(40);

  const {playTrack, stopTrack, getTrackDuration} = useTrackPlayer();

  let headerMsgTimeOut = useRef(null);

  console.log(navigation);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSeconds((prevSecs) => prevSecs + 1);
    }, 1000);
  };

  // Called when user presses doneBtn
  const updateUserStats = () => {
    updateTotalSessionsStat();
    updateTotalTimeStat(seconds);
    updateCurrentStreakStat(lastMeditationDateStat);
    updateLastMeditationDateStat();
  };

  useEffect(() => {
    if (seconds === 3) setHeaderMsg('');
    // After 2 mins, check whether to unlock next day and unlock.
    else if (seconds === 120) {
      // Remove back btn from navigation header.
      navigation.setOptions({headerLeft: () => null});

      unlockNextMeditation(currentMeditation.id);
    }

    if (seconds === alarmRingSeconds) {
      playTrack();

      setHeaderMsg('Goal time reached, great job!');

      headerMsgTimeOut.current = setTimeout(() => {
        setHeaderMsg('Feel free to continue meditating...');
      }, 3000);

      headerMsgTimeOut.current = setTimeout(() => {
        setHeaderMsg('');
      }, 8000);

      setShowStopSoundBtn(true);

      getTrackDuration().then((duration) => {
        setTrackDuration(duration);
      });
      // When track ends, remove stopSoundBtn
    } else if (seconds === alarmRingSeconds + trackDuration) {
      setShowStopSoundBtn(false);
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
