import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import AdjustTimeBtn from '../../../lib/components/AdjustTimeBtn';
import useTrackPlayer, {TRACKS} from '../../../lib/custom hooks/useTrackPlayer';

const ChooseSoundSetting = () => {
  const [trackNumber, setTrackNumber] = useState(0);

  const {addAllTracks, skipToNext, skipToPrevious} = useTrackPlayer();

  useEffect(() => {
    addAllTracks();
  }, []);

  const nextTrack = () => {
    if (trackNumber === TRACKS.length - 1) {
      setTrackNumber(0);
    }
    skipToNext();
    setTrackNumber((prev) => prev + 1);
  };

  const previousTrack = () => {
    if (trackNumber === 0) {
      nextTrack();
    }
    skipToPrevious();
    setTrackNumber((prev) => prev - 1);
  };

  return (
    <View style={styles.wrapper}>
      <AdjustTimeBtn
        iconName="keyboard-arrow-left"
        handlePress={previousTrack}
      />
      <Text>{TRACKS[trackNumber].title}</Text>
      <AdjustTimeBtn iconName="keyboard-arrow-right" handlePress={nextTrack} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default ChooseSoundSetting;
