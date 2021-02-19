import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {theme} from './src/lib/theme/theme';
import HomeScreen from './src/screens/HomeScreen';
import MeditationScreen from './src/screens/MeditationScreen';
import useMeditations from './src/lib/custom hooks/useMeditations';

const App = () => {
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const Stack = createStackNavigator();

  const {meditations} = useMeditations();

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
        {/* <Stack.Screen name="Home" options={{title: 'Atomic Meditations'}}>
          {(props) => <HomeScreen {...props} meditations={meditations} />}
        </Stack.Screen> */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{meditations}}
          options={{title: 'Atomic Meditations'}}
        />
        <Stack.Screen name="Meditation" component={MeditationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
