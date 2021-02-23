import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';

import Button from '../../lib/components/Button';
import AdjustTimeModule from './components/AdjustTimeModule';
import {theme} from '../../lib/theme/theme';
import {setLocalNotificationSchedule} from '../../lib/functions/pushNotificationConfig';

// TODO
// Delete old reminder notification before setting new. Just delete the correct one with an ID. Deleting all is not great idea!
// Get rid of 5 mins before, just set for a specific time.

const NOTIFICATION_TITLE = `Get ready, it's meditation time in 5 mins...`;

const SettingsScreen = () => {
  const [hours, setHours] = useState(12);
  const [mins, setMins] = useState(30);
  const [notificationsArray, setNotificationsArray] = useState([]);

  let displayHours = hours < 10 ? `0${hours}` : hours;
  let displayMins = mins < 10 ? `0${mins}` : mins;

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
    // Reminder will be sent 5 mins before meditation session time
    userDateObj.setMinutes(userDateObj.getMinutes() - 5);

    // Check if that time has already passed today. If has, add 1 to day. getTime() returns the number of millisecs since 1970/01/01.
    if (dateObj.getTime() > userDateObj.getTime()) {
      userDateObj.setDate(userDateObj.getDate() + 1);
    }

    // Delete all old scheduled notifications
    PushNotification.cancelAllLocalNotifications();

    setLocalNotificationSchedule(userDateObj);

    Alert.alert(
      'Success!',
      `You wil be sent a reminder 5 minutes before ${displayHours}:${displayMins} every day. Let's build this habit!`,
      [{text: 'Cool', onPress: () => getAndSetScheduledLocalNotifications()}],
    );
  };

  function hello() {
    PushNotification.getScheduledLocalNotifications();
    PushNotification.cancelAllLocalNotifications();
  }

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

  useEffect(() => {
    getAndSetScheduledLocalNotifications();
  }, []);

  console.log(notificationsArray);

  return (
    <View style={styles.container}>
      <View style={styles.optionWrapper}>
        <Text style={styles.heading}>Set a Daily Reminder</Text>
        <Text style={styles.description}>
          What time will you meditate? We'll send you a daily reminder 5 mins
          before it's time so you can get yourself ready.
        </Text>
        <View style={styles.timesContainer}>
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
        <Button title="Set New Reminder" handlePress={setNotification} />
        <Text style={styles.description}>
          {notificationsArray.length > 0
            ? notificationsArray.map(
                (notification) =>
                  notification.title === NOTIFICATION_TITLE &&
                  `We'll remind you at ${getTime(
                    notification.date,
                  )} every day. You're welcome!`,
              )
            : 'You currently have no reminders set.'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.darkGreen,
    flex: 1,
    padding: 16,
  },
  optionWrapper: {
    alignItems: 'center',
    marginVertical: 16,
  },
  heading: {
    textAlign: 'center',
    fontSize: 21,
  },
  description: {
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 16,
  },
  timesContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
});

export default SettingsScreen;
