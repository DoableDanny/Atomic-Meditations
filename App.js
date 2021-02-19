import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {theme} from './src/lib/theme/theme';
import HomeScreen from './src/screens/HomeScreen';
import MeditationScreen from './src/screens/MeditationScreen';

const App = () => {
  const Stack = createStackNavigator();

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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Meditation" component={MeditationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
