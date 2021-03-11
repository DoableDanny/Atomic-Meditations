import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ThemeContext from '../contexts/ThemeContext';

const ArrowButton = ({direction, double, handlePress}) => {
  const theme = useContext(ThemeContext);
  const colors = theme.colors;

  let iconName;
  switch (direction) {
    case 'up':
      iconName = 'keyboard-arrow-up';
      break;
    case 'down':
      iconName = 'keyboard-arrow-down';
      break;
    case 'left':
      iconName = 'keyboard-arrow-left';
      break;
    default:
      iconName = 'keyboard-arrow-right';
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{...styles.arrowButton, backgroundColor: colors.background2}}>
      <Icon name={iconName} size={30} color={colors.secondary} />
      {double && <Icon name={iconName} size={30} color={colors.secondary} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  arrowButton: {
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    borderRadius: 8,
  },
});

export default ArrowButton;
