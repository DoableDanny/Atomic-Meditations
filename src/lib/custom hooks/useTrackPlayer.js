import React, {useEffect} from 'react';
import TrackPlayer from 'react-native-track-player';

export const TRACKS = [
  {
    id: '1',
    url: require('../../assets/sounds/country.mp3'),
    title: 'Country',
  },
  {
    id: '2',
    url: require('../../assets/sounds/crystal-bowls.mp3'),
    title: 'Crystal Bowls',
  },
  {
    id: '3',
    url: require('../../assets/sounds/flute.mp3'),
    title: 'Flute',
  },
  {
    id: '4',
    url: require('../../assets/sounds/guitar.mp3'),
    title: 'Guitar',
  },
];

const useTrackPlayer = () => {
  useEffect(() => {
    setUpTrackPlayer();

    return () => {
      try {
        TrackPlayer.destroy();
        console.log('PLAYER DESTROYED');
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  const setUpTrackPlayer = async () => {
    await TrackPlayer.setupPlayer();

    // TrackPlayer.add(TRACKS[Math.floor(Math.random() * 2)]);
  };

  const addAllTracks = () => {
    TrackPlayer.add(TRACKS);
  };

  const skipToNext = () => {
    TrackPlayer.skipToNext();
  };

  const skipToPrevious = () => {
    TrackPlayer.skipToPrevious();
  };

  const playSound = () => {
    try {
      TrackPlayer.play();
    } catch (e) {
      console.log(e);
      setUpTrackPlayerAndPlaySound();
    }
  };

  const stopSound = () => {
    TrackPlayer.destroy();
  };

  // If timer is on for long time, Trackplayer will be re-setup just to be safe.
  const setUpTrackPlayerAndPlaySound = async () => {
    await setUpTrackPlayer;
    playSound();
  };

  return {
    setUpTrackPlayer,
    playSound,
    stopSound,
    addAllTracks,
    skipToNext,
    skipToPrevious,
  };
};

export default useTrackPlayer;
