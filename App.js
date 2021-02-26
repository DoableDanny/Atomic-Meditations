import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {theme} from './src/lib/theme/theme';
import HomeScreen from './src/screens/Home/HomeScreen';
import MeditationScreen from './src/screens/Meditation/MeditationScreen';
import SettingsScreen from './src/screens/Settings/SettingsScreen';
import StatsScreen from './src/screens/Stats/StatsScreen';

import useMeditations from './src/lib/custom hooks/useMeditations';
import useStats from './src/lib/custom hooks/useStats';

const App = () => {
  const Stack = createStackNavigator();

  const {
    meditations,
    meditationsUnlocked,
    unlockNextMeditation,
    updateMeditationCompletionTime,
  } = useMeditations();

  const {
    totalSessionsStat,
    updateTotalSessionsStat,
    totalTimeStat,
    updateTotalTimeStat,
    lastMeditationDateStat,
    updateLastMeditationDateStat,
    currentStreakStat,
    updateCurrentStreakStat,
    shouldResetCurrentStreakStat,
    resetCurrentStreakStat,
    longestStreakStat,
  } = useStats();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: theme.navBannerColor,
          },
        }}>
        <Stack.Screen name="Home" options={{title: 'Atomic Meditations'}}>
          {(props) => (
            <HomeScreen
              {...props}
              meditations={meditations}
              meditationsUnlocked={meditationsUnlocked}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Meditation">
          {(props) => (
            <MeditationScreen
              {...props}
              unlockNextMeditation={unlockNextMeditation}
              updateTotalSessionsStat={updateTotalSessionsStat}
              updateMeditationCompletionTime={updateMeditationCompletionTime}
              updateTotalTimeStat={updateTotalTimeStat}
              updateLastMeditationDateStat={updateLastMeditationDateStat}
              updateCurrentStreakStat={updateCurrentStreakStat}
              lastMeditationDateStat={lastMeditationDateStat}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Settings" component={SettingsScreen} />

        <Stack.Screen name="Stats">
          {(props) => (
            <StatsScreen
              {...props}
              totalTimeStat={totalTimeStat}
              totalSessionsStat={totalSessionsStat}
              lastMeditationDateStat={lastMeditationDateStat}
              currentStreakStat={currentStreakStat}
              shouldResetCurrentStreakStat={shouldResetCurrentStreakStat}
              resetCurrentStreakStat={resetCurrentStreakStat}
              longestStreakStat={longestStreakStat}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
