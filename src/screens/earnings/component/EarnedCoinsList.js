import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Style from '../../../style/Style';
import COLORS from '../../../style/colors';

const EarnedCoinsList = () => {
  const earnedCoinsData = [
    { action: 'Login', coins: '12 coins', amount: '$100' },
    { action: 'Drop liked', coins: '12 coins', amount: '$100' },
    { action: 'Drop Shared', coins: '12 coins', amount: '$100' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Earned coins</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {earnedCoinsData.map((item, index) => (
          <View key={index} style={styles.coinItem}>
            <Text style={styles.actionText}>{item.action}</Text>
            <Text style={styles.coinsText}>{item.coins}</Text>
            <Text style={styles.amountText}>{item.amount}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Style.marginTop24,
    marginHorizontal:10,

    paddingVertical:10,
    backgroundColor:COLORS.white,
   
    borderRadius:16,
    shadowColor:COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
    elevation: 5,
  },
  sectionTitle: {
    ...Style.font18,
    ...Style.bold,
    color: COLORS.textPrimary,
    marginBottom: 16,
    ...Style.hpadding,
  },
  coinItem: {
    backgroundColor: COLORS.white,
    ...Style.rounded12,
    padding: 8,
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth:1,
    borderColor:COLORS.border,
    
  },
  actionText: {
    ...Style.font14,
    ...Style.light,
    color: COLORS.textPrimary,
    flex: 1,
  },
  coinsText: {
    ...Style.font14,
    color: COLORS.textSecondary,
    flex: 1,
    textAlign: 'center',
  },
  amountText: {
    ...Style.font16,
    ...Style.bold,
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: 'right',
  },
});

export default EarnedCoinsList;
