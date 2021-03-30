import {useEffect, useState} from 'react';
import {requestPurchase, useIAP} from 'react-native-iap';

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
    getProducts,
    finishTransaction,
    currentPurchase,
    currentPurchaseError,
  } = useIAP();

  const [isFullAppPurchased, setIsFullAppPurchased] = useState(false);

  useEffect(() => {
    getProducts(itemSKUs);
  }, [getProducts]);

  // User gets full app access upon purchase, even before purchase is acknowledged. Then if error, app access is removed and alert showed.
  useEffect(() => {
    const checkCurrentPurchase = async (purchase) => {
      if (purchase) {
        const receipt = purchase.transactionReceipt;

        console.log('RECEIPT: ', receipt);

        if (receipt) {
          // Give full app access
          setAndStoreFullAppPurchase(true);
          try {
            const ackResult = await finishTransaction(purchase);
            console.log('ackResult: ', ackResult);
          } catch (ackErr) {
            // We would need a backend to validate receipts for purhcases that pended a while and were then declined. So I'll assume most purchase attempts go through successfully (OK ackResult) & take the hit for the ones that don't (user will still have full app access).
            console.log('ackErr', ackErr);
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
        setAndStoreFullAppPurchase(true);
      }
    }
  }, [currentPurchaseError]);

  const purchase = (productId) => {
    requestPurchase(productId);
  };

  // Load is_full_app_purchased from storage on initial load. true => full app access.
  useEffect(() => {
    getStringData(IS_FULL_APP_PURCHASED).then((data) => {
      console.log('data: ', data);
      setIsFullAppPurchased(data === 'true');
    });
  }, []);

  const setAndStoreFullAppPurchase = (boolean) => {
    setIsFullAppPurchased(boolean);
    storeStringData(IS_FULL_APP_PURCHASED, boolean.toString());
  };

  return {
    connected,
    products,
    currentPurchase,
    currentPurchaseError,
    purchase,
    isFullAppPurchased,
  };
};

export default useInAppPurchase;
