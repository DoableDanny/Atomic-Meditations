import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Button from '../../../lib/components/Button';
import {itemSKUs} from '../../../lib/custom hooks/useInAppPurchase';

const PurchaseFullAppSetting = ({
  styles,
  connected,
  isFullAppPurchased,
  purchase,
}) => {
  const [connectionErrorMsg, setConnectionErrorMsg] = useState('');

  useEffect(() => {
    return () => setConnectionErrorMsg('');
  }, []);

  const purchaseFullApp = () => {
    if (!connected && !isFullAppPurchased) {
      setConnectionErrorMsg(
        'You need an internet connection to make a purchase.',
      );
    }
    purchase(itemSKUs[10]);
  };

  return (
    <View style={styles.optionWrapper}>
      <Text style={styles.heading}>Purchase The Full App</Text>
      <Text style={styles.description}>
        The first 3 days are free. The full app costs just ***** and helps to
        support the developer!
      </Text>
      <Button
        title="Purchase Full App"
        handlePress={() => {
          purchaseFullApp();
        }}
      />
      {isFullAppPurchased && (
        <Text style={styles.description}>
          You have full access to Atomic Meditations. You made a great decision.
          Thank you!
        </Text>
      )}
      {connectionErrorMsg !== '' && (
        <Text style={{...styles.description, color: 'red'}}>
          {connectionErrorMsg}
        </Text>
      )}
    </View>
  );
};

export default PurchaseFullAppSetting;
