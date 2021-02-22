import PushNotification from 'react-native-push-notification';

// CONFIGURE PUSH NOTIFICATIONS
export const configurePushNotification = () => {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);

      // process the notification
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);

      // process the action
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: Platform.OS === 'ios',
  });

  PushNotification.createChannel(
    {
      channelId: 'channel-id', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
};

export const localNotificationSchedule = (date) => {
  PushNotification.localNotificationSchedule({
    channelId: 'channel-id',
    title: `Get ready, it's meditation time in 5 mins...`,
    message: `It's almost time to meditate for at least 2 minutes. 2 mins is easy, let's keep this habit going!`,
    // date: new Date(Date.now() + 10 * 1000), // in 60 secs
    date: date,
    allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
    repeatType: 'day',
  });
};
