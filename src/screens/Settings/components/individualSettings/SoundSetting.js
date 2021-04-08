import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

import ArrowButton from '../../../../lib/components/ArrowButton';
import SettingScaffold from '../SettingScaffold';
import Message from '../Message';
import Button from '../../../../lib/components/Button';
import PlayPauseBtn from '../PlayPauseBtn';

import useTrackPlayer, {
  TRACKS,
} from '../../../../lib/custom hooks/useTrackPlayer';
import ThemeContext from '../../../../lib/contexts/ThemeContext';

const ChooseSoundSetting = () => {
  const theme = useContext(ThemeContext);

  // alarmTrackId is the current saved preferred track. trackNumber is the track currently available to play/pause.
  const {
    playTrack,
    pauseTrack,
    alarmTrackId,
    setAndStoreAlarmTrackId,
    trackNumber,
    addNextTrack,
    addPrevTrack,
  } = useTrackPlayer(0);

  // Set and save users preferred track
  const handleSelectSound = () => {
    crashlytics().log('Select Sound btn pressed (in SoundSetting)');

    setAndStoreAlarmTrackId(trackNumber);
    Alert.alert(
      'Sound Saved',
      `${TRACKS[trackNumber].title} will be played upon meditation time-up.`,
    );
  };

  return (
    <SettingScaffold
      title="Select Alarm Sound"
      description="Sound to be played upon time up.">
      <View style={styles.wrapper}>
        <ArrowButton
          direction="left"
          handlePress={() => {
            crashlytics().log('prevTrack btn pressed (in SoundSetting)');
            addPrevTrack();
          }}
        />
        <Text style={{...styles.track, color: theme.colors.textPrimary}}>
          {TRACKS[trackNumber].title}
        </Text>
        <ArrowButton
          direction="right"
          handlePress={() => {
            crashlytics().log('nextTrack btn pressed (in SoundSetting)');
            addNextTrack();
          }}
        />
      </View>

      <View style={styles.wrapper}>
        <PlayPauseBtn type="play" handlePress={playTrack} />
        <PlayPauseBtn type="pause" handlePress={pauseTrack} />
      </View>

      <Button title="Select Sound" handlePress={handleSelectSound} />
      <Message>Current sound: {TRACKS[alarmTrackId].title}</Message>
    </SettingScaffold>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  track: {
    fontSize: 18,
    paddingHorizontal: 8,
    fontWeight: 'bold',
  },
});

export default ChooseSoundSetting;
