import React, {useContext} from 'react';
import {Text, StyleSheet} from 'react-native';

import ThemeContext from '../contexts/ThemeContext';

const MyText = ({header, secondary, children}) => {
  const theme = useContext(ThemeContext);
  let dynamicStyles = [];

  // Text Variant
  header
    ? dynamicStyles.push(theme.textVariants.header)
    : dynamicStyles.push(theme.textVariants.body);

  // Color
  secondary
    ? dynamicStyles.push({color: theme.colors.textSecondary})
    : dynamicStyles.push({color: theme.colors.textPrimary});

  return <Text style={dynamicStyles}>{children}</Text>;
};

export default MyText;
