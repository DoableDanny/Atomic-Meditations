import React, {useContext} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import ThemeContext from '../contexts/ThemeContext';

const Button = ({title, handlePress, btnStyle, extraStyles}) => {
  let backgroundColor;

  const theme = useContext(ThemeContext);
  const colors = theme.colors;

  switch (btnStyle) {
    case 'secondary':
      backgroundColor = colors.secondary;
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
        ...extraStyles,
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
    minWidth: 280,
    alignSelf: 'stretch',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Button;
