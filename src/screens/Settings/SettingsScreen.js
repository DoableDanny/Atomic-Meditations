import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';

import {theme} from '../../lib/theme/theme';
import {localNotificationSchedule} from '../../lib/functions/pushNotification';
import AdjustTimeBtn from '../../lib/components/AdjustTimeBtn';
import Button from '../../lib/components/Button';

const AdjustTimeModule = ({time, addOne, minusOne}) => {
  return (
    <View style={styles.timeSelectWrapper}>
      <AdjustTimeBtn iconName="keyboard-arrow-up" handlePress={addOne} />
      <Text style={styles.timeText}>{time}</Text>
      <AdjustTimeBtn iconName="keyboard-arrow-down" handlePress={minusOne} />
    </View>
  );
};

const SettingsScreen = () => {
  const [hours, setHours] = useState(12);
  const [mins, setMins] = useState(30);
  const [location, setLocation] = useState('bedroom');
  // Get current year, month and day
  // Get time from user
  // Put all these values into new Date to create new obj
  // Submit the date obj to notification

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

    localNotificationSchedule(userDateObj);
  };

  return (
    <View style={styles.container}>
      <View style={styles.optionWrapper}>
        <Text style={styles.heading}>Set a Notification</Text>
        <Text style={styles.description}>
          What time will you meditate? We'll send you a notification 5 mins
          before it's time.
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
        {/* <Text style={styles.description}>
          Where will you meditate? For example, "bedroom" or "living room".
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setLocation(text)}
          value={location}
        /> */}
        <Button title="Set Notificaion" handlePress={setNotification} />
      </View>

      {/* <Button title="Notify" onPress={localNotificationSchedule} /> */}
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
  timeSelectWrapper: {
    alignItems: 'center',
    margin: 4,
  },
  timeText: {
    fontSize: 18,
    marginVertical: 16,
  },
  textInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    minWidth: 260,
    padding: 8,
  },
});

export default SettingsScreen;
