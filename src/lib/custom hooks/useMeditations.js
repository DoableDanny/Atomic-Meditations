import React, {useState, useEffect} from 'react';
import {
  STORAGE_KEYS,
  getMultiple,
  storeStringData,
  removeValue,
} from '../functions/asyncStorage';

const initialState = [];
for (let i = 1; i <= 60; i++) {
  initialState.push({
    id: i.toString(),
    title: `Day ${i}`,
    isLocked: i === 1 ? false : true,
  });
}

// removeValue(STORAGE_KEYS.MEDITATIONS_UNLOCKED);

// Need to get MEDITATIONS_UNLOCKED from storage.
// Check if current meditation is greater than MEDITATIONS_UNLOCKED
// If yes, add 1 and setAndSave
// If no, move on to next thing.

const {MEDITATIONS_UNLOCKED} = STORAGE_KEYS;

const useMeditations = () => {
  const [meditations, setMeditations] = useState(initialState);
  // Initially, user has unlocked 0 meditations
  const [meditationsUnlocked, setMeditationsUnlocked] = useState(0);

  // Initial loading of stats data from async storage and setting of state.
  useEffect(() => {
    getMultiple([MEDITATIONS_UNLOCKED]).then((data) => {
      // If not null, then setState values
      data[MEDITATIONS_UNLOCKED] &&
        setMeditationsUnlocked(data[MEDITATIONS_UNLOCKED]);
    });
  }, []);

  const unlockNextMeditation = (id) => {
    setMeditationsUnlocked(parseInt(id));
    storeStringData(MEDITATIONS_UNLOCKED, id);
  };

  return {
    meditations,
    unlockNextMeditation,
    meditationsUnlocked,
  };
};

export default useMeditations;
