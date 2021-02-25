import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';

import {theme} from '../../lib/theme/theme';
import MeditationModule from './MeditationModule';
import Footer from './Footer';

const HomeScreen = ({navigation, meditations, meditationsUnlocked}) => {
  const renderMeditationModule = ({item}) => (
    <MeditationModule
      item={item}
      navigation={navigation}
      listLength={meditations.length}
      meditationsUnlocked={meditationsUnlocked}
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
