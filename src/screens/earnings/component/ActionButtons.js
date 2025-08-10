import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Style from '../../../style/Style';
import PrimaryButton from '../../../components/common/PrimaryButton';
import RequestWithdrawModal from './RequestWithdrawModal';

const ActionButtons = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleWithdrawBalance = () => {
    setIsModalVisible(true);
  };

  const handleBuyCoins = () => {
    // Handle buy coins action
    console.log('Buy Coins pressed');
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleRequestWithdraw = (coinsAmount) => {
    // Handle the withdrawal request
    console.log('Withdrawal requested for:', coinsAmount, 'coins');
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <PrimaryButton
        title="Withdraw Balance"
        onPress={handleWithdrawBalance}
        style={styles.button}
        textStyle={styles.buttonText}
      />
      <PrimaryButton
        title="Buy Coins"
        onPress={handleBuyCoins}
        style={styles.button}
        textStyle={styles.buttonText}
      />
      
      <RequestWithdrawModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onRequest={handleRequestWithdraw}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Style.marginTop24,
    ...Style.hpadding,
  },
  button: {
    marginVertical: 8,
  },
  buttonText: {
    ...Style.font16,
    ...Style.semibold,
  },
});

export default ActionButtons;
