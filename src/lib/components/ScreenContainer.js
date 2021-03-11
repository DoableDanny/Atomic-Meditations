import React, {useContext} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';

import ThemeContext from '../contexts/ThemeContext';

const ScreenContainer = ({
  scrollable,
  children,
  extraStyles,
  contentContainerStyle,
}) => {
  const theme = useContext(ThemeContext);

  const dynamicStyles = {
    backgroundColor: theme.colors.background,
  };

  const fullStyles = [styles.container, dynamicStyles, extraStyles];

  return (
    <>
      {!scrollable ? (
        <View style={fullStyles}>{children}</View>
      ) : (
        <ScrollView
          style={fullStyles}
          contentContainerStyle={contentContainerStyle}>
          {children}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ScreenContainer;
