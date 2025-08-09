import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../components/common/Header'
import StatsSummary from './StatsSummary'
import ManageProductsSection from './ManageProductsSection'
import LinkedProductsSection from './LinkedProductsSection'
import COLORS from '../../../style/colors'
import Style from '../../../style/Style'
import AddProductModal from './AddProductModal'

const ShopScreen = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  return (
    <View style={Style.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header
        title="Shop"
        onBackPress={() => {}}
        onNotificationPress={() => {}}
        onSettingsPress={() => {}}
        onAvatarPress={() => {}}
        notificationCount={1}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <StatsSummary />
        <ManageProductsSection onPressAdd={() => setShowAddModal(true)} />
        <LinkedProductsSection />
        <View style={{ height: 24 }} />
      </ScrollView>

      <AddProductModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={() => setShowAddModal(false)}
      />
    </View>
  )
}

export default ShopScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  content: {
    padding: 16,
    gap: 12,
  },
})