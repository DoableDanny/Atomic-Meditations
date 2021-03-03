import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import ArrowButton from '../../../lib/components/ArrowButton';
import SettingScaffold from './SettingScaffold';
import Button from '../../../lib/components/Button';
import useTrackPlayer, {TRACKS} from '../../../lib/custom hooks/useTrackPlayer';

const ChooseSoundSetting = () => {
  const [trackNumber, setTrackNumber] = useState(0);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  const {skipTrack, playTrack, pauseTrack} = useTrackPlayer(TRACKS);

  useEffect(() => {
    if (isSoundPlaying) playTrack();
    else pauseTrack();
  }, [isSoundPlaying]);

  useEffect(() => {
    return () => setIsSoundPlaying(false);
  }, []);

  const nextTrack = () => {
    if (trackNumber == TRACKS.length - 1) {
      setTrackNumber(0);
      skipTrack(`${TRACKS[0].id}`);
    } else {
      setTrackNumber((prev) => {
        skipTrack(`${TRACKS[prev + 1].id}`);
        return prev + 1;
      });
    }
  };

  const prevTrack = () => {
    if (trackNumber == 0) {
      setTrackNumber(TRACKS.length - 1);
      skipTrack(`${TRACKS.length - 1}`);
    } else {
      setTrackNumber((prev) => {
        skipTrack(`${TRACKS[prev - 1].id}`);
        return prev - 1;
      });
    }
  };

  const playOrPauseSound = () => {
    setIsSoundPlaying((prev) => !prev);
  };

  return (
    <SettingScaffold
      title="Select Alarm Sound"
      description="Sound to be played upon time up.">
      <View style={styles.wrapper}>
        <ArrowButton iconName="keyboard-arrow-left" handlePress={prevTrack} />
        <Text style={styles.track}>{TRACKS[trackNumber].title}</Text>
        <ArrowButton iconName="keyboard-arrow-right" handlePress={nextTrack} />
      </View>
      <Button title="Play/Pause" handlePress={playOrPauseSound} />
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
    color: 'blue',
    paddingHorizontal: 8,
  },
});

export default ChooseSoundSetting;
