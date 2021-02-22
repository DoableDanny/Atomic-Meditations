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
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    minWidth: 240,
  },
  text: {
    fontSize: 21,
    textAlign: 'center',
  },
});

export default Button;
