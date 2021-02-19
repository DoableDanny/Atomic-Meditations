import React, {useState} from 'react';

const initialState = [];
for (let i = 1; i <= 60; i++) {
  initialState.push({
    id: i.toString(),
    title: `Day ${i}`,
    isLocked: i === 1 ? false : true,
  });
}

const useMeditations = () => {
  const [meditations, setMeditations] = useState(initialState);

  return {
    meditations,
  };
};

export default useMeditations;
