import React from 'react';
import {FlatList, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {theme} from '../../lib/theme/theme';
import Footer from './Footer';

const MeditationModule = ({
  item,
  navigation,
  listLength,
  meditationsUnlocked,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.meditationModule,
        item.id == listLength && {marginBottom: 80},
      ]}
      onPress={() =>
        item.id <= meditationsUnlocked + 1 &&
        navigation.navigate('Meditation', {currentMeditation: item})
      }>
      {item.id <= meditationsUnlocked + 1 ? (
        <Text style={styles.text}>{item.title}</Text>
      ) : (
        <Icon name="lock-outline" size={40} color="rgba(0, 0, 0, 0.5)" />
      )}
    </TouchableOpacity>
  );
};

const HomeScreen = ({navigation, meditations, meditationsUnlocked}) => {
  const renderMeditationModule = ({item}) => (
    <MeditationModule
      item={item}
      navigation={navigation}
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
  meditationModule: {
    backgroundColor: theme.lightGreen,
    padding: 35,
    maxHeight: 100,
    borderRadius: 32,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default HomeScreen;
