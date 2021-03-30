import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

import {usePushNotification} from '../../../../lib/custom hooks';

import SettingScaffold from '../SettingScaffold';
import AdjustTimeModule from '../AdjustTimeModule';
import Message from '../Message';
import Button from '../../../../lib/components/Button';

const NotificationSetting = () => {
  const [hours, setHours] = useState(12);
  const [mins, setMins] = useState(30);

  const {
    NOTIFICATION_TITLE,
    notificationsArray,
    setNotification,
    cancelNotification,
    getTime,
  } = usePushNotification();

  let displayHours = hours < 10 ? `0${hours}` : hours;
  let displayMins = mins < 10 ? `0${mins}` : mins;

  const setNotificationAndAlert = (hours, mins) => {
    crashlytics().log('Set New Reminder btn pressed (NotificationSetting)');

    setNotification(hours, mins);

    Alert.alert(
      'Success!',
      `You will meditate at ${displayHours}:${displayMins} every day. We'll send you a reminder 5 mins before this time each day. Let's build this habit!`,
      [
        {
          text: 'Cool',
          onPress: () => {
            console.log('Cool');
          },
        },
      ],
    );
  };

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

  return (
    <SettingScaffold
      title="Set a Daily Reminder"
      description="What time will you meditate? Be sure to give yourself enough time to get ready. We'll send you a daily reminder!">
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
        handlePress={() => setNotificationAndAlert(hours, mins)}
        extraStyles={{marginBottom: 16}}
      />
      <Button
        title="Cancel Reminder"
        handlePress={() => {
          crashlytics().log(
            'Cancel Reminder btn pressed (NotificationSetting)',
          );
          cancelNotification();
        }}
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
