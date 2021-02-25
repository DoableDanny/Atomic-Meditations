import React, {useState, useEffect} from 'react';
import {
  STORAGE_KEYS,
  getMultiple,
  storeStringData,
  removeValue,
  storeObjectData,
} from '../functions/asyncStorage';

const initialState = [];
for (let i = 1; i <= 60; i++) {
  initialState.push({
    id: i.toString(),
    completionTime: 0, // seconds
  });
}

const {MEDITATIONS, MEDITATIONS_UNLOCKED} = STORAGE_KEYS;

const useMeditations = () => {
  const [meditations, setMeditations] = useState(initialState);
  // Initially, user has unlocked 0 meditations
  const [meditationsUnlocked, setMeditationsUnlocked] = useState(0);

  // Initial loading of stats data from async storage and setting of state.
  useEffect(() => {
    getMultiple([MEDITATIONS, MEDITATIONS_UNLOCKED]).then((data) => {
      // If not null, then setState values
      data[MEDITATIONS] && setMeditations(JSON.parse(data[MEDITATIONS]));

      data[MEDITATIONS_UNLOCKED] &&
        setMeditationsUnlocked(parseInt(data[MEDITATIONS_UNLOCKED]));
    });
  }, []);

  const unlockNextMeditation = (id) => {
    if (
      parseInt(id) > meditationsUnlocked &&
      meditationsUnlocked < meditations.length - 1
    ) {
      setMeditationsUnlocked(parseInt(id));
      storeStringData(MEDITATIONS_UNLOCKED, id);
    }
  };

  const updateMeditationCompletionTime = (currentMeditation, time) => {
    if (currentMeditation.completionTime < time) {
      currentMeditation.completionTime = time;

      let meditationsCopy = [...meditations];

      meditationsCopy.splice(currentMeditation.id - 1, 1, currentMeditation);

      setAndStoreMeditations(meditationsCopy);

      console.log('updatedMeds', meditationsCopy);
    }
  };

  const setAndStoreMeditations = (meditations) => {
    setMeditations(meditations);
    storeObjectData(MEDITATIONS, meditations);
  };

  return {
    meditations,
    unlockNextMeditation,
    meditationsUnlocked,
    updateMeditationCompletionTime,
  };
};

export default useMeditations;
