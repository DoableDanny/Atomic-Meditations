import React from 'react';

import {useInAppPurchase} from '../../../../lib/custom hooks';
import Button from '../../../../lib/components/Button';
import SettingScaffold from '../SettingScaffold';
import Message from '../Message';

const PurchaseFullAppSetting = ({
  isFullAppPurchased,
  setAndStoreFullAppPurchase,
}) => {
  const {purchaseFullApp, connectionErrorMsg} = useInAppPurchase(
    isFullAppPurchased,
    setAndStoreFullAppPurchase,
  );

  return (
    <>
      {!isFullAppPurchased && (
        <SettingScaffold
          title="Purchase The Full App"
          description="The first 3 days are free. The full app only costs a few dollars and helps to support the app's development!">
          <Button title="Purchase Full App" handlePress={purchaseFullApp} />
          {connectionErrorMsg !== '' && (
            <Message danger>{connectionErrorMsg}</Message>
          )}
        </SettingScaffold>
      )}
    </>
  );
};

export default PurchaseFullAppSetting;
