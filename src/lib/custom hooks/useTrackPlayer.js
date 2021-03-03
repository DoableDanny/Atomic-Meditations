import {useEffect} from 'react';
import TrackPlayer from 'react-native-track-player';

export const TRACKS = [
  {
    id: '0',
    url: require('../../assets/sounds/crystal-bowls.mp3'),
    title: 'Crystal Bowls',
  },

  {
    id: '1',
    url: require('../../assets/sounds/guitar.mp3'),
    title: 'Guitar',
  },
  {
    id: '2',
    url: require('../../assets/sounds/flute.mp3'),
    title: 'Flute',
  },
  {
    id: '3',
    url: require('../../assets/sounds/country.mp3'),
    title: 'Country',
  },
];

const useTrackPlayer = (tracks) => {
  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.add([...tracks]);
      console.log('Trackplayer setup');
    });

    return () => {
      try {
        TrackPlayer.destroy();
        console.log('TrackPlayer destroyed');
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  const skipTrack = (trackId) => {
    TrackPlayer.skip(trackId);
  };

  const playTrack = async () => {
    try {
      TrackPlayer.play();
    } catch (e) {
      console.log(e);
      await setUpTrackPlayer(tracks);
      playTrack();
    }
  };

  const pauseTrack = () => {
    TrackPlayer.pause();
  };

  const stopTrack = () => {
    TrackPlayer.destroy();
  };

  return {
    skipTrack,
    playTrack,
    pauseTrack,
    stopTrack,
  };
};

export default useTrackPlayer;
