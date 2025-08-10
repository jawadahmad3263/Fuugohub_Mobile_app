/**
 * Profile Screen
 * User profile management screen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ProfileIcon from '../../assets/svg/profile-icon.svg';
import AnalyticsIcon from '../../assets/svg/analytics.svg';
import LogoutIcon from '../../assets/svg/logout.svg';
import LiveStreamIcon from '../../assets/svg/live-strem-icon.svg';
import EarningsIcon from '../../assets/svg/dollar.svg';
import UserProfileAvatar from '../../assets/svg/user-profile-avatar.svg';
import COLORS from '../../style/colors';
import Spacing from '../../components/common/Spacing';
import PrimaryButton from '../../components/common/PrimaryButton';
import { APP_SCREENS } from '../../navigation/screens';

const ProfileScreen = ({ navigation }) => {
  const [userProfile] = useState({
    name: 'John David',
    description: 'Lorem ipsum dummy text..',
    isOnline: true,
  });

  const menuItems = [
    {
      id: 'profile',
      title: 'Profile',
      icon: ProfileIcon,
      onPress: () => {navigation.navigate(APP_SCREENS.PERSONAL_PROFILE.name)}
    },
    {
      id: 'liveStream',
      title: 'Live Stream',
      icon: LiveStreamIcon,
      onPress: () => Alert.alert('Live Stream', 'Live stream functionality to be implemented'),
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: AnalyticsIcon,
      onPress: () => Alert.alert('Analytics', 'Analytics functionality to be implemented'),
    },
    {
      id: 'earnings',
      title: 'Earnings',
      icon: EarningsIcon,
      onPress: () => {navigation.navigate(APP_SCREENS.EARNINGS.name)}
    },
    {
      id: 'logout1',
      title: 'Logout',
      icon: LogoutIcon,
      onPress: () => handleLogout(),
    },
  
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            console.log('User logged out');
            Alert.alert('Success', 'Logout functionality to be implemented');
          },
        },
      ]
    );
  };

  const handleBuyCoins = () => {
    Alert.alert('Buy Coins', 'Buy coins functionality to be implemented');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#f4511e', '#ff7043']}
        style={styles.header}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>

          {/* User Profile Section */}
          <View style={styles.userSection}>
            <View style={styles.avatarContainer}>
              <UserProfileAvatar width={60} height={60} />
              {userProfile.isOnline && (
                <View style={styles.onlineIndicator} />
              )}
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userProfile.name}</Text>
              <Text style={styles.userDescription}>{userProfile.description}</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <item.icon width={24} height={24} />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Text style={styles.menuItemArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Buy Coins Button */}
        <PrimaryButton
        title='Buy Coins'
        textStyle={styles.buyCoinsText}
        onPress={handleBuyCoins}
        style={styles.buyCoinsButton}
        />

        {/* Footer Links */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerLink}>
            <Text style={styles.footerLinkText}>Get Premium</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerLink}>
            <Text style={styles.footerLinkText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerLink}>
            <Text style={styles.footerLinkText}>Terms & Services</Text>
          </TouchableOpacity>
          <Text style={styles.copyright}>@2025 Fuugohub</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 0,
    paddingBottom: 10,
  },
  safeArea: {
    paddingTop: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 20,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  userDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 16,
  },
  menuItemArrow: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
  },
  buyCoinsButton: {
     alignSelf:'center',
    marginTop: 24,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width:'90%'
  },
  buyCoinsGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyCoinsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 20,
  },
  footerLink: {
    marginBottom: 8,
  },
  footerLinkText: {
    fontSize: 14,
    color: '#666',
  },
  copyright: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
  },
});

export default ProfileScreen; 