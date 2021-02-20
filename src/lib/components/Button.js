import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {theme} from '../theme/theme';

const Button = ({title, handlePress}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={handlePress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: theme.lightBlue,
    paddingHorizontal: 110,
    paddingVertical: 16,
    borderRadius: 12,
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
  },
});

export default Button;
