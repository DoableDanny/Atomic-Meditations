// service.js (for react-native-track-player)
// This service needs to be registered for the module to work

import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  // "Receiving Events"
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
};
