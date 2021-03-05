import React, {useEffect} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {theme} from '../../lib/theme/theme';
import MeditationModule from './MeditationModule';
import Footer from './Footer';

const HomeScreen = ({
  navigation,
  route,
  meditations,
  meditationsUnlocked,
  resetAllMeditationCompletionTimes,
  relockMeditations,
  isFullAppPurchased,
}) => {
  // If on this screen => isFocused = true
  const isFocused = useIsFocused();

  useEffect(() => {
    // If user resets completion times or re-locks meditations in Settings, we reset/re-lock here (React Native Navigation doesn't re-render when go back a screen).
    if (route.params?.resetCompletionTimes) {
      resetAllMeditationCompletionTimes();
      navigation.setParams({resetCompletionTimes: false});
      console.log(route.params);
    } else if (route.params?.relockMeditations) {
      relockMeditations();
      navigation.setParams({relockMeditations: false});
      console.log(route.params);
    }
  }, [isFocused]);

  const renderMeditationModule = ({item}) => (
    <MeditationModule
      item={item}
      navigation={navigation}
      listLength={meditations.length}
      meditationsUnlocked={meditationsUnlocked}
      isFullAppPurchased={isFullAppPurchased}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={meditations}
        renderItem={renderMeditationModule}
        keyExtractor={(item) => item.id}
      />
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkGreen,
    paddingTop: 20,
  },
});

export default HomeScreen;
