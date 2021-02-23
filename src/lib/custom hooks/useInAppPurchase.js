import {useState, useEffect} from 'react';
import {Alert} from 'react-native';

import RNIap, {
  finishTransaction,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';

// Play store item Ids
const itemSKUs = Platform.select({
  android: ['full_app'],
});

export default function useInAppPurchase() {}
