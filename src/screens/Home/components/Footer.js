import React, {useContext} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

import ThemeContext from '../../../lib/contexts/ThemeContext';

const FooterBtn = ({title, borderRight, handlePress}) => {
  const theme = useContext(ThemeContext);

  const dynamicStyles = {
    footerBtn: {
      backgroundColor: theme.colors.navBannerColor,
    },
  };

  return (
    <TouchableOpacity
      style={[
        styles.footerBtn,
        borderRight && {
          ...styles.borderRight,
          borderColor: theme.colors.secondary,
        },
        dynamicStyles.footerBtn,
      ]}
      onPress={handlePress}>
      <Text style={{...styles.footerBtnTitle, color: theme.colors.secondary}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const Footer = ({navigation}) => {
  return (
    <View style={styles.footerWrapper}>
      <FooterBtn
        title="Settings"
        borderRight
        handlePress={() => navigation.navigate('Settings')}
      />
      <FooterBtn
        title="Stats"
        handlePress={() => navigation.navigate('Stats')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footerWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  footerBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  borderRight: {
    borderRightWidth: 1,
  },
  footerBtnTitle: {
    fontSize: 17,
  },
});

export default Footer;
