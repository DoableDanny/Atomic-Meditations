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
    duration: 37, // seconds
  },

  {
    id: '1',
    url: require('../../assets/sounds/guitar.mp3'),
    title: 'Guitar',
    duration: 26,
  },
  {
    id: '2',
    url: require('../../assets/sounds/flute.mp3'),
    title: 'Flute',
    duration: 46,
  },
  {
    id: '3',
    url: require('../../assets/sounds/country.mp3'),
    title: 'Country',
    duration: 21,
  },
];

const useTrackPlayer = (tracks) => {
  const [alarmTrackId, setAlarmTrackId] = useState(0);

  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      // Get all tracks (for choose sound option in Settings Screen)
      if (tracks === 'all') TrackPlayer.add([...TRACKS]);
      else {
        // Get users preferred track (for time up).
        getStringData(STORAGE_KEYS.ALARM_SOUND_ID).then((data) => {
          console.log('trackId data: ', data);

          if (data) {
            const id = parseInt(data);
            setAlarmTrackId(id);

            TrackPlayer.add([TRACKS[id]]);
          } else TrackPlayer.add([TRACKS[0]]);
        });
      }

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

  // Returns track duration in seconds
  const getTrackDuration = async () => {
    return await TrackPlayer.getCurrentTrack().then((idString) => {
      if (idString) {
        const id = parseInt(idString);

        return TRACKS[id].duration;
      } else return 40;
    });
  };

  return {
    skipTrack,
    playTrack,
    pauseTrack,
    stopTrack,
    alarmTrackId,
    setAndStoreAlarmTrackId,
    getTrackDuration,
  };
};

export default useTrackPlayer;
