import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Style from '../../../style/Style';
import COLORS from '../../../style/colors';

const WithdrawalHistory = () => {
  const withdrawalData = [
    { action: 'Login', amount: '$100', status: 'Approved', date: '2025-01-01' },
    { action: '2025-01-01', amount: '$420.00', status: 'Pending', date: '2025-01-01' },
    { action: '2025-01-01', amount: '$420.00', status: 'Approved', date: '2025-01-01' },
    { action: '2025-01-01', amount: '$420.00', status: 'Pending', date: '2025-01-01' },
    { action: '2025-01-01', amount: '$420.00', status: 'Approved', date: '2025-01-01' },
    { action: '2025-01-01', amount: '$420.00', status: 'Pending', date: '2025-01-01' },
  ];

  const getStatusStyle = (status) => {
    if (status === 'Approved') {
      return { backgroundColor: COLORS.success, color: COLORS.white };
    } else {
      return { backgroundColor: COLORS.pendingStatusBg, color: COLORS.darkLightWarning };
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Withdrawal History</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {withdrawalData.map((item, index) => (
          <View key={index} style={styles.withdrawalItem}>
            <Text style={styles.actionText}>{item.action}</Text>
            <Text style={styles.amountText}>{item.amount}</Text>
            <View style={[styles.statusTag, { backgroundColor: getStatusStyle(item.status).backgroundColor }]}>
              <Text style={[styles.statusText, { color: getStatusStyle(item.status).color }]}>
                {item.status}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Style.marginTop24,
    ...Style.marginBottom24,
    marginHorizontal:10,

    paddingVertical:10,
    backgroundColor:COLORS.white,
   
    borderRadius:16,
    shadowColor:COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
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
  withdrawalItem: {
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
  amountText: {
    ...Style.font16,
    ...Style.bold,
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  statusTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  statusText: {
    ...Style.font12,
    ...Style.semibold,
  },
});

export default WithdrawalHistory;
