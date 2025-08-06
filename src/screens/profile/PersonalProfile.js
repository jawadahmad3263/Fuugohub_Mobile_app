import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native'
import React, { useState } from 'react'
import EmailIcon from '../../assets/svg/mail-icon.svg'
import LocationIcon from '../../assets/svg/location-black.svg'
import BagIcon from '../../assets/svg/bag-icon.svg'
import UserProfileAvatar from '../../assets/svg/user-profile-avatar.svg'
import Style from '../../style/Style'
import Header from '../../components/common/Header'
import PrimaryButton from '../../components/common/PrimaryButton'
import Spacing from '../../components/common/Spacing'

const PersonalProfile = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('My Drops')

  const tabs = ['My Drops', 'Followers', 'Followings', 'Liked']

  const handleTabPress = (tab) => {
    setActiveTab(tab)
  }

  const handleSetupBusiness = () => {
    // Handle setup business page
    console.log('Setup business page')
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

        {/* Follower/Following Counts */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>86.6k</Text>
            <Text style={styles.statLabel}>Follower</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>90.5k</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>About</Text>
          <Text style={styles.aboutText}>
            Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer.
          </Text>
          
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <LocationIcon width={16} height={16} />
              <Text style={styles.contactText}>USA</Text>
            </View>
            
            <View style={styles.contactItem}>
              <EmailIcon width={16} height={16} />
              <Text style={styles.contactText}>brown.dejah@parisian.com</Text>
            </View>
            
            <View style={styles.contactItem}>
              <BagIcon width={16} height={16} />
              <Text style={styles.contactText}>UX Designer at google</Text>
            </View>
            
            <View style={styles.contactItem}>
              <BagIcon width={16} height={16} />
              <Text style={styles.contactText}>Studied at College of new Jersey</Text>
            </View>
          </View>
        </View>

        {/* Setup Business Button */}
        <PrimaryButton
          title="Setup a Business Page"
          onPress={handleSetupBusiness}
          style={styles.setupBusinessButton}
          textStyle={styles.setupBusinessButtonText}
        />

        {/* Image Grid */}
        <View style={styles.imageGrid}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <View key={item} style={styles.imageContainer}>
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>Product {item}</Text>
              </View>
            </View>
          ))}
        </View>
        <Spacing val={50}/>
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
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
})