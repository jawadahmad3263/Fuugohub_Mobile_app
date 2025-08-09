import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../../style/colors';

const ProductCard = ({ name = 'Wireless Earbuds', quantity = '100', price = '100K+', status = 'Sold' }) => {
  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.more}>⋮</Text>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaCol}>
          <Text style={styles.metaLabel}>Quantity</Text>
          <Text style={styles.metaValue}>{quantity}</Text>
        </View>
        <View style={styles.metaCol}>
          <Text style={styles.metaLabel}>Price</Text>
          <Text style={styles.metaValue}>{price}</Text>
        </View>
        <View style={[styles.metaCol, { alignItems: 'flex-end' }] }>
          <Text style={styles.metaLabel}>Status</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{status}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    borderWidth:1,
    borderColor:COLORS.border,
    // iOS shadow
    // shadowColor: '#000',
    // shadowOpacity: 0.05,
    // shadowRadius: 8,
    // shadowOffset: { width: 0, height: 4 },
    // Android
    elevation: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  more: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  metaCol: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 12,
    color: COLORS.black,
    marginBottom: 6,
    fontWeight:'700'
  },
  metaValue: {
    fontSize: 12,
    color: COLORS.textPrimary,
    fontWeight: '400',
  },
  badge: {
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: COLORS.statusSuccess,
  },
  badgeText: {
    color: COLORS.darkLightGreen,
    fontWeight: '700',
    fontSize: 12,
  },
});


