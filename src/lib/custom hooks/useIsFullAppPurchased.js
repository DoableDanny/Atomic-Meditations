import {useEffect, useState} from 'react';

import {
  STORAGE_KEYS,
  storeStringData,
  getStringData,
} from '../functions/asyncStorage';

const {IS_FULL_APP_PURCHASED} = STORAGE_KEYS;

const useIsFullAppPurchased = () => {
  const [isFullAppPurchased, setIsFullAppPurchased] = useState(false);

  // Load is_full_app_purchased from storage on initial load. true => full app access.
  useEffect(() => {
    getStringData(IS_FULL_APP_PURCHASED).then((data) => {
      console.log('isFullAppPurchasedData: ', data);
      setIsFullAppPurchased(data === 'true');
    });
  }, []);

  const setAndStoreFullAppPurchase = (boolean) => {
    setIsFullAppPurchased(boolean);
    storeStringData(IS_FULL_APP_PURCHASED, boolean.toString());
    console.log('set and stored full app purchase');
  };

  return {
    isFullAppPurchased,
    setAndStoreFullAppPurchase,
  };
};

export default useIsFullAppPurchased;
