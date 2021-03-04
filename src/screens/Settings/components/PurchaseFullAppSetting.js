import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Button from '../../../lib/components/Button';
import {itemSKUs} from '../../../lib/custom hooks/useInAppPurchase';
import SettingScaffold from './SettingScaffold';

const PurchaseFullAppSetting = ({
  styles,
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
    purchase(itemSKUs[10]);
  };

  return (
    <SettingScaffold
      title="Purchase The Full App"
      description="The first 3 days are free. The full app costs just ***** and helps to support the developer!">
      <Button
        title="Purchase Full App"
        handlePress={() => {
          purchaseFullApp();
        }}
      />
      {isFullAppPurchased && (
        <Text style={styles.message}>
          You have full access to Atomic Meditations. You made a great decision.
          Thank you!
        </Text>
      )}
      {connectionErrorMsg !== '' && (
        <Text style={{...styles.message, color: 'red'}}>
          {connectionErrorMsg}
        </Text>
      )}
    </SettingScaffold>
  );
};

export default PurchaseFullAppSetting;
