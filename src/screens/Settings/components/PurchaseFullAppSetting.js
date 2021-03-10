import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import Button from '../../../lib/components/Button';
import {itemSKUs} from '../../../lib/custom hooks/useInAppPurchase';
import SettingScaffold from './SettingScaffold';
import Message from './Message';

const PurchaseFullAppSetting = ({
  connected,
  isFullAppPurchased,
  purchase,
  currentPurchaseError,
}) => {
  const [connectionErrorMsg, setConnectionErrorMsg] = useState('');

  useEffect(() => {
    return () => setConnectionErrorMsg('');
  }, []);

  const purchaseFullApp = () => {
    if (
      !isFullAppPurchased &&
      ((currentPurchaseError &&
        currentPurchaseError.code === 'PROMISE_BUY_ITEM') ||
        !connected)
    ) {
      setConnectionErrorMsg(
        'You need an internet connection to make a purchase.',
      );
    }
    purchase(itemSKUs[1]);
  };

  return (
    <SettingScaffold
      title="Purchase The Full App"
      description="The first 3 days are free. The full app only costs a few dollars and helps to support the app's development!">
      <Button
        title="Purchase Full App"
        handlePress={() => {
          purchaseFullApp();
        }}
      />
      {isFullAppPurchased && (
        <Message>
          You have full access to Atomic Meditations. You made a great decision.
          Thank you!
        </Message>
      )}
      {connectionErrorMsg !== '' && (
        <Message danger>{connectionErrorMsg}</Message>
      )}
    </SettingScaffold>
  );
};

export default PurchaseFullAppSetting;
