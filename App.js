import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {requestPurchase, requestSubscription, useIAP} from 'react-native-iap';

import {theme} from './src/lib/theme/theme';

import {
  HomeScreen,
  MeditationScreen,
  SettingsScreen,
  StatsScreen,
} from './src/screens';

import useMeditations from './src/lib/custom hooks/useMeditations';
import useStats from './src/lib/custom hooks/useStats';
import useInAppPurchase from './src/lib/custom hooks/useInAppPurchase';

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

  const {
    connected,
    products,
    getProducts,
    finishTransaction,
    currentPurchase,
    currentPurchaseError,
    purchase,
    isFullAppPurchased,
  } = useInAppPurchase();

  console.log('CURRENT PURCHASE', currentPurchase);
  console.log('CURRENT PURCHASE ERROR', currentPurchaseError);

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

        <Stack.Screen name="Settings">
          {(props) => (
            <SettingsScreen
              {...props}
              connected={connected}
              products={products}
              purchase={purchase}
              isFullAppPurchased={isFullAppPurchased}
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
  );
};

export default App;
