import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

import {theme} from '../../lib/theme/theme';

const FooterBtn = ({title, borderRight}) => {
  return (
    <TouchableOpacity
      style={[styles.footerBtn, borderRight && styles.borderRight]}>
      <Text style={styles.footerBtnTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const Footer = () => {
  return (
    <View style={styles.footerWrapper}>
      <FooterBtn title="Settings" borderRight />
      <FooterBtn title="Stats" />
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
    backgroundColor: theme.navBannerColor,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  borderRight: {
    borderRightWidth: 1,
    borderColor: 'white',
  },
  footerBtnTitle: {
    fontSize: 17,
    color: 'white',
  },
});

export default Footer;
