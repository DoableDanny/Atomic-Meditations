import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Button from '../lib/components/Button';
import {theme} from '../lib/theme/theme';

const MeditationScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>00 : 00: 04</Text>
      <Button title="Done" handlePress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 60,
  },
});

export default MeditationScreen;
