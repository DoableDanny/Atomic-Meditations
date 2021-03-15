import React, {useContext} from 'react';
import {Text} from 'react-native';

import ThemeContext from '../contexts/ThemeContext';

const MyText = ({textVariant, color, children}) => {
  const theme = useContext(ThemeContext);
  let dynamicStyles = [];

  // Text Variant
  textVariant === 'header'
    ? dynamicStyles.push(theme.textVariants.header)
    : dynamicStyles.push(theme.textVariants.body);

  // Color
  color === 'secondary'
    ? dynamicStyles.push({color: theme.colors.textSecondary})
    : dynamicStyles.push({color: theme.colors.textPrimary});

  return <Text style={dynamicStyles}>{children}</Text>;
};

export default MyText;
