import {useState, useEffect} from 'react';
import PushNotification from 'react-native-push-notification';

const usePushNotification = () => {
  // Will be populated with all the scheduled notifications (just 1 in this app)
  const [notificationsArray, setNotificationsArray] = useState([]);

  const NOTIFICATION_TITLE = `Get ready, it's meditation time`;

  useEffect(() => {
    getAndSetScheduledLocalNotifications();
  }, []);

  // Get all scheduled notifications. If none scheduled, returns []
  const getAndSetScheduledLocalNotifications = () => {
    PushNotification.getScheduledLocalNotifications((notificationsArray) => {
      setNotificationsArray(notificationsArray);
      console.log('Scheduled Notifications: ', notificationsArray);
    });
  };

  // Called from Settings. Accepts the hours & mins that the user wants to receive a notification each day.
  const setNotification = (hours, mins) => {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const day = dateObj.getDate();

    const userDateObj = new Date(year, month, day, hours, mins);

    // Check if that time has already passed today. If has, add 1 to day. getTime() returns the number of millisecs since 1970/01/01.
    if (dateObj.getTime() > userDateObj.getTime()) {
      userDateObj.setDate(userDateObj.getDate() + 1);
    }

    // Delete all old scheduled notifications
    PushNotification.cancelAllLocalNotifications();

    // Set the new notification
    setLocalNotificationSchedule(userDateObj).then(() => {
      getAndSetScheduledLocalNotifications();
    });
  };

  // Set daily push notification. Accepts a JS date object with the hours and mins user will meditate each day.
  const setLocalNotificationSchedule = async (date) => {
    await PushNotification.localNotificationSchedule({
      channelId: '5-min-reminder',
      title: `Get ready, it's meditation time`,
      message: `It's time to meditate for at least 2 minutes. 2 mins is easy, let's keep this habit going!`,
      date: date,
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      repeatType: 'day',
    });
  };

  // Delete all scheduled notifications.
  const cancelNotification = () => {
    PushNotification.cancelAllLocalNotifications();
    setNotificationsArray([]);
  };

  // Format the JS date object to MM : DD
  const getTime = (date) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const mins = dateObj.getMinutes();

    return `${formatInteger(hours)} : ${formatInteger(mins)}`;
  };

  const formatInteger = (int) => {
    return int < 10 ? `0${int}` : int;
  };

  return {
    NOTIFICATION_TITLE,
    notificationsArray,
    setNotification,
    cancelNotification,
    getTime,
  };
};

export default usePushNotification;
