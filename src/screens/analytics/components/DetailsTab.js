import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Style from '../../../style/Style';
import COLORS from '../../../style/colors';

const DetailsTab = () => {
  const products = [
    { id: 1, name: 'Wireless Earbuds' },
    { id: 2, name: 'Wireless Earbuds' },
    { id: 3, name: 'Wireless Earbuds' },
    { id: 4, name: 'Wireless Earbuds' },
    { id: 5, name: 'Wireless Earbuds' },
    { id: 6, name: 'Wireless Earbuds' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {products.map((product) => (
        <View key={product.id} style={styles.productCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.actionIcons}>
              <Text style={styles.editIcon}>✏️</Text>
              <Text style={styles.deleteIcon}>🗑️</Text>
            </View>
          </View>
          
          <View style={styles.metricsGrid}>
            <View style={styles.metricRow}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Views</Text>
                <Text style={styles.metricValue}>100K+</Text>
              </View>
              
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Likes</Text>
                <Text style={styles.metricValue}>100K+</Text>
              </View>
              
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Shares</Text>
                <Text style={styles.metricValue}>100K+</Text>
              </View>
              
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Conversion</Text>
                <Text style={styles.metricValue}>10%</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.coinsSection}>
            <Text style={styles.coinsLabel}>Coins Generated</Text>
            <Text style={styles.coinsValue}>122</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  productCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 5,
    marginBottom: 12,
   borderWidth:1,
   borderColor:COLORS.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  actionIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  editIcon: {
    fontSize: 16,
  },
  deleteIcon: {
    fontSize: 16,
  },
  metricsGrid: {
    marginBottom: 16,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricItem: {
    
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  coinsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  coinsLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  coinsValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});

export default DetailsTab;
