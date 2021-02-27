import React, {useEffect} from 'react';
import TrackPlayer from 'react-native-track-player';

const tracks = [
  {
    id: '1',
    url: require('../../assets/sounds/blues.wav'),
    title: 'Blues',
  },
  {
    id: '2',
    url: require('../../assets/sounds/country.mp3'),
    title: 'Country',
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

    TrackPlayer.add(tracks[Math.floor(Math.random() * 2)]);
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

  TrackPlayer.getState().then((state) => {
    console.log(state);
  });

  return {
    setUpTrackPlayer,
    playSound,
    stopSound,
  };
};

export default useTrackPlayer;
