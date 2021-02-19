import React, {useContext} from 'react';
import {FlatList, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

import {theme, ThemeContext} from '../lib/theme/ThemeContext';

const DATA = [
  {
    id: 1,
    title: 'Day 1',
  },
  {
    id: 2,
    title: 'Day 2',
  },
  {
    id: 3,
    title: 'Day 3',
  },
];

const MeditationModule = ({title}) => {
  return (
    <TouchableOpacity style={styles.meditationModule}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const theme = useContext(ThemeContext);

  const renderMeditationModule = ({item}) => (
    <MeditationModule title={item.title} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderMeditationModule}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkGreen,
  },
  meditationModule: {
    backgroundColor: theme.lightGreen,
    padding: 40,
    borderRadius: 32,
    margin: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default HomeScreen;
