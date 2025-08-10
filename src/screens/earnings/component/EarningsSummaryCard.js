import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Style from '../../../style/Style';
import COLORS from '../../../style/colors';

const EarningsSummaryCard = ({ title, value, subtitle, isCurrency = false }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>
        {isCurrency ? '$' : ''}{value}
      </Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    ...Style.rounded12,
    padding: 16,
    ...Style.cardShadow,
    flex: 1,
    marginHorizontal: 4,
  },
  title: {
    ...Style.font14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  value: {
    ...Style.font24,
    ...Style.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    ...Style.font12,
    color: COLORS.textSecondary,
  },
});

export default EarningsSummaryCard;
