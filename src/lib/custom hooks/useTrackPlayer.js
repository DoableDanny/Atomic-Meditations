import {useEffect, useState} from 'react';
import TrackPlayer from 'react-native-track-player';
import {
  STORAGE_KEYS,
  getStringData,
  storeStringData,
} from '../functions/asyncStorage';

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
  const [alarmTrackId, setAlarmTrackId] = useState(0);

  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      // Get users preferred track.
      getStringData(STORAGE_KEYS.ALARM_SOUND_ID).then((data) => {
        console.log('DATA: ', data);

        if (data) {
          const id = parseInt(data);
          setAlarmTrackId(id);

          // Add all tracks (for Settings Screen).
          if (tracks === 'all') TrackPlayer.add([...TRACKS]);
          // Otherwise just add users preferred track (for time-up alarm)
          else TrackPlayer.add([TRACKS[id]]);
        }
      });

      if (tracks === 'all') TrackPlayer.add([...TRACKS]);

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

  const setAndStoreAlarmTrackId = (trackId) => {
    console.log('SAving trackIdd', trackId);
    setAlarmTrackId(trackId);
    storeStringData(STORAGE_KEYS.ALARM_SOUND_ID, trackId.toString());
  };

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
    alarmTrackId,
    setAndStoreAlarmTrackId,
  };
};

export default useTrackPlayer;
