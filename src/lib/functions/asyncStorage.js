// 1.
// MEDITATIONS SCREEN -> AFTER 2 MINS, UNLOCK NEXT DAY.
// DoneBtn pressed -> Get stored time, add current and save.
// -> Get sessions, add 1 and save.
// -> Save current date
// -> If current date = yesterday + 1, add 1 to streak and save
// -> If current streak > longest streak, + 1 and save
// STATS SCREEN -> If streak !== 0 and if lastMed !== today || today - 1, reset streak to 0 and save
// 2.
// ON App COMPONENT MOUNT CAN GET ALL DATA (multiGet) FROM STORAGE AND SET STATES (apart from streak?)
// THIS CAN BE PASSED DOWN TO CORRECT SCREENS?

import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  MEDITATIONS: '@meditations',
  MEDITATIONS_UNLOCKED: '@meditations_unlocked',
  TOTAL_SESSIONS: '@total_sessions',
  TOTAL_TIME: '@total_time',
  CURRENT_STREAK: '@current_streak',
  LONGEST_STREAK: '@longest_streak',
  LAST_MEDITATION_DATE: '@last_meditation_date',
};

// Storing new string data or updating.
export const storeStringData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value.toString());
  } catch (e) {
    console.log(e);
  }

  console.log(`Saved`);
};

export const storeObjectData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

// getItem returns a promise that either resolves to stored value when data is found for given key, or returns null otherwise.
export const getStringData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.log(e);
  }
};

const getObjectData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

// Delete an item from storage
export const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }

  console.log(`${key} deleted successfully`);
};

// Fetches multiple key-value pairs for given array of keys in a batch.
export const getMultiple = async (keysArray) => {
  let values;
  try {
    values = await AsyncStorage.multiGet(keysArray);
  } catch (e) {
    console.log(e);
  }
  // example console.log output:
  // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]

  // Convert array of arrays to object
  return Object.fromEntries(values);
};

// Set multiple key-values. Input example: [ ['@MyApp_user', 'value_1'], ['@MyApp_key', 'value_2'] ]
const multiSet = async (keyValuePairsArray) => {
  try {
    await AsyncStorage.multiSet(keyValuePairsArray);
  } catch (e) {
    console.log(e);
  }

  console.log(`Successfully saved: ${keyValuePairsArray}`);
};

// Remove multiple key-value entries. Input example: ['@MyApp_USER_1', '@MyApp_USER_2']
const removeMultiple = async (arrayOfKeys) => {
  try {
    await AsyncStorage.multiRemove(arrayOfKeys);
  } catch (e) {
    console.log(e);
  }

  console.log(`Successfully deleted: ${arrayOfKeys}`);
};
