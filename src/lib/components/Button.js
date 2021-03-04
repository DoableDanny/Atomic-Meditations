import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {theme} from '../theme/theme';

const Button = ({title, handlePress, btnStyle}) => {
  let backgroundColor;

  switch (btnStyle) {
    case 'warning':
      backgroundColor = theme.warning;
      break;
    case 'danger':
      backgroundColor = theme.danger;
      break;
    default:
      backgroundColor = theme.lightBlue;
  }

  return (
    <TouchableOpacity
      style={{
        ...styles.btn,
        backgroundColor: backgroundColor,
      }}
      onPress={handlePress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    minWidth: 250,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Button;
