import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../../style/colors';

const STAT_ITEMS = [
  { id: 'products', label: 'Products', value: '12', icon: '📦' },
  { id: 'orders', label: 'Orders', value: '45', icon: '🧾' },
  { id: 'revenue', label: 'Revenue', value: '$1,2039.00', icon: '💵' },
  { id: 'liked', label: 'Liked Drops', value: '122', icon: '❤️' },
];

const StatsSummary = () => {
  return (
    <View style={styles.grid}>
      {STAT_ITEMS.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.cardInner}>
           
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default StatsSummary;

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    width: '48%',
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    // Android
    elevation: 2,
  },
  cardInner: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  icon: {
    fontSize: 18,
    marginBottom: 8,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginBottom: 6,
  },
  value: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
  },
});


