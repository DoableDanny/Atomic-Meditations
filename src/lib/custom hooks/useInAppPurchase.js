import {useEffect, useState} from 'react';
import {requestPurchase, useIAP} from 'react-native-iap';
import crashlytics from '@react-native-firebase/crashlytics';

// Play store item Ids
export const itemSKUs = Platform.select({
  android: ['full_app'],
});

// isFullAppPurchased and setAndStoreFullAppPurchase are required arguments in this hook.
const useInAppPurchase = (isFullAppPurchased, setAndStoreFullAppPurchase) => {
  const {
    connected,
    products,
    getProducts,
    finishTransaction,
    currentPurchase,
    currentPurchaseError,
  } = useIAP();

  const [connectionErrorMsg, setConnectionErrorMsg] = useState('');

  useEffect(() => {
    if (connected) {
      getProducts(itemSKUs);
      console.log('Getting products...');
    }
  }, [connected, getProducts]);

  // User gets full app access upon purchase, even before purchase is acknowledged.
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
            // We would need a backend to validate receipts for purhcases that pended for a while and were then declined. So I'll assume most purchase attempts go through successfully (OK ackResult) & take the hit for the ones that don't (user will still have full app access).
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

  useEffect(() => {
    return () => setConnectionErrorMsg('');
  }, []);

  const purchaseFullApp = async () => {
    crashlytics().log('purchaseFullApp btn pressed (PurchaseFullAppSetting)');

    // I believe "connected" means RNIAP package is setup, not if connected to play store.
    if (!connected) {
      setConnectionErrorMsg('Please check your internet connection.');
      console.log('Not connected to RNIAP');
    }
    // If we are connected & have products, purchase the item. Google will handle if user has no internet here.
    else if (products?.length > 0) {
      requestPurchase(itemSKUs[0]);
      console.log('Products.length > 0. Trying to purchasing product...');
    }
    // If we are connected but have no products returned, try to get products and purchase.
    else {
      console.log('No products. Now trying to get some...');
      try {
        await getProducts(itemSKUs);
        console.log('Products got: ', products);
        requestPurchase(itemSKUs[0]);
        console.log('Trying to purchase...');
      } catch (error) {
        setConnectionErrorMsg('Please check your internet connection.');
        console.log('Everything failed :(. Error: ', error);
      }
      {
      }
    }
  };

  return {
    purchaseFullApp,
    connectionErrorMsg,
  };
};

export default useInAppPurchase;
