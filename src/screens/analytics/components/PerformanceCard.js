import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Style from '../../../style/Style';
import COLORS from '../../../style/colors';

const PerformanceCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.summaryGrid}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>8.2k</Text>
          <Text style={styles.summaryLabel}>Views</Text>
        </View>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>86.6k</Text>
          <Text style={styles.summaryLabel}>Likes</Text>
        </View>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>86.6k</Text>
          <Text style={styles.summaryLabel}>Shares</Text>
        </View>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>86.6k</Text>
          <Text style={styles.summaryLabel}>Engagements</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    ...Style.cardShadow,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default PerformanceCard;
