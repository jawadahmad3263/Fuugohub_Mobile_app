import React from 'react';
import { StyleSheet, View } from 'react-native';
import Style from '../../../style/Style';
import EarningsSummaryCard from './EarningsSummaryCard';

const EarningsSummary = () => {
  return (
    <View style={styles.container}>
      <View style={[Style.row, styles.topRow]}>
        <EarningsSummaryCard 
          title="Total Earnings" 
          value="1,050.00" 
          isCurrency={true}
        />
        <EarningsSummaryCard 
          title="Available" 
          value="725.00" 
          isCurrency={true}
        />
      </View>
      
      <View style={[Style.row, styles.bottomRow]}>
        <EarningsSummaryCard 
          title="Total Coins" 
          value="109"
        />
        <EarningsSummaryCard 
          title="Available" 
          value="100"
        />
        <EarningsSummaryCard 
          title="Used" 
          value="9"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Style.marginTop24,
    ...Style.hpadding,
  
  },
  topRow: {
    ...Style.marginBottom16,
    ...Style.gap16,
  },
  bottomRow: {
    ...Style.gap16,
  },
});

export default EarningsSummary;
