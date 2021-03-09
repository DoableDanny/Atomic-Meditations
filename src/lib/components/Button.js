import React, {useContext} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import ThemeContext from '../contexts/ThemeContext';

const Button = ({title, handlePress, btnStyle}) => {
  let backgroundColor;

  const theme = useContext(ThemeContext);
  const colors = theme.colors;

  switch (btnStyle) {
    case 'secondary':
      backgroundColor = theme.secondary;
      break;
    case 'danger':
      backgroundColor = colors.danger;
      break;
    default:
      backgroundColor = colors.primary;
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
