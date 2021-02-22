import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {theme} from '../theme/theme';

const AdjustTimeBtn = ({iconName, iconNum, handlePress}) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.adjustTimeBtn}>
      <Icon name={iconName} size={30} />
      {iconNum === 2 && <Icon name={iconName} size={30} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  adjustTimeBtn: {
    margin: 8,
    backgroundColor: theme.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    borderRadius: 8,
  },
});

export default AdjustTimeBtn;
