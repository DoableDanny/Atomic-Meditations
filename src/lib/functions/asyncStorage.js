// THINK I SHOULD TURN THIS INTO A HOOK?
// ON App COMPONENT MOUNT CAN GET ALL DATA FROM STORAGE AND SET STATES
// THIS CAN BE PASSED DOWN TO CORRECT SCREENS?

import AsyncStorage from '@react-native-async-storage/async-storage';

// ALL STORAGE KEYS SHOULD BE LISTED IN THIS FILE e.g.
// const MY_KEY_1 = '@val_1'

// Storing new string data or updating.
const storeStringData = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value);
  } catch (e) {
    console.log(e);
  }
};

const storeObjectData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@storage_Key', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

// getItem returns a promise that either resolves to stored value when data is found for given key, or returns null otherwise.
const getStringData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key');
    if (value !== null) {
      // value previously stored
    }
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
const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }

  console.log(`${key} deleted successfully`);
};

// Fetches multiple key-value pairs for given array of keys in a batch.
const getMultiple = async (keysArray) => {
  let values;
  try {
    values = await AsyncStorage.multiGet(keysArray);
  } catch (e) {
    console.log(e);
  }
  console.log(values);

  // example console.log output:
  // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
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
removeMultiple = async (arrayOfKeys) => {
  try {
    await AsyncStorage.multiRemove(arrayOfKeys);
  } catch (e) {
    console.log(e);
  }

  console.log(`Successfully deleted: ${arrayOfKeys}`);
};
