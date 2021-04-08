import {useEffect, useState} from 'react';
import TrackPlayer from 'react-native-track-player';
import crashlytics from '@react-native-firebase/crashlytics';

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

const useTrackPlayer = (initialTrackId = null) => {
  // alarmTrackId is users selected/saved track for alarm sound. trackNumber is current track for playing in Settings screen.
  const [alarmTrackId, setAlarmTrackId] = useState(0);
  const [trackNumber, setTrackNumber] = useState(0);
  const [trackDuration, setTrackDuration] = useState(40);

  useEffect(() => {
    setUpTrackPlayerAndAddTracks().then(() => {
      // If on timer screen, get & set track duration
      if (!initialTrackId) getAndSetTrackDuration();
    });

    // Clean up
    return () => {
      try {
        TrackPlayer.destroy();
        console.log('TrackPlayer destroyed');
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  const setUpTrackPlayerAndAddTracks = async () => {
    try {
      await TrackPlayer.setupPlayer();
      // Get users preferred track (for time up).
      const data = await getStringData(STORAGE_KEYS.ALARM_SOUND_ID);
      console.log('trackId data: ', data);

      // If user has preferred track and we aren't on settings screen, set and add to TrackPlayer
      if (data) {
        const id = parseInt(data);
        setAlarmTrackId(id);

        if (initialTrackId === null) {
          TrackPlayer.add([TRACKS[id]]);
        }
      } else if (initialTrackId === null) {
        // Just add TRACK 1
        TrackPlayer.add([TRACKS[0]]);
      }

      // e.g. initialTrackId is 0 in Settings. Nothing passed in for Timer Screen
      if (initialTrackId !== null) {
        TrackPlayer.add([TRACKS[initialTrackId]]);
        setTrackNumber(initialTrackId);
      }

      console.log('Trackplayer setup');
    } catch (err) {
      console.log(err);
    }
  };

  // For Settings - so can play next track. Have to add 1 track at a time otherwise TrackPlayer will continue playing all songs in the queue.
  const addNextTrack = () => {
    // reset -> stops current track and removes all tracks from queue
    TrackPlayer.reset().then(() => {
      if (trackNumber == TRACKS.length - 1) {
        TrackPlayer.add([TRACKS[0]]);

        setTrackNumber(0);
      } else {
        setTrackNumber((prev) => {
          TrackPlayer.add([TRACKS[prev + 1]]);

          return prev + 1;
        });
      }
    });
  };

  // For Settings - so can play prev track
  const addPrevTrack = () => {
    TrackPlayer.reset().then(() => {
      if (trackNumber == 0) {
        TrackPlayer.add([TRACKS[TRACKS.length - 1]]);

        setTrackNumber(TRACKS.length - 1);
      } else {
        setTrackNumber((prev) => {
          TrackPlayer.add([TRACKS[prev - 1]]);

          return prev - 1;
        });
      }
    });
  };

  // User can select their prefered alarm sound from Settings
  const setAndStoreAlarmTrackId = (trackId) => {
    console.log('Saving trackId', trackId);
    setAlarmTrackId(trackId);
    storeStringData(STORAGE_KEYS.ALARM_SOUND_ID, trackId.toString());
  };

  const playTrack = async () => {
    try {
      TrackPlayer.play();
    } catch (e) {
      console.log(e);
      try {
        await setUpTrackPlayerAndAddTracks();
        TrackPlayer.play();
      } catch (e) {
        console.log(e);
        crashlytics().log(
          `Couldn't play track (useTrackPlayer custom hook). Error: ${e}`,
        );
      }
    }
  };

  const pauseTrack = () => {
    TrackPlayer.pause();
  };

  const stopTrack = () => {
    TrackPlayer.destroy();
  };

  // Returns track duration in seconds
  const getAndSetTrackDuration = async () => {
    return await TrackPlayer.getCurrentTrack().then((idString) => {
      if (idString) {
        const id = parseInt(idString);

        setTrackDuration(TRACKS[id].duration);
      }
    });
  };

  return {
    playTrack,
    pauseTrack,
    stopTrack,
    alarmTrackId,
    setAndStoreAlarmTrackId,
    trackDuration,
    trackNumber,
    addNextTrack,
    addPrevTrack,
  };
};

export default useTrackPlayer;
