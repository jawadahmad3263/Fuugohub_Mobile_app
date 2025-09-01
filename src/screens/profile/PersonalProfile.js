import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native'
import React, { useState } from 'react'
import UserProfileAvatar from '../../assets/svg/user-profile-avatar.svg'
import Style from '../../style/Style'
import Header from '../../components/common/Header'
import Spacing from '../../components/common/Spacing'
import MyDropsTab from './components/MyDropsTab'
import FollowersTab from './components/FollowersTab'
import FollowingsTab from './components/FollowingsTab'
import LikedTab from './components/LikedTab'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import EditProfileIcon from "../../assets/svg/edit-profile-icon.svg";
import ProfileUpdateModal from './components/ProfileUpdateModal'

const PersonalProfile = ({ navigation }) => {
  const route = useRoute()
  const [activeTab, setActiveTab] = useState('My Drops')
  const [userProfile,setUserProfile] = useState(null)
  const tabs = ['My Drops', 'Followers', 'Followings', 'Liked']
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false)
  useFocusEffect(
    React.useCallback(() => {
      handleRouteValue()
    }, [route?.params])
  );
  const handleTabPress = (tab) => {
    setActiveTab(tab)
  }

  const handleRouteValue = () => {
    const user = route?.params
    console.warn('user', user)
    setUserProfile(user)
  }
  const onEditProfilePress = () => {
    // navigation.navigate(APP_SCREENS.EDIT_PROFILE.name)
    setIsUpdateModalVisible(true)
  }
  return (
    <View style={[Style.container]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Spacing val={10}/>
      <Header 
        title="Profile"
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => console.log('Notifications')}
        onSettingsPress={() => console.log('Settings')}
        onAvatarPress={() => console.log('Avatar')}
        notificationCount={1}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* User Profile Section */}
        <Spacing val={10}/>
        <View>
        <View style={styles.userProfileSection}>
        <TouchableOpacity 
        onPress={onEditProfilePress}
         style={styles.editProfileIconContainer}>
                <EditProfileIcon/>
              </TouchableOpacity>
          <View style={styles.avatarContainer}>
      
            {/* <UserProfileAvatar width={120} height={120} /> */}
            {userProfile?.profileImage ? <Image source={{uri:userProfile?.profileImage}} style={{width:120,height:120,borderRadius:100}} resizeMode='cover' /> : <UserProfileAvatar width={120} height={120} />}

          </View>
          {/* <Text style={styles.userName}>Mireya Conner</Text>
          <Text style={styles.userTitle}>Product Owner</Text> */}
          <Text style={styles.userName}>{userProfile?.firstName} {userProfile?.lastName || ''}</Text>
          <Text style={styles.userTitle}>Product Owne</Text>
        </View>
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

        {/* Tab Content */}
        {activeTab === 'My Drops' && <MyDropsTab />}
        {activeTab === 'Followers' && <FollowersTab />}
        {activeTab === 'Followings' && <FollowingsTab />}
        {activeTab === 'Liked' && <LikedTab />}
        <Spacing val={350}/>
        <ProfileUpdateModal
          visible={isUpdateModalVisible}
          onClose={() => setIsUpdateModalVisible(false)}
          onSave={() => {}}
        />
      </ScrollView>
    </View>
  )
}

export default PersonalProfile

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  userProfileSection: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 40,
    alignItems: 'center',
    marginHorizontal:10,
    borderTopLeftRadius:12,
    borderTopRightRadius:12,
    overflow:'hidden',
    ...Style.cardShadow,
    // margin:16,
    // borderRadius:16,
  
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    // paddingVertical: 16,
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
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 20,
  },
  aboutContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  contactInfo: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 8,
  },
  imageContainer: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 8,
  },
  placeholderImage: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 12,
    color: '#666',
  },
  setupBusinessButton: {
    marginTop: 20,
    marginBottom: 20,
    width: '90%',
    alignSelf:'center'
  },
  setupBusinessButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  editProfileIconContainer:{
    position:'absolute',
    top:10,
    right:15,
  
   
  }
})