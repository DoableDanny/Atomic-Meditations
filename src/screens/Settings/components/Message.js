import React, {useContext} from 'react';
import {Text, StyleSheet} from 'react-native';

import ThemeContext from '../../../lib/contexts/ThemeContext';

const Message = ({children, danger}) => {
  const theme = useContext(ThemeContext);
  const colors = theme.colors;

  return (
    <Text
      style={{
        ...styles.message,
        color: danger ? colors.danger : colors.textPrimary,
      }}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  message: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 18,
    lineHeight: 24,
  },
});

export default Message;
