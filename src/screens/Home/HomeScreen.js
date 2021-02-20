import React from 'react';
import {FlatList, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {theme} from '../../lib/theme/theme';
import Footer from './Footer';

const MeditationModule = ({item, navigation, listLength}) => {
  console.log(listLength);
  return (
    <TouchableOpacity
      style={[
        styles.meditationModule,
        item.id == listLength && {marginBottom: 80},
      ]}
      onPress={() =>
        !item.isLocked &&
        navigation.navigate('Meditation', {currentMeditation: item})
      }>
      {item.isLocked ? (
        <Icon name="lock-outline" size={40} color="rgba(0, 0, 0, 0.5)" />
      ) : (
        <Text style={styles.text}>{item.title}</Text>
      )}
    </TouchableOpacity>
  );
};

const HomeScreen = ({navigation, route}) => {
  const {meditations} = route.params;

  const renderMeditationModule = ({item}) => (
    <MeditationModule
      item={item}
      navigation={navigation}
      navigation={navigation}
      listLength={meditations.length}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={meditations}
        renderItem={renderMeditationModule}
        keyExtractor={(item) => item.id}
      />
      <Footer />
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
