import React, {useState, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';

import {setLocalNotificationSchedule} from '../../../lib/functions/pushNotificationConfig';
import SettingScaffold from './SettingScaffold';
import AdjustTimeModule from './AdjustTimeModule';
import Message from './Message';
import Button from '../../../lib/components/Button';

const NOTIFICATION_TITLE = `Get ready, it's meditation time in 5 mins...`;

const NotificationSetting = () => {
  const [hours, setHours] = useState(12);
  const [mins, setMins] = useState(30);
  const [notificationsArray, setNotificationsArray] = useState([]);

  let displayHours = hours < 10 ? `0${hours}` : hours;
  let displayMins = mins < 10 ? `0${mins}` : mins;

  useEffect(() => {
    getAndSetScheduledLocalNotifications();
  }, []);

  const addOneHour = () => {
    if (hours === 23) setHours(0);
    else {
      setHours((prevHours) => prevHours + 1);
    }
  };

  const minusOneHour = () => {
    if (hours === 0) setHours(23);
    else {
      setHours((prevHours) => prevHours - 1);
    }
  };

  const addOneMin = () => {
    if (mins === 59) setMins(0);
    else {
      setMins((prevMins) => prevMins + 1);
    }
  };

  const minusOneMin = () => {
    if (mins === 0) setMins(59);
    else {
      setMins((prevMins) => prevMins - 1);
    }
  };

  const setNotification = () => {
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

    setLocalNotificationSchedule(userDateObj);

    Alert.alert(
      'Success!',
      `You will be sent a reminder at ${displayHours}:${displayMins} every day. Let's build this habit!`,
      [{text: 'Cool', onPress: () => getAndSetScheduledLocalNotifications()}],
    );
  };

  // Get all scheduled notifications. If none scheduled, returns []
  const getAndSetScheduledLocalNotifications = () => {
    PushNotification.getScheduledLocalNotifications((notificationsArray) => {
      setNotificationsArray(notificationsArray);
    });
  };

  const getTime = (date) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const mins = dateObj.getMinutes();

    return `${formatInteger(hours)} : ${formatInteger(mins)}`;
  };

  const formatInteger = (int) => {
    return int < 10 ? `0${int}` : int;
  };

  const cancelNotification = () => {
    PushNotification.cancelAllLocalNotifications();
    setNotificationsArray([]);
  };

  return (
    <SettingScaffold
      title="Set a Daily Reminder"
      description="What time will you meditate? Be sure to give yourself enough time to get ready. We'll send you a daily reminder! ">
      <View style={{flexDirection: 'row', marginBottom: 16}}>
        <AdjustTimeModule
          time={hours < 10 ? `0${hours}` : hours}
          addOne={addOneHour}
          minusOne={minusOneHour}
        />
        <AdjustTimeModule
          time={mins < 10 ? `0${mins}` : mins}
          addOne={addOneMin}
          minusOne={minusOneMin}
        />
      </View>
      <Button
        title="Set New Reminder"
        handlePress={setNotification}
        extraStyles={{marginBottom: 16}}
      />
      <Button
        title="Cancel Reminder"
        handlePress={cancelNotification}
        btnStyle="secondary"
      />
      <Message>
        {notificationsArray.length > 0
          ? notificationsArray.map(
              (notification) =>
                notification.title === NOTIFICATION_TITLE &&
                `We'll remind you at ${getTime(
                  notification.date,
                )} every day. You're welcome!`,
            )
          : 'You currently have no reminders set.'}
      </Message>
    </SettingScaffold>
  );
};

export default NotificationSetting;
