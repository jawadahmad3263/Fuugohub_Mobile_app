import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Style from '../../../style/Style';
import COLORS from '../../../style/colors';
import TopProductsTab from './TopProductsTab';
import DetailsTab from './DetailsTab';

const AnalyticsTabs = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Performance</Text>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'details' && styles.activeTab]}
          onPress={() => onTabChange('details')}
        >
          <Text style={[styles.tabText, activeTab === 'details' && styles.activeTabText]}>
            Details
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'topProducts' && styles.activeTab]}
          onPress={() => onTabChange('topProducts')}
        >
          <Text style={[styles.tabText, activeTab === 'topProducts' && styles.activeTabText]}>
            Top Products
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'topProducts' ? (
        <TopProductsTab />
      ) : (
        <DetailsTab />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 24,
    ...Style.cardShadow,
   backgroundColor:COLORS.white,
   borderRadius:16,
  //  padding:5,
  paddingHorizontal:5,
  paddingVertical:10,
   marginTop:10,
   marginBottom:40,
   flex:1
 
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap:10,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    // flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 6,
    // alignItems: 'center',
    borderWidth:1,
    borderColor:COLORS.border,
  },
  activeTab: {
    backgroundColor: COLORS.darkGray,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  activeTabText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default AnalyticsTabs;
