import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {theme} from '../theme/theme';

const ArrowButton = ({iconName, twoArrows, handlePress}) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.arrowButton}>
      <Icon name={iconName} size={30} />
      {twoArrows && <Icon name={iconName} size={30} />}
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
