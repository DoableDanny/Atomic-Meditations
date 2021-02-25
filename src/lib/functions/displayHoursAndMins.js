const clockify = (seconds) => {
  const hours = Math.floor(seconds / 60 / 60);
  const mins = Math.round((seconds / 60) % 60);

  let displayHours = null;
  if (hours > 0) {
    displayHours = hours < 10 ? `0${hours}` : hours;
  }

  const displayMins = mins < 10 ? `0${mins}` : mins;

  return {
    displayHours,
    displayMins,
  };
};

export const hoursAndMinsString = (seconds) => {
  // Convert seconds to hours & mins to display
  const hours = clockify(seconds).displayHours;
  const mins = clockify(seconds).displayMins;

  const hoursString = hours
    ? `${hours} ${hours === '01' ? 'hr, ' : 'hrs, '}`
    : null;

  const minsString = `${mins} ${mins === 1 ? 'min' : 'mins'}`;

  const displayString = hoursString ? hoursString + minsString : minsString;

  return displayString;
};
