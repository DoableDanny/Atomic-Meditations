import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import crashlytics from '@react-native-firebase/crashlytics';

import ThemeContext from '../../../lib/contexts/ThemeContext';

const PlayPauseBtn = ({type, handlePress}) => {
  const theme = useContext(ThemeContext);
  const colors = theme.colors;

  const dynamicStyles = {backgroundColor: colors.background2};

  return (
    <TouchableOpacity
      onPress={() => {
        crashlytics().log(`${type} btn pressed (in SoundSetting)`);
        handlePress();
      }}
      style={[styles.btn, dynamicStyles]}>
      <Icon
        name={type === 'play' ? 'play' : 'pause'}
        size={20}
        color={colors.secondary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 16,
    marginHorizontal: 8,
    borderRadius: 6,
  },
});

export default PlayPauseBtn;
