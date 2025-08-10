import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Style from '../../style/Style';
import Header from '../../components/common/Header';
import {
  PerformanceCard,
  AnalyticsTabs,
  TopProductsTab,
  DetailsTab,
} from './components';

const AnalyticsScreen = () => {
  const [activeTab, setActiveTab] = useState('topProducts');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={[Style.container]}>
      <Header title="Analytics" />
      <ScrollView>

      
      <PerformanceCard />
      
      <AnalyticsTabs 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />

</ScrollView>
      
   
    </View>
  );
};

export default AnalyticsScreen;

const styles = StyleSheet.create({});