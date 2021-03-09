import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {theme} from '../theme/theme';
import ThemeContext from '../contexts/ThemeContext';

const ArrowButton = ({iconName, twoArrows, handlePress}) => {
  const theme = useContext(ThemeContext);
  const colors = theme.colors;

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{...styles.arrowButton, backgroundColor: colors.background2}}>
      <Icon name={iconName} size={30} color={colors.secondary} />
      {twoArrows && <Icon name={iconName} size={30} color={colors.secondary} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  arrowButton: {
    margin: 8,
    backgroundColor: theme.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    borderRadius: 8,
  },
});

export default ArrowButton;
