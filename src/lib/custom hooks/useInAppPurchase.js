import React, {useEffect, useState} from 'react';
import {requestPurchase, requestSubscription, useIAP} from 'react-native-iap';
import {Alert} from 'react-native';

import {
  STORAGE_KEYS,
  storeStringData,
  getStringData,
} from '../functions/asyncStorage';

// Play store item Ids
export const itemSKUs = Platform.select({
  android: ['full_app'],
});

const {IS_FULL_APP_PURCHASED} = STORAGE_KEYS;

const useInAppPurchase = () => {
  const {
    connected,
    products,
    subscriptions,
    getProducts,
    getSubscriptions,
    finishTransaction,
    currentPurchase,
    currentPurchaseError,
  } = useIAP();

  const [isFullAppPurchased, setIsFullAppPurchased] = useState(false);

  useEffect(() => {
    getProducts(itemSKUs);
  }, [getProducts]);

  useEffect(() => {
    const checkCurrentPurchase = async (purchase) => {
      if (purchase) {
        const receipt = purchase.transactionReceipt;

        if (receipt) {
          try {
            const ackResult = await finishTransaction(purchase);
            console.log('ackResult', ackResult);
          } catch (ackErr) {
            console.warn('ackErr', ackErr);
          }
        }
      }
    };

    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase, finishTransaction]);

  // If user reinstalls app, then they can press purchase btn (SettingsScreen) to get full app without paying again.
  useEffect(() => {
    if (currentPurchaseError) {
      if (
        currentPurchaseError.code === 'E_ALREADY_OWNED' &&
        !isFullAppPurchased
      ) {
        setIsFullAppPurchased(true);
        storeStringData(IS_FULL_APP_PURCHASED, 'true');
      }
    }
  }, [currentPurchaseError]);

  const purchase = (productId) => {
    requestPurchase(productId);
  };

  // Load is_full_app_purchased from storage on initial load. true => full app access.
  useEffect(() => {
    getStringData(IS_FULL_APP_PURCHASED).then((data) => {
      setIsFullAppPurchased(data === 'true');
    });
  }, []);

  return {
    connected,
    products,
    getProducts,
    finishTransaction,
    currentPurchase,
    currentPurchaseError,
    purchase,
    isFullAppPurchased,
  };
};

export default useInAppPurchase;
