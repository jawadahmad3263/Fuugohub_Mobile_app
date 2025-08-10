import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import Style from '../../style/Style'
import Header from '../../components/common/Header'
import Spacing from '../../components/common/Spacing'
import UserProfileAvatar from '../../assets/svg/user-profile-avatar.svg'
import COLORS from '../../style/colors'
import ProductsTab from './components/ProductsTab'
import DropsTab from './components/DropsTab'
import FollowersTab from './components/FollowersTab'
import OthersTab from './components/OthersTab'

const BusinessPage = () => {
  const [activeTab, setActiveTab] = useState('Products')

  const tabs = ['Products', 'Drops', 'Followers', 'Other Details']

  const handleTabPress = (tab) => {
    setActiveTab(tab)
  }

  const renderHeader = () => (
    <>
      <Spacing val={10}/>
      <Header title="Business Page" />
      <Spacing val={10}/>
      
      <View style={styles.businessPageContainer}>
        <View style={styles.userProfileSection}>
          <View style={styles.avatarContainer}>
            <UserProfileAvatar width={120} height={120} />
          </View>
          <Text style={styles.userName}>Mireya Conner</Text>
          <Text style={styles.userTitle}>Product Owner</Text>
        </View>
        
        {/* Navigation Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={styles.tab}
              onPress={() => handleTabPress(tab)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.activeTabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Products':
        return <ProductsTab ListHeaderComponent={null} />
      case 'Drops':
        return <DropsTab />
      case 'Followers':
        return <FollowersTab />
      case 'Other Details':
        return <OthersTab />
      default:
        return <ProductsTab ListHeaderComponent={null} />
    }
  }

  return (
    <View style={[Style.container]}>
      <FlatList
        data={[{ key: 'content' }]}
        renderItem={() => renderTabContent()}
        keyExtractor={(item) => item.key}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        ListFooterComponent={<Spacing val={100}/>}
      />
    </View>
  )
}

export default BusinessPage

const styles = StyleSheet.create({
  userProfileSection: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 40,
    alignItems: 'center',
    marginHorizontal:10,
    borderTopLeftRadius:12,
    borderTopRightRadius:12,
    overflow:'hidden'
  },
  avatarContainer: {
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  userTitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 16,
    marginBottom: 1,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
   
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#333',
    fontWeight: 'bold',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 30,
    height: 3,
    backgroundColor: '#333',
    borderRadius: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 1,
  },
  businessPageContainer:{
    ...Style.cardShadow,
    backgroundColor:COLORS.white,
    borderRadius:12,
 
    borderWidth:1,
    borderColor:COLORS.border,
  },
  flatList: {
    flex: 1,
  },
})