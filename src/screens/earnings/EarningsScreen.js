import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Style from '../../style/Style'
import Header from '../../components/common/Header'
import {
  EarningsSummary,
  ActionButtons,
  EarnedCoinsList,
  WithdrawalHistory
} from './component'

const EarningsScreen = () => {
  return (
    <View style={[Style.container]}>
      <Header title="Earnings" />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <EarningsSummary />
        <ActionButtons />
        <EarnedCoinsList />
        <WithdrawalHistory />
      </ScrollView>
    </View>
  )
}

export default EarningsScreen

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
})