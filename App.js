import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ThemeContext, {theme, darkTheme} from './src/lib/contexts/ThemeContext';

import {
  HomeScreen,
  MeditationScreen,
  SettingsScreen,
  StatsScreen,
} from './src/screens';

import {
  useTheme,
  useMeditations,
  useStats,
  useInAppPurchase,
} from './src/lib/custom hooks';

const App = () => {
  const {darkMode, toggleDarkMode} = useTheme();

  const {
    meditations,
    meditationsUnlocked,
    unlockNextMeditation,
    updateMeditationCompletionTime,
    resetAllMeditationCompletionTimes,
    relockMeditations,
  } = useMeditations();

  const {
    totalSessionsStat,
    totalTimeStat,
    lastMeditationDateStat,
    currentStreakStat,
    resetCurrentStreakStat,
    shouldResetCurrentStreakStat,
    updateAllStats,
    longestStreakStat,
    resetAllStats,
  } = useStats();

  const {
    connected,
    products,
    currentPurchaseError,
    purchase,
    isFullAppPurchased,
  } = useInAppPurchase();

  const Stack = createStackNavigator();

  return (
    <ThemeContext.Provider value={darkMode ? darkTheme : theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: darkMode
              ? darkTheme.colors.secondary
              : theme.colors.secondary,
            headerStyle: {
              backgroundColor: darkMode
                ? darkTheme.colors.navBannerColor
                : theme.colors.navBannerColor,
            },
          }}>
          <Stack.Screen name="Home" options={{title: `Atomic Meditation`}}>
            {(props) => (
              <HomeScreen
                {...props}
                meditations={meditations}
                meditationsUnlocked={meditationsUnlocked}
                resetAllMeditationCompletionTimes={
                  resetAllMeditationCompletionTimes
                }
                relockMeditations={relockMeditations}
                isFullAppPurchased={isFullAppPurchased}
                currentStreakStat={currentStreakStat}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Meditation">
            {(props) => (
              <MeditationScreen
                {...props}
                unlockNextMeditation={unlockNextMeditation}
                updateMeditationCompletionTime={updateMeditationCompletionTime}
                lastMeditationDateStat={lastMeditationDateStat}
                updateAllStats={updateAllStats}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Settings">
            {(props) => (
              <SettingsScreen
                {...props}
                connected={connected}
                products={products}
                purchase={purchase}
                currentPurchaseError={currentPurchaseError}
                isFullAppPurchased={isFullAppPurchased}
                resetAllStats={resetAllStats}
                meditations={meditations}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />
            )}
          </Stack.Screen>

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
    </ThemeContext.Provider>
  );
};

export default App;
