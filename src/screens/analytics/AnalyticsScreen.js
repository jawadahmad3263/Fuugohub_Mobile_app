import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Style from '../../style/Style'
import Header from '../../components/common/Header'

const AnalyticsScreen = () => {
  return (
    <View style ={[Style.container]}>
      <Header title="Analytics" />
    </View>
  )
}

export default AnalyticsScreen

const styles = StyleSheet.create({})